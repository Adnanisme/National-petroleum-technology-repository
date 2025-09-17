import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Search, FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { documents } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const categories = [
  { key: "Computing", label: "Computing", color: "from-sky-400 to-cyan-400" },
  { key: "Engineering", label: "Engineering", color: "from-indigo-400 to-blue-400" },
  { key: "Management", label: "Management", color: "from-emerald-400 to-teal-400" },
  { key: "GeoSciences", label: "GeoSciences", color: "from-amber-400 to-orange-400" },
  { key: "Environmental", label: "Environmental", color: "from-lime-400 to-green-400" },
];

const types = ["Publication", "Dataset", "Policy", "Report"];
const YEARS = ["2025", "2024", "2023", "2022", "2021"];

// Checkbox Component
const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

// Pill Component for active filters
const Pill = ({ children, className = "" }) => (
  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm ${className}`}>
    {children}
  </span>
);

export default function Repository() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({ 
    query: searchParams.get("search") || "", 
    types: [], 
    category: null, 
    year: null 
  });
  const { isContributor } = useAuth();

  useEffect(() => {
    fetchDocuments();
  }, [state]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await documents.getAll({
        search: state.query,
        category: state.category,
        type: state.types.join(','),
        year: state.year,
      });
      setDocs(response.data.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc) => {
    try {
      const response = await documents.download(doc.id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", doc.file_name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("Error downloading document");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Repository</h1>
            <p className="text-gray-600">Discover research papers, datasets, and publications</p>
          </div>
          {isContributor() && (
            <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link to="/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Link>
            </Button>
          )}
        </div>

        {/* Compact Hero Search Section */}
        <div className="rounded-3xl bg-gradient-to-b from-blue-50 to-white p-6 ring-1 ring-inset ring-blue-100 mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Repository</h1>
          
          {/* Search bar and filters in one row */}
          <div className="flex flex-col items-stretch gap-3 md:flex-row">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                value={state.query}
                onChange={(e) => setState((s) => ({ ...s, query: e.target.value }))}
                className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-200"
                placeholder="Search theses, reports, patents…"
              />
            </div>
            
            {/* Year Selector */}
            <div className="flex gap-2">
              <select
                value={state.year || ""}
                onChange={(e) => setState((s) => ({ ...s, year: e.target.value || null }))}
                className="min-w-[8rem] rounded-2xl border border-gray-200 bg-white px-3 text-sm text-gray-700 shadow-sm"
              >
                <option value="">Year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              
              {/* Type checkboxes */}
              <div className="hidden items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 md:flex">
                {types.map((t) => (
                  <Checkbox
                    key={t}
                    label={t}
                    checked={state.types.includes(t)}
                    onChange={(v) =>
                      setState((s) => ({
                        ...s,
                        types: v ? [...s.types, t] : s.types.filter((x) => x !== t),
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Category cards */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setState((s) => ({ ...s, category: s.category === c.key ? null : c.key }))}
                className={`group flex items-center gap-3 rounded-2xl bg-gradient-to-br ${c.color} p-4 text-left shadow-sm ring-1 ring-inset ring-black/5 transition ${
                  state.category === c.key ? "opacity-100" : "opacity-80 hover:opacity-100"
                }`}
              >
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/90 text-gray-700 ring-1 ring-black/10">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white drop-shadow-sm">{c.label}</p>
                  <p className="text-xs text-white/80">Click to filter</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters as Pills */}
        {(state.types.length > 0 || state.category || state.year) && (
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              {state.types.map((t) => (
                <Pill key={t}>
                  {t}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-600" 
                    onClick={() => setState((s) => ({ ...s, types: s.types.filter((x) => x !== t) }))}
                  />
                </Pill>
              ))}
              {state.category && (
                <Pill className="capitalize">
                  {state.category}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-600" 
                    onClick={() => setState((s) => ({ ...s, category: null }))}
                  />
                </Pill>
              )}
              {state.year && (
                <Pill>
                  {state.year}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-600" 
                    onClick={() => setState((s) => ({ ...s, year: null }))}
                  />
                </Pill>
              )}
              <button 
                onClick={() => setState({ query: state.query, types: [], category: null, year: null })} 
                className="text-sm text-gray-600 underline hover:text-gray-800"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {docs.length === 0 ? (
              <div className="col-span-full rounded-2xl bg-white/80 p-16 text-center shadow-sm ring-1 ring-gray-100">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No documents found</h3>
                <p className="text-sm text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            ) : (
              docs.map((doc) => (
                <div key={doc.id} className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-gray-100 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 ring-1 ring-gray-200">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{doc.title}</h3>
                        <p className="mt-1 text-xs text-gray-500">{doc.uploader?.name} • {new Date(doc.created_at).getFullYear()}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
                        {doc.type}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200 capitalize">
                        {doc.category}
                      </span>
                    </div>
                  </div>
                  {doc.description && (
                    <p className="text-sm leading-6 text-gray-600 line-clamp-2">{doc.description}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <button 
                      className="rounded-xl bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-black/90"
                      onClick={() => navigate(`/documents/${doc.id}`)}
                    >
                      View
                    </button>
                    <button 
                      className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                      onClick={() => handleDownload(doc)}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <footer className="mt-12 border-t border-gray-100 pt-6 text-center text-xs text-gray-500">
          PTDF • NPTR — Knowledge Repository
        </footer>
      </div>
    </div>
  );
}