import { useMemo, useState } from 'react';
import {
  Search,
  MapPin,
  Snowflake,
  Compass,
  CheckCircle2,
  Database,
} from 'lucide-react';

import { locations } from '../data/mockData';
import type { LocationSite } from '../types';
import MapPanel, {
  type MapDisplayLocation,
} from '../components/MapPanel';

const siteTypes: Array<'All' | LocationSite['type']> = [
  'All',
  'Research Station',
  'Expedition Site',
  'Observation Site',
  'Geographic Feature',
];

// Coordinates are based on published institutional sources.
// The South Pole marker is offset slightly for Web Mercator rendering.
const verifiedStations: MapDisplayLocation[] = [
  {
    id: 'verified-mcmurdo',
    name: 'McMurdo Station',
    lat: -77.8482,
    lng: 166.6685,
    type: 'Research Station',
    region: 'Antarctic',
    description:
      'A major Antarctic research and logistics station operated by the United States Antarctic Program.',
    verificationStatus: 'verified',
    coordinateLabel: '77.8482° S, 166.6685° E',
    sourceLabel: 'U.S. National Science Foundation',
    sourceUrl:
      'https://www.nsf.gov/geo/opp/ail/mcmurdo-station',
  },
  {
    id: 'verified-palmer',
    name: 'Palmer Station',
    lat: -64.7742,
    lng: -64.0533,
    type: 'Research Station',
    region: 'Antarctic',
    description:
      'A year-round Antarctic research station on Anvers Island, known for marine and biological research.',
    verificationStatus: 'verified',
    coordinateLabel: '64.7742° S, 64.0533° W',
    sourceLabel: 'U.S. National Science Foundation',
    sourceUrl:
      'https://www.nsf.gov/geo/opp/ail/palmer-station',
  },
  {
    id: 'verified-ny-alesund',
    name: 'UK Arctic Research Station, Ny-Ålesund',
    lat: 78.916667,
    lng: 11.933333,
    type: 'Research Station',
    region: 'Arctic',
    description:
      'A British Antarctic Survey research facility in the international research community of Ny-Ålesund, Svalbard.',
    verificationStatus: 'verified',
    coordinateLabel: '78.9167° N, 11.9333° E',
    sourceLabel: 'British Antarctic Survey',
    sourceUrl:
      'https://www.bas.ac.uk/polar-operations/sites-and-facilities/facility/ny-alesund/',
  },
  {
    id: 'verified-south-pole',
    name: 'Amundsen–Scott South Pole Station',
    lat: -89.9,
    lng: 0,
    type: 'Research Station',
    region: 'Antarctic',
    description:
      'A research station at the geographic South Pole. Its marker is offset slightly from the exact pole to support Web Mercator map rendering.',
    verificationStatus: 'verified',
    coordinateLabel:
      '90.0000° S, 0.0000° E — marker offset for map rendering',
    sourceLabel: 'NOAA Antarctic UV Network',
    sourceUrl:
      'https://www.gml.noaa.gov/grad/antuv/Stations.jsp',
    mapNote:
      'The displayed marker is a cartographic adjustment, not the exact station position.',
  },
];

const normalizeName = (name: string) =>
  name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g, '');

export default function PolarMap() {
  const [query, setQuery] = useState('');
  const [type, setType] =
    useState<(typeof siteTypes)[number]>('All');
  const [region, setRegion] = useState<
    'All' | 'Arctic' | 'Antarctic'
  >('All');

  // Merge verified station coordinates with existing locations.
  // Existing expedition IDs are retained when station names match.
  const allLocations = useMemo<MapDisplayLocation[]>(() => {
    const merged = new Map<string, MapDisplayLocation>();

    locations.forEach((location) => {
      merged.set(normalizeName(location.name), {
        ...location,
        verificationStatus: 'unverified',
      });
    });

    verifiedStations.forEach((station) => {
      const key = normalizeName(station.name);
      const existing = merged.get(key);

      merged.set(key, {
        ...existing,
        ...station,
        id: existing?.id ?? station.id,
        expeditionId:
          existing?.expeditionId ?? station.expeditionId,
      } as MapDisplayLocation);
    });

    return Array.from(merged.values());
  }, []);

  const filteredLocations = useMemo(() => {
    const search = query.trim().toLowerCase();

    return allLocations.filter((location) => {
      const matchesQuery =
        !search ||
        location.name.toLowerCase().includes(search) ||
        location.description.toLowerCase().includes(search) ||
        location.region.toLowerCase().includes(search);

      const matchesRegion =
        region === 'All' || location.region === region;

      const matchesType =
        type === 'All' || location.type === type;

      return matchesQuery && matchesRegion && matchesType;
    });
  }, [allLocations, query, region, type]);

  const verifiedCount = filteredLocations.filter(
    (location) => location.verificationStatus === 'verified',
  ).length;

  const arcticCount = filteredLocations.filter(
    (location) => location.region === 'Arctic',
  ).length;

  const antarcticCount = filteredLocations.filter(
    (location) => location.region === 'Antarctic',
  ).length;

  return (
    <div className="min-h-screen space-y-6 bg-[#061525] p-4 text-white sm:p-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-cyan-300">
            <Snowflake size={20} />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">
              Echoes of Ice
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Polar Research Explorer
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Discover research stations, expeditions, and observation
            sites across Earth's polar regions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs text-cyan-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
          Interactive research map
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={<MapPin size={19} />}
          label="Visible locations"
          value={filteredLocations.length}
          color="cyan"
        />
        <StatCard
          icon={<Snowflake size={19} />}
          label="Arctic locations"
          value={arcticCount}
          color="blue"
        />
        <StatCard
          icon={<CheckCircle2 size={19} />}
          label="Verified reference stations"
          value={verifiedCount}
          color="green"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-cyan-100/10 bg-[#0a2034] shadow-2xl shadow-black/20">
        <div className="space-y-4 border-b border-white/10 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Explore the polar regions
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {antarcticCount} Antarctic · {arcticCount} Arctic
                locations currently visible
              </p>
            </div>

            <label className="relative block w-full lg:max-w-sm">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search stations or locations..."
                className="w-full rounded-xl border border-cyan-100/15 bg-[#061525] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/10"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              Region
            </span>
            {(['All', 'Arctic', 'Antarctic'] as const).map((item) => (
              <FilterButton
                key={item}
                active={region === item}
                onClick={() => setRegion(item)}
              >
                {item === 'Arctic' ? '❄ ' : ''}
                {item}
              </FilterButton>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              Site type
            </span>
            {siteTypes.map((item) => (
              <FilterButton
                key={item}
                active={type === item}
                onClick={() => setType(item)}
              >
                {item}
              </FilterButton>
            ))}
          </div>
        </div>

        {filteredLocations.length > 0 ? (
          <MapPanel
            locations={filteredLocations}
            height={620}
            center={[0, 0]}
            zoom={2}
          />
        ) : (
          <div className="flex min-h-80 flex-col items-center justify-center gap-3 p-8 text-center">
            <Compass size={36} className="text-cyan-300" />
            <h3 className="text-lg font-semibold text-white">
              No matching locations
            </h3>
            <p className="max-w-sm text-sm text-slate-400">
              Try a different search or reset the region and site-type
              filters.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setRegion('All');
                setType('All');
              }}
              className="rounded-lg border border-cyan-300/30 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-300/10"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2">
            <Database size={14} className="text-cyan-300" />
            {verifiedCount} verified reference stations in this view
          </span>
          <span>
            Other prototype locations may still use unverified demo data.
          </span>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'cyan' | 'blue' | 'green';
}) {
  const colors = {
    cyan: 'border-cyan-300/20 bg-cyan-300/5 text-cyan-300',
    blue: 'border-blue-300/20 bg-blue-300/5 text-blue-300',
    green: 'border-emerald-300/20 bg-emerald-300/5 text-emerald-300',
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a2034] p-4">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg border p-2 ${colors[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-slate-400">{label}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-xs font-medium transition duration-200 ${
        active
          ? 'border-cyan-300/50 bg-cyan-300/15 text-cyan-100 shadow-sm shadow-cyan-300/10'
          : 'border-white/10 bg-[#061525] text-slate-300 hover:border-cyan-300/30 hover:text-cyan-100'
      }`}
    >
      {children}
    </button>
  );
}