<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $project = \App\Models\Project::first();
        $staffUser = \App\Models\User::where('role', 'staff')->first();
        $adminUser = \App\Models\User::where('role', 'admin')->first();

        if (!$project || !$staffUser || !$adminUser) {
            return;
        }

        $task = \App\Models\Task::create([
            'project_id' => $project->id,
            'title' => 'Test Task',
            'description' => 'testing task.',
            'status' => 'todo',
            'priority' => 'medium',
            'due_date' => now()->addDays(15),
            'reporter_id' => $adminUser->id,
        ]);

        $task->assignees()->attach($staffUser->id);
    }
}
