<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/user/profile', [UserController::class, 'updateProfile']);

    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('tasks', TaskController::class);
    Route::apiResource('users', UserController::class);
    Route::apiResource('categories', CategoryController::class);

    Route::get('/users/{user}/tasks', [UserController::class, 'tasks']);

    Route::apiResource('tasks.comments', CommentController::class)->shallow();
    Route::apiResource('events', App\Http\Controllers\Api\EventController::class);

    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/calendar/events', [DashboardController::class, 'calendarEvents']);
});
