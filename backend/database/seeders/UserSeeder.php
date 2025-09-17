<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin (PTDF)
        User::updateOrCreate(
            ['email' => 'superadmin@ptdf.gov.ng'],
            [
                'name' => 'PTDF Super Admin',
                'password' => Hash::make('password123'),
                'role' => 'super_admin',
                'is_active' => true,
            ]
        );

        // Create Admin user
        User::updateOrCreate(
            ['email' => 'admin@nptr.ng'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'is_active' => true,
            ]
        );

        // Create contributor
        User::updateOrCreate(
            ['email' => 'researcher@nptr.ng'],
            [
                'name' => 'Dr. John Researcher',
                'password' => Hash::make('password123'),
                'role' => 'contributor',
                'is_active' => true,
            ]
        );

        // Create regular user
        User::updateOrCreate(
            ['email' => 'student@nptr.ng'],
            [
                'name' => 'Student User',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'is_active' => true,
            ]
        );

        // Create additional test users for testing
        User::updateOrCreate(
            ['email' => 'test@test.com'],
            [
                'name' => 'Test Contributor',
                'password' => Hash::make('password123'),
                'role' => 'contributor',
                'is_active' => true,
            ]
        );
    }
}
