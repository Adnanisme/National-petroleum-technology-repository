import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Lightbulb, Users, TrendingUp, Shield, Award, Globe, Mail, Phone, MapPin, Building2, Database, FileText, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-10 w-10 text-emerald-600" />
            <h1 className="text-4xl md:text-5xl font-bold">About NPTR</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            The National Petroleum Technology Repository (NPTR) is a strategic initiative of the Petroleum Technology Development Fund (PTDF) to preserve knowledge, catalyze innovation, and power Nigeria's energy future.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              <span>Launched 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>10,000+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>25 TB+ Data</span>
            </div>
          </div>
        </motion.div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-3xl border-slate-200 h-full">
              <div className="h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-t-3xl flex items-center justify-center">
                <Target className="h-10 w-10 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To create Africa's premier petroleum technology repository that preserves knowledge, accelerates innovation, and drives sustainable energy development through open collaboration and world-class data stewardship.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-3xl border-slate-200 h-full">
              <div className="h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-t-3xl flex items-center justify-center">
                <Lightbulb className="h-10 w-10 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To be the definitive source of petroleum research and innovation in Africa, bridging academia, industry, and policy to build a knowledge-driven energy sector that powers national development and economic prosperity.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="rounded-3xl border-slate-200 h-full">
              <div className="h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-t-3xl flex items-center justify-center">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">Core Values</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-purple-500 rounded-full" />
                    Excellence in Research
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-purple-500 rounded-full" />
                    Open Collaboration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-purple-500 rounded-full" />
                    Data Integrity
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-purple-500 rounded-full" />
                    Innovation & Impact
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Why NPTR Matters */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why NPTR Matters</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-3xl p-6 border-emerald-200 bg-emerald-50/50">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Knowledge Preservation</h3>
                  <p className="text-sm text-slate-600">
                    Decades of petroleum research, technical reports, and field data at risk of loss are now systematically preserved and accessible for future generations.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl p-6 border-blue-200 bg-blue-50/50">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Economic Impact</h3>
                  <p className="text-sm text-slate-600">
                    By sharing data and reducing duplication, NPTR saves the industry millions annually while accelerating time-to-market for innovations.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl p-6 border-purple-200 bg-purple-50/50">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Capacity Building</h3>
                  <p className="text-sm text-slate-600">
                    Researchers, students, and professionals gain access to world-class petroleum datasets and research, elevating Nigeria's technical capabilities.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl p-6 border-orange-200 bg-orange-50/50">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Global Leadership</h3>
                  <p className="text-sm text-slate-600">
                    NPTR positions Nigeria as a leader in petroleum technology and knowledge management within Africa and globally.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 -translate-y-1/2 hidden md:block" />
            <div className="grid md:grid-cols-4 gap-6 relative">
              {[
                {
                  year: "2022",
                  title: "Concept & Planning",
                  desc: "PTDF initiates NPTR project with stakeholder consultations and feasibility studies",
                  color: "from-blue-500 to-cyan-600"
                },
                {
                  year: "2023",
                  title: "Infrastructure Setup",
                  desc: "Platform development, data governance frameworks, and pilot partnerships established",
                  color: "from-emerald-500 to-teal-600"
                },
                {
                  year: "2024",
                  title: "Official Launch",
                  desc: "NPTR goes live with initial datasets, research papers, and innovation showcase",
                  color: "from-purple-500 to-violet-600"
                },
                {
                  year: "2025",
                  title: "Expansion & Scale",
                  desc: "Regional partnerships, API access, advanced analytics, and international collaborations",
                  color: "from-orange-500 to-amber-600"
                }
              ].map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="rounded-3xl overflow-hidden border-slate-200 text-center">
                    <div className={`h-24 bg-gradient-to-br ${milestone.color} p-4 flex items-center justify-center`}>
                      <div className="text-white">
                        <div className="text-3xl font-bold">{milestone.year}</div>
                        <div className="text-sm text-white/90">{milestone.title}</div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-slate-600">{milestone.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="rounded-2xl border-slate-200 text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-emerald-600 mb-2">8,500+</div>
                <div className="text-sm text-slate-600">Research Documents</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-slate-200 text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">350+</div>
                <div className="text-sm text-slate-600">Active Datasets</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-slate-200 text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">125+</div>
                <div className="text-sm text-slate-600">Innovations Showcased</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-slate-200 text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-orange-600 mb-2">85+</div>
                <div className="text-sm text-slate-600">Policy Briefs</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Dr. Ahmed Bello Mahmud", role: "Executive Secretary, PTDF", dept: "Executive Leadership" },
              { name: "Prof. Olufunke Adebayo", role: "NPTR Director", dept: "Repository Operations" },
              { name: "Dr. Ibrahim Yusuf", role: "Head of Research", dept: "Academic Partnerships" },
              { name: "Eng. Amina Hassan", role: "Chief Technology Officer", dept: "Platform & Infrastructure" },
              { name: "Dr. Chidi Okonkwo", role: "Data Governance Lead", dept: "Quality & Compliance" },
              { name: "Mrs. Zainab Mohammed", role: "Innovation Hub Manager", dept: "Industry Relations" }
            ].map((person, i) => (
              <Card key={i} className="rounded-3xl overflow-hidden border-slate-200 hover:shadow-lg transition-all">
                <div className="h-40 bg-gradient-to-br from-emerald-100 via-blue-100 to-purple-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="h-20 w-20 text-slate-300" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="font-bold text-slate-900 mb-1">{person.name}</p>
                  <p className="text-sm text-emerald-700 font-medium mb-1">{person.role}</p>
                  <p className="text-xs text-slate-500">{person.dept}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Partners</h2>
          <Card className="rounded-3xl p-8 border-slate-200">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
              {["PTDF", "NNPC Ltd", "DPR/NUPRC", "Shell", "Chevron", "TotalEnergies", "Seplat", "NCDMB", "ABU Zaria", "UniPort", "FUTA", "UI"].map((partner, idx) => (
                <div key={idx} className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center border border-slate-200 hover:shadow-md transition-all">
                  <span className="text-xs font-bold text-slate-600 text-center px-2">{partner}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-3xl p-8 border-slate-200 bg-gradient-to-br from-emerald-50 to-blue-50">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-emerald-600" />
              Get in Touch
            </h3>
            <div className="space-y-4 text-slate-600">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Address</p>
                  <p className="text-sm">Petroleum Technology Development Fund (PTDF)</p>
                  <p className="text-sm">2 Memorial Drive, Central Business District</p>
                  <p className="text-sm">Abuja, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <p className="text-sm">contact@nptr.ptdf.gov.ng</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-semibold text-slate-900">Phone</p>
                  <p className="text-sm">+234 (0) 9 461 0000</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl p-8 border-slate-200">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                <textarea
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <Button className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
