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
            // Engineering Documents
            [
                'title' => 'Enhanced Oil Recovery Techniques in Nigerian Oil Fields',
                'description' => 'A comprehensive study on enhanced oil recovery methods applied to Nigerian petroleum reservoirs, focusing on steam injection and chemical flooding techniques.',
                'category' => 'Engineering',
                'author' => 'Dr. Chukwuma Okonkwo',
                'institution' => 'University of Lagos',
                'type' => 'Publication',
                'year' => 2024,
                'keywords' => ['Enhanced Oil Recovery', 'Nigerian Petroleum', 'Steam Injection', 'Chemical Flooding'],
                'file_name' => 'dummy_eor_techniques.pdf',
                'file_path' => 'documents/dummy_eor_techniques.pdf',
                'file_type' => 'pdf',
                'file_size' => 2048000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Natural Gas Processing and Utilization in Nigeria',
                'description' => 'Technical review of natural gas processing facilities and utilization strategies to reduce gas flaring in Nigerian oil operations.',
                'category' => 'Engineering',
                'author' => 'Prof. Aisha Bello',
                'institution' => 'Ahmadu Bello University',
                'type' => 'Report',
                'year' => 2024,
                'keywords' => ['Natural Gas', 'Gas Processing', 'Gas Flaring', 'Nigeria'],
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
                'category' => 'Engineering',
                'author' => 'Dr. Ibrahim Yusuf',
                'institution' => 'University of Port Harcourt',
                'type' => 'Publication',
                'year' => 2023,
                'keywords' => ['Reservoir Simulation', 'Deepwater', 'Petroleum Engineering', 'Modeling'],
                'file_name' => 'dummy_reservoir_simulation.pdf',
                'file_path' => 'documents/dummy_reservoir_simulation.pdf',
                'file_type' => 'pdf',
                'file_size' => 4123000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],

            // GeoSciences Documents
            [
                'title' => 'Geophysical Analysis of the Niger Delta Basin',
                'description' => 'Seismic interpretation and structural analysis of hydrocarbon prospects in the Niger Delta region using advanced geophysical techniques.',
                'category' => 'GeoSciences',
                'author' => 'Prof. Ngozi Okoro',
                'institution' => 'University of Ibadan',
                'type' => 'Publication',
                'year' => 2024,
                'keywords' => ['Geophysics', 'Niger Delta', 'Seismic Interpretation', 'Hydrocarbon Prospects'],
                'file_name' => 'dummy_niger_delta_analysis.pdf',
                'file_path' => 'documents/dummy_niger_delta_analysis.pdf',
                'file_type' => 'pdf',
                'file_size' => 3456000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Stratigraphic Analysis of Sedimentary Basins in Nigeria',
                'description' => 'Detailed stratigraphic study of major sedimentary basins in Nigeria with focus on petroleum potential and depositional environments.',
                'category' => 'GeoSciences',
                'author' => 'Dr. Folake Adeyemi',
                'institution' => 'Federal University of Technology, Akure',
                'type' => 'Dataset',
                'year' => 2023,
                'keywords' => ['Stratigraphy', 'Sedimentary Basins', 'Petroleum Geology', 'Nigeria'],
                'file_name' => 'dummy_stratigraphic_analysis.pdf',
                'file_path' => 'documents/dummy_stratigraphic_analysis.pdf',
                'file_type' => 'pdf',
                'file_size' => 2890000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Gravity and Magnetic Studies of the Anambra Basin',
                'description' => 'Integrated gravity and magnetic survey data interpretation for hydrocarbon exploration in the Anambra Basin, southeastern Nigeria.',
                'category' => 'GeoSciences',
                'author' => 'Dr. Emeka Nwosu',
                'institution' => 'University of Nigeria, Nsukka',
                'type' => 'Publication',
                'year' => 2025,
                'keywords' => ['Gravity Survey', 'Magnetic Survey', 'Anambra Basin', 'Geophysics'],
                'file_name' => 'dummy_gravity_magnetic.pdf',
                'file_path' => 'documents/dummy_gravity_magnetic.pdf',
                'file_type' => 'pdf',
                'file_size' => 3120000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],

            // Environmental Documents
            [
                'title' => 'Environmental Impact Assessment of Offshore Drilling',
                'description' => 'Assessment of environmental impacts and mitigation strategies for offshore petroleum exploration activities in Nigerian waters.',
                'category' => 'Environmental',
                'author' => 'Dr. Funmi Adebayo',
                'institution' => 'Lagos State University',
                'type' => 'Report',
                'year' => 2024,
                'keywords' => ['Environmental Impact', 'Offshore Drilling', 'Mitigation Strategies', 'Nigerian Waters'],
                'file_name' => 'dummy_environmental_impact.pdf',
                'file_path' => 'documents/dummy_environmental_impact.pdf',
                'file_type' => 'pdf',
                'file_size' => 1789000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Oil Spill Response and Remediation in the Niger Delta',
                'description' => 'Comprehensive study of oil spill incidents in the Niger Delta and effective remediation techniques for contaminated sites.',
                'category' => 'Environmental',
                'author' => 'Prof. Blessing Eze',
                'institution' => 'Rivers State University',
                'type' => 'Publication',
                'year' => 2023,
                'keywords' => ['Oil Spill', 'Remediation', 'Niger Delta', 'Environmental Management'],
                'file_name' => 'dummy_oil_spill_response.pdf',
                'file_path' => 'documents/dummy_oil_spill_response.pdf',
                'file_type' => 'pdf',
                'file_size' => 2345000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Biodiversity Conservation in Oil-Producing Communities',
                'description' => 'Assessment of biodiversity in oil-producing regions and strategies for conservation and sustainable development.',
                'category' => 'Environmental',
                'author' => 'Dr. Tunde Oladele',
                'institution' => 'Obafemi Awolowo University',
                'type' => 'Report',
                'year' => 2024,
                'keywords' => ['Biodiversity', 'Conservation', 'Sustainability', 'Oil Production'],
                'file_name' => 'dummy_biodiversity_conservation.pdf',
                'file_path' => 'documents/dummy_biodiversity_conservation.pdf',
                'file_type' => 'pdf',
                'file_size' => 2678000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],

            // Computing Documents
            [
                'title' => 'Digital Transformation in Nigerian Oil Industry',
                'description' => 'Analysis of digital technologies and their potential impact on operational efficiency in Nigerian petroleum operations.',
                'category' => 'Computing',
                'author' => 'Dr. Adewale Johnson',
                'institution' => 'Covenant University',
                'type' => 'Publication',
                'year' => 2024,
                'keywords' => ['Digital Transformation', 'Oil Industry', 'Technology', 'Nigeria'],
                'file_name' => 'dummy_digital_transformation.pdf',
                'file_path' => 'documents/dummy_digital_transformation.pdf',
                'file_type' => 'pdf',
                'file_size' => 1923000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Artificial Intelligence in Petroleum Reservoir Characterization',
                'description' => 'Application of machine learning and AI techniques for improved reservoir characterization and production optimization.',
                'category' => 'Computing',
                'author' => 'Dr. Fatima Hassan',
                'institution' => 'Nigerian Turkish Nile University',
                'type' => 'Dataset',
                'year' => 2025,
                'keywords' => ['Artificial Intelligence', 'Machine Learning', 'Reservoir Characterization', 'Petroleum'],
                'file_name' => 'dummy_ai_reservoir.pdf',
                'file_path' => 'documents/dummy_ai_reservoir.pdf',
                'file_type' => 'pdf',
                'file_size' => 3456000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Cybersecurity in Oil and Gas SCADA Systems',
                'description' => 'Security assessment and recommendations for protecting SCADA systems in Nigerian oil and gas infrastructure.',
                'category' => 'Computing',
                'author' => 'Prof. Chidinma Nwankwo',
                'institution' => 'University of Benin',
                'type' => 'Report',
                'year' => 2024,
                'keywords' => ['Cybersecurity', 'SCADA Systems', 'Oil and Gas', 'Infrastructure'],
                'file_name' => 'dummy_cybersecurity_scada.pdf',
                'file_path' => 'documents/dummy_cybersecurity_scada.pdf',
                'file_type' => 'pdf',
                'file_size' => 2134000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],

            // Management Documents
            [
                'title' => 'Strategic Management of Nigerian National Petroleum Corporation',
                'description' => 'Analysis of strategic management practices and organizational performance of NNPC in the evolving global energy landscape.',
                'category' => 'Management',
                'author' => 'Prof. Olusegun Adebisi',
                'institution' => 'Lagos Business School',
                'type' => 'Policy',
                'year' => 2024,
                'keywords' => ['Strategic Management', 'NNPC', 'Organizational Performance', 'Energy Sector'],
                'file_name' => 'dummy_strategic_management.pdf',
                'file_path' => 'documents/dummy_strategic_management.pdf',
                'file_type' => 'pdf',
                'file_size' => 2890000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Local Content Development in Nigerian Oil and Gas Sector',
                'description' => 'Evaluation of local content policy implementation and its impact on Nigerian participation in the oil and gas industry.',
                'category' => 'Management',
                'author' => 'Dr. Grace Okafor',
                'institution' => 'Pan-Atlantic University',
                'type' => 'Policy',
                'year' => 2023,
                'keywords' => ['Local Content', 'Policy Implementation', 'Oil and Gas', 'Nigeria'],
                'file_name' => 'dummy_local_content.pdf',
                'file_path' => 'documents/dummy_local_content.pdf',
                'file_type' => 'pdf',
                'file_size' => 2456000,
                'status' => 'approved',
                'uploaded_by' => 2
            ],
            [
                'title' => 'Risk Management in Petroleum Project Financing',
                'description' => 'Framework for identifying and managing financial risks in Nigerian petroleum exploration and production projects.',
                'category' => 'Management',
                'author' => 'Dr. Kunle Adeyemi',
                'institution' => 'University of Ibadan Business School',
                'type' => 'Publication',
                'year' => 2025,
                'keywords' => ['Risk Management', 'Project Financing', 'Petroleum', 'Financial Analysis'],
                'file_name' => 'dummy_risk_management.pdf',
                'file_path' => 'documents/dummy_risk_management.pdf',
                'file_type' => 'pdf',
                'file_size' => 2123000,
                'status' => 'approved',
                'uploaded_by' => 2
            ]
        ];

        foreach ($documents as $document) {
            Document::create($document);
        }
    }
}
