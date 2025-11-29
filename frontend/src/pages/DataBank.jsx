import React, { useState } from "react";
import { Database, Lock, Globe, Search, Download, Eye, Shield, BarChart3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { dummyDatasets, getDatasetCategoryColor, getAccessColor } from "../data/dummyDatasets";
import { motion } from "framer-motion";

export default function DataBank() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [...new Set(dummyDatasets.map(d => d.category))];

  const filteredDatasets = dummyDatasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || dataset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
            <Database className="h-8 w-8 text-emerald-600" /> Petroleum Data Bank
          </h2>
          <p className="text-slate-600 text-lg">
            Secure, role-based access to Nigeria's most comprehensive petroleum datasets - from seismic to production.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
            />
          </div>
          <select
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Card className="rounded-2xl border-slate-200">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-emerald-600">12</div>
              <div className="text-sm text-slate-600 mt-1">Active Datasets</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-blue-600">18 TB</div>
              <div className="text-sm text-slate-600 mt-1">Total Data</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-purple-600">1,245</div>
              <div className="text-sm text-slate-600 mt-1">Researchers</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-orange-600">24.5M</div>
              <div className="text-sm text-slate-600 mt-1">Data Points</div>
            </CardContent>
          </Card>
        </div>

        {/* Datasets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredDatasets.map((dataset) => (
            <motion.div
              key={dataset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group rounded-3xl border border-slate-200 bg-white hover:shadow-xl transition-all duration-300"
            >
              {/* Header with gradient */}
              <div className={`h-32 bg-gradient-to-br ${getDatasetCategoryColor(dataset.category)} rounded-t-3xl p-5 flex flex-col justify-between relative overflow-hidden`}>
                <div className="absolute top-0 right-0 opacity-10">
                  <Database className="h-24 w-24" />
                </div>
                <div className="relative z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-900">
                    {dataset.category}
                  </span>
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="text-white">
                    <div className="text-2xl font-bold">{dataset.size}</div>
                    <div className="text-xs text-white/80">{dataset.format}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getAccessColor(dataset.access)}`}>
                    {dataset.access}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-base text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                  {dataset.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                  {dataset.description}
                </p>

                {/* Metadata */}
                <div className="space-y-2 mb-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-3.5 w-3.5" />
                    <span>{dataset.records}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{dataset.coverage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5" />
                    <span>By {dataset.owner}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 rounded-xl border-slate-300">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Request
                  </Button>
                </div>

                <div className="mt-3 text-[10px] text-slate-400">
                  Updated {dataset.updated}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* API Access Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-3xl p-6 border-slate-200">
            <CardTitle className="text-lg mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              Dataset Distribution
            </CardTitle>
            <CardContent className="text-sm text-slate-600">
              <div className="flex items-center justify-center h-56 px-4">
                {/* Bar Chart with fixed heights */}
                <div className="w-full flex items-end justify-around h-40 gap-3">
                  {/* Geophysics: 3 datasets - tallest */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg hover:opacity-80 transition-opacity h-32 shadow-sm" title="Geophysics: 3 datasets" />
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-semibold text-purple-600">Geo</span>
                      <span className="text-xs font-bold text-slate-700">3</span>
                    </div>
                  </div>

                  {/* Production: 2 datasets */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:opacity-80 transition-opacity h-20 shadow-sm" title="Production: 2 datasets" />
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-semibold text-emerald-600">Prod</span>
                      <span className="text-xs font-bold text-slate-700">2</span>
                    </div>
                  </div>

                  {/* Environmental: 2 datasets */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg hover:opacity-80 transition-opacity h-20 shadow-sm" title="Environmental: 2 datasets" />
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-semibold text-green-600">Env</span>
                      <span className="text-xs font-bold text-slate-700">2</span>
                    </div>
                  </div>

                  {/* Reservoir: 1 dataset */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:opacity-80 transition-opacity h-10 shadow-sm" title="Reservoir: 1 dataset" />
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-semibold text-blue-600">Res</span>
                      <span className="text-xs font-bold text-slate-700">1</span>
                    </div>
                  </div>

                  {/* Geochemistry: 1 dataset */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg hover:opacity-80 transition-opacity h-10 shadow-sm" title="Geochemistry: 1 dataset" />
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-semibold text-orange-600">Chem</span>
                      <span className="text-xs font-bold text-slate-700">1</span>
                    </div>
                  </div>

                  {/* Operations: 1 dataset */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full bg-gradient-to-t from-slate-600 to-slate-500 rounded-t-lg hover:opacity-80 transition-opacity h-10 shadow-sm" title="Operations: 1 dataset" />
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-semibold text-slate-600">Ops</span>
                      <span className="text-xs font-bold text-slate-700">1</span>
                    </div>
                  </div>

                  {/* Others: 2 datasets */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full bg-gradient-to-t from-rose-500 to-rose-400 rounded-t-lg hover:opacity-80 transition-opacity h-20 shadow-sm" title="Others: 2 datasets" />
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-semibold text-rose-600">Other</span>
                      <span className="text-xs font-bold text-slate-700">2</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center pt-3 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-700">Distribution by Category</p>
                <p className="text-[10px] text-slate-500 mt-0.5">12 Total Datasets across 7+ categories</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl p-6 border-slate-200">
            <CardTitle className="text-lg mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              API Access
            </CardTitle>
            <CardContent className="text-sm text-slate-600 space-y-3">
              <p>Integrate NPTR datasets directly into your applications with our RESTful API. Supports JSON, CSV, and custom formats.</p>
              <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs">
                <div>GET /api/v1/datasets/ds1</div>
                <div className="text-slate-500 mt-1">Authorization: Bearer [token]</div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 rounded-2xl bg-blue-600 hover:bg-blue-700">
                  Get API Key
                </Button>
                <Button variant="outline" className="flex-1 rounded-2xl border-slate-300">
                  Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
