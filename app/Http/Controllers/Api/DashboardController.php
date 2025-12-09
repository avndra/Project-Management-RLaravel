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
            $totalTasks = Task::count();
            $inProgressTasks = Task::where('status', 'inprogress')->count();
            $overdueTasks = Task::where('due_date', '<', now())->where('status', '!=', 'done')->count();
            $completedTasksThisMonth = Task::where('status', 'done')->whereMonth('updated_at', now()->month)->count();
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
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([]);
            }

            // Fetch Tasks - use empty collection for new users without tasks
            $isAdmin = method_exists($user, 'isAdmin') && $user->isAdmin();

            if ($isAdmin) {
                $tasks = Task::with('project')->get();
            } else {
                // For staff/new users, get assigned tasks or empty collection
                $tasks = $user->assignedTasks()->with('project')->get() ?? collect([]);
            }

            $taskEvents = $tasks->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'date' => $task->due_date ? $task->due_date->format('Y-m-d') : null,
                    'type' => 'task',
                    'description' => $task->project ? $task->project->name : 'Task',
                ];
            })->filter(function ($task) {
                return $task['date'] !== null;
            })->values();

            // Fetch Events (Meetings) - all meetings visible to everyone
            $events = \App\Models\Event::with('participants')->get();

            $meetingEvents = [];
            foreach ($events as $event) {
                $participantList = [];
                if ($event->participants && $event->participants->count() > 0) {
                    foreach ($event->participants as $participant) {
                        $participantList[] = [
                            'id' => $participant->id,
                            'name' => $participant->name,
                            'email' => $participant->email,
                        ];
                    }
                }

                $meetingEvents[] = [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->start_time ? $event->start_time->format('Y-m-d') : null,
                    'start_time' => $event->start_time ? $event->start_time->format('H:i') : null,
                    'end_time' => $event->end_time ? $event->end_time->format('H:i') : null,
                    'type' => 'event',
                    'description' => $event->description ?? 'Meeting',
                    'participants' => $participantList,
                ];
            }

            // Merge tasks and meetings
            $allEvents = array_merge($taskEvents->toArray(), $meetingEvents);

            return response()->json(array_values($allEvents));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Calendar Error: ' . $e->getMessage() . ' at ' . $e->getFile() . ':' . $e->getLine());
            return response()->json(['error' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()], 500);
        }
    }
}
