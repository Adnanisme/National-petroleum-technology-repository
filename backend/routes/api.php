<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\OrganizationController;
use App\Http\Controllers\Api\AcademicController;
use App\Http\Controllers\Api\TraineeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Documents - public viewing
Route::get('/documents', [DocumentController::class, 'index']);
Route::get('/documents/{document}', [DocumentController::class, 'show']);
Route::get('/documents/{document}/download', [DocumentController::class, 'download']);

// Categories - public endpoint
Route::get('/categories', function () {
    return response()->json([
        'Computing',
        'Engineering',
        'Management',
        'GeoSciences',
        'Environmental'
    ]);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    
    // Document management
    Route::post('/documents', [DocumentController::class, 'store']);
    Route::get('/documents/{document}/preview', [DocumentController::class, 'preview']);
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy']);
    
    // Organization management
    Route::get('/organizations', [OrganizationController::class, 'index']);
    Route::get('/organizations/{organization}', [OrganizationController::class, 'show']);
    Route::patch('/organizations/{organization}', [OrganizationController::class, 'update']);
    Route::get('/organizations/{organization}/users', [OrganizationController::class, 'getOrganizationUsers']);
    Route::post('/organizations/{organization}/users', [OrganizationController::class, 'createUser']);
    
    // User management
    Route::patch('/users/{user}/toggle-status', [OrganizationController::class, 'toggleUserStatus']);
    
    // Super Admin only routes
    Route::middleware('super_admin')->group(function () {
        Route::post('/organizations', [OrganizationController::class, 'store']);
        Route::post('/organizations/{organization}/admin', [OrganizationController::class, 'createOrgAdmin']);
        
        // Academic management
        Route::get('/academics', [AcademicController::class, 'index']);
        Route::post('/academics', [AcademicController::class, 'store']);
        Route::get('/academics/{academic}', [AcademicController::class, 'show']);
        Route::patch('/academics/{academic}', [AcademicController::class, 'update']);
        Route::patch('/academics/{academic}/toggle-status', [AcademicController::class, 'toggleStatus']);
        Route::delete('/academics/{academic}', [AcademicController::class, 'destroy']);
    });
    
    // Trainee routes
    Route::apiResource('trainees', TraineeController::class);
    Route::get('/trainees/{trainee}/download-cv', [TraineeController::class, 'downloadCv']);
    
    // Admin and Academic routes
    Route::middleware('admin')->group(function () {
        Route::get('/admin/documents/pending', [DocumentController::class, 'pending']);
        Route::patch('/admin/documents/{document}/approve', [DocumentController::class, 'approve']);
        Route::patch('/admin/documents/{document}/reject', [DocumentController::class, 'reject']);
    });
});