
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { expeditions } from '../data/mockData';
import { ExpeditionCard } from '../components/Cards';
import { EmptyState, PillButton, SectionHeader } from '../components/ui';

export default function Expeditions() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<'All' | 'Arctic' | 'Antarctic'>('All');
  const [status, setStatus] = useState<
    'All' | 'Planned' | 'Active' | 'Completed'
  >('All');
  const [area, setArea] = useState('All');

  const areas = useMemo(
    () => ['All', ...new Set(expeditions.map((e) => e.researchArea))],
    []
  );

  const filtered = expeditions.filter((e) => {
    const search = query.trim().toLowerCase();

    const matchesQuery =
      !search ||
      e.title.toLowerCase().includes(search) ||
      e.institution.toLowerCase().includes(search);

    const matchesRegion = region === 'All' || e.region === region;
    const matchesStatus = status === 'All' || e.status === status;
    const matchesArea = area === 'All' || e.researchArea === area;

    return matchesQuery && matchesRegion && matchesStatus && matchesArea;
  });

  return (
    <main
      className="min-h-screen space-y-6 bg-[#061d3b] p-4 text-white sm:p-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(3,24,55,0.78),rgba(3,24,55,0.88)),url('/arctic-background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div>
  <h1 className="text-3xl font-bold text-sky-300">
    Expeditions
  </h1>

  <p className="mt-2 text-blue-300">
    Browse polar field campaigns across research programs
  </p>
</div>

      {/* Search and filters */}
      <section className="space-y-5 rounded-2xl border border-cyan-200/25 bg-[#08264a]/95 p-5 shadow-xl sm:p-6">
        <label htmlFor="expedition-search" className="block text-sm font-medium text-white">
          Search expeditions
        </label>

        <div className="relative">
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-200"
          />

          <input
            id="expedition-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by expedition or institution..."
            className="w-full rounded-xl border border-cyan-200/30 bg-[#041a35] py-3 pl-11 pr-4 text-white placeholder:text-blue-200 outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">Region</p>
          <div className="flex flex-wrap gap-2">
            {(['All', 'Arctic', 'Antarctic'] as const).map((r) => (
              <PillButton
                key={r}
                active={region === r}
                onClick={() => setRegion(r)}
              >
                {r}
              </PillButton>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">Status</p>
          <div className="flex flex-wrap gap-2">
            {(['All', 'Planned', 'Active', 'Completed'] as const).map((s) => (
              <PillButton
                key={s}
                active={status === s}
                onClick={() => setStatus(s)}
              >
                {s}
              </PillButton>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">Research area</p>
          <div className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <PillButton
                key={a}
                active={area === a}
                onClick={() => setArea(a)}
              >
                {a}
              </PillButton>
            ))}
          </div>
        </div>
      </section>

      {/* Results count */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-white">
          Expedition results
        </h2>
        <p className="text-sm text-sky-100">
          {filtered.length} {filtered.length === 1 ? 'expedition' : 'expeditions'} found
        </p>
      </div>

      {/* Expedition cards */}
      {filtered.length === 0 ? (
        <section className="rounded-2xl border border-cyan-200/25 bg-[#08264a]/95 p-6">
          <EmptyState
            title="No expeditions found"
            description="Try another search or change your filters."
          />
        </section>
      ) : (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((expedition) => (
            <ExpeditionCard
              key={expedition.id}
              expedition={expedition}
            />
          ))}
        </section>
      )}
    </main>
  );
}