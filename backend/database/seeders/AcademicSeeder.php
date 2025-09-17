<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AcademicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $academics = [
            [
                'name' => 'Dr. Sarah Computing',
                'email' => 'sarah.computing@university.edu',
                'specialization' => 'Computing',
                'institution' => 'University of Lagos'
            ],
            [
                'name' => 'Prof. John Engineering', 
                'email' => 'john.engineering@university.edu',
                'specialization' => 'Engineering',
                'institution' => 'Ahmadu Bello University'
            ],
            [
                'name' => 'Dr. Mary Management',
                'email' => 'mary.management@university.edu', 
                'specialization' => 'Management',
                'institution' => 'University of Ibadan'
            ],
            [
                'name' => 'Prof. Ahmed GeoSciences',
                'email' => 'ahmed.geo@university.edu',
                'specialization' => 'GeoSciences', 
                'institution' => 'University of Port Harcourt'
            ],
            [
                'name' => 'Dr. Grace Environmental',
                'email' => 'grace.env@university.edu',
                'specialization' => 'Environmental',
                'institution' => 'Federal University of Technology Akure'
            ]
        ];

        foreach ($academics as $academic) {
            \App\Models\User::create([
                'name' => $academic['name'],
                'email' => $academic['email'],
                'password' => bcrypt('password123'),
                'role' => 'academic',
                'specialization' => $academic['specialization'],
                'institution' => $academic['institution'],
                'is_active' => true
            ]);
        }
    }
}
