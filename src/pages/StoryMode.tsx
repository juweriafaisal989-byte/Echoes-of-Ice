import { useParams, Link } from 'react-router-dom';
import { getExpeditionById, getLocationById, getMediaByExpedition } from '../data/mockData';
import { DemoBadge, EmptyState } from '../components/ui';
import MapPanel from '../components/MapPanel';

export default function StoryMode() {
  const { id } = useParams();
  const expedition = id ? getExpeditionById(id) : undefined;

  if (!expedition) {
    return <EmptyState title="Story not found" description="This expedition does not exist in the demo dataset." />;
  }

  const location = getLocationById(expedition.locationId);
  const media = getMediaByExpedition(expedition.id).slice(0, 3);

  const steps = [
    { title: 'Where did we go?', body: `${location?.name ?? 'A remote polar field site'}, in the ${expedition.region}.` },
    { title: 'What question were scientists asking?', body: expedition.researchObjectives[0] },
    { title: 'What did they do?', body: `The team spent ${expedition.startDate} to ${expedition.endDate} collecting field measurements and samples.` },
    { title: 'What data did they collect?', body: `Field records including sea ice, sediment and imagery data linked to ${expedition.datasetIds.length || 'the'} dataset(s).` },
    { title: 'What did they learn?', body: expedition.findings[0] ?? 'Findings are still being analyzed.' },
    { title: 'Why does it matter?', body: 'Understanding these changes helps predict how polar regions — and the rest of the planet — will respond to a warming climate.' },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <DemoBadge label="DEMO STORY" />
        <h1 className="mt-3 font-display text-3xl text-polar-900">{expedition.title}</h1>
        <p className="mt-2 text-polar-800/70">A public-friendly walkthrough of this expedition</p>
      </div>

      <div className="space-y-4">
        {steps.map((s, i) => (
          <div key={s.title} className="card-surface flex gap-4 p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-polar-700 font-display text-sm text-white">
              {i + 1}
            </div>
            <div>
              <p className="font-display text-lg text-polar-900">{s.title}</p>
              <p className="mt-1 text-sm text-polar-800/80">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {location && (
        <div>
          <p className="mb-2 font-display text-lg text-polar-900">On the map</p>
          <MapPanel locations={[location]} height={280} center={[location.lat, location.lng]} zoom={4} />
        </div>
      )}

      {media.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {media.map((m) => (
            <div
              key={m.id}
              className="flex h-24 items-center justify-center rounded-md text-xs text-white/80"
              style={{ background: `linear-gradient(135deg, #${m.colorSeed}, #0A1F38)` }}
            >
              {m.type}
            </div>
          ))}
        </div>
      )}

      <div className="text-center">
        <Link to={`/expeditions/${expedition.id}`} className="text-sm font-medium text-polar-700 hover:underline">
          ← Back to full expedition record
        </Link>
      </div>
    </div>
  );
}
