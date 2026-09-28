import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { datasets } from '../data/mockData';
import { DatasetCard } from '../components/Cards';
import { EmptyState, PillButton, SectionHeader } from '../components/ui';

export default function Datasets() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');

  const types = useMemo(() => ['All', ...new Set(datasets.map((d) => d.datasetType))], []);

  const filtered = datasets.filter((d) => {
    const matchesQuery = !query.trim() || d.title.toLowerCase().includes(query.toLowerCase());
    const matchesType = type === 'All' || d.datasetType === type;
    return matchesQuery && matchesType;
  });

  return (
    <div className="space-y-6">
      <SectionHeader title="Datasets" subtitle={`${datasets.length} demo datasets available for reuse`} />

      <div className="card-surface space-y-4 p-4">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-polar-800/50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search datasets…"
            className="w-full rounded-md border border-polar-800/15 bg-polar-frost py-2 pl-9 pr-3 text-sm outline-none focus:border-polar-700/40 focus:bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <PillButton key={t} active={type === t} onClick={() => setType(t)}>
              {t}
            </PillButton>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No datasets found" description="Try adjusting your search or filters." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <DatasetCard key={d.id} dataset={d} />
          ))}
        </div>
      )}
    </div>
  );
}
