# PolarVerse

**Connecting Polar Science, Research & the World**

Echoes of Ice is an integrated polar science knowledge repository and public outreach platform, built as a Smart India Hackathon prototype. It connects expeditions, scientific research, datasets, media and public communication in one professional research portal.

> All data in this prototype is **DEMO DATA** — fictional expeditions, publications, datasets, researchers and media generated to demonstrate the platform. It does not represent real science.

## Features

- **Home & Dashboard** — hero sections, live-computed statistics, activity charts, and a polar research map
- **Expeditions** — a searchable/filterable explorer with detailed tabs (Overview, Research, Datasets, Media, Documents, Connections)
- **Research & Publications** — a filterable publication repository
- **Datasets** — a dataset catalog with type, format, size, and license metadata
- **Media Library** — a filterable gallery of photos, videos, audio and infographics
- **Polar Map** — an interactive Leaflet map of research stations, expedition sites, observation sites and geographic features
- **Ask *Echoes of Ice* — a source-grounded demo AI assistant (DEMO AI MODE) answering questions from the local dataset
- **Outreach Studio** — a draft-generation workflow (source → content type → draft → edit → submit → approve → publish)
- **Knowledge Connections** — a relationship explorer linking expeditions to researchers, publications, datasets and outreach stories
- **Story Mode** — a public-friendly, six-step narrative view of any expedition
- **Researcher Profiles** — individual pages summarizing a researcher's expeditions, publications and datasets
- **Admin** — tabbed management views over every record type (demo data; changes are not persisted)

## Technology Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts (charts)
- Leaflet + React Leaflet (maps)
- Lucide React (icons)

## Installation

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

To create a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
polarverse/
├── index.html
├── package.json
├── src/
│   ├── main.tsx            # App entry point
│   ├── App.tsx              # Route definitions
│   ├── index.css            # Tailwind layers + global styles
│   ├── types/                # Shared TypeScript interfaces
│   ├── data/mockData.ts      # All demo data + lookup helpers
│   ├── components/           # Reusable UI (Sidebar, Navbar, cards, map, etc.)
│   └── pages/                 # One file per route
├── public/                    # Static assets (favicon)
└── tailwind.config.js / postcss.config.js / vite.config.ts / tsconfig*.json
```

## Demo Data

Demo data lives entirely in `src/data/mockData.ts`: 15 expeditions, 25 publications, 10 datasets, 50 media records, 15 locations, 10 researchers, and 15 outreach records, all cross-linked by ID. The flagship record is the **Antarctic Coastal Observation Expedition 2026**, connected to 3 researchers, 3 publications, 2 datasets and 15 media assets.

## Connecting Supabase Later

The data layer is isolated behind the lookup functions exported from `src/data/mockData.ts` (`getExpeditionById`, `getPublicationsByExpedition`, etc.). To move to Supabase:

1. `npm install @supabase/supabase-js`
2. Create a Supabase client in a new `src/lib/supabaseClient.ts`, reading `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from a `.env` file (never commit this file).
3. Replace the bodies of the lookup functions (and the exported arrays) with Supabase queries returning the same shapes defined in `src/types/index.ts`, so pages and components require no changes.
4. Mirror the demo tables (`expeditions`, `publications`, `datasets`, `media`, `researchers`, `locations`, `outreach_content`) in your Supabase schema.

## Connecting a Real AI API Later

`src/pages/AskPolarVerse.tsx` currently answers with predefined, source-grounded responses from `answerFor()`. To connect a real LLM:

1. Add an API route or edge function that accepts a question plus retrieved context (expedition, publication and dataset text) and calls your LLM provider.
2. Replace the `answerFor()` call in `AskPolarVerse.tsx` with a `fetch` to that endpoint, keeping the same `ChatMessage` shape (including a `sources` array) so the UI needs no changes.
3. Update the "DEMO AI MODE" badge once a real model is wired in.

The same pattern applies to `src/pages/OutreachStudio.tsx`'s `generateDraft()` function for real AI-assisted outreach generation.

## Notes

- No paid external API or Supabase project is required to run this prototype — everything works immediately after `npm install && npm run dev`.
- `node_modules`, build output, and any secrets are intentionally excluded from this package.
