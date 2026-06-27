'use client';

import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

export default function Experience() {
  const { data } = useSite();
  const experiences = data.experiences || [];
  
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-[#0c0c12] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Work Experience" 
          subtitle="My Professional Career Timeline and Core Contributions" 
        />

        {experiences.length === 0 ? (
          <p className="text-center text-slate-500">No experiences listed yet.</p>
        ) : (
          <div className="relative border-l border-slate-200 dark:border-slate-800 max-w-4xl mx-auto pl-6 sm:pl-8 space-y-12">
            {experiences.map((exp, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={exp._id || idx} className="relative">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[35px] sm:-left-[43px] top-1.5 p-1.5 bg-gradient-to-tr from-violet-600 to-pink-500 text-white rounded-full shadow-lg z-10">
                    <Briefcase size={14} />
                  </span>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-6 shadow-sm"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                          {exp.role}
                          {exp.isCurrent && (
                            <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-500 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Present
                            </span>
                          )}
                        </h3>
                        <p className="text-base font-semibold text-violet-600 dark:text-violet-400 mt-1">
                          {exp.company}
                        </p>
                      </div>

                      {/* Date & Location */}
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex flex-col sm:items-end gap-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          <span>{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    {exp.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 italic">
                        {exp.description}
                      </p>
                    )}

                    {/* Tech Badges */}
                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {exp.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Accordion Toggle */}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div>
                        <button
                          onClick={() => toggleAccordion(idx)}
                          className="flex items-center justify-between w-full py-2 px-4 bg-slate-100/50 dark:bg-slate-800/30 rounded-lg text-sm font-semibold text-slate-700 dark:text-white hover:bg-slate-150 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>Key Responsibilities & Achievements</span>
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <ul className="mt-3 space-y-2 pl-5 list-disc text-sm text-slate-600 dark:text-slate-400">
                                {exp.responsibilities.map((resp, rIdx) => (
                                  <li key={rIdx}>{resp}</li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
