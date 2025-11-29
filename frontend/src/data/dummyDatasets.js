// Dummy datasets for Data Bank page
export const dummyDatasets = [
  {
    id: 'ds1',
    title: "Niger Delta Seismic Survey 2020-2024",
    category: "Geophysics",
    size: "2.4 TB",
    format: "SEG-Y, CSV",
    updated: "March 2025",
    access: "Academic License",
    description: "High-resolution 3D seismic data covering 12,000 sq km of Niger Delta basin. Includes pre-stack time migration volumes, velocity models, and interpretation surfaces.",
    records: "24.5M traces",
    coverage: "Niger Delta Basin",
    owner: "NCDMB"
  },
  {
    id: 'ds2',
    title: "Nigerian Oil & Gas Production Data (2015-2025)",
    category: "Production",
    size: "186 MB",
    format: "CSV, JSON, Excel",
    updated: "January 2025",
    access: "Public",
    description: "Monthly production figures for all active fields, including crude oil, condensate, and natural gas volumes. Segmented by operator, field, and basin.",
    records: "145,000 entries",
    coverage: "All Nigerian basins",
    owner: "NNPC Ltd"
  },
  {
    id: 'ds3',
    title: "Gas Utilization & Flaring Statistics",
    category: "Environmental",
    size: "92 MB",
    format: "CSV, GeoJSON",
    updated: "December 2024",
    access: "Public",
    description: "Historical gas flaring volumes, utilization rates, and environmental impact metrics. Includes satellite-based flare detection data and regulatory compliance records.",
    records: "58,400 measurements",
    coverage: "Niger Delta, offshore",
    owner: "NUPRC"
  },
  {
    id: 'ds4',
    title: "Reservoir Properties Database - Agbada Formation",
    category: "Reservoir Engineering",
    size: "1.2 GB",
    format: "LAS, CSV, PDF",
    updated: "February 2025",
    access: "Restricted",
    description: "Comprehensive petrophysical database with porosity, permeability, saturation data from 2,400+ wells. Includes core analysis reports and well log suites.",
    records: "2,458 wells",
    coverage: "Agbada Formation",
    owner: "PTDF Research"
  },
  {
    id: 'ds5',
    title: "Offshore Bathymetry & Seafloor Mapping",
    category: "Geophysics",
    size: "3.8 TB",
    format: "GeoTIFF, XYZ, LAS",
    updated: "November 2024",
    access: "Commercial License",
    description: "High-resolution multibeam bathymetry data for Nigerian continental shelf and deep-water areas. Includes subsea infrastructure location data.",
    records: "8.2B soundings",
    coverage: "Continental Shelf, Deep water",
    owner: "NCDMB"
  },
  {
    id: 'ds6',
    title: "Crude Oil Geochemistry Database",
    category: "Geochemistry",
    size: "445 MB",
    format: "Excel, CSV, PDF",
    updated: "January 2025",
    access: "Academic License",
    description: "Biomarker data, API gravity, sulfur content, and trace element analysis for 840 crude oil samples across Nigerian basins. Source rock correlation included.",
    records: "840 samples",
    coverage: "All Nigerian basins",
    owner: "University Consortium"
  },
  {
    id: 'ds7',
    title: "Drilling Performance Metrics 2018-2024",
    category: "Operations",
    size: "628 MB",
    format: "CSV, JSON, Parquet",
    updated: "March 2025",
    access: "Restricted",
    description: "Comprehensive drilling KPIs including ROP, NPT, well costs, and technical incidents. Anonymized data from 650+ wells drilled in Nigerian waters.",
    records: "650 wells, 2.4M hours",
    coverage: "Onshore, Offshore",
    owner: "NCDMB"
  },
  {
    id: 'ds8',
    title: "Environmental Baseline Studies - Niger Delta",
    category: "Environmental",
    size: "1.6 GB",
    format: "PDF, GeoJSON, Excel",
    updated: "October 2024",
    access: "Public",
    description: "Water quality, soil composition, biodiversity surveys, and air quality measurements from Niger Delta region. Includes pre and post-drilling assessments.",
    records: "12,500 sample points",
    coverage: "Niger Delta region",
    owner: "NOSDRA"
  },
  {
    id: 'ds9',
    title: "Well Completion Design Database",
    category: "Completion Engineering",
    size: "890 MB",
    format: "PDF, Excel, CAD",
    updated: "December 2024",
    access: "Restricted",
    description: "Detailed completion schematics, equipment specifications, and performance data for 1,200+ wells. Includes intelligent well systems and subsea completions.",
    records: "1,245 completions",
    coverage: "All Nigerian fields",
    owner: "Operators JV"
  },
  {
    id: 'ds10',
    title: "Pipeline Infrastructure Registry",
    category: "Infrastructure",
    size: "340 MB",
    format: "GIS, KML, CSV",
    updated: "February 2025",
    access: "Restricted",
    description: "Complete inventory of oil and gas pipelines with route coordinates, capacity, material specifications, and integrity inspection records.",
    records: "24,500 km network",
    coverage: "Nigeria-wide",
    owner: "NNPC Ltd"
  },
  {
    id: 'ds11',
    title: "Economic Model - Marginal Fields",
    category: "Economics",
    size: "124 MB",
    format: "Excel, CSV, Python",
    updated: "January 2025",
    access: "Academic License",
    description: "Financial models with NPV calculations, production forecasts, and sensitivity analysis for 45 marginal fields. Includes fiscal regime assumptions.",
    records: "45 field models",
    coverage: "Marginal Fields",
    owner: "PTDF Economics Dept"
  },
  {
    id: 'ds12',
    title: "Seismic Attribute Library",
    category: "Geophysics",
    size: "5.2 TB",
    format: "SEGY, ZGY, Petrel",
    updated: "March 2025",
    access: "Commercial License",
    description: "Pre-computed seismic attributes including coherence, curvature, spectral decomposition, and AVO analysis for major Nigerian prospects.",
    records: "140 surveys",
    coverage: "Niger Delta, Benue Trough",
    owner: "Seismic Consortium"
  }
];

// Helper function to get category icon color
export function getDatasetCategoryColor(category) {
  const colors = {
    "Geophysics": "from-purple-500 to-violet-600",
    "Production": "from-emerald-500 to-teal-600",
    "Environmental": "from-green-500 to-lime-600",
    "Reservoir Engineering": "from-blue-500 to-cyan-600",
    "Geochemistry": "from-orange-500 to-amber-600",
    "Operations": "from-slate-600 to-gray-700",
    "Completion Engineering": "from-indigo-500 to-blue-600",
    "Infrastructure": "from-rose-500 to-pink-600",
    "Economics": "from-teal-500 to-cyan-600"
  };
  return colors[category] || "from-gray-500 to-slate-600";
}

// Access level badge colors
export function getAccessColor(access) {
  const colors = {
    "Public": "bg-green-100 text-green-800",
    "Academic License": "bg-blue-100 text-blue-800",
    "Restricted": "bg-orange-100 text-orange-800",
    "Commercial License": "bg-purple-100 text-purple-800"
  };
  return colors[access] || "bg-gray-100 text-gray-800";
}
