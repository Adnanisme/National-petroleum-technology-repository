
# National Petroleum Technology Repository (NPTR)

![NPTR Cover](./images/nptr-cover.png) <!-- Replace with your screenshot: e.g., nptr-cover.png -->

## Overview

The **National Petroleum Technology Repository (NPTR)** is a full-stack platform designed to centralize Nigeria’s petroleum research, training outputs, and innovation assets. It acts as a digital library, a petroleum data bank, and an innovation showcase — enabling researchers, trainees, and industry users to discover, request access to, and share technical documents and datasets in a secure, governed environment.

This project showcases building a modern, component-driven frontend with a secure Laravel backend, role-based access control, document previews, and approval flows tailored for institutional and academic stakeholders.

---

## Why this matters

* Preserves and organizes valuable research and technical outputs for future use.
* Encourages collaboration between academia, industry, and government.
* Provides controlled access to sensitive datasets while enabling transparency for approved users.
* Highlights innovation assets and tracks technology readiness to encourage commercialization.

---

## Key Features

* Document library for theses, reports, patents, and training materials
* Tiered data bank for seismic and production datasets with permission gates
* Innovation showcase with technology readiness levels and contributor profiles
* Role-based dashboards (Super Admin, Organization Admin, Academic, Trainee, Contributor)
* Inline PDF previews and templated PDF exports
* Request data access workflows and gated approvals
* Component-driven React frontend with skeleton loaders and polished UI

---

## Tech Stack (simple summary for recruiters)

* **Frontend:** React 19, Vite, React Router, Tailwind CSS, Framer Motion, Lucide icons, Axios
* **Document Preview:** React PDF for inline document viewing
* **Backend:** Laravel 12 (PHP 8.2) with Sanctum for authentication
* **Storage:** MySQL (or S3 in production for large datasets)
* **Exports:** DOMPDF for templated PDF generation
* **Jobs & Queues:** Laravel queues for background processing (exports, notifications)

---

## Project Structure (high level)

* `frontend/` — React codebase: components, pages, routes, and UI system
* `backend/` — Laravel API, migrations, seeders, and job definitions
* `storage/` — documents, preview cache, and dataset artifacts
* `docs/` — data model diagrams, API specs, and stakeholder notes

---

## Screenshots

Insert a few screenshots highlighting the library, a dataset request page, and the innovation showcase:

```md
![Library View](./images/nptr-library-view.png)         <!-- Add: nptr-library-view.png -->
![Dataset Request](./images/nptr-dataset-request.png)   <!-- Add: nptr-dataset-request.png -->
![Innovation Showcase](./images/nptr-showcase.png)     <!-- Add: nptr-showcase.png -->
```

---

## How I built it (process)

1. **Stakeholder research & wireframes** — prioritized primary user journeys: discover, request access, submit research.
2. **Component-driven UI** — built reusable components (cards, lists, modals) so features could be assembled quickly and consistently.
3. **API-first backend** — implemented Laravel APIs with clear resources and policies so the frontend could use clean endpoints.
4. **Secure access & gating** — used Laravel Sanctum and role middleware to enforce permissions on datasets and sensitive documents.
5. **Document UX** — integrated inline previews so users can quickly evaluate documents before requesting access.
6. **Export & Reporting** — added PDF exports for templated certificates, summaries, and contributor reports.

---


## What I learned / Highlights

* Implementing secure, role-gated data access that balances openness with sensitivity.
* Building a fast, user-friendly document browsing experience with inline previews.
* Designing a frontend component library that accelerates new feature development.
* Managing large file uploads and building exportable, templated PDFs.

---

## Future improvements (ideas)

* Dataset visualization tools for common petroleum formats (time series, maps).
* Fine-grained analytics on downloads and data requests for reporting.
* API keys and partner integrations for research institutions.
* Add federated search across other institutional repositories.

---



