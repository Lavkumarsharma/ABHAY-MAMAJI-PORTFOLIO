'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Lock, Eye, EyeOff, BarChart3, Loader2 } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Reset token is missing from the link');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.put('/api/users/reset-password', { token, newPassword: password });
      toast.success('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Token is invalid or expired');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5 font-heading">New Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-10 py-2.5 bg-[#2D2F33]/60 border border-[#3D4045] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mustard/30 text-sm font-medium"
            placeholder="Enter new password"
          />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 cursor-pointer">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5 font-heading">Confirm New Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2.5 bg-[#2D2F33]/60 border border-[#3D4045] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mustard/30 text-sm font-medium"
            placeholder="Confirm new password"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 text-xs font-heading font-black tracking-widest text-charcoal bg-mustard hover:bg-mustard-hover rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 uppercase cursor-pointer mt-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {loading ? 'Updating Password...' : 'Save New Password'}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121315] relative overflow-hidden px-4">
      {/* Mesh Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-mustard/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-mustard/5 rounded-full blur-3xl" />
      </div>

      <div className="glass-card w-full max-w-md p-8 sm:p-10 shadow-2xl relative z-10 bg-[#1E1F22] border border-slate-800">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-mustard rounded-2xl mb-4 shadow-lg text-charcoal">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">Set New Password</h1>
          <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider text-center max-w-[280px]">
            Create a new password to secure your admin account
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-slate-400 text-sm py-4">Loading reset form...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
