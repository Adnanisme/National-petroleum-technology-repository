import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthProvider } from './context/AuthContext';
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ConditionalFooter from "@/components/ConditionalFooter";
import Repository from "@/pages/Repository";
import Innovation from "@/pages/Innovation";
import DataBank from "@/pages/DataBank";
import Policy from "@/pages/Policy";
import About from "@/pages/About";
import Trainees from "@/pages/Trainees";
import DocumentView from "@/pages/DocumentView";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Upload from "@/pages/Upload";
import AdminDashboard from "@/pages/AdminDashboard";
import AcademicDashboard from "@/pages/AcademicDashboard";
import SuperAdminDashboard from "@/pages/SuperAdminDashboard";
import OrgAdminDashboard from "@/pages/OrgAdminDashboard";
import OrganizationDetailView from "@/pages/OrganizationDetailView";
import AcademicDetailView from "@/pages/AcademicDetailView";
import DocumentReview from "@/pages/DocumentReview";
import HomePage from "@/pages/HomePage";

// NPTR Landing Page Mockup
// TailwindCSS + shadcn/ui + lucide-react + framer-motion

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
];

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/academic" element={<AcademicDashboard />} />
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/org-admin" element={<OrgAdminDashboard />} />
            <Route path="/super-admin/organization/:id" element={<OrganizationDetailView />} />
            <Route path="/super-admin/academic/:id" element={<AcademicDetailView />} />
            <Route path="/admin/review/:id" element={<DocumentReview />} />
            <Route path="/repository" element={<Repository />} />
            <Route path="/documents/:id" element={<DocumentView />} />
            <Route path="/innovation" element={<Innovation />} />
            <Route path="/databank" element={<DataBank />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/trainees" element={<Trainees />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <ConditionalFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}
