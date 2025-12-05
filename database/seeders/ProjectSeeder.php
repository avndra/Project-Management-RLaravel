<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use App\Models\Category;
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
        $categories = Category::all();

        if ($admin && $categories->count() >= 3) {
            Project::create([
                'name' => 'Orxus PM Dashboard',
                'description' => 'Develop the main dashboard for Orxus Project Management.',
                'admin_id' => $admin->id,
                'category_id' => $categories[0]->id,
            ]);

            Project::create([
                'name' => 'Mobile App Integration',
                'description' => 'Integrate the Orxus PM with a mobile application.',
                'admin_id' => $admin->id,
                'category_id' => $categories[1]->id,
            ]);

            Project::create([
                'name' => 'Website Redesign',
                'description' => 'Redesign the official Orxus PM website for better user experience.',
                'admin_id' => $admin->id,
                'category_id' => $categories[2]->id,
            ]);
        }
    }
}
