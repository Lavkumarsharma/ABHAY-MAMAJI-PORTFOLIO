'use client';

import React from 'react';
import { useSite } from '../../context/SiteContext';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import AnimatedCounter from '../ui/AnimatedCounter';
import { Database, BarChart2, Briefcase, Plus } from 'lucide-react';

export default function About() {
  const { data } = useSite();
  const settings = data.settings || {};
  const about = settings.about || {};

  const stats = [
    { label: 'YEARS EXP', value: about.yearsOfExperience || '1' },
    { label: 'PROJECTS DONE', value: about.projectsCompleted || '2' },
    { label: 'TOOLS MASTERED', value: about.technologiesMastered || '8' }
  ];

  const coreCompetencies = [
    {
      title: 'Data Collection & Cleaning',
      description: 'Acquiring datasets and scrubbing raw data to establish clean, analysis-ready structures in Python and SQL.',
      icon: <Database className="w-5 h-5 text-charcoal" />
    },
    {
      title: 'Data Analysis & Insights',
      description: 'Applying mathematical algorithms, statistical tests, and exploratory analysis to identify operational trends.',
      icon: <Briefcase className="w-5 h-5 text-charcoal" />
    },
    {
      title: 'BI & Data Storytelling',
      description: 'Building premium interactive Power BI dashboards that translate complex details into clear visual narratives.',
      icon: <BarChart2 className="w-5 h-5 text-charcoal" />
    }
  ];

  const profileImg = about.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';

  return (
    <section id="about" className="py-16 px-6 sm:px-8 lg:px-12 bg-content-bg dark:bg-content-bg-dark transition-colors duration-300">
      
      {/* Outer wrapper matching the card-container visuals of the mockups */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-charcoal rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10 md:p-16 shadow-sm">
        
        <SectionHeading 
          title={about.heading || "About Me"} 
          subtitle="Data-driven Solutions & Insights" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column Profile Image with Mustard offset frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-64 h-64 sm:w-72 sm:h-72"
            >
              {/* Offset border frame (matches mockups' frames) */}
              <div className="absolute inset-0 border-2 border-mustard rounded-2xl translate-x-4 translate-y-4 -z-10" />
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg bg-charcoal-medium border border-slate-200 dark:border-slate-800">
                <img 
                  src={profileImg} 
                  alt="About Profile"
                  className="w-full h-full object-cover"
                />
                {about.openToWork && (
                  <div className="absolute top-4 right-4 bg-mustard text-charcoal font-heading font-black text-[9px] py-1 px-3 rounded-full shadow-md flex items-center gap-1.5 border border-charcoal/10 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-charcoal animate-ping" />
                    <span>Open to Work</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
 
          {/* Right Column Bio & Stats (styled circular facts) */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-6"
            >
              <div className="text-charcoal/80 dark:text-slate-300 font-sans font-medium text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {about.bio || "I am a Data Analyst with a passion for problem-solving. I specialize in querying relational databases, building data models, and designing visualizations that drive performance."}
              </div>

              {/* Stats / Circular Fun Facts (Matches the circular elements in the reference image) */}
              <div>
                <span className="inline-block px-3 py-1 bg-mustard text-charcoal text-[9px] font-heading font-black tracking-widest uppercase rounded mb-4">
                  Fun Facts
                </span>
                
                <div className="flex flex-wrap gap-6 items-center justify-center sm:justify-start">
                  {stats.map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="w-28 h-28 rounded-full bg-charcoal dark:bg-charcoal-medium text-white flex flex-col items-center justify-center text-center shadow border border-mustard/20 p-2"
                    >
                      <h4 className="text-xl font-heading font-black text-mustard leading-none flex items-center">
                        <AnimatedCounter value={stat.value} />
                        <Plus size={12} className="ml-0.5 text-mustard" />
                      </h4>
                      <p className="text-[8px] font-heading font-black tracking-wider text-white mt-1 max-w-[80px] leading-tight">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Competencies Section (What I Do) */}
        <div className="border-t border-slate-100 dark:border-slate-800/50 pt-12">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-heading font-black text-charcoal dark:text-white uppercase tracking-tight">
              What I Do
            </h3>
            <span className="h-0.5 flex-grow bg-slate-100 dark:bg-slate-800/50 ml-4 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreCompetencies.map((comp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-50 dark:bg-charcoal-medium p-6 rounded-2xl border border-slate-100 dark:border-slate-800/20 shadow-sm hover:shadow-md hover:border-mustard/35 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Thin yellow accent line on top hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-mustard scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                {/* Yellow circle icon wrapper (matches reference image icons) */}
                <div className="p-3 bg-mustard rounded-full w-fit mb-4 flex items-center justify-center shadow-sm">
                  {comp.icon}
                </div>
                <h4 className="text-base font-heading font-black text-charcoal dark:text-white mb-2 uppercase tracking-tight">
                  {comp.title}
                </h4>
                <p className="text-xs text-charcoal/70 dark:text-slate-400 leading-relaxed font-sans">
                  {comp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
