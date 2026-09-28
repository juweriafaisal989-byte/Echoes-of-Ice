import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu, Search, User as UserIcon } from 'lucide-react';
import { expeditions, publications, datasets, media, researchers, locations } from '../data/mockData';
import type { SearchResult } from '../types';

function buildIndex(): SearchResult[] {
  return [
    ...expeditions.map((e) => ({
      id: e.id,
      type: 'Expedition' as const,
      title: e.title,
      subtitle: `${e.region} · ${e.researchArea}`,
      path: `/expeditions/${e.id}`,
    })),
    ...publications.map((p) => ({
      id: p.id,
      type: 'Publication' as const,
      title: p.title,
      subtitle: p.journal,
      path: `/publications`,
    })),
    ...datasets.map((d) => ({
      id: d.id,
      type: 'Dataset' as const,
      title: d.title,
      subtitle: d.researchArea,
      path: `/datasets`,
    })),
    ...media.map((m) => ({
      id: m.id,
      type: 'Media' as const,
      title: m.title,
      subtitle: m.type,
      path: `/media`,
    })),
    ...researchers.map((r) => ({
      id: r.id,
      type: 'Researcher' as const,
      title: r.name,
      subtitle: r.specialization,
      path: `/researchers/${r.id}`,
    })),
    ...locations.map((l) => ({
      id: l.id,
      type: 'Location' as const,
      title: l.name,
      subtitle: l.type,
      path: `/map`,
    })),
  ];
}

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return index.filter((r) => r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q)).slice(0, 8);
  }, [query, index]);

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-polar-800/10 bg-white/95 px-4 py-3 backdrop-blur lg:px-6">
      <button onClick={onMenuClick} className="text-polar-800 lg:hidden" aria-label="Open menu">
        <Menu size={22} />
      </button>
      <div className="relative flex-1 max-w-xl">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-polar-800/50" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search expeditions, publications, datasets, researchers…"
          className="w-full rounded-md border border-polar-800/15 bg-polar-frost py-2 pl-9 pr-3 text-sm text-polar-900 outline-none focus:border-polar-700/40 focus:bg-white"
        />
        {focused && results.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-md border border-polar-800/10 bg-white shadow-card">
            {results.map((r) => (
              <button
                key={`${r.type}-${r.id}`}
                onClick={() => {
                  navigate(r.path);
                  setQuery('');
                }}
                className="flex w-full items-center justify-between gap-3 border-b border-polar-800/5 px-4 py-2.5 text-left text-sm last:border-b-0 hover:bg-polar-frost"
              >
                <span>
                  <span className="block text-polar-900">{r.title}</span>
                  <span className="block text-xs text-polar-800/60">{r.subtitle}</span>
                </span>
                <span className="shrink-0 rounded bg-polar-icelight px-2 py-0.5 text-[11px] font-medium text-polar-700">
                  {r.type}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      <button className="relative rounded-md p-2 text-polar-800 hover:bg-polar-frost" aria-label="Notifications">
        <Bell size={19} />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-polar-ice" />
      </button>
      <div className="flex items-center gap-2 rounded-md py-1.5 pl-1.5 pr-2 hover:bg-polar-frost">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-polar-700 text-white">
          <UserIcon size={16} />
        </div>
        <span className="hidden text-sm text-polar-900 sm:inline">Researcher</span>
      </div>
    </header>
  );
}
