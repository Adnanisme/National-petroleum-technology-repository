<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\DocumentApproval;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Document::with(['uploader', 'organization'])
            ->where('status', 'approved');

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('category')) {
            $query->where('category', $request->get('category'));
        }

        // Filter by organization if specified (for org admin dashboards)
        if ($request->has('organization_id')) {
            $query->where('organization_id', $request->get('organization_id'));
        }

        $documents = $query->latest()->paginate(20);

        return response()->json($documents);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:100',
            'file' => 'required|file|mimes:pdf,doc,docx,csv,xlsx,json,txt,ppt,pptx|max:51200' // Increased to 50MB
        ]);

        $user = auth()->user();
        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('documents', $fileName, 'public');

        // Determine document status and auto-approval logic
        $status = 'pending';
        $autoApproved = false;
        $approvalNotes = null;

        if ($user->isAdmin() || $user->isSuperAdmin()) {
            // Admins and super admins get automatic approval
            $status = 'approved';
            $autoApproved = true;
            $approvalNotes = 'Auto-approved: Admin/Super Admin upload';
        } elseif ($user->isAcademic()) {
            // Academic users get automatic approval
            $status = 'approved';
            $autoApproved = true;
            $approvalNotes = 'Auto-approved: Academic upload';
        } elseif ($user->isOrgAdmin() || ($user->organization_id && $user->canUploadDocuments())) {
            // Organization admins and organization users get automatic approval
            $status = 'approved';
            $autoApproved = true;
            $approvalNotes = 'Auto-approved: Organization user upload';
        }

        $document = Document::create([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'file_name' => $fileName,
            'file_path' => $filePath,
            'file_type' => $file->getClientOriginalExtension(),
            'file_size' => $file->getSize(),
            'uploaded_by' => auth()->id(),
            'organization_id' => $user->organization_id,
            'status' => $status,
            'auto_approved' => $autoApproved,
            'approval_notes' => $approvalNotes
        ]);

        $message = $autoApproved ? 
            'Document uploaded and automatically approved!' : 
            'Document uploaded successfully and is pending review.';

        return response()->json([
            'message' => $message,
            'document' => $document->load(['uploader', 'organization']),
            'auto_approved' => $autoApproved
        ], 201);
    }

    public function show(Document $document): JsonResponse
    {
        $document->load(['uploader', 'approvals.admin']);
        $document->loadCount(['approveVotes', 'rejectVotes']);
        
        // Add current user's vote status if they can approve documents
        $currentUserVote = null;
        $user = auth()->user();
        if ($user && $user->canApproveDocuments()) {
            $currentUserVote = $document->getApprovalStatus(auth()->id());
        }
        
        return response()->json([
            'document' => $document,
            'current_user_vote' => $currentUserVote
        ]);
    }

    public function download(Document $document)
    {
        // Allow admins and academics to download pending documents for review
        $user = auth()->user();
        if ($document->status !== 'approved' && (!$user || !$user->canApproveDocuments())) {
            return response()->json(['message' => 'Document not available for download'], 403);
        }

        if (!Storage::disk('public')->exists($document->file_path)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        return Storage::disk('public')->download($document->file_path, $document->file_name);
    }

    public function approve(Document $document): JsonResponse
    {
        if (!auth()->user()->canApproveDocuments()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $adminId = auth()->id();
        
        // Check if admin has already voted
        $existingVote = $document->getApprovalStatus($adminId);
        if ($existingVote) {
            return response()->json(['message' => 'You have already voted on this document'], 400);
        }

        // Record the approval vote
        DocumentApproval::create([
            'document_id' => $document->id,
            'admin_id' => $adminId,
            'decision' => 'approve'
        ]);

        // Check if document now has enough approvals
        if ($document->hasEnoughApprovals()) {
            $document->update(['status' => 'approved']);
            $message = 'Document approved successfully! Document is now published.';
        } else {
            $approveCount = $document->approveVotes()->count();
            $message = "Your approval has been recorded. Document needs " . (7 - $approveCount) . " more approvals.";
        }

        return response()->json([
            'message' => $message,
            'approval_count' => $document->approveVotes()->count(),
            'reject_count' => $document->rejectVotes()->count(),
            'status' => $document->fresh()->status
        ]);
    }

    public function reject(Document $document): JsonResponse
    {
        if (!auth()->user()->canApproveDocuments()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $adminId = auth()->id();
        
        // Check if admin has already voted
        $existingVote = $document->getApprovalStatus($adminId);
        if ($existingVote) {
            return response()->json(['message' => 'You have already voted on this document'], 400);
        }

        // Record the rejection vote
        DocumentApproval::create([
            'document_id' => $document->id,
            'admin_id' => $adminId,
            'decision' => 'reject'
        ]);

        // Check if document has too many rejections (more than 3 means it can't reach 7 approvals)
        $rejectCount = $document->rejectVotes()->count();
        if ($rejectCount > 3) {
            $document->update(['status' => 'rejected']);
            $message = 'Document rejected! Too many rejection votes.';
        } else {
            $message = 'Your rejection has been recorded.';
        }

        return response()->json([
            'message' => $message,
            'approval_count' => $document->approveVotes()->count(),
            'reject_count' => $document->rejectVotes()->count(),
            'status' => $document->fresh()->status
        ]);
    }

    public function pending(): JsonResponse
    {
        if (!auth()->user()->canApproveDocuments()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user = auth()->user();
        $query = Document::with(['uploader', 'approvals.admin'])
            ->withCount(['approveVotes', 'rejectVotes'])
            ->where('status', 'pending');

        // If user is an academic, only show documents in their specialization
        if ($user->isAcademic() && $user->specialization) {
            $query->where('category', $user->specialization);
        }

        $documents = $query->latest()->paginate(20);

        return response()->json($documents);
    }

    public function preview(Document $document): JsonResponse
    {
        // Only allow admins and academics to preview pending documents
        $user = auth()->user();
        if ($document->status !== 'approved' && (!$user || !$user->canApproveDocuments())) {
            return response()->json(['message' => 'Document not available for preview'], 403);
        }

        if (!Storage::disk('public')->exists($document->file_path)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        // Only preview text files for now
        if (!in_array($document->file_type, ['txt', 'json', 'csv'])) {
            return response()->json(['message' => 'Preview not supported for this file type'], 400);
        }

        try {
            $content = Storage::disk('public')->get($document->file_path);
            
            // Limit content size for preview (first 5000 characters)
            if (strlen($content) > 5000) {
                $content = substr($content, 0, 5000) . "\n\n... [Content truncated for preview]";
            }

            return response()->json([
                'content' => $content,
                'file_type' => $document->file_type
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error reading file'], 500);
        }
    }

    public function destroy(Document $document): JsonResponse
    {
        $user = auth()->user();
        
        // Only super admins and org admins (for their own org's documents) can delete documents
        if (!$user->isSuperAdmin() && 
            (!$user->isOrgAdmin() || $document->organization_id !== $user->organization_id)) {
            return response()->json(['message' => 'Unauthorized to delete this document'], 403);
        }

        try {
            // Delete the physical file
            if (Storage::disk('public')->exists($document->file_path)) {
                Storage::disk('public')->delete($document->file_path);
            }

            // Delete related approvals
            $document->approvals()->delete();

            // Delete the document record
            $document->delete();

            return response()->json([
                'message' => 'Document deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting document'], 500);
        }
    }
}
