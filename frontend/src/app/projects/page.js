'use client';

import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import ProjectCard from '../../components/ui/ProjectCard';
import SectionHeading from '../../components/ui/SectionHeading';
import { Search, Loader2 } from 'lucide-react';

export default function ProjectsPage() {
  const { data, loading } = useSite();
  const projects = data.projects || [];
  
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filtered = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = activeCat === 'All' || p.category === activeCat;
    return matchesSearch && matchesCat;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-650 animate-spin mb-2" />
        <p className="text-sm text-slate-500">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        title="All Projects" 
        subtitle="Explore all my dashboards, analytics platforms, and data pipelines" 
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCat === cat 
                  ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-md' 
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-350 border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
              } cursor-pointer`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search projects or technologies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-sm"
          />
          <Search className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 dark:text-slate-400 text-lg">No projects found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(p => (
            <ProjectCard key={p._id || p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
