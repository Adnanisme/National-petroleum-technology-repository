<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the route is for document approval/review (allow academics)
        $routeName = $request->route()->getName() ?? '';
        $isDocumentRoute = str_contains($request->path(), 'documents') && 
                          (str_contains($request->path(), 'approve') || 
                           str_contains($request->path(), 'reject') || 
                           str_contains($request->path(), 'pending'));
        
        if ($isDocumentRoute) {
            // For document-related routes, allow admins and academics
            if (!auth()->check() || !auth()->user()->canApproveDocuments()) {
                return response()->json(['message' => 'Admin or Academic access required'], 403);
            }
        } else {
            // For other admin routes, only allow admins
            if (!auth()->check() || !auth()->user()->canManageUsers()) {
                return response()->json(['message' => 'Admin access required'], 403);
            }
        }

        return $next($request);
    }
}
