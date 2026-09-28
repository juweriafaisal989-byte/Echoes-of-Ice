import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  expeditions,
  getPublicationsByExpedition,
  getDatasetsByExpedition,
  getResearchersByExpedition,
  outreachContent,
} from '../data/mockData';
import { SectionHeader } from '../components/ui';

export default function KnowledgeConnections() {
  const [expeditionId, setExpeditionId] = useState(expeditions[0].id);
  const expedition = expeditions.find((e) => e.id === expeditionId)!;
  const researchersList = getResearchersByExpedition(expedition.id);
  const publicationsList = getPublicationsByExpedition(expedition.id);
  const datasetsList = getDatasetsByExpedition(expedition.id);
  const outreachList = outreachContent.filter((o) => o.sourceExpeditionId === expedition.id);

  const columns: Array<{ label: string; items: { id: string; label: string; to?: string }[] }> = [
    { label: 'Expedition', items: [{ id: expedition.id, label: expedition.title, to: `/expeditions/${expedition.id}` }] },
    { label: 'Researchers', items: researchersList.map((r) => ({ id: r.id, label: r.name, to: `/researchers/${r.id}` })) },
    { label: 'Publications', items: publicationsList.map((p) => ({ id: p.id, label: p.title })) },
    { label: 'Datasets', items: datasetsList.map((d) => ({ id: d.id, label: d.title })) },
    { label: 'Locations', items: [{ id: expedition.locationId, label: 'Field Location' }] },
    { label: 'Outreach Stories', items: outreachList.map((o) => ({ id: o.id, label: o.title })) },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="Knowledge Connections" subtitle="Trace how an expedition links to people, evidence and public stories" />

      <label className="block max-w-md text-sm">
        <span className="mb-1 block text-polar-800/70">Choose an expedition</span>
        <select
          value={expeditionId}
          onChange={(e) => setExpeditionId(e.target.value)}
          className="w-full rounded-md border border-polar-800/15 bg-polar-frost px-3 py-2 outline-none focus:border-polar-700/40 focus:bg-white"
        >
          {expeditions.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 overflow-x-auto pb-2 lg:grid-cols-6">
        {columns.map((col, i) => (
          <div key={col.label} className="min-w-[180px] space-y-2">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-polar-800/50">{col.label}</p>
            <div className="space-y-2">
              {col.items.length === 0 && (
                <div className="rounded-md border border-dashed border-polar-800/15 p-3 text-center text-xs text-polar-800/40">
                  None linked
                </div>
              )}
              {col.items.map((item) =>
                item.to ? (
                  <Link
                    key={item.id}
                    to={item.to}
                    className={`block rounded-md border p-3 text-center text-xs font-medium hover:border-polar-700/40 ${
                      i === 0 ? 'border-polar-700 bg-polar-700 text-white' : 'border-polar-800/15 bg-white text-polar-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.id} className="rounded-md border border-polar-800/15 bg-white p-3 text-center text-xs text-polar-800">
                    {item.label}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
