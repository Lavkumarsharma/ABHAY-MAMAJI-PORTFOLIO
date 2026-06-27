'use client';

import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';
import Link from 'next/link';

export default function Projects() {
  const { data } = useSite();
  const projects = data.projects || [];

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const [activeCat, setActiveCat] = useState('All');

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return a.order - b.order;
  });

  const filteredProjects = activeCat === 'All' 
    ? sortedProjects 
    : sortedProjects.filter(p => p.category === activeCat);

  const displayProjects = filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-16 px-6 sm:px-8 lg:px-12 bg-content-bg dark:bg-content-bg-dark transition-colors duration-300">
      
      {/* Card UI Wrapper */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-charcoal rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10 md:p-16 shadow-sm">
        
        <SectionHeading 
          title="Portfolio" 
          subtitle="Data & Visualization Projects" 
        />

        {/* Category Tabs */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat, idx) => {
              const isActive = activeCat === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCat(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-heading font-black tracking-widest uppercase transition-all relative cursor-pointer pill-button ${
                    isActive 
                      ? 'text-charcoal bg-mustard shadow-sm' 
                      : 'text-charcoal/70 dark:text-white hover:bg-slate-50 dark:hover:bg-charcoal-medium border border-slate-200/50 dark:border-slate-800/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <p className="text-center text-slate-500 font-sans font-medium text-sm">No projects listed yet.</p>
        ) : (
          <>
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {displayProjects.map((project) => (
                  <motion.div
                    key={project._id || project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* View All Button */}
            {projects.length > 6 && (
              <div className="text-center mt-12">
                <Link 
                  href="/projects" 
                  className="inline-flex items-center justify-center px-8 py-3 text-xs font-heading font-black tracking-widest text-white bg-charcoal hover:bg-charcoal-medium dark:bg-white dark:text-charcoal dark:hover:bg-slate-100 rounded-full transition-all duration-300 shadow-md cursor-pointer"
                >
                  VIEW ALL PROJECTS
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
