<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\DocumentApproval;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AcademicController extends Controller
{
    public function index(): JsonResponse
    {
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $academics = User::where('role', 'academic')
            ->withCount(['documents as uploaded_documents_count'])
            ->with(['documents' => function($query) {
                $query->latest()->limit(5);
            }])
            ->latest()
            ->get();

        // Add approval statistics for each academic
        $academics->each(function($academic) {
            $approvals = DocumentApproval::where('admin_id', $academic->id)->get();
            $academic->total_approvals = $approvals->where('decision', 'approve')->count();
            $academic->total_rejections = $approvals->where('decision', 'reject')->count();
            $academic->total_reviews = $approvals->count();
        });

        return response()->json($academics);
    }

    public function store(Request $request): JsonResponse
    {
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'institution' => 'nullable|string|max:255',
            'specialization' => 'required|in:Computing,Engineering,Management,GeoSciences,Environmental',
        ]);

        $academic = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'academic',
            'is_active' => true,
            'institution' => $request->institution,
            'specialization' => $request->specialization,
        ]);

        return response()->json([
            'message' => 'Academic created successfully',
            'academic' => $academic
        ], 201);
    }

    public function show(User $academic): JsonResponse
    {
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($academic->role !== 'academic') {
            return response()->json(['message' => 'User is not an academic'], 404);
        }

        // Load academic's documents
        $academic->load(['documents' => function($query) {
            $query->latest();
        }]);

        // Get approval history
        $approvals = DocumentApproval::where('admin_id', $academic->id)
            ->with(['document.uploader'])
            ->latest()
            ->get();

        $academic->approval_history = $approvals;
        $academic->total_approvals = $approvals->where('decision', 'approve')->count();
        $academic->total_rejections = $approvals->where('decision', 'reject')->count();
        $academic->total_reviews = $approvals->count();

        return response()->json($academic);
    }

    public function update(Request $request, User $academic): JsonResponse
    {
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($academic->role !== 'academic') {
            return response()->json(['message' => 'User is not an academic'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($academic->id),
            ],
            'is_active' => 'sometimes|boolean',
            'institution' => 'sometimes|nullable|string|max:255',
            'specialization' => 'sometimes|required|in:Computing,Engineering,Management,GeoSciences,Environmental',
        ]);

        $academic->update($request->only([
            'name', 'email', 'is_active', 'institution', 'specialization'
        ]));

        return response()->json([
            'message' => 'Academic updated successfully',
            'academic' => $academic
        ]);
    }

    public function toggleStatus(User $academic): JsonResponse
    {
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($academic->role !== 'academic') {
            return response()->json(['message' => 'User is not an academic'], 404);
        }

        $academic->update(['is_active' => !$academic->is_active]);

        return response()->json([
            'message' => $academic->is_active ? 'Academic activated successfully' : 'Academic deactivated successfully',
            'academic' => $academic
        ]);
    }

    public function destroy(User $academic): JsonResponse
    {
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($academic->role !== 'academic') {
            return response()->json(['message' => 'User is not an academic'], 404);
        }

        // Delete approval records
        $academic->approvals()->delete();
        
        // Delete the academic
        $academic->delete();

        return response()->json([
            'message' => 'Academic deleted successfully'
        ]);
    }
}
