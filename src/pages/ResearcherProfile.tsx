import { useParams } from 'react-router-dom';
import {
  getResearcherById,
  expeditions,
  publications,
  datasets,
} from '../data/mockData';
import { DemoBadge, EmptyState, SectionHeader } from '../components/ui';
import { ExpeditionCard, PublicationCard, DatasetCard } from '../components/Cards';

export default function ResearcherProfile() {
  const { id } = useParams();
  const researcher = id ? getResearcherById(id) : undefined;

  if (!researcher) {
    return <EmptyState title="Researcher not found" description="This researcher does not exist in the demo dataset." />;
  }

  const theirExpeditions = expeditions.filter((e) => researcher.expeditionIds.includes(e.id));
  const theirPublications = publications.filter((p) => researcher.publicationIds.includes(p.id));
  const theirDatasets = datasets.filter((d) => researcher.datasetIds.includes(d.id));

  return (
    <div className="space-y-8">
      <div className="card-surface flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-polar-700 font-display text-2xl text-white">
          {researcher.name
            .split(' ')
            .map((n) => n[0])
            .slice(1)
            .join('')}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-2xl text-polar-900">{researcher.name}</h1>
            <DemoBadge />
          </div>
          <p className="text-sm text-polar-800/70">{researcher.designation} · {researcher.institution}</p>
          <p className="mt-1 text-sm text-polar-800/70">{researcher.specialization}</p>
        </div>
      </div>

      <div className="card-surface p-6">
        <h3 className="font-display text-lg text-polar-900">Biography</h3>
        <p className="mt-2 text-sm text-polar-800/80">{researcher.biography}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {researcher.researchAreas.map((a) => (
            <span key={a} className="rounded-full bg-polar-icelight px-3 py-1 text-xs font-medium text-polar-700">
              {a}
            </span>
          ))}
        </div>
      </div>

      <section>
        <SectionHeader title="Expeditions" />
        {theirExpeditions.length === 0 ? (
          <EmptyState title="No expeditions" description="No expeditions linked to this researcher yet." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {theirExpeditions.map((e) => (
              <ExpeditionCard key={e.id} expedition={e} />
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeader title="Publications" />
        {theirPublications.length === 0 ? (
          <EmptyState title="No publications" description="No publications linked to this researcher yet." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {theirPublications.map((p) => (
              <PublicationCard key={p.id} publication={p} />
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeader title="Datasets" />
        {theirDatasets.length === 0 ? (
          <EmptyState title="No datasets" description="No datasets linked to this researcher yet." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {theirDatasets.map((d) => (
              <DatasetCard key={d.id} dataset={d} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
