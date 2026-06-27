'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  Settings, FolderKanban, Zap, Briefcase,
  GraduationCap, Award, MessageSquare,
  LogOut, BarChart3, Menu, X, ChevronRight
} from 'lucide-react';

const navItems = [
  { label: 'Settings',       icon: Settings,        href: '/dashboard/settings' },
  { label: 'Projects',       icon: FolderKanban,    href: '/dashboard/projects' },
  { label: 'Skills',         icon: Zap,             href: '/dashboard/skills' },
  { label: 'Experience',     icon: Briefcase,       href: '/dashboard/experience' },
  { label: 'Education',      icon: GraduationCap,   href: '/dashboard/education' },
  { label: 'Certifications', icon: Award,           href: '/dashboard/certifications' },
  { label: 'Messages',       icon: MessageSquare,   href: '/dashboard/messages' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const NavLink = ({ item }) => {
    const active = pathname === item.href;
    return (
      <Link
        href={item.href}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group ${
          active
            ? 'bg-gradient-to-r from-violet-600/20 to-pink-500/10 text-violet-400 border border-violet-500/20'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
        }`}
      >
        <item.icon size={17} className={active ? 'text-violet-400' : 'text-slate-500 group-hover:text-slate-300'} />
        <span>{item.label}</span>
        {active && <ChevronRight size={14} className="ml-auto text-violet-400" />}
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-800/50">
        <div className="p-2 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl">
          <BarChart3 size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Admin Panel</p>
          <p className="text-[10px] text-slate-500">Portfolio CMS</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => <NavLink key={item.href} item={item} />)}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-slate-800/50">
        <div className="flex items-center gap-3 px-3 py-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {user?.fullName?.[0] || 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-slate-200 truncate">{user?.fullName || 'Admin'}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-slate-800 rounded-xl text-slate-300 cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#0f0f17] border-r border-slate-800/50 z-50" onClick={e => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer">
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-[#0f0f17] border-r border-slate-800/50 z-30">
        <SidebarContent />
      </aside>
    </>
  );
}
