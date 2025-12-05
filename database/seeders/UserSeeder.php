<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks to allow truncation
        Schema::disableForeignKeyConstraints();
        User::truncate();
        Schema::enableForeignKeyConstraints();

        // Admin User
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@orxus.com',
            'password' => Hash::make('password'),
            'role' => UserRole::ADMIN,
        ]);

        // Staff Users
        $staffs = [
            ['name' => 'Budi Santoso', 'email' => 'budi@orxus.com'],
            ['name' => 'Siti Aminah', 'email' => 'siti@orxus.com'],
            ['name' => 'Rudi Hartono', 'email' => 'rudi@orxus.com'],
        ];

        foreach ($staffs as $staff) {
            User::create([
                'name' => $staff['name'],
                'email' => $staff['email'],
                'password' => Hash::make('password'),
                'role' => UserRole::STAFF,
            ]);
        }
    }
}
