<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class OrganizationController extends Controller
{

    public function index()
    {
        $user = auth()->user();
        
        if ($user->isSuperAdmin()) {
            $organizations = Organization::with(['users', 'documents'])->get();
        } else {
            $organizations = Organization::where('id', $user->organization_id)->with(['users', 'documents'])->get();
        }
        
        return response()->json($organizations);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Super admin access required'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255|unique:organizations',
            'short_name' => 'required|string|max:50|unique:organizations',
            'type' => 'required|in:government,private,academic,research',
            'description' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'contact_phone' => 'nullable|string',
            'address' => 'nullable|string',
            'website' => 'nullable|url',
        ]);

        $organization = Organization::create($request->all());

        return response()->json($organization, 201);
    }

    public function show(Organization $organization)
    {
        $user = auth()->user();
        
        if (!$user->isSuperAdmin() && $user->organization_id !== $organization->id) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $organization->load(['users', 'documents']);
        
        return response()->json($organization);
    }

    public function update(Request $request, Organization $organization)
    {
        $user = auth()->user();
        
        if (!$user->isSuperAdmin() && $user->organization_id !== $organization->id) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $request->validate([
            'name' => ['sometimes', 'string', 'max:255', Rule::unique('organizations')->ignore($organization->id)],
            'short_name' => ['sometimes', 'string', 'max:50', Rule::unique('organizations')->ignore($organization->id)],
            'type' => 'sometimes|in:government,private,academic,research',
            'description' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'contact_phone' => 'nullable|string',
            'address' => 'nullable|string',
            'website' => 'nullable|url',
            'is_active' => 'sometimes|boolean',
        ]);

        // Handle cascading deactivation
        $wasActive = $organization->is_active;
        $organization->update($request->all());
        
        // If organization was deactivated, deactivate all its users
        if ($wasActive && !$organization->is_active) {
            $organization->users()->update(['is_active' => false]);
            $message = 'Organization deactivated. All users in this organization have been automatically deactivated.';
        }
        // If organization was reactivated, optionally reactivate users (or leave them for manual activation)
        elseif (!$wasActive && $organization->is_active) {
            $message = 'Organization activated. You can now manually activate individual users as needed.';
        } else {
            $message = 'Organization updated successfully.';
        }

        return response()->json([
            'organization' => $organization,
            'message' => $message
        ]);
    }

    public function createOrgAdmin(Request $request, Organization $organization)
    {
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Super admin access required'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'org_admin',
            'organization_id' => $organization->id,
        ]);

        return response()->json([
            'message' => 'Organization admin created successfully',
            'user' => $user->load('organization')
        ], 201);
    }

    public function getOrganizationUsers(Organization $organization)
    {
        $user = auth()->user();
        
        if (!$user->isSuperAdmin() && $user->organization_id !== $organization->id) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $users = $organization->users()->get();
        
        return response()->json($users);
    }

    public function createUser(Request $request, Organization $organization)
    {
        $user = auth()->user();
        
        if (!$user->canManageOrganization() || ($user->isOrgAdmin() && $user->organization_id !== $organization->id)) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,contributor,user',
        ]);

        $newUser = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'organization_id' => $organization->id,
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $newUser->load('organization')
        ], 201);
    }

    public function toggleUserStatus(Request $request, $userId)
    {
        $user = auth()->user();
        $targetUser = User::findOrFail($userId);
        
        // Check if current user can manage this user
        if (!$user->canManageOrganization() || 
            ($user->isOrgAdmin() && $targetUser->organization_id !== $user->organization_id)) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        // Prevent org admins from deactivating themselves or other org admins
        if ($targetUser->role === 'org_admin' && !$user->isSuperAdmin()) {
            return response()->json(['message' => 'Cannot modify organization admin status'], 403);
        }

        $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $targetUser->update([
            'is_active' => $request->is_active
        ]);

        return response()->json([
            'message' => 'User status updated successfully',
            'user' => $targetUser
        ]);
    }
}
