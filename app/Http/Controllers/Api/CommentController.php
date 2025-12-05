<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CommentController extends Controller
{
    use AuthorizesRequests;
    public function store(Request $request, Task $task)
    {
        $this->authorize('view', $task);

        $validatedData = $request->validate([
            'body' => 'required|string',
        ]);

        $comment = $task->comments()->create([
            'body' => $validatedData['body'],
            'user_id' => Auth::id(),
        ]);

        return new CommentResource($comment->load('user'));
    }
}