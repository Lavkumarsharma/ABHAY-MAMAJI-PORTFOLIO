'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Mail, ArrowLeft, Loader2, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/users/forgot-password', { email });
      toast.success('Password reset link sent to your email!');
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">Reset Password</h1>
          <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider text-center max-w-[280px]">
            We'll send a password recovery link to your email address
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">Registered Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#2D2F33]/60 border border-[#3D4045] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mustard/30 text-sm font-medium"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 text-xs font-heading font-black tracking-widest text-charcoal bg-mustard hover:bg-mustard-hover rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 uppercase cursor-pointer mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Sending Link...' : 'Send Recovery Email'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-white uppercase tracking-wider transition"
          >
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
