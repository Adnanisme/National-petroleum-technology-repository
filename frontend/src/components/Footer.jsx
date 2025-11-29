import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="PTDF Logo"
              className="h-14 w-14 object-contain"
            />
            <div className="leading-tight">
              <p className="text-sm font-bold">PTDF</p>
              <p className="text-xs text-slate-500">NPTR</p>
            </div>
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
              <Link to="/repository" className="hover:text-emerald-700 transition-colors">
                Repository
              </Link>
            </li>
            <li>
              <Link to="/innovation" className="hover:text-emerald-700 transition-colors">
                Innovation Hub
              </Link>
            </li>
            <li>
              <Link to="/databank" className="hover:text-emerald-700 transition-colors">
                Data Bank
              </Link>
            </li>
            <li>
              <Link to="/policy" className="hover:text-emerald-700 transition-colors">
                Policy
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
  );
}
