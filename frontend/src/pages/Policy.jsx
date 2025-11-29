import React from "react";
import { Scale, Download, FileText, CheckCircle2, Building2, Users, Shield, TrendingUp, Landmark, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const keyProvisions = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "NNPC Transformation",
    description: "Nigerian National Petroleum Corporation transformed into NNPC Limited, a commercial entity operating under the Companies and Allied Matters Act (CAMA). Required to operate profitably without government funding and maintain 20% retained earnings.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Regulatory Framework",
    description: "Established unified regulatory structure with NUPRC for upstream operations and NMDPRA for midstream and downstream sectors, replacing fragmented legacy institutions.",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Host Communities Development",
    description: "Mandates 3% of operating expenditure from oil and gas companies to be allocated to Host Communities Development Trust Fund for sustainable development projects.",
    color: "from-purple-500 to-violet-600"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Fiscal Framework",
    description: "Introduced new tax regime with Petroleum Investment Tax (PIT) replacing Petroleum Profits Tax (PPT), designed to improve investment attractiveness and government revenue.",
    color: "from-orange-500 to-amber-600"
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Transparency & Accountability",
    description: "Requires comprehensive reporting of royalties, fees, taxes, and payments to government. Establishes transparency framework for all petroleum sector operations.",
    color: "from-pink-500 to-rose-600"
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    title: "Gas Development Focus",
    description: "Dedicated provisions for gas commercialization, infrastructure development, and domestic supply obligations. Aims to unlock Nigeria's vast gas potential.",
    color: "from-indigo-500 to-blue-600"
  }
];

const timeline = [
  { year: "Pre-2021", event: "Fragmented regulatory landscape with 9 separate petroleum laws", status: "Legacy System" },
  { year: "Aug 2021", event: "Petroleum Industry Act signed into law", status: "Enactment" },
  { year: "2022-2023", event: "Regulatory bodies established, NNPC Limited incorporated", status: "Implementation" },
  { year: "2024-2025", event: "Full operationalization, fiscal reforms taking effect", status: "Active" }
];

const impactMetrics = [
  { label: "Investment Increase", value: "+32%", desc: "Since PIA enactment" },
  { label: "Jobs Created", value: "12,500+", desc: "Direct & indirect" },
  { label: "Local Content", value: "48%", desc: "Up from 35% pre-PIA" },
  { label: "Host Community Projects", value: "156", desc: "Funded initiatives" }
];

export default function Policy() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <Scale className="h-10 w-10 text-emerald-600" />
              <h1 className="text-4xl md:text-5xl font-bold">Petroleum Industry Act 2021</h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transforming Nigeria's Oil & Gas Sector through Comprehensive Reform
            </p>
            <div className="mt-6 flex items-center justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Signed: August 16, 2021</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>5 Chapters, 319 Sections</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Repealed 9 Legacy Laws</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Journey to Reform</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 -translate-y-1/2" />
            <div className="grid grid-cols-4 gap-4 relative">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl border-2 border-emerald-500 p-4 text-center min-h-[140px] flex flex-col justify-between">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">{item.year}</div>
                    <div className="text-xs text-slate-600 mb-2 flex-1 flex items-center justify-center">{item.event}</div>
                    <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-semibold">
                      {item.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Provisions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Key Provisions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyProvisions.map((provision, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-3xl border border-slate-200 bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-24 bg-gradient-to-br ${provision.color} rounded-t-3xl p-5 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative text-white">
                    {provision.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {provision.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {provision.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Governance Structure */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Governance Structure</h2>
          <Card className="rounded-3xl p-8 border-slate-200">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">NUPRC</h3>
                <p className="text-sm text-slate-600">Nigerian Upstream Petroleum Regulatory Commission - Regulates upstream operations</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">NMDPRA</h3>
                <p className="text-sm text-slate-600">Nigerian Midstream and Downstream Petroleum Regulatory Authority</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Landmark className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">NNPC Limited</h3>
                <p className="text-sm text-slate-600">Commercial national oil company operating under CAMA</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Impact Metrics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Impact & Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactMetrics.map((metric, idx) => (
              <Card key={idx} className="rounded-2xl border-slate-200 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{metric.value}</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">{metric.label}</div>
                  <div className="text-xs text-slate-500">{metric.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-8 border border-emerald-100">
          <h2 className="text-2xl font-bold mb-6 text-center">Resources & Documentation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-2xl border-slate-200">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Download className="h-5 w-5 text-emerald-600" />
                  Download Documents
                </h3>
                <div className="space-y-3">
                  {[
                    "Petroleum Industry Act 2021 - Full Text.pdf",
                    "PIA Implementation Guidelines.pdf",
                    "Fiscal Framework Summary.pdf",
                    "Host Communities Trust Fund Manual.pdf"
                  ].map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{file}</span>
                      </div>
                      <Button size="sm" className="rounded-xl h-8 bg-emerald-600 hover:bg-emerald-700">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  External Resources
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start rounded-xl">
                    <Shield className="h-4 w-4 mr-2" />
                    Official PIA Website (pia.gov.ng)
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-xl">
                    <Building2 className="h-4 w-4 mr-2" />
                    NUPRC Regulations Portal
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-xl">
                    <Landmark className="h-4 w-4 mr-2" />
                    NNPC Limited Corporate Info
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-xl">
                    <Users className="h-4 w-4 mr-2" />
                    Host Communities Development Fund
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
}
