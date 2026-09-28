import { useState } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import {
  expeditions,
  researchers,
  publications,
  datasets,
  media,
  locations,
  outreachContent,
} from '../data/mockData';
import { DemoBadge, SectionHeader, StatusBadge } from '../components/ui';

const sections = [
  'Users',
  'Expeditions',
  'Researchers',
  'Publications',
  'Datasets',
  'Documents',
  'Media',
  'Locations',
  'Institutional Activities',
  'Outreach Content',
  'Approvals',
] as const;

const demoUsers = [
  { id: 'u1', name: 'Dr. Ananya Rao', role: 'Principal Scientist', status: 'Active' },
  { id: 'u2', name: 'Outreach Team', role: 'Editor', status: 'Active' },
  { id: 'u3', name: 'Admin User', role: 'Administrator', status: 'Active' },
];

const demoActivities = [
  { id: 'a1', institution: 'National Centre for Polar and Ocean Research', activity: 'Field season logistics review', date: '2026-02-25' },
  { id: 'a2', institution: 'Norwegian Polar Institute', activity: 'Mooring array maintenance schedule', date: '2025-09-20' },
  { id: 'a3', institution: 'British Antarctic Survey', activity: 'Radar survey equipment calibration', date: '2024-06-25' },
];

function Toolbar({ label }: { label: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="relative w-full max-w-xs">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-polar-800/50" />
        <input
          placeholder={`Search ${label.toLowerCase()}…`}
          className="w-full rounded-md border border-polar-800/15 bg-polar-frost py-1.5 pl-8 pr-3 text-sm outline-none focus:border-polar-700/40 focus:bg-white"
        />
      </div>
      <button className="flex items-center gap-1.5 rounded-md bg-polar-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-polar-600">
        <Plus size={14} /> Add {label.replace(/s$/, '')}
      </button>
    </div>
  );
}

function RowActions() {
  return (
    <div className="flex justify-end gap-2">
      <button className="rounded p-1.5 text-polar-700 hover:bg-polar-icelight" aria-label="Edit">
        <Pencil size={14} />
      </button>
      <button className="rounded p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete">
        <Trash2 size={14} />
      </button>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="card-surface overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-polar-800/10 text-xs uppercase tracking-wide text-polar-800/50">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-polar-800/5 last:border-0 hover:bg-polar-frost/60">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Admin() {
  const [active, setActive] = useState<(typeof sections)[number]>('Expeditions');

  return (
    <div className="space-y-6">
      <SectionHeader title="Admin" subtitle="Manage all PolarVerse records (demo data — changes are not persisted)" />

      <div className="flex flex-wrap gap-1 border-b border-polar-800/10">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              active === s ? 'border-polar-700 text-polar-900' : 'border-transparent text-polar-800/60 hover:text-polar-900'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <Toolbar label={active} />

      {active === 'Users' && (
        <Table
          headers={['Name', 'Role', 'Status', '']}
          rows={demoUsers.map((u) => [u.name, u.role, <StatusBadge key="s" status="approved" />, <RowActions key="a" />])}
        />
      )}

      {active === 'Expeditions' && (
        <Table
          headers={['Title', 'Region', 'Status', 'Institution', '']}
          rows={expeditions.map((e) => [e.title, e.region, e.status, e.institution, <RowActions key="a" />])}
        />
      )}

      {active === 'Researchers' && (
        <Table
          headers={['Name', 'Designation', 'Institution', '']}
          rows={researchers.map((r) => [r.name, r.designation, r.institution, <RowActions key="a" />])}
        />
      )}

      {active === 'Publications' && (
        <Table
          headers={['Title', 'Journal', 'Date', '']}
          rows={publications.map((p) => [p.title, p.journal, p.publicationDate, <RowActions key="a" />])}
        />
      )}

      {active === 'Datasets' && (
        <Table
          headers={['Title', 'Type', 'Format', 'Size (MB)', '']}
          rows={datasets.map((d) => [d.title, d.datasetType, d.fileFormat, String(d.fileSizeMb), <RowActions key="a" />])}
        />
      )}

      {active === 'Documents' && (
        <Table
          headers={['Document', 'Related Expedition', 'Type', '']}
          rows={expeditions.map((e) => [`${e.title} — Report`, e.title, 'PDF (demo)', <RowActions key="a" />])}
        />
      )}

      {active === 'Media' && (
        <Table
          headers={['Title', 'Type', 'Region', 'Year', '']}
          rows={media.slice(0, 20).map((m) => [m.title, m.type, m.region, String(m.year), <RowActions key="a" />])}
        />
      )}

      {active === 'Locations' && (
        <Table
          headers={['Name', 'Type', 'Region', '']}
          rows={locations.map((l) => [l.name, l.type, l.region, <RowActions key="a" />])}
        />
      )}

      {active === 'Institutional Activities' && (
        <Table
          headers={['Institution', 'Activity', 'Date', '']}
          rows={demoActivities.map((a) => [a.institution, a.activity, a.date, <RowActions key="a" />])}
        />
      )}

      {active === 'Outreach Content' && (
        <Table
          headers={['Title', 'Type', 'Status', '']}
          rows={outreachContent.map((o) => [o.title, o.contentType, <StatusBadge key="s" status={o.status} />, <RowActions key="a" />])}
        />
      )}

      {active === 'Approvals' && (
        <Table
          headers={['Title', 'Status', 'Actions']}
          rows={outreachContent
            .filter((o) => o.status === 'in-review')
            .map((o) => [
              o.title,
              <StatusBadge key="s" status={o.status} />,
              <div key="btns" className="flex gap-2">
                <button className="rounded border border-emerald-300 px-2 py-1 text-xs text-emerald-700 hover:bg-emerald-50">Approve</button>
                <button className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700 hover:bg-rose-50">Reject</button>
              </div>,
            ])}
        />
      )}

      <DemoBadge label="All admin data is DEMO DATA and resets on reload" />
    </div>
  );
}
