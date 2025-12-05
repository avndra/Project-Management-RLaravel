<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TaskController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TaskResource::collection(Task::with(['project', 'assignees'])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'project_id' => 'required|exists:projects,id',
            'priority' => 'required|string|in:low,medium,high',
            'due_date' => 'required|date',
            'assignee_ids' => 'required|array',
            'assignee_ids.*' => 'exists:users,id',
        ]);

        $task = new Task($validatedData);
        $task->reporter_id = Auth::id();
        $task->save();

        $task->assignees()->attach($validatedData['assignee_ids']);

        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $this->authorize('view', $task);
        return new TaskResource($task->load(['project', 'assignees', 'comments.user']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $user = Auth::user();

        // Staff can only update the status
        if ($user->isStaff()) {
            $allowedKeys = ['status'];
            $requestKeys = array_keys($request->all());

            if (count(array_diff($requestKeys, $allowedKeys)) > 0) {
                abort(403, 'You are only allowed to update the task status.');
            }
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'project_id' => 'sometimes|exists:projects,id',
            'priority' => 'sometimes|string|in:low,medium,high',
            'due_date' => 'sometimes|date',
            'status' => 'sometimes|string|in:todo,inprogress,done',
            'assignee_ids' => 'sometimes|array',
            'assignee_ids.*' => 'exists:users,id',
        ]);

        $task->update($validatedData);

        if ($request->has('assignee_ids') && $user->isAdmin()) {
            $task->assignees()->sync($validatedData['assignee_ids']);
        }

        return new TaskResource($task->load(['project', 'assignees', 'comments.user']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
