'use client';

import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import SkillBar from '../ui/SkillBar';

export default function Skills() {
  const { data } = useSite();
  const skills = data.skills || [];

  const categories = ['All', ...new Set(skills.map(s => s.category))];
  const [activeTab, setActiveTab] = useState('All');

  const filteredSkills = activeTab === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeTab);

  return (
    <section id="skills" className="py-16 px-6 sm:px-8 lg:px-12 bg-content-bg dark:bg-content-bg-dark transition-colors duration-300">
      
      {/* Card UI Wrapper */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-charcoal rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10 md:p-16 shadow-sm">
        
        <SectionHeading 
          title="Skills & Expertise" 
          subtitle="Data Tools & Capabilities" 
        />

        {/* Category Tabs (pill-button styling matching portfolio tags) */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, idx) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(cat)}
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

        {/* Skills Grid */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill._id || skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <SkillBar 
                    name={skill.name} 
                    proficiency={skill.proficiency} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
