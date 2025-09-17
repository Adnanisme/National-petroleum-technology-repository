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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import { documents } from '../lib/api';

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
      // Get first 3 approved documents for homepage display
      setFeaturedDocs(response.data.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching featured documents:', error);
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
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Explore the Repository
              </h2>
              <p className="text-slate-600 mt-1">
                Discover theses, reports, and patents across Nigeria's oil & gas
                research landscape.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="rounded-2xl"
              asChild
            >
              <Link to="/repository">View all</Link>
            </Button>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="rounded-3xl">
                    <CardHeader>
                      <div className="animate-pulse">
                        <div className="h-6 bg-slate-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="animate-pulse">
                        <div className="h-4 bg-slate-100 rounded w-full mb-2"></div>
                        <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : featuredDocs.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No documents available yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {featuredDocs.map((doc) => (
                  <Card key={doc.id} className="rounded-3xl hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-base md:text-lg leading-snug">
                        {doc.title}
                      </CardTitle>
                      <div className="text-sm text-slate-500">
                        <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs">
                          {doc.category}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {doc.description && (
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                          {doc.description.length > 100 ? `${doc.description.substring(0, 100)}...` : doc.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div>
                          <div>By: {doc.uploader?.name || 'Unknown'}</div>
                          <div>Size: {(doc.file_size / 1024 / 1024).toFixed(1)}MB</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 rounded-xl"
                            onClick={() => alert(doc.description || 'No description available')}
                          >
                            <FileText className="h-4 w-4 mr-1" /> Abstract
                          </Button>
                          <Button 
                            size="sm" 
                            className="h-8 rounded-xl"
                            asChild
                          >
                            <Link to={`/repository?document=${doc.id}`}>
                              <Download className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/innovation')}
              >
                <div className="h-40 bg-gradient-to-br from-emerald-500/70 to-blue-700/70" />
                <div className="p-4">
                  <p className="font-medium">
                    Indigenous Tooling Prototype #{i + 1}
                  </p>
                  <p className="text-sm text-slate-600">
                    Short blurb about the technology, TRL, and desired partners.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-900">
                      TRL 6
                    </span>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-blue-100 text-blue-900">
                      Patent‑pending
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

      {/* Footer */}
      <footer id="about" className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-700" />
              <p className="font-semibold">NPTR</p>
            </div>
            <p className="text-sm text-slate-600 mt-3 max-w-xs">
              A strategic initiative of PTDF to preserve knowledge, catalyze
              innovation, and power Nigeria's energy future.
            </p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Explore</p>
            <ul className="mt-2 space-y-2 text-slate-600">
              <li>
                <Link to="/repository" className="hover:text-emerald-700">
                  Repository
                </Link>
              </li>
              <li>
                <Link to="/innovation" className="hover:text-emerald-700">
                  Innovation Hub
                </Link>
              </li>
              <li>
                <Link to="/databank" className="hover:text-emerald-700">
                  Data Bank
                </Link>
              </li>
              <li>
                <Link to="/policy" className="hover:text-emerald-700">
                  Policy & Analytics
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Resources</p>
            <ul className="mt-2 space-y-2 text-slate-600">
              <li>Submission Guidelines</li>
              <li>API Documentation</li>
              <li>Data Governance</li>
              <li>Support</li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Contact</p>
            <ul className="mt-2 space-y-2 text-slate-600">
              <li>Education & Training Dept., PTDF</li>
              <li>Abuja, Nigeria</li>
              <li>contact@nptr.gov.ng</li>
            </ul>
            <div className="mt-4">
              <Button className="rounded-2xl w-full">Partner with NPTR</Button>
            </div>
          </div>
        </div>
        <div className="border-t text-xs text-slate-500 py-4 text-center">
          © {new Date().getFullYear()} PTDF • NPTR. All rights reserved.
        </div>
      </footer>
    </>
  );
}