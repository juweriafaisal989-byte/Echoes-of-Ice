import { Link } from 'react-router-dom';
import { CalendarDays, Download, FileText, Image as ImageIcon, MapPin, Mic, Video } from 'lucide-react';
import type { Dataset, Expedition, LocationSite, MediaItem, Publication, Researcher } from '../types';
import { DemoBadge, RegionBadge } from './ui';

export function ExpeditionCard({ expedition }: { expedition: Expedition }) {
  return (
    <Link
      to={`/expeditions/${expedition.id}`}
      className="card-surface group flex flex-col gap-3 p-5 transition-shadow hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-2">
        <RegionBadge region={expedition.region} />
        <DemoBadge />
      </div>
      <h3 className="font-display text-lg text-polar-900 group-hover:text-polar-700">{expedition.title}</h3>
      <p className="line-clamp-2 text-sm text-polar-800/70">{expedition.description}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-polar-800/60">
        <span className="flex items-center gap-1">
          <CalendarDays size={13} /> {expedition.startDate} – {expedition.endDate}
        </span>
        <span className="rounded bg-polar-frost px-2 py-0.5">{expedition.status}</span>
        <span>{expedition.researchArea}</span>
      </div>
    </Link>
  );
}

export function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <div className="card-surface flex flex-col gap-2 p-5">
      <div className="flex items-center justify-between gap-2">
        <RegionBadge region={publication.region} />
        <DemoBadge />
      </div>
      <h3 className="font-display text-base text-polar-900">{publication.title}</h3>
      <p className="text-xs text-polar-800/60">{publication.authors.join(', ')}</p>
      <p className="line-clamp-2 text-sm text-polar-800/70">{publication.abstract}</p>
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-polar-800/60">
        <span>{publication.journal}</span>
        <span>{publication.publicationDate}</span>
        <span className="font-mono">{publication.doi}</span>
      </div>
    </div>
  );
}

export function DatasetCard({ dataset }: { dataset: Dataset }) {
  return (
    <div className="card-surface flex flex-col gap-2 p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded bg-polar-icelight px-2 py-0.5 text-xs font-medium text-polar-700">
          {dataset.datasetType}
        </span>
        <DemoBadge />
      </div>
      <h3 className="font-display text-base text-polar-900">{dataset.title}</h3>
      <p className="line-clamp-2 text-sm text-polar-800/70">{dataset.description}</p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-polar-800/60">
        <span>{dataset.fileFormat}</span>
        <span>{dataset.fileSizeMb} MB</span>
        <span>{dataset.license}</span>
      </div>
      <div className="mt-2 flex gap-2">
        <button className="flex items-center gap-1.5 rounded-md border border-polar-800/15 px-3 py-1.5 text-xs font-medium text-polar-800 hover:border-polar-700/40">
          <FileText size={13} /> View
        </button>
        <button className="flex items-center gap-1.5 rounded-md bg-polar-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-polar-600">
          <Download size={13} /> Download
        </button>
      </div>
    </div>
  );
}

const mediaIcon = { Photo: ImageIcon, Video: Video, Audio: Mic, Infographic: FileText };

export function MediaCard({ item }: { item: MediaItem }) {
  const Icon = mediaIcon[item.type];
  return (
    <div className="card-surface overflow-hidden">
      <div
        className="flex h-36 items-center justify-center"
        style={{ background: `linear-gradient(135deg, #${item.colorSeed}, #0A1F38)` }}
      >
        <Icon className="text-white/80" size={28} />
      </div>
      <div className="p-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium text-polar-700">{item.type}</span>
          <DemoBadge />
        </div>
        <p className="line-clamp-2 text-sm text-polar-900">{item.title}</p>
        <p className="mt-1 text-xs text-polar-800/60">
          {item.region} · {item.year}
        </p>
      </div>
    </div>
  );
}

export function ResearcherCard({ researcher }: { researcher: Researcher }) {
  return (
    <Link
      to={`/researchers/${researcher.id}`}
      className="card-surface flex items-center gap-4 p-4 transition-shadow hover:shadow-lg"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-polar-700 font-display text-lg text-white">
        {researcher.name
          .split(' ')
          .map((n) => n[0])
          .slice(1)
          .join('')}
      </div>
      <div className="min-w-0">
        <p className="truncate font-medium text-polar-900">{researcher.name}</p>
        <p className="truncate text-xs text-polar-800/60">{researcher.designation}</p>
        <p className="truncate text-xs text-polar-800/60">{researcher.institution}</p>
      </div>
    </Link>
  );
}

export function LocationCard({ location }: { location: LocationSite }) {
  return (
    <div className="card-surface flex items-start gap-3 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-polar-icelight text-polar-700">
        <MapPin size={16} />
      </div>
      <div>
        <p className="font-medium text-polar-900">{location.name}</p>
        <p className="text-xs text-polar-800/60">
          {location.type} · {location.region}
        </p>
        <p className="mt-1 text-sm text-polar-800/70">{location.description}</p>
      </div>
    </div>
  );
}
