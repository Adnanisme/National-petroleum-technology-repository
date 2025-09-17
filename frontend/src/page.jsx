import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  LibraryBig,
  Database,
  Lightbulb,
  Building2,
  Users2,
  ShieldCheck,
  ArrowRight,
  Download,
  FileText,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Full NPTR website mockup in one component with tabs

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

const samplePapers = [
  {
    title: "Optimizing Gas Flaring Reduction via Real‑Time Predictive Controls",
    meta: "MSc Thesis • Univ. of Port Harcourt • 2024",
  },
  {
    title: "AI‑Assisted Seismic Attribute Analysis for Niger Delta Reservoirs",
    meta: "PTDF Grant Report • 2025",
  },
  {
    title: "Nanofluid EOR in Tight Sandstone: Field‑Scale Feasibility",
    meta: "PhD Thesis • Ahmadu Bello University • 2023",
  },
  {
    title: "Digital Twin for FPSO Integrity Management",
    meta: "Industry Technical Report • 2025",
  },
];

const partners = [
  "PTDF",
  "NCDMB",
  "NNPC Ltd.",
  "FMPR",
  "ABU Zaria",
  "UniPort",
  "FUTA",
  "LASU",
];

function TopNav({
  current,
  onChange,
}) {
  const links = [
    { k: "home", label: "Home" },
    { k: "repository", label: "Repository" },
    { k: "innovation", label: "Innovation Hub" },
    { k: "databank", label: "Data Bank" },
    { k: "policy", label: "Policy & Analytics" },
    { k: "about", label: "About" },
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-700" />
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide">PTDF</p>
            <p className="text-xs text-slate-500 -mt-1">NPTR</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <button
              key={l.k}
              className={`hover:text-emerald-700 ${
                current === l.k
                  ? "text-emerald-700 font-medium"
                  : "text-slate-700"
              }`}
              onClick={() => onChange(l.k)}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="rounded-2xl">
            Log in
          </Button>
          <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700">
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}

function Home() {
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
                Nigeria’s central knowledge hub for petroleum technology,
                research, and innovation— preserving institutional memory,
                accelerating local content, and powering evidence‑based policy.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700">
                  <Search className="mr-2 h-4 w-4" /> Explore Repository
                </Button>
                <Button variant="outline" className="rounded-2xl">
                  <ArrowRight className="mr-2 h-4 w-4" /> Submit Research
                </Button>
              </div>

              {/* Search Bar */}
              <div className="mt-8">
                <div className="flex items-center gap-2 rounded-2xl border bg-white p-2 shadow-sm">
                  <Search className="h-5 w-5 text-slate-500 ml-1" />
                  <input
                    placeholder="Search by title, author, keyword…"
                    className="w-full bg-transparent outline-none py-2"
                  />
                  <Button className="rounded-xl bg-slate-900 hover:bg-slate-800">
                    Search
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Try: "energy transition", "seismic attribute analysis", "gas
                  flaring reduction"
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
                  {samplePapers.slice(0, 3).map((p) => (
                    <Card
                      key={p.title}
                      className="rounded-2xl border-slate-200"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold leading-snug">
                          {p.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 text-xs text-slate-500">
                        {p.meta}
                      </CardContent>
                    </Card>
                  ))}
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
    </>
  );
}

function Repository() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <FileText className="h-6 w-6 text-emerald-600" /> Repository
        </h2>

        <div className="flex items-center gap-2 rounded-2xl border bg-white p-3 shadow-sm mb-6">
          <Search className="h-5 w-5 text-slate-500" />
          <input
            placeholder="Search theses, reports, patents…"
            className="w-full bg-transparent outline-none py-2"
          />
          <Button className="rounded-xl bg-slate-900 hover:bg-slate-800">
            Search
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar filters */}
          <aside className="md:col-span-3 space-y-4">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm">Filter by Type</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Publication
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Dataset
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Policy
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Report
                </label>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm">Year</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 space-y-2">
                <select className="w-full border rounded-xl p-2">
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <div className="md:col-span-9 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePapers.map((p) => (
              <Card key={p.title} className="rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-base md:text-lg leading-snug">
                    {p.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{p.meta}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 rounded-xl"
                      >
                        Abstract
                      </Button>
                      <Button size="sm" className="h-8 rounded-xl">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="rounded-2xl">
            Load More
          </Button>
        </div>
      </div>
    </section>
  );
}

function Innovation() {
  return (
    <section className="py-12 md:py-20 bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-emerald-600" /> Innovation Hub
        </h2>
        <p className="text-slate-600 mb-6">
          Prototypes, patents, and commercialization‑ready technologies.
        </p>

        {/* Featured carousel placeholder */}
        <div className="rounded-3xl h-44 bg-gradient-to-r from-emerald-200 to-blue-200 border flex items-center justify-center text-sm text-slate-700">
          Featured Projects Carousel
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden border bg-white shadow-sm"
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
                    TRL {i + 4}
                  </span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-blue-100 text-blue-900">
                    Patent‑pending
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="mt-10">
          <p className="text-sm text-slate-600 mb-2">Partners</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {partners.map((p) => (
              <div
                key={p}
                className="rounded-xl border bg-white p-3 text-center text-sm text-slate-600"
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button className="rounded-2xl">Showcase your work</Button>
        </div>
      </div>
    </section>
  );
}

function DataBank() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Database className="h-6 w-6 text-emerald-600" /> Petroleum Data Bank
        </h2>
        <p className="text-slate-600 mb-6">
          Secure, role‑based access to seismic, geological, and production
          datasets.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Niger Delta Seismic Attributes",
            "Production by Field (2015–2025)",
            "Gas Utilization & Flaring Data",
          ].map((d) => (
            <Card key={d} className="rounded-3xl p-6">
              <CardTitle className="text-base">{d}</CardTitle>
              <CardContent className="text-sm text-slate-600">
                Updated: Jun 2025 • Source: Operators JV
                <div className="mt-4 flex gap-3">
                  <Button className="rounded-2xl">Request Access</Button>
                  <Button variant="outline" className="rounded-2xl">
                    Download Sample
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card className="rounded-3xl p-6">
            <CardTitle className="text-base">Visualization Preview</CardTitle>
            <CardContent className="text-sm text-slate-600">
              <div className="h-44 rounded-2xl border bg-gradient-to-r from-slate-100 to-slate-50 flex items-center justify-center">
                Mini Charts Placeholder
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl p-6">
            <CardTitle className="text-base">API Access</CardTitle>
            <CardContent className="text-sm text-slate-600">
              Register for API keys to integrate NPTR datasets into your
              internal systems.
              <div className="mt-4">
                <Button className="rounded-2xl">Get API Key</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Policy() {
  return (
    <section className="py-12 md:py-20 bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-emerald-600" /> Policy & Analytics
        </h2>
        <p className="text-slate-600 mb-6">
          Interactive dashboards and evidence‑based insights.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-3xl p-6">
            <CardTitle className="text-lg">
              Energy Transition Readiness
            </CardTitle>
            <CardContent className="text-sm text-slate-600">
              Visualization of readiness index across renewable adoption,
              flaring reduction, and local R&D capacity.
            </CardContent>
          </Card>

          <Card className="rounded-3xl p-6">
            <CardTitle className="text-lg">R&D Outputs</CardTitle>
            <CardContent className="text-sm text-slate-600">
              Trends in theses, patents, and commercialization opportunities by
              year and topic.
            </CardContent>
          </Card>

          <Card className="rounded-3xl p-6">
            <CardTitle className="text-lg">Local Content Growth</CardTitle>
            <CardContent className="text-sm text-slate-600">
              Metrics on indigenous innovations, academia‑industry partnerships,
              and tech transfer projects.
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <Card className="rounded-3xl p-6">
            <CardTitle className="text-base">Dashboard Preview</CardTitle>
            <CardContent>
              <div className="h-56 rounded-2xl border bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                Charts Placeholder
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl p-6">
            <CardTitle className="text-base">Download Center</CardTitle>
            <CardContent className="text-sm text-slate-600 space-y-2">
              {[
                "2025 Energy Transition Brief.pdf",
                "R&D Outcomes 2018-2024.xlsx",
                "Local Content Metrics Q2 2025.pdf",
              ].map((f) => (
                <div
                  key={f}
                  className="flex items-center justify-between border rounded-xl p-3"
                >
                  <span>{f}</span>
                  <Button size="sm" className="h-8 rounded-xl">
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">About NPTR</h2>
          <p className="text-slate-600">
            A strategic initiative of PTDF to preserve knowledge, catalyze
            innovation, and power Nigeria’s energy future.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {["Concept & Mandate", "Pilot & Partnerships", "Launch & Scale"].map(
            (t, i) => (
              <Card key={t} className="rounded-3xl p-6">
                <CardTitle className="text-base">{t}</CardTitle>
                <CardContent className="text-sm text-slate-600">
                  Milestone {i + 1} description with key outcomes and dates.
                </CardContent>
              </Card>
            )
          )}
        </div>

        {/* Leadership */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold">Leadership</h3>
          <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="rounded-3xl p-4">
                <div className="h-28 rounded-2xl bg-gradient-to-br from-emerald-200 to-blue-200" />
                <p className="mt-3 font-medium">Executive {i + 1}</p>
                <p className="text-sm text-slate-600">Role / Department</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact & Contact */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card className="rounded-3xl p-6">
            <CardTitle className="text-base">Impact</CardTitle>
            <CardContent className="text-sm text-slate-600 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border p-3">
                <p className="text-xl font-bold">5k+</p>
                <p className="text-[11px] text-slate-500">Publications</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-xl font-bold">200+</p>
                <p className="text-[11px] text-slate-500">Datasets</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-xl font-bold">50+</p>
                <p className="text-[11px] text-slate-500">Policy Impacts</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl p-6">
            <CardTitle className="text-base">Contact</CardTitle>
            <CardContent className="text-sm text-slate-600 space-y-3">
              <input
                placeholder="Name"
                className="w-full border rounded-xl p-2"
              />
              <input
                placeholder="Email"
                className="w-full border rounded-xl p-2"
              />
              <textarea
                placeholder="Message"
                className="w-full border rounded-xl p-2"
                rows={4}
              />
              <Button className="rounded-2xl w-full">Send</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default function NPTRSite() {
  const [tab, setTab] = useState("home");
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopNav current={tab} onChange={setTab} />
      {tab === "home" && <Home />}
      {tab === "repository" && <Repository />}
      {tab === "innovation" && <Innovation />}
      {tab === "databank" && <DataBank />}
      {tab === "policy" && <Policy />}
      {tab === "about" && <About />}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-700" />
            <p className="font-semibold">NPTR</p>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PTDF • NPTR. All rights reserved.
          </p>
          <div className="text-xs text-slate-500 flex items-center gap-3">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
