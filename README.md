# Brokr Agency Fit Scan

This repository contains a Next.js 14 application that prototypes the Brokr Agency-Fit Risk Scan (AFRS) and Agency Proposal Decoder (APD). The experience pairs a 7-minute multi-step readiness diagnostic with an optional proposal analysis workspace, deterministic scoring across four pillars, and sales enablement outputs including top risks, a fix-first checklist, and an auto-generated Loom talk-track.

## Highlights

- **Brand fidelity** — Tailwind CSS is configured with the Brokr navy/blue/gold palette, typography, and UI tokens described in the design system brief.
- **Readiness diagnostic** — A 16-step multi-step form (React Hook Form + Zod) captures strategy, channels, operations, and measurement signals with progress tracking, autosave, and validation.
- **Deterministic scoring** — `src/lib/scoring` implements rule-based logic for each pillar, calculates an overall score, and derives fit tiers (A/B/C) with benchmark narratives.
- **Risk surfacing** — `src/lib/flags/detector.ts` inspects answers to highlight the most urgent risks, piping them into the results UI and Loom script.
- **Fix-first checklist** — `src/lib/checklist/generator.ts` maps score + flag context into a prioritized 30-day action plan.
- **Proposal decoder sandbox** — Final form step embeds upload/paste controls and a mock analyzer, illustrating how APD flows would integrate once document processing APIs are live.
- **Results experience** — Stored results render instantly in `/results/[scanId]` with score overview, pillar heatmap, risk callouts, checklist, Loom script, and call-to-action.

## Getting Started

1. Install dependencies (requires Node.js 18+):

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Navigate to `http://localhost:3000` to explore the landing page, run the scan, and review generated results.

> ℹ️ This prototype keeps state in browser storage (localStorage + sessionStorage) and mocks proposal analysis for rapid iteration. Server APIs, PDF generation, CRM sync, and analytics integrations can be layered in following the directory scaffolding provided in `src/app/api` and `src/lib`.
