<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', UserRole::ADMIN)->first();

        if ($admin) {
            Project::create([
                'name' => 'FrontEnd',
                'description' => 'Design Programming',
                'owner_id' => $admin->id,
            ]);

            Project::create([
                'name' => 'BackEnd',
                'description' => 'Dev',
                'owner_id' => $admin->id,
            ]);

            Project::create([
                'name' => 'UI/UX',
                'description' => 'Design Figma',
                'owner_id' => $admin->id,
            ]);

            Project::create([
                'name' => 'Mobile App',
                'description' => 'DevOps',
                'owner_id' => $admin->id,
            ]);

            Project::create([
                'name' => 'QA',
                'description' => 'Testing',
                'owner_id' => $admin->id,
            ]);

        }
    }
}
