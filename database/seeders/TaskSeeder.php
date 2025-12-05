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
        $category = \App\Models\Category::first();

        if (!$project || !$staffUser || !$adminUser || !$category) {
            return;
        }

        $task = \App\Models\Task::create([
            'project_id' => $project->id,
            'title' => 'Test Task',
            'description' => 'This is a test task.',
            'status' => 'todo',
            'priority' => 'medium',
            'due_date' => now()->addDays(15),
            'reporter_id' => $adminUser->id,
            'category_id' => $category->id,
        ]);

        $task->assignees()->attach($staffUser->id);
    }
}
