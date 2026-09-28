import { NavLink } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Compass,
  BookOpen,
  Database,
  Images,
  MapPin,
  MessageCircleQuestion,
  Megaphone,
  Network,
  ShieldCheck,
  Snowflake,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/expeditions', label: 'Expeditions', icon: Compass },
  { to: '/publications', label: 'Research & Publications', icon: BookOpen },
  { to: '/datasets', label: 'Datasets', icon: Database },
  { to: '/media', label: 'Media Library', icon: Images },
  { to: '/map', label: 'Polar Map', icon: MapPin },
  { to: '/ask', label: 'Ask Echoes Of Ice', icon: MessageCircleQuestion },
  { to: '/outreach', label: 'Outreach Studio', icon: Megaphone },
  { to: '/connections', label: 'Knowledge Connections', icon: Network },
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-polar-950/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-polar-900 text-polar-icelight transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-polar-ice/20 text-polar-ice">
              <Snowflake size={20} />
            </div>
            <div>
              <p className="font-display text-lg leading-none text-white">Echoes of Ice</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-polar-ice/70">Polar Research Platform</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-polar-ice/15 text-white'
                    : 'text-polar-icelight/80 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 px-5 py-4 text-[11px] text-polar-icelight/50">
         
        </div>
      </aside>
    </>
  );
}
