<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create PTDF organization
        $ptdf = Organization::create([
            'name' => 'Petroleum Technology Development Fund',
            'short_name' => 'PTDF',
            'type' => 'government',
            'description' => 'Nigeria\'s premier petroleum technology development agency',
            'contact_email' => 'info@ptdf.gov.ng',
            'website' => 'https://ptdf.gov.ng',
            'is_active' => true,
        ]);

        // Create major oil companies
        $shell = Organization::create([
            'name' => 'Shell Petroleum Development Company of Nigeria Limited',
            'short_name' => 'SPDC',
            'type' => 'private',
            'description' => 'Leading oil and gas exploration and production company in Nigeria',
            'contact_email' => 'info@shell.com.ng',
            'website' => 'https://shell.com.ng',
            'is_active' => true,
        ]);

        $chevron = Organization::create([
            'name' => 'Chevron Nigeria Limited',
            'short_name' => 'CNL',
            'type' => 'private',
            'description' => 'International oil and gas company operating in Nigeria',
            'contact_email' => 'info@chevron.com.ng',
            'website' => 'https://chevron.com.ng',
            'is_active' => true,
        ]);

        $nnpc = Organization::create([
            'name' => 'Nigerian National Petroleum Corporation',
            'short_name' => 'NNPC',
            'type' => 'government',
            'description' => 'Nigeria\'s state-owned oil corporation',
            'contact_email' => 'info@nnpc.gov.ng',
            'website' => 'https://nnpc.gov.ng',
            'is_active' => true,
        ]);

        // Create universities
        $unilag = Organization::create([
            'name' => 'University of Lagos',
            'short_name' => 'UNILAG',
            'type' => 'academic',
            'description' => 'Premier university with petroleum engineering programs',
            'contact_email' => 'info@unilag.edu.ng',
            'website' => 'https://unilag.edu.ng',
            'is_active' => true,
        ]);

        $abu = Organization::create([
            'name' => 'Ahmadu Bello University',
            'short_name' => 'ABU',
            'type' => 'academic',
            'description' => 'Leading university with geology and petroleum engineering departments',
            'contact_email' => 'info@abu.edu.ng',
            'website' => 'https://abu.edu.ng',
            'is_active' => true,
        ]);

        // Create PTDF Super Admin
        User::create([
            'name' => 'PTDF Super Administrator',
            'email' => 'superadmin@ptdf.gov.ng',
            'password' => Hash::make('SuperAdmin2025!'),
            'role' => 'super_admin',
            'organization_id' => $ptdf->id,
        ]);

        // Create Organization Admins
        User::create([
            'name' => 'Shell Admin',
            'email' => 'admin@shell.com.ng',
            'password' => Hash::make('ShellAdmin2025!'),
            'role' => 'org_admin',
            'organization_id' => $shell->id,
        ]);

        User::create([
            'name' => 'Chevron Admin',
            'email' => 'admin@chevron.com.ng',
            'password' => Hash::make('ChevronAdmin2025!'),
            'role' => 'org_admin',
            'organization_id' => $chevron->id,
        ]);

        User::create([
            'name' => 'NNPC Admin',
            'email' => 'admin@nnpc.gov.ng',
            'password' => Hash::make('NNPCAdmin2025!'),
            'role' => 'org_admin',
            'organization_id' => $nnpc->id,
        ]);
    }
}
