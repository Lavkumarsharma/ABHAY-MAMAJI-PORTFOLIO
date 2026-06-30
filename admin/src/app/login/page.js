'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Lock, Mail, Eye, EyeOff, BarChart3, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
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
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-mustard rounded-2xl mb-4 shadow-lg text-charcoal">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">Admin Panel</h1>
          <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Portfolio CMS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#2D2F33]/60 border border-[#3D4045] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mustard/30 text-sm font-medium"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-wider">Password</label>
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-[10px] font-black text-mustard hover:text-mustard-hover uppercase tracking-wider cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                id="login-password"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2.5 bg-[#2D2F33]/60 border border-[#3D4045] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mustard/30 text-sm font-medium"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 cursor-pointer">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            id="login-submit"
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 text-xs font-heading font-black tracking-widest text-charcoal bg-mustard hover:bg-mustard-hover rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 uppercase cursor-pointer mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
