import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { publications, expeditions } from '../data/mockData';
import { PublicationCard } from '../components/Cards';
import { EmptyState, PillButton, SectionHeader } from '../components/ui';

export default function Publications() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<'All' | 'Arctic' | 'Antarctic'>('All');
  const [area, setArea] = useState('All');
  const [year, setYear] = useState('All');

  const areas = useMemo(() => ['All', ...new Set(publications.map((p) => p.researchArea))], []);
  const years = useMemo(
    () => ['All', ...Array.from(new Set(publications.map((p) => p.publicationDate.slice(0, 4)))).sort().reverse()],
    []
  );

  const filtered = publications.filter((p) => {
    const matchesQuery =
      !query.trim() ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.authors.join(' ').toLowerCase().includes(query.toLowerCase());
    const matchesRegion = region === 'All' || p.region === region;
    const matchesArea = area === 'All' || p.researchArea === area;
    const matchesYear = year === 'All' || p.publicationDate.startsWith(year);
    return matchesQuery && matchesRegion && matchesArea && matchesYear;
  });

  return (
    <div className="space-y-6">
      <SectionHeader title="Research & Publications" subtitle={`${publications.length} demo publications across ${expeditions.length} expeditions`} />

      <div className="card-surface space-y-4 p-4">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-polar-800/50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author…"
            className="w-full rounded-md border border-polar-800/15 bg-polar-frost py-2 pl-9 pr-3 text-sm outline-none focus:border-polar-700/40 focus:bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['All', 'Arctic', 'Antarctic'] as const).map((r) => (
            <PillButton key={r} active={region === r} onClick={() => setRegion(r)}>
              {r}
            </PillButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {years.map((y) => (
            <PillButton key={y} active={year === y} onClick={() => setYear(y)}>
              {y}
            </PillButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {areas.map((a) => (
            <PillButton key={a} active={area === a} onClick={() => setArea(a)}>
              {a}
            </PillButton>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No publications found" description="Try adjusting your search or filters." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PublicationCard key={p.id} publication={p} />
          ))}
        </div>
      )}
    </div>
  );
}
