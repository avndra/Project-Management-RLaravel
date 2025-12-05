<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Web Development',
            'description' => 'Projects related to website and web application development.',
        ]);

        Category::create([
            'name' => 'Mobile Development',
            'description' => 'Projects focused on mobile application development.',
        ]);

        Category::create([
            'name' => 'UI/UX Design',
            'description' => 'Projects involving user interface and user experience design.',
        ]);
    }
}
