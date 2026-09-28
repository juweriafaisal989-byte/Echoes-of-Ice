import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { expeditions, outreachContent as initialContent } from '../data/mockData';
import { SectionHeader, StatusBadge } from '../components/ui';
import type { ApprovalStatus, OutreachContent } from '../types';

const contentTypes: OutreachContent['contentType'][] = [
  'Website Article',
  'Social Media Post',
  'Student-Friendly Explanation',
  'Newsletter',
  '60-Second Video Script',
];

function generateDraft(expeditionTitle: string, type: OutreachContent['contentType']): string {
  const openers: Record<OutreachContent['contentType'], string> = {
    'Website Article': `A field team returned from ${expeditionTitle} with observations that are reshaping how scientists understand the region.`,
    'Social Media Post': `🧊 Fresh from the field: our ${expeditionTitle} team just wrapped up — here's what they found.`,
    'Student-Friendly Explanation': `Ever wondered what scientists do at the edge of the ice? Here's what the ${expeditionTitle} team learned.`,
    Newsletter: `This edition of the PolarVerse newsletter covers highlights from ${expeditionTitle}.`,
    '60-Second Video Script': `[SCENE: Open on wide polar landscape]\nNARRATOR: This is ${expeditionTitle} — and here's what the team discovered.`,
  };
  return `AI-generated draft — requires scientific/editorial review.\n\n${openers[type]}`;
}

const statusOrder: ApprovalStatus[] = ['draft', 'in-review', 'approved', 'published'];

export default function OutreachStudio() {
  const [content, setContent] = useState<OutreachContent[]>(initialContent);
  const [expeditionId, setExpeditionId] = useState(expeditions[0].id);
  const [contentType, setContentType] = useState<OutreachContent['contentType']>('Website Article');
  const [draft, setDraft] = useState('');
  const [title, setTitle] = useState('');

  const generate = () => {
    const exp = expeditions.find((e) => e.id === expeditionId)!;
    setDraft(generateDraft(exp.title, contentType));
    setTitle(`${exp.title.split(' ').slice(0, 4).join(' ')} — ${contentType}`);
  };

  const submitForReview = () => {
    if (!draft.trim()) return;
    const newItem: OutreachContent = {
      id: crypto.randomUUID(),
      title: title || 'Untitled Draft',
      contentType,
      sourceExpeditionId: expeditionId,
      status: 'in-review',
      body: draft,
      createdAt: new Date().toISOString().slice(0, 10),
      author: 'Researcher',
    };
    setContent((prev) => [newItem, ...prev]);
    setDraft('');
    setTitle('');
  };

  const setStatus = (id: string, status: ApprovalStatus) => {
    setContent((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  return (
    <div className="space-y-8">
      <SectionHeader title="Outreach Studio" subtitle="Turn scientific findings into public-friendly stories" />

      <div className="card-surface p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-polar-800/60">
          {['Select Source', 'Choose Content Type', 'Generate Draft', 'Edit', 'Submit for Review'].map((step, i, arr) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-full bg-polar-icelight px-3 py-1 font-medium text-polar-700">{step}</span>
              {i < arr.length - 1 && <ArrowRight size={12} />}
            </span>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block text-polar-800/70">Scientific Source</span>
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
          <label className="text-sm">
            <span className="mb-1 block text-polar-800/70">Content Type</span>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value as OutreachContent['contentType'])}
              className="w-full rounded-md border border-polar-800/15 bg-polar-frost px-3 py-2 outline-none focus:border-polar-700/40 focus:bg-white"
            >
              {contentTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          onClick={generate}
          className="mt-4 flex items-center gap-2 rounded-md bg-polar-700 px-4 py-2 text-sm font-medium text-white hover:bg-polar-600"
        >
          <Sparkles size={15} /> Generate Draft
        </button>

        {draft && (
          <div className="mt-5 space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-polar-800/15 px-3 py-2 text-sm font-medium outline-none focus:border-polar-700/40"
              placeholder="Title"
            />
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={8}
              className="w-full rounded-md border border-polar-800/15 px-3 py-2 text-sm outline-none focus:border-polar-700/40"
            />
            <button
              onClick={submitForReview}
              className="rounded-md border border-polar-700 px-4 py-2 text-sm font-medium text-polar-700 hover:bg-polar-icelight"
            >
              Submit for Review
            </button>
          </div>
        )}
      </div>

      <div>
        <SectionHeader title="Approval Workflow" />
        <div className="grid gap-4 lg:grid-cols-4">
          {statusOrder.map((status) => (
            <div key={status} className="card-surface flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <StatusBadge status={status} />
                <span className="text-xs text-polar-800/50">
                  {content.filter((c) => c.status === status).length}
                </span>
              </div>
              <div className="space-y-2">
                {content
                  .filter((c) => c.status === status)
                  .map((c) => (
                    <div key={c.id} className="rounded-md border border-polar-800/10 p-3 text-sm">
                      <p className="line-clamp-2 text-polar-900">{c.title}</p>
                      <p className="mt-1 text-xs text-polar-800/60">{c.contentType}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {status === 'in-review' && (
                          <>
                            <button onClick={() => setStatus(c.id, 'approved')} className="rounded border border-emerald-300 px-2 py-0.5 text-xs text-emerald-700 hover:bg-emerald-50">
                              Approve
                            </button>
                            <button onClick={() => setStatus(c.id, 'rejected')} className="rounded border border-rose-300 px-2 py-0.5 text-xs text-rose-700 hover:bg-rose-50">
                              Reject
                            </button>
                          </>
                        )}
                        {status === 'approved' && (
                          <button onClick={() => setStatus(c.id, 'published')} className="rounded border border-polar-ice px-2 py-0.5 text-xs text-polar-700 hover:bg-polar-icelight">
                            Publish
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
