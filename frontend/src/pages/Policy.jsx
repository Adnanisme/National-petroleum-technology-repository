import React from "react";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Policy() {
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
