'use client';

import React from 'react';
import { useSite } from '../context/SiteContext';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Skills from '../components/home/Skills';
import Resume from '../components/home/Resume';
import Projects from '../components/home/Projects';
import Certifications from '../components/home/Certifications';
import Contact from '../components/home/Contact';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { loading, error, refetch } = useSite();

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0f0f17]">
        <Loader2 className="w-10 h-10 text-violet-600 animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading Portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0f0f17] px-4">
        <div className="glass-card p-8 max-w-md w-full text-center shadow-lg">
          <h2 className="text-xl font-bold text-red-500 mb-2">Connection Error</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <button 
            onClick={refetch}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 rounded-xl shadow cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Resume />
      <Projects />
      <Certifications />
      <Contact />
    </>
  );
}
