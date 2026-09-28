import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import type { ApprovalStatus } from '../types';

export function DemoBadge({ label = 'DEMO DATA' }: { label?: string }) {
  return <span className="demo-badge">{label}</span>;
}

export function StatusBadge({ status }: { status: ApprovalStatus }) {
  const styles: Record<ApprovalStatus, string> = {
    draft: 'bg-slate-100 text-slate-600 border-slate-300',
    'in-review': 'bg-amber-50 text-amber-700 border-amber-300',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    published: 'bg-polar-icelight text-polar-700 border-polar-ice',
    rejected: 'bg-rose-50 text-rose-700 border-rose-300',
  };
  const labels: Record<ApprovalStatus, string> = {
    draft: 'Draft',
    'in-review': 'In Review',
    approved: 'Approved',
    published: 'Published',
    rejected: 'Rejected',
  };
  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export function RegionBadge({ region }: { region: 'Arctic' | 'Antarctic' }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
        region === 'Arctic' ? 'bg-sky-50 text-sky-700' : 'bg-indigo-50 text-indigo-700'
      }`}
    >
      {region}
    </span>
  );
}

export function SourceBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-polar-800/15 bg-polar-frost px-2.5 py-1 text-xs text-polar-800">
      {children}
    </span>
  );
}

export function StatisticsCard({
  label,
  value,
  icon,
  demo = true,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  demo?: boolean;
}) {
  return (
    <div className="card-surface flex items-center justify-between gap-4 p-5">
      <div>
        <p className="text-sm text-polar-800/70">{label}</p>
        <p className="mt-1 font-display text-3xl text-polar-900">{value}</p>
        {demo && <div className="mt-2"><DemoBadge /></div>}
      </div>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-polar-icelight text-polar-700">
        {icon}
      </div>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="card-surface flex flex-col items-center gap-3 px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-polar-icelight text-polar-700">
        <Inbox size={22} />
      </div>
      <p className="font-display text-lg text-polar-900">{title}</p>
      <p className="max-w-sm text-sm text-polar-800/70">{description}</p>
    </div>
  );
}

export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="card-surface h-20 animate-pulse bg-polar-800/5" />
      ))}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="section-heading">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-polar-800/70">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function PillButton({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
        active
          ? 'border-polar-700 bg-polar-700 text-white'
          : 'border-polar-800/15 bg-white text-polar-800 hover:border-polar-700/40'
      }`}
    >
      {children}
    </button>
  );
}
