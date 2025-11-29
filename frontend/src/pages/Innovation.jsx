import React, { useState, useEffect } from "react";
import { Lightbulb, ChevronLeft, ChevronRight, Sparkles, Users, TrendingUp, Download, Cpu, Leaf, Building2, Settings, Beaker, Zap, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const featuredProjects = [
  {
    id: 1,
    title: "Modular Floating LNG Terminal",
    tagline: "Revolutionary offshore gas processing with 60% cost reduction",
    institution: "FUTA Energy Lab",
    trl: 8,
    funding: "$2.5M secured",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: 2,
    title: "AI-Powered Reservoir Optimization",
    tagline: "Machine learning for 94% accurate production forecasting",
    institution: "University of Port Harcourt",
    trl: 7,
    funding: "$1.8M secured",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    id: 3,
    title: "Smart Pipeline Integrity Monitor",
    tagline: "IoT-based corrosion detection preventing 95% of failures",
    institution: "ABU Zaria",
    trl: 9,
    funding: "Commercial Ready",
    gradient: "from-violet-500 to-purple-600"
  }
];

const innovationProjects = [
  {
    id: 1,
    title: "AI-Powered Reservoir Optimization System",
    description: "Machine learning algorithms to maximize oil recovery rates and predict reservoir behavior with 94% accuracy using real-time sensor data.",
    trl: "TRL 7",
    status: "Pilot Testing",
    institution: "University of Port Harcourt",
    category: "Digital Technology",
    gradient: "from-blue-600 to-cyan-500",
    partners: ["NNPC", "Shell"],
    year: 2024,
    funding: "$1.8M"
  },
  {
    id: 2,
    title: "Biodegradable Drilling Fluid Additives",
    description: "Environmentally-safe drilling mud formulations reducing ecological impact by 85% while maintaining performance standards.",
    trl: "TRL 8",
    status: "Commercial Ready",
    institution: "FUTA",
    category: "Environmental",
    gradient: "from-green-600 to-emerald-500",
    partners: ["TotalEnergies"],
    year: 2024,
    funding: "$950K"
  },
  {
    id: 3,
    title: "Smart Pipeline Integrity Monitoring",
    description: "IoT-based corrosion detection system with 95% accuracy, preventing pipeline failures through predictive maintenance.",
    trl: "TRL 9",
    status: "Deployed",
    institution: "ABU Zaria",
    category: "Infrastructure",
    gradient: "from-purple-600 to-violet-500",
    partners: ["NNPC", "Chevron"],
    year: 2023,
    funding: "$2.1M"
  },
  {
    id: 4,
    title: "Modular Offshore Processing Unit",
    description: "Compact floating platform for gas processing, reducing capital costs by 60% for marginal field development.",
    trl: "TRL 8",
    status: "Commercial Ready",
    institution: "FUTA Energy Lab",
    category: "Engineering",
    gradient: "from-orange-600 to-amber-500",
    partners: ["NCDMB", "NNPC"],
    year: 2024,
    funding: "$3.2M"
  },
  {
    id: 5,
    title: "CO2 Capture & Utilization System",
    description: "Converting flare gas CO2 into commercial products, achieving 90% capture efficiency with positive ROI.",
    trl: "TRL 7",
    status: "Pilot Phase",
    institution: "University of Lagos",
    category: "Environmental",
    gradient: "from-teal-600 to-cyan-500",
    partners: ["Seplat", "NNPC"],
    year: 2024,
    funding: "$1.5M"
  },
  {
    id: 6,
    title: "Indigenous Downhole Sensor Suite",
    description: "Locally manufactured pressure-temperature sensors with 99.2% accuracy, reducing foreign dependency by 70%.",
    trl: "TRL 6",
    status: "Development",
    institution: "LASU Tech Center",
    category: "Manufacturing",
    gradient: "from-indigo-600 to-blue-500",
    partners: ["NCDMB"],
    year: 2024,
    funding: "$800K"
  },
  {
    id: 7,
    title: "Nanofluid Enhanced Oil Recovery",
    description: "Advanced nanoparticle formulations increasing oil recovery by 18% in mature reservoirs.",
    trl: "TRL 6",
    status: "Field Trials",
    institution: "University of Benin",
    category: "Research",
    gradient: "from-pink-600 to-rose-500",
    partners: ["Shell", "NNPC"],
    year: 2025,
    funding: "$1.2M"
  },
  {
    id: 8,
    title: "Automated Well Completion System",
    description: "Robotic system for offshore well completions, reducing operational time by 40% and improving safety.",
    trl: "TRL 5",
    status: "Prototype",
    institution: "Rivers State University",
    category: "Automation",
    gradient: "from-slate-700 to-gray-600",
    partners: ["Chevron"],
    year: 2025,
    funding: "$2.8M"
  }
];

const partners = [
  "PTDF",
  "NCDMB",
  "NNPC Ltd.",
  "Shell",
  "Chevron",
  "TotalEnergies",
  "ABU Zaria",
  "UniPort",
  "FUTA",
  "LASU",
  "Seplat"
];

export default function Innovation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-emerald-600" /> Innovation Hub
            </h2>
            <p className="text-slate-600">
              Prototypes, patents, and commercialization‑ready technologies from Nigeria's brightest minds.
            </p>
          </div>
          <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700">
            <Sparkles className="h-4 w-4 mr-2" />
            Showcase Your Work
          </Button>
        </div>

        {/* Featured Projects Carousel */}
        <div className="relative mb-12 rounded-3xl overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative h-80 bg-gradient-to-br ${featuredProjects[currentSlide].gradient} flex items-center justify-center overflow-hidden`}
            >
              {/* Hexagonal Grid Pattern */}
              <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(-60deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)'}} />

              {/* Diagonal Stripe Pattern */}
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,0.1) 60px, rgba(255,255,255,0.1) 120px)'}} />

              {/* Animated Gradient Orbs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}} />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

              <div className="relative z-10 text-center text-white px-8 max-w-4xl">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-white/90">
                    Featured Innovation
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3">
                    {featuredProjects[currentSlide].title}
                  </h3>
                  <p className="text-lg md:text-xl mb-4 text-white/90">
                    {featuredProjects[currentSlide].tagline}
                  </p>
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                      {featuredProjects[currentSlide].institution}
                    </span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                      TRL {featuredProjects[currentSlide].trl}
                    </span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                      {featuredProjects[currentSlide].funding}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {featuredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Innovation Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovationProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4 }}
              className="group rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />

                {/* Geometric Pattern Overlays - Much More Visible */}
                {project.category === "Digital Technology" && (
                  <>
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 22px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 22px)'
                    }} />
                    {/* Large icon watermark */}
                    <Cpu className="absolute bottom-4 right-4 h-24 w-24 text-white/15 transform rotate-12" />
                  </>
                )}

                {project.category === "Environmental" && (
                  <>
                    {/* Organic circles */}
                    <div className="absolute inset-0 opacity-25">
                      <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-white/30" />
                      <div className="absolute top-20 right-16 w-16 h-16 rounded-full border-4 border-white/20" />
                      <div className="absolute bottom-10 left-1/3 w-24 h-24 rounded-full border-4 border-white/25" />
                    </div>
                    <Leaf className="absolute bottom-4 right-4 h-24 w-24 text-white/15 transform -rotate-12" />
                  </>
                )}

                {project.category === "Infrastructure" && (
                  <>
                    {/* Diagonal stripes */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 25px, rgba(255,255,255,0.3) 25px, rgba(255,255,255,0.3) 27px)'
                    }} />
                    <Building2 className="absolute bottom-4 right-4 h-24 w-24 text-white/15" />
                  </>
                )}

                {project.category === "Engineering" && (
                  <>
                    {/* Hexagonal pattern */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.25) 30px, rgba(255,255,255,0.25) 32px), repeating-linear-gradient(60deg, transparent, transparent 30px, rgba(255,255,255,0.25) 30px, rgba(255,255,255,0.25) 32px), repeating-linear-gradient(-60deg, transparent, transparent 30px, rgba(255,255,255,0.25) 30px, rgba(255,255,255,0.25) 32px)'
                    }} />
                    <Settings className="absolute bottom-4 right-4 h-24 w-24 text-white/15 animate-[spin_20s_linear_infinite]" />
                  </>
                )}

                {project.category === "Research" && (
                  <>
                    {/* Dot pattern */}
                    <div className="absolute inset-0 opacity-25" style={{
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
                      backgroundSize: '25px 25px'
                    }} />
                    <Beaker className="absolute bottom-4 right-4 h-24 w-24 text-white/15" />
                  </>
                )}

                {project.category === "Automation" && (
                  <>
                    {/* Circuit board pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-1/4 w-0.5 h-full bg-white/30" />
                      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/30" />
                      <div className="absolute top-0 left-3/4 w-0.5 h-full bg-white/30" />
                      <div className="absolute top-1/4 left-0 w-full h-0.5 bg-white/30" />
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/30" />
                      <div className="absolute top-3/4 left-0 w-full h-0.5 bg-white/30" />
                    </div>
                    <Zap className="absolute bottom-4 right-4 h-24 w-24 text-white/15" />
                  </>
                )}

                {project.category === "Manufacturing" && (
                  <>
                    {/* Diagonal grid */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.15) 75%), linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.15) 75%)',
                      backgroundSize: '40px 40px',
                      backgroundPosition: '0 0, 20px 20px'
                    }} />
                    <Factory className="absolute bottom-4 right-4 h-24 w-24 text-white/15" />
                  </>
                )}

                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all" />

                {/* Glowing orbs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-900">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-900">
                    {project.year}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 z-10">
                  <TrendingUp className="h-16 w-16 text-white/15 group-hover:text-white/25 transition-all" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <Users className="h-3.5 w-3.5" />
                  <span>{project.institution}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                    {project.trl}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {project.status}
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                    {project.funding}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.partners.slice(0, 2).map((partner, idx) => (
                      <div
                        key={idx}
                        className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-700"
                        title={partner}
                      >
                        {partner.substring(0, 2)}
                      </div>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Brief
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="mt-16">
          <p className="text-sm font-semibold text-slate-700 mb-4 text-center">Collaborating Partners</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3">
            {partners.map((partner) => (
              <div
                key={partner}
                className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 p-3 text-center text-xs font-medium text-slate-700 transition-all hover:shadow-md hover:scale-105"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
