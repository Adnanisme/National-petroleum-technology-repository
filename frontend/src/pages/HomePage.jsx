import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  LibraryBig,
  Database,
  Lightbulb,
  Building2,
  Globe2,
  ArrowRight,
  Download,
  FileText,
  Users2,
  ShieldCheck,
  BookOpen,
  Award,
  Cpu,
  Leaf,
  Settings,
  Beaker,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import { documents } from '../lib/api';
import { dummyDocuments, formatFileSize, getCategoryColor } from '../data/dummyDocuments';

const features = [
  {
    icon: <LibraryBig className="h-6 w-6" />,
    title: "Digital Research Archive",
    desc: "Unified library of theses, technical papers, patents, and training reports.",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Petroleum Data Bank",
    desc: "Geological, seismic, and production datasets with tiered access controls.",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Innovation Hub",
    desc: "Showcase prototypes, IP, and commercialization opportunities from Nigerian innovators.",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Policy & Analytics",
    desc: "Interactive dashboards enabling evidence-based policy and strategy.",
  },
  {
    icon: <Users2 className="h-6 w-6" />,
    title: "Academia–Industry Bridge",
    desc: "Connect researchers to operators for funded pilots and tech transfer.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Secure & Sovereign",
    desc: "National data governance, encryption at rest, role-based permissions.",
  },
];

const statItems = [
  { label: "Research Items", value: "128,940+" },
  { label: "Partner Institutions", value: "72" },
  { label: "Commercialized IP", value: "41" },
  { label: "Active Users", value: "38k" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, isContributor } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredDocs, setFeaturedDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured documents for homepage
  useEffect(() => {
    fetchFeaturedDocuments();
  }, []);

  const fetchFeaturedDocuments = async () => {
    try {
      const response = await documents.getAll();
      // If database has documents, use them; otherwise use dummy data
      if (response.data.data && response.data.data.length > 0) {
        setFeaturedDocs(response.data.data.slice(0, 3));
      } else {
        // Use first 3 dummy documents
        setFeaturedDocs(dummyDocuments.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching featured documents:', error);
      // Fallback to dummy data on error
      setFeaturedDocs(dummyDocuments.slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to repository with search query
      navigate(`/repository?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/repository');
    }
  };

  const handleSubmitResearch = () => {
    if (isAuthenticated) {
      if (isContributor()) {
        // If user is already a contributor, go to upload
        navigate('/upload');
      } else {
        // If user is authenticated but not contributor, show message or redirect to request contributor access
        alert('You need contributor access to submit research. Please contact the administrator.');
      }
    } else {
      // If not authenticated, redirect to signup
      navigate('/signup');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-transparent" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[1100px] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-emerald-400 to-blue-600" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                National Petroleum Technology Repository
              </h1>
              <p className="mt-4 text-base md:text-lg text-slate-600 max-w-prose">
                Nigeria's central knowledge hub for petroleum technology,
                research, and innovation— preserving institutional memory,
                accelerating local content, and powering evidence‑based policy.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700" asChild>
                  <Link to="/repository">
                    <Search className="mr-2 h-4 w-4" /> Explore Repository
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-2xl"
                  onClick={handleSubmitResearch}
                >
                  <ArrowRight className="mr-2 h-4 w-4" /> Submit Research
                </Button>
              </div>

              {/* Functional Search Bar */}
              <div className="mt-8">
                <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-2xl border bg-white p-2 shadow-sm">
                  <Search className="h-5 w-5 text-slate-500 ml-1" />
                  <input
                    placeholder="Search by title, author, keyword…"
                    className="w-full bg-transparent outline-none py-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" className="rounded-xl bg-slate-900 hover:bg-slate-800">
                    Search
                  </Button>
                </form>
                <p className="text-xs text-slate-500 mt-2">
                  Try: "enhanced oil recovery", "niger delta", "petroleum engineering"
                </p>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-3xl border bg-white shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
                  <p className="text-sm uppercase tracking-widest/relaxed text-emerald-300">
                    Policy Dashboard
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    Energy Transition Readiness
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {statItems.map((s) => (
                      <div key={s.label} className="rounded-xl bg-white/5 p-4">
                        <p className="text-xs text-slate-300">{s.label}</p>
                        <p className="text-xl font-bold mt-1">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 grid sm:grid-cols-3 gap-4">
                  {loading ? (
                    // Loading placeholders
                    Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="rounded-2xl border-slate-200">
                        <CardHeader className="pb-2">
                          <div className="animate-pulse">
                            <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                            <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))
                  ) : (
                    // Real documents from database
                    featuredDocs.map((doc) => (
                      <Card key={doc.id} className="rounded-2xl border-slate-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-semibold leading-snug">
                            {doc.title.length > 50 ? `${doc.title.substring(0, 50)}...` : doc.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 text-xs text-slate-500">
                          {doc.category} • By: {doc.uploader?.name || 'Unknown'}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 hidden md:block">
                <div className="rounded-2xl border bg-white shadow-lg p-4 w-64">
                  <p className="text-xs text-slate-500">Quick Action</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-medium">PTDF Grant Template</p>
                    <Button size="sm" className="h-8 rounded-xl">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card
                key={f.title}
                className="rounded-3xl shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      {f.icon}
                    </div>
                    <CardTitle className="text-base md:text-lg">
                      {f.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 -mt-2">
                  {f.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Repository Preview */}
      <section id="repo" className="py-12 md:py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Knowledge Repository
              </h2>
              <p className="text-slate-600 mt-1">
                Discover theses, research papers, and technical reports from Nigeria's leading institutions.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-2xl border-emerald-600 text-emerald-700 hover:bg-emerald-50"
              asChild
            >
              <Link to="/repository">
                <BookOpen className="h-4 w-4 mr-2" />
                View All
              </Link>
            </Button>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm">
                    <div className="animate-pulse">
                      <div className="h-6 bg-slate-200 rounded w-full mb-3"></div>
                      <div className="h-4 bg-slate-100 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {featuredDocs.map((doc) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 p-5 transition-all hover:shadow-lg cursor-pointer h-[340px] flex flex-col"
                    onClick={() => navigate('/repository')}
                  >
                    {/* Header with Icon and Category */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br ${getCategoryColor(doc.category)} p-2 flex items-center justify-center`}>
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 flex-1">
                            {doc.title}
                          </h3>
                          <span className={`flex-shrink-0 px-2.5 py-1 bg-gradient-to-r ${getCategoryColor(doc.category)} text-white rounded-full text-[10px] font-semibold`}>
                            {doc.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-shrink-0">
                      {doc.description}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-500 mb-4 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Users2 className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{doc.author || doc.uploader?.name}</span>
                      </div>
                      {doc.institution && (
                        <div className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">{doc.institution}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{doc.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{doc.year || new Date(doc.created_at).getFullYear()}</span>
                      </div>
                    </div>

                    {/* Keywords */}
                    {doc.keywords && (
                      <div className="flex flex-wrap gap-1.5 mb-4 flex-shrink-0">
                        {doc.keywords.slice(0, 3).map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons - Push to bottom */}
                    <div className="flex items-center gap-2 mt-auto">
                      <Button
                        size="sm"
                        className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 h-9"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/repository`);
                        }}
                      >
                        <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-xl h-9 border-slate-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Download: ${doc.title}`);
                        }}
                      >
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        Download
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Innovation Hub */}
      <section id="innovation" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Innovation Hub</h2>
              <p className="text-slate-600 mt-1">
                Prototypes, patents, and commercialization-ready technologies.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={handleSubmitResearch}
            >
              Showcase your work
            </Button>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "AI-Powered Reservoir Optimization",
                desc: "Machine learning algorithms achieving 94% accuracy in production forecasting.",
                trl: "TRL 7",
                status: "Pilot Testing",
                gradient: "from-blue-600 to-cyan-500",
                category: "Digital Technology"
              },
              {
                title: "Biodegradable Drilling Fluids",
                desc: "Eco-friendly drilling mud reducing environmental impact by 85%.",
                trl: "TRL 8",
                status: "Commercial Ready",
                gradient: "from-green-600 to-emerald-500",
                category: "Environmental"
              },
              {
                title: "Smart Pipeline Monitoring",
                desc: "IoT corrosion detection with 95% accuracy preventing failures.",
                trl: "TRL 9",
                status: "Deployed",
                gradient: "from-purple-600 to-violet-500",
                category: "Infrastructure"
              },
              {
                title: "Modular Offshore Platform",
                desc: "Compact gas processing reducing costs by 60% for marginal fields.",
                trl: "TRL 8",
                status: "Ready",
                gradient: "from-orange-600 to-amber-500",
                category: "Engineering"
              },
              {
                title: "CO2 Capture System",
                desc: "Flare gas conversion with 90% capture efficiency and positive ROI.",
                trl: "TRL 7",
                status: "Pilot Phase",
                gradient: "from-teal-600 to-cyan-500",
                category: "Environmental"
              },
              {
                title: "Indigenous Downhole Sensors",
                desc: "Locally made sensors with 99.2% accuracy, reducing imports by 70%.",
                trl: "TRL 6",
                status: "Development",
                gradient: "from-indigo-600 to-blue-500",
                category: "Research"
              }
            ].map((project, i) => (
              <div
                key={i}
                className="group rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/innovation')}
              >
                <div className={`relative h-44 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />

                  {/* Geometric Pattern Overlays - Much More Visible */}
                  {project.category === "Digital Technology" && (
                    <>
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 22px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 22px)'
                      }} />
                      <Cpu className="absolute bottom-4 right-4 h-20 w-20 text-white/15 transform rotate-12" />
                    </>
                  )}

                  {project.category === "Environmental" && (
                    <>
                      <div className="absolute inset-0 opacity-25">
                        <div className="absolute top-8 left-8 w-16 h-16 rounded-full border-4 border-white/30" />
                        <div className="absolute top-16 right-12 w-12 h-12 rounded-full border-4 border-white/20" />
                        <div className="absolute bottom-8 left-1/3 w-20 h-20 rounded-full border-4 border-white/25" />
                      </div>
                      <Leaf className="absolute bottom-4 right-4 h-20 w-20 text-white/15 transform -rotate-12" />
                    </>
                  )}

                  {project.category === "Infrastructure" && (
                    <>
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 25px, rgba(255,255,255,0.3) 25px, rgba(255,255,255,0.3) 27px)'
                      }} />
                      <Building2 className="absolute bottom-4 right-4 h-20 w-20 text-white/15" />
                    </>
                  )}

                  {project.category === "Engineering" && (
                    <>
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.25) 30px, rgba(255,255,255,0.25) 32px), repeating-linear-gradient(60deg, transparent, transparent 30px, rgba(255,255,255,0.25) 30px, rgba(255,255,255,0.25) 32px), repeating-linear-gradient(-60deg, transparent, transparent 30px, rgba(255,255,255,0.25) 30px, rgba(255,255,255,0.25) 32px)'
                      }} />
                      <Settings className="absolute bottom-4 right-4 h-20 w-20 text-white/15 animate-[spin_20s_linear_infinite]" />
                    </>
                  )}

                  {project.category === "Research" && (
                    <>
                      <div className="absolute inset-0 opacity-25" style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
                        backgroundSize: '25px 25px'
                      }} />
                      <Beaker className="absolute bottom-4 right-4 h-20 w-20 text-white/15" />
                    </>
                  )}

                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all" />

                  {/* Glowing orbs */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-xl" />

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-900">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-bold text-base mb-2 text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {project.title}
                  </p>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {project.desc}
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      {project.trl}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Bank & Policy */}
      <section
        id="databank"
        className="py-12 md:py-20 bg-gradient-to-b from-slate-100 to-slate-50 border-t"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6 items-stretch">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" /> Petroleum Data Bank
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Secure, role-based access to seismic, geological, and production
              datasets. Integrates with operators via APIs and supports
              controlled data rooms for JV projects.
              <div className="mt-4 flex gap-3">
                <Button className="rounded-2xl" asChild>
                  <Link to="/databank">Request Access</Link>
                </Button>
                <Button variant="outline" className="rounded-2xl" asChild>
                  <Link to="/databank">View Sample Dataset</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card id="policy" className="rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" /> Policy & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Interactive dashboards to support regulators and policymakers with
              evidence-based insights—R&D outputs, commercialization pipeline,
              and transition metrics.
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {statItems.map((s) => (
                  <div key={s.label} className="rounded-2xl border p-3">
                    <p className="text-xl font-bold">{s.value}</p>
                    <p className="text-[11px] text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

    </>
  );
}