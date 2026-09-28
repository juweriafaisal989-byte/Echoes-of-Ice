import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  Database,
  FileText,
  Image,
  MapPin,
  Users,
} from 'lucide-react';

import {
  getExpeditionById,
  getLocationById,
  getPublicationsByExpedition,
  getDatasetsByExpedition,
  getMediaByExpedition,
  getResearchersByExpedition,
} from '../data/mockData';

import {
  DemoBadge,
  EmptyState,
  RegionBadge,
} from '../components/ui';

import {
  PublicationCard,
  DatasetCard,
  MediaCard,
  ResearcherCard,
} from '../components/Cards';

import MapPanel from '../components/MapPanel';

const tabs = [
  'Overview',
  'Research',
  'Datasets',
  'Media',
  'Documents',
  'Connections',
] as const;

type Tab = (typeof tabs)[number];

export default function ExpeditionDetail() {
  const { id } = useParams<{ id: string }>();

  const [tab, setTab] = useState<Tab>('Overview');

  /*
   * Find the expedition using the ID from the URL.
   *
   * Example:
   * /expeditions/e1
   *
   * id = "e1"
   */
  const expedition = id ? getExpeditionById(id) : undefined;

  /*
   * If the URL contains an invalid expedition ID,
   * show a friendly message instead of crashing.
   */
  if (!expedition) {
    return (
      <div className="py-12">
        <EmptyState
          title="Expedition not found"
          description="This expedition does not exist."
        />

        <div className="mt-6 flex justify-center">
          <Link
            to="/expeditions"
            className="inline-flex items-center gap-2 rounded-md bg-polar-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-polar-800"
          >
            <ArrowLeft size={16} />
            Back to Expeditions
          </Link>
        </div>
      </div>
    );
  }

  /*
   * Related expedition data.
   */
  const location = getLocationById(expedition.locationId);

  const publications = getPublicationsByExpedition(
    expedition.id
  );

  const datasets = getDatasetsByExpedition(
    expedition.id
  );

  const media = getMediaByExpedition(
    expedition.id
  );

  const team = getResearchersByExpedition(
    expedition.id
  );

  return (
    <div className="space-y-6">

      {/* =========================================================
          BACK BUTTON
      ========================================================= */}

      <Link
        to="/expeditions"
        className="inline-flex items-center gap-2 text-sm font-medium text-polar-700 transition hover:text-polar-900"
      >
        <ArrowLeft size={16} />
        Back to Expeditions
      </Link>


      {/* =========================================================
          HERO / EXPEDITION HEADER
      ========================================================= */}

      <section className="card-surface overflow-hidden">

        <div className="p-6 md:p-8">

          {/* Badges */}

          <div className="flex flex-wrap items-center gap-2">

            <RegionBadge
              region={expedition.region}
            />

            <DemoBadge
              label="DEMO EXPEDITION"
            />

            <span className="rounded bg-polar-frost px-2.5 py-1 text-xs font-medium text-polar-800/70">
              {expedition.status}
            </span>

          </div>


          {/* Title */}

          <h1 className="mt-4 max-w-5xl font-display text-3xl text-polar-900 md:text-4xl">
            {expedition.title}
          </h1>


          {/* Description */}

          <p className="mt-3 max-w-4xl text-base leading-7 text-polar-800/70">
            {expedition.description}
          </p>


          {/* Metadata */}

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-lg bg-polar-frost/60 p-4">

              <div className="flex items-center gap-2 text-polar-700">
                <CalendarDays size={18} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Date
                </span>
              </div>

              <p className="mt-2 text-sm text-polar-900">
                {expedition.startDate}
              </p>

              <p className="text-sm text-polar-800/60">
                to {expedition.endDate}
              </p>

            </div>


            <div className="rounded-lg bg-polar-frost/60 p-4">

              <div className="flex items-center gap-2 text-polar-700">
                <MapPin size={18} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Location
                </span>
              </div>

              <p className="mt-2 text-sm text-polar-900">
                {location?.name ?? 'Unknown location'}
              </p>

              <p className="text-xs text-polar-800/60">
                {expedition.region}
              </p>

            </div>


            <div className="rounded-lg bg-polar-frost/60 p-4">

              <div className="flex items-center gap-2 text-polar-700">
                <Users size={18} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Research Team
                </span>
              </div>

              <p className="mt-2 text-sm text-polar-900">
                {team.length} researchers
              </p>

              <p className="text-xs text-polar-800/60">
                {expedition.institution}
              </p>

            </div>


            <div className="rounded-lg bg-polar-frost/60 p-4">

              <div className="flex items-center gap-2 text-polar-700">
                <Database size={18} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Research Area
                </span>
              </div>

              <p className="mt-2 text-sm text-polar-900">
                {expedition.researchArea}
              </p>

              <p className="text-xs text-polar-800/60">
                Polar research
              </p>

            </div>

          </div>


          {/* Story Mode */}

          <div className="mt-6">

            <Link
              to={`/expeditions/${expedition.id}/story`}
              className="inline-flex items-center gap-2 rounded-md border border-polar-700 px-4 py-2 text-sm font-medium text-polar-700 transition hover:bg-polar-icelight"
            >
              View public Story Mode
              <span aria-hidden="true">→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          TAB NAVIGATION
      ========================================================= */}

      <div className="sticky top-0 z-10 -mx-2 overflow-x-auto bg-polar-ice/95 px-2 py-1 backdrop-blur">

        <div className="flex min-w-max gap-1 border-b border-polar-800/10">

          {tabs.map((item) => {

            const isActive = tab === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`
                  border-b-2
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-colors
                  ${
                    isActive
                      ? 'border-polar-700 text-polar-900'
                      : 'border-transparent text-polar-800/60 hover:text-polar-900'
                  }
                `}
              >
                {item}
              </button>
            );
          })}

        </div>

      </div>


      {/* =========================================================
          OVERVIEW
      ========================================================= */}

      {tab === 'Overview' && (

        <div className="grid gap-6 lg:grid-cols-3">

          {/* LEFT */}

          <div className="space-y-6 lg:col-span-2">

            {/* Research Objectives */}

            <section className="card-surface p-6">

              <h2 className="font-display text-xl text-polar-900">
                Research Objectives
              </h2>

              {expedition.researchObjectives.length === 0 ? (

                <p className="mt-3 text-sm text-polar-800/60">
                  No research objectives have been added.
                </p>

              ) : (

                <ul className="mt-4 space-y-3">

                  {expedition.researchObjectives.map(
                    (objective, index) => (

                      <li
                        key={`${objective}-${index}`}
                        className="flex gap-3 text-sm leading-6 text-polar-800/80"
                      >

                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-polar-700" />

                        <span>
                          {objective}
                        </span>

                      </li>

                    )
                  )}

                </ul>

              )}

            </section>


            {/* Findings */}

            <section className="card-surface p-6">

              <h2 className="font-display text-xl text-polar-900">
                Findings
              </h2>

              {expedition.findings.length === 0 ? (

                <p className="mt-3 text-sm text-polar-800/60">
                  No findings have been added yet.
                </p>

              ) : (

                <ul className="mt-4 space-y-3">

                  {expedition.findings.map(
                    (finding, index) => (

                      <li
                        key={`${finding}-${index}`}
                        className="flex gap-3 text-sm leading-6 text-polar-800/80"
                      >

                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-polar-700" />

                        <span>
                          {finding}
                        </span>

                      </li>

                    )
                  )}

                </ul>

              )}

            </section>


            {/* Quick statistics */}

            <section className="grid gap-4 sm:grid-cols-3">

              <div className="card-surface p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-polar-800/50">
                  Publications
                </p>

                <p className="mt-2 font-display text-3xl text-polar-900">
                  {publications.length}
                </p>

              </div>


              <div className="card-surface p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-polar-800/50">
                  Datasets
                </p>

                <p className="mt-2 font-display text-3xl text-polar-900">
                  {datasets.length}
                </p>

              </div>


              <div className="card-surface p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-polar-800/50">
                  Media
                </p>

                <p className="mt-2 font-display text-3xl text-polar-900">
                  {media.length}
                </p>

              </div>

            </section>

          </div>


          {/* RIGHT */}

          <aside className="space-y-6">

            {/* Team */}

            <section>

              <h2 className="font-display text-xl text-polar-900">
                Research Team
              </h2>

              <div className="mt-4 space-y-3">

                {team.length === 0 ? (

                  <EmptyState
                    title="No researchers"
                    description="No researchers are linked to this expedition."
                  />

                ) : (

                  team.map((researcher) => (

                    <ResearcherCard
                      key={researcher.id}
                      researcher={researcher}
                    />

                  ))

                )}

              </div>

            </section>


            {/* Location */}

            {location && (

              <section>

                <h2 className="font-display text-xl text-polar-900">
                  Location
                </h2>

                <div className="mt-4">

                  <MapPanel
                    locations={[location]}
                    height={260}
                    center={[
                      location.lat,
                      location.lng,
                    ]}
                    zoom={4}
                  />

                </div>

                <div className="mt-3 rounded-lg bg-polar-frost/60 p-4">

                  <p className="text-sm font-medium text-polar-900">
                    {location.name}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-polar-800/60">
                    {location.description}
                  </p>

                </div>

              </section>

            )}

          </aside>

        </div>

      )}


      {/* =========================================================
          RESEARCH / PUBLICATIONS
      ========================================================= */}

      {tab === 'Research' && (

        <section>

          <div className="mb-5">

            <h2 className="font-display text-2xl text-polar-900">
              Research & Publications
            </h2>

            <p className="mt-1 text-sm text-polar-800/60">
              Publications connected to this expedition.
            </p>

          </div>


          {publications.length === 0 ? (

            <EmptyState
              title="No linked publications"
              description="No publications are connected to this expedition yet."
            />

          ) : (

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {publications.map((publication) => (

                <PublicationCard
                  key={publication.id}
                  publication={publication}
                />

              ))}

            </div>

          )}

        </section>

      )}


      {/* =========================================================
          DATASETS
      ========================================================= */}

      {tab === 'Datasets' && (

        <section>

          <div className="mb-5">

            <h2 className="font-display text-2xl text-polar-900">
              Datasets
            </h2>

            <p className="mt-1 text-sm text-polar-800/60">
              Research datasets associated with this expedition.
            </p>

          </div>


          {datasets.length === 0 ? (

            <EmptyState
              title="No linked datasets"
              description="No datasets are connected to this expedition yet."
            />

          ) : (

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {datasets.map((dataset) => (

                <DatasetCard
                  key={dataset.id}
                  dataset={dataset}
                />

              ))}

            </div>

          )}

        </section>

      )}


      {/* =========================================================
          MEDIA
      ========================================================= */}

      {tab === 'Media' && (

        <section>

          <div className="mb-5">

            <h2 className="font-display text-2xl text-polar-900">
              Expedition Media
            </h2>

            <p className="mt-1 text-sm text-polar-800/60">
              Photos, videos, audio and visual records from the field.
            </p>

          </div>


          {media.length === 0 ? (

            <EmptyState
              title="No linked media"
              description="No media assets are connected to this expedition yet."
            />

          ) : (

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

              {media.map((item) => (

                <MediaCard
                  key={item.id}
                  item={item}
                />

              ))}

            </div>

          )}

        </section>

      )}


      {/* =========================================================
          DOCUMENTS
      ========================================================= */}

      {tab === 'Documents' && (

        <section>

          <div className="mb-5">

            <h2 className="font-display text-2xl text-polar-900">
              Documents
            </h2>

            <p className="mt-1 text-sm text-polar-800/60">
              Reports and supporting documents for this expedition.
            </p>

          </div>


          <div className="card-surface p-6">

            <div className="flex items-start gap-4">

              <div className="rounded-lg bg-polar-icelight p-3">
                <FileText
                  size={24}
                  className="text-polar-700"
                />
              </div>

              <div className="flex-1">

                <h3 className="text-sm font-semibold text-polar-900">
                  {expedition.title} — Expedition Report
                </h3>

                <p className="mt-1 text-xs text-polar-800/60">
                  PDF · Demo document
                </p>

                <p className="mt-3 text-sm leading-6 text-polar-800/70">
                  This prototype contains a placeholder expedition
                  report. A production version can connect this section
                  to real research documents and downloadable files.
                </p>

                <span className="mt-4 inline-block rounded-md bg-polar-frost px-3 py-1.5 text-xs text-polar-800/60">
                  Demo document — download unavailable
                </span>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* =========================================================
          CONNECTIONS
      ========================================================= */}

      {tab === 'Connections' && (

        <section className="card-surface p-6">

          <div className="mb-6">

            <h2 className="font-display text-2xl text-polar-900">
              Knowledge Connections
            </h2>

            <p className="mt-1 text-sm text-polar-800/60">
              Explore researchers and publications connected to this
              expedition.
            </p>

          </div>


          {/* Expedition */}

          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-polar-700 px-4 py-2 text-sm font-medium text-white">
              {expedition.title}
            </span>

            <span className="text-sm text-polar-800/40">
              connects to
            </span>


            {/* Researchers */}

            {team.map((researcher) => (

              <Link
                key={researcher.id}
                to={`/researchers/${researcher.id}`}
                className="flex items-center gap-2 rounded-full bg-polar-icelight px-3 py-2 text-sm text-polar-800 transition hover:bg-polar-ice/40"
              >

                <Users size={14} />

                {researcher.name}

              </Link>

            ))}


            {/* Publications */}

            {publications.map((publication) => (

              <span
                key={publication.id}
                className="flex items-center gap-2 rounded-full bg-polar-frost px-3 py-2 text-sm text-polar-800"
                title={publication.title}
              >

                <FileText size={14} />

                {publication.title.length > 32
                  ? `${publication.title.slice(0, 32)}…`
                  : publication.title}

              </span>

            ))}


            {/* Datasets */}

            {datasets.map((dataset) => (

              <span
                key={dataset.id}
                className="flex items-center gap-2 rounded-full bg-polar-frost px-3 py-2 text-sm text-polar-800"
                title={dataset.title}
              >

                <Database size={14} />

                {dataset.title.length > 32
                  ? `${dataset.title.slice(0, 32)}…`
                  : dataset.title}

              </span>

            ))}


            {/* Media */}

            {media.length > 0 && (

              <span className="flex items-center gap-2 rounded-full bg-polar-frost px-3 py-2 text-sm text-polar-800">

                <Image size={14} />

                {media.length} media assets

              </span>

            )}

          </div>


          <Link
            to="/connections"
            className="mt-6 inline-flex text-sm font-medium text-polar-700 hover:underline"
          >
            Open full Knowledge Connections explorer →
          </Link>

        </section>

      )}

    </div>
  );
}