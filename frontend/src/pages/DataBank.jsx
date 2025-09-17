import React from "react";
import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function DataBank() {
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
