import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
  const location = useLocation();
  const { user, logout, isAuthenticated, isContributor, isAdmin, isOrgAdmin, isSuperAdmin, isAcademic } = useAuth();
  
  const links = [
    { path: "/", label: "Home" },
    { path: "/repository", label: "Repository" },
    { path: "/innovation", label: "Innovation Hub" },
    { path: "/databank", label: "Data Bank" },
    { path: "/policy", label: "Policy" },
    { path: "/trainees", label: "Trainees & Scholars" },
    { path: "/about", label: "About" },
  ];

  // Add upload link for contributors
  if (isContributor()) {
    links.splice(-1, 0, { path: "/upload", label: "Upload" });
  }

  // Add super admin dashboard for super admins
  if (isSuperAdmin()) {
    links.splice(-1, 0, { path: "/super-admin", label: "Super Admin" });
  }

  // Add organization admin dashboard for org admins
  if (isOrgAdmin()) {
    links.splice(-1, 0, { path: "/org-admin", label: "Organization Admin" });
  }

  // Add admin dashboard for regular admins
  if (isAdmin() && !isSuperAdmin() && !isOrgAdmin()) {
    links.splice(-1, 0, { path: "/admin", label: "Admin Dashboard" });
  }

  // Add academic dashboard for academics
  if (isAcademic()) {
    links.splice(-1, 0, { path: "/academic", label: "Academic Dashboard" });
  }

  // Don't show navigation on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.02]">
          <img
            src="/logo.png"
            alt="PTDF - Petroleum Technology Development Fund"
            className="h-14 w-14 object-contain transition-transform group-hover:scale-105"
          />
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-wide text-slate-900">PTDF</p>
            <p className="text-xs text-slate-500 -mt-0.5 tracking-wider">NPTR</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative py-2 font-medium tracking-wide transition-all duration-300 hover:text-emerald-700 hover:scale-105 ${
                location.pathname === link.path
                  ? "text-emerald-700"
                  : "text-slate-700"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="text-sm text-slate-600">
                Welcome, <span className="font-medium">{user?.name}</span>
              </div>
              <Button 
                variant="ghost" 
                className="rounded-2xl"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="rounded-2xl"
                asChild
              >
                <Link to="/login">Log in</Link>
              </Button>
              <Button 
                className="rounded-2xl bg-emerald-600 hover:bg-emerald-700"
                asChild
              >
                <Link to="/signup">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
