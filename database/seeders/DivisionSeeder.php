<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Project::truncate();
        Schema::enableForeignKeyConstraints();

        $admin = User::where('role', 'admin')->first();
        $adminId = $admin ? $admin->id : 1;

        $divisions = [
            [
                'name' => 'Tim Quality Assurance (QA)',
                'description' => 'Divisi pengujian dan kontrol kualitas software.',
            ],
            [
                'name' => 'Tim UI/UX Design',
                'description' => 'Divisi desain antarmuka dan pengalaman pengguna.',
            ],
            [
                'name' => 'Tim Frontend (FE)',
                'description' => 'Divisi pengembangan antarmuka pengguna (React/Web).',
            ],
            [
                'name' => 'Tim Backend (BE)',
                'description' => 'Divisi pengembangan server dan API.',
            ],
        ];

        foreach ($divisions as $div) {
            Project::create([
                'name' => $div['name'],
                'description' => $div['description'],
                'owner_id' => $adminId,
            ]);
        }
    }
}
