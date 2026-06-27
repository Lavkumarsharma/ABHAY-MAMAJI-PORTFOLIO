'use client';
import { X } from 'lucide-react';

export function Modal({ title, onClose, children, wide = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={`relative glass-card w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto shadow-2xl z-10`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmModal({ message, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative glass-card w-full max-w-sm p-6 shadow-2xl z-10 text-center" onClick={e => e.stopPropagation()}>
        <p className="text-slate-200 text-base mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700 cursor-pointer">Cancel</button>
          <button onClick={onConfirm} className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 cursor-pointer">Delete</button>
        </div>
      </div>
    </div>
  );
}

export function Input({ label, ...props }) {
  return (
    <div>
      {label && <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>}
      <input
        {...props}
        className="w-full px-4 py-2.5 bg-[#2D2F33]/60 border border-[#3D4045] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mustard/30 text-sm font-medium"
      />
    </div>
  );
}

export function Textarea({ label, rows = 4, ...props }) {
  return (
    <div>
      {label && <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>}
      <textarea
        rows={rows}
        {...props}
        className="w-full px-4 py-2.5 bg-[#2D2F33]/60 border border-[#3D4045] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mustard/30 text-sm resize-none font-medium"
      />
    </div>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <div>
      {label && <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>}
      <select
        {...props}
        className="w-full px-4 py-2.5 bg-[#2D2F33]/60 border border-[#3D4045] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-mustard/30 text-sm font-medium"
      >
        {children}
      </select>
    </div>
  );
}

export function SaveBtn({ loading, label = 'Save Changes' }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-heading font-black tracking-widest text-charcoal bg-mustard hover:bg-mustard-hover rounded-xl shadow-md disabled:opacity-50 transition-all duration-300 uppercase cursor-pointer"
    >
      {loading ? 'Saving...' : label}
    </button>
  );
}
