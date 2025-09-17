<?php

namespace Database\Seeders;

use App\Models\Document;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $documents = [
            [
                'title' => 'Enhanced Oil Recovery Techniques in Nigerian Oil Fields',
                'description' => 'A comprehensive study on enhanced oil recovery methods applied to Nigerian petroleum reservoirs, focusing on steam injection and chemical flooding techniques.',
                'category' => 'Petroleum Engineering',
                'file_name' => 'dummy_eor_techniques.pdf',
                'file_path' => 'documents/dummy_eor_techniques.pdf',
                'file_type' => 'pdf',
                'file_size' => 2048000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Geophysical Analysis of the Niger Delta Basin',
                'description' => 'Seismic interpretation and structural analysis of hydrocarbon prospects in the Niger Delta region using advanced geophysical techniques.',
                'category' => 'Geophysics',
                'file_name' => 'dummy_niger_delta_analysis.pdf',
                'file_path' => 'documents/dummy_niger_delta_analysis.pdf',
                'file_type' => 'pdf',
                'file_size' => 3456000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Environmental Impact Assessment of Offshore Drilling',
                'description' => 'Assessment of environmental impacts and mitigation strategies for offshore petroleum exploration activities in Nigerian waters.',
                'category' => 'Environmental Studies',
                'file_name' => 'dummy_environmental_impact.pdf',
                'file_path' => 'documents/dummy_environmental_impact.pdf',
                'file_type' => 'pdf',
                'file_size' => 1789000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Natural Gas Processing and Utilization in Nigeria',
                'description' => 'Technical review of natural gas processing facilities and utilization strategies to reduce gas flaring in Nigerian oil operations.',
                'category' => 'Natural Gas',
                'file_name' => 'dummy_gas_processing.pdf',
                'file_path' => 'documents/dummy_gas_processing.pdf',
                'file_type' => 'pdf',
                'file_size' => 2567000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Reservoir Simulation Models for Deepwater Fields',
                'description' => 'Development and validation of reservoir simulation models for deepwater petroleum fields in the Nigerian continental shelf.',
                'category' => 'Reservoir Engineering',
                'file_name' => 'dummy_reservoir_simulation.pdf',
                'file_path' => 'documents/dummy_reservoir_simulation.pdf',
                'file_type' => 'pdf',
                'file_size' => 4123000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Digital Transformation in Nigerian Oil Industry',
                'description' => 'Analysis of digital technologies and their potential impact on operational efficiency in Nigerian petroleum operations.',
                'category' => 'Technology',
                'file_name' => 'dummy_digital_transformation.pdf',
                'file_path' => 'documents/dummy_digital_transformation.pdf',
                'file_type' => 'pdf',
                'file_size' => 1923000,
                'status' => 'pending',
                'uploaded_by' => 2
            ]
        ];

        foreach ($documents as $document) {
            Document::create($document);
        }
    }
}
