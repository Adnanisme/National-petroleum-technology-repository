import React from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function Innovation() {
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
