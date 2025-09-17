<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Trainee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class TraineeController extends Controller
{
    public function index(Request $request)
    {
        $query = Trainee::with('user');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $trainees = $query->orderBy('submitted_at', 'desc')->paginate(10);

        return response()->json($trainees);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:trainees,email',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'education_level' => 'nullable|string|max:255',
            'field_of_study' => 'nullable|string|max:255',
            'institution' => 'nullable|string|max:255',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $cvFile = $request->file('cv');
            $filename = time() . '_' . Str::random(10) . '.' . $cvFile->getClientOriginalExtension();
            
            $path = $cvFile->storeAs('cvs', $filename, 'public');

            $trainee = Trainee::create([
                'user_id' => auth()->id(),
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'bio' => $request->bio,
                'education_level' => $request->education_level,
                'field_of_study' => $request->field_of_study,
                'institution' => $request->institution,
                'cv_filename' => $filename,
                'cv_original_name' => $cvFile->getClientOriginalName(),
                'cv_path' => $path,
                'cv_size' => $cvFile->getSize(),
                'cv_mime_type' => $cvFile->getMimeType(),
                'submitted_at' => now(),
            ]);

            return response()->json([
                'message' => 'Application submitted successfully',
                'trainee' => $trainee->load('user')
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to submit application',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Trainee $trainee)
    {
        return response()->json($trainee->load('user'));
    }

    public function update(Request $request, Trainee $trainee)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,approved,rejected',
            'admin_notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $trainee->update([
            'status' => $request->status,
            'admin_notes' => $request->admin_notes,
            'reviewed_at' => now(),
        ]);

        return response()->json([
            'message' => 'Trainee status updated successfully',
            'trainee' => $trainee->load('user')
        ]);
    }

    public function downloadCv(Trainee $trainee)
    {
        if (!Storage::disk('public')->exists($trainee->cv_path)) {
            return response()->json(['message' => 'CV file not found'], 404);
        }

        return Storage::disk('public')->download($trainee->cv_path, $trainee->cv_original_name);
    }

    public function destroy(Trainee $trainee)
    {
        if (Storage::disk('public')->exists($trainee->cv_path)) {
            Storage::disk('public')->delete($trainee->cv_path);
        }

        $trainee->delete();

        return response()->json(['message' => 'Trainee application deleted successfully']);
    }
}
