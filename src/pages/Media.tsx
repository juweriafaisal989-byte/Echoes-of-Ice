import { useState } from 'react';
import { media } from '../data/mockData';
import { MediaCard } from '../components/Cards';
import { EmptyState, PillButton, SectionHeader } from '../components/ui';
import type { MediaItem } from '../types';

const types: Array<'All' | MediaItem['type']> = ['All', 'Photo', 'Video', 'Audio', 'Infographic'];

export default function Media() {
  const [type, setType] = useState<(typeof types)[number]>('All');
  const [region, setRegion] = useState<'All' | 'Arctic' | 'Antarctic'>('All');

  const filtered = media.filter((m) => {
    const matchesType = type === 'All' || m.type === type;
    const matchesRegion = region === 'All' || m.region === region;
    return matchesType && matchesRegion;
  });

  return (
    <div className="space-y-6">
      <SectionHeader title="Media Library" subtitle={`${media.length}+ demo photos, videos, audio and infographics`} />

      <div className="card-surface space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <PillButton key={t} active={type === t} onClick={() => setType(t)}>
              {t}
            </PillButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {(['All', 'Arctic', 'Antarctic'] as const).map((r) => (
            <PillButton key={r} active={region === r} onClick={() => setRegion(r)}>
              {r}
            </PillButton>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No media found" description="Try adjusting your filters." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {filtered.map((m) => (
            <MediaCard key={m.id} item={m} />
          ))}
        </div>
      )}
    </div>
  );
}
