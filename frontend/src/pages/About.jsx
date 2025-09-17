import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">About NPTR</h2>
          <p className="text-slate-600">
            A strategic initiative of PTDF to preserve knowledge, catalyze
            innovation, and power Nigeria's energy future.
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
