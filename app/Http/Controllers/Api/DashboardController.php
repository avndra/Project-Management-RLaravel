<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Enums\TaskStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Task;

class DashboardController extends Controller
{
    public function stats(Request $request)
    {
        $user = Auth::user();

        if ($user->isAdmin()) {
            $totalTasks = \App\Models\Task::count();
            $inProgressTasks = \App\Models\Task::where('status', 'inprogress')->count();
            $overdueTasks = \App\Models\Task::where('due_date', '<', now())->where('status', '!=', 'done')->count();
            $completedTasksThisMonth = \App\Models\Task::where('status', 'done')->whereMonth('updated_at', now()->month)->count();
        } else {
            $totalTasks = $user->assignedTasks()->count();
            $inProgressTasks = $user->assignedTasks()->where('status', 'inprogress')->count();
            $overdueTasks = $user->assignedTasks()->where('due_date', '<', now())->where('status', '!=', 'done')->count();
            $completedTasksThisMonth = $user->assignedTasks()->where('status', 'done')->whereMonth('updated_at', now()->month)->count();
        }

        return response()->json([
            'total_tasks' => $totalTasks,
            'in_progress_tasks' => $inProgressTasks,
            'overdue_tasks' => $overdueTasks,
            'completed_tasks_this_month' => $completedTasksThisMonth,
        ]);
    }

    public function calendarEvents(Request $request)
    {
        $user = Auth::user();

        // Fetch Tasks
        if ($user->isAdmin()) {
            $tasks = Task::all();
        } else {
            $tasks = $user->assignedTasks;
        }

        $taskEvents = $tasks->map(function ($task) {
            return [
                'id' => $task->id,
                'title' => $task->title,
                'date' => $task->due_date->format('Y-m-d'),
                'type' => 'task',
                'description' => $task->project ? $task->project->name : 'Task',
            ];
        });

        // Fetch Events (Meetings)
        $events = \App\Models\Event::with('participants')->get(); // For now, everyone sees all events/meetings

        $meetingEvents = $events->map(function ($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'date' => $event->start_time->format('Y-m-d'),
                'start_time' => $event->start_time->format('H:i'),
                'end_time' => $event->end_time->format('H:i'),
                'type' => 'event',
                'description' => $event->description ?? 'Meeting',
                'participants' => $event->participants->map(function ($participant) {
                    return [
                        'id' => $participant->id,
                        'name' => $participant->name,
                        'email' => $participant->email,
                    ];
                }),
            ];
        });

        return response()->json($taskEvents->merge($meetingEvents));
    }
}
