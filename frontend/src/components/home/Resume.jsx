'use client';

import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, ChevronDown, ChevronUp } from 'lucide-react';

export default function Resume() {
  const { data } = useSite();
  const experiences = data.experiences || [];
  const education = data.education || [];

  const [openExpIndex, setOpenExpIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenExpIndex(openExpIndex === idx ? null : idx);
  };

  return (
    <section id="resume" className="py-16 px-6 sm:px-8 lg:px-12 bg-content-bg dark:bg-content-bg-dark transition-colors duration-300">
      
      {/* Card UI Wrapper */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-charcoal rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10 md:p-16 shadow-sm">
        
        <SectionHeading 
          title="Education & Experience" 
          subtitle="Education & Work History" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Education */}
          <div>
            <div className="flex items-center space-x-3 mb-8 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 bg-mustard rounded-full text-charcoal">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-xl font-heading font-black text-charcoal dark:text-white uppercase tracking-tight">
                Education
              </h3>
            </div>

            {education.length === 0 ? (
              <p className="text-sm text-slate-500">No education details listed.</p>
            ) : (
              <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 pl-6 space-y-8">
                {education.map((edu, idx) => (
                  <motion.div
                    key={edu._id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative group"
                  >
                    {/* Timeline Dot (Mustard) */}
                    <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-mustard border-2 border-white dark:border-charcoal group-hover:scale-125 transition-transform" />
                    
                    <div className="bg-slate-50 dark:bg-charcoal-medium p-6 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm">
                      <span className="inline-flex items-center gap-1 bg-mustard/15 text-mustard text-[10px] font-heading font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
                        <Calendar size={10} />
                        {edu.startYear} – {edu.endYear}
                      </span>
                      
                      <h4 className="text-base font-heading font-black text-charcoal dark:text-white uppercase tracking-tight">
                        {edu.degree}
                      </h4>
                      {edu.field && (
                        <p className="text-xs font-heading font-black text-mustard tracking-wider uppercase mt-1">
                          {edu.field}
                        </p>
                      )}
                      <p className="text-xs text-charcoal/70 dark:text-slate-400 font-sans font-medium mt-1">
                        {edu.institution}
                      </p>
                      {edu.description && (
                        <p className="text-xs text-charcoal/60 dark:text-slate-300 mt-3 leading-relaxed font-sans">
                          {edu.description}
                        </p>
                      )}

                      {edu.grade && (
                        <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between">
                          <span className="text-[10px] font-heading font-black text-charcoal/50 dark:text-slate-500 uppercase tracking-widest">Performance</span>
                          <span className="inline-flex items-center gap-1 bg-charcoal dark:bg-charcoal-light text-white text-[10px] font-heading font-black py-1 px-2.5 rounded">
                            <Award size={10} className="text-mustard" />
                            {edu.grade}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Experience */}
          <div>
            <div className="flex items-center space-x-3 mb-8 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 bg-mustard rounded-full text-charcoal">
                <Briefcase size={20} />
              </div>
              <h3 className="text-xl font-heading font-black text-charcoal dark:text-white uppercase tracking-tight">
                Experience
              </h3>
            </div>

            {experiences.length === 0 ? (
              <p className="text-sm text-slate-500">No experiences listed.</p>
            ) : (
              <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 pl-6 space-y-8">
                {experiences.map((exp, idx) => {
                  const isOpen = openExpIndex === idx;
                  return (
                    <motion.div
                      key={exp._id || idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="relative group"
                    >
                      {/* Timeline Dot (Mustard) */}
                      <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-mustard border-2 border-white dark:border-charcoal group-hover:scale-125 transition-transform" />

                      <div className="bg-slate-50 dark:bg-charcoal-medium p-6 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 bg-mustard/15 text-mustard text-[10px] font-heading font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            <Calendar size={10} />
                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                          
                          {exp.location && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-charcoal/50 dark:text-slate-400 font-sans font-semibold">
                              <MapPin size={10} />
                              {exp.location}
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-heading font-black text-charcoal dark:text-white uppercase tracking-tight flex items-center gap-2">
                          {exp.role}
                          {exp.isCurrent && (
                            <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-heading font-black px-2 py-0.5 rounded uppercase border border-emerald-500/20">
                              Present
                            </span>
                          )}
                        </h4>
                        
                        <p className="text-xs font-heading font-black text-mustard tracking-wider uppercase mt-1">
                          {exp.company}
                        </p>

                        {exp.description && (
                          <p className="text-xs text-charcoal/60 dark:text-slate-300 mt-3 font-sans italic">
                            {exp.description}
                          </p>
                        )}

                        {/* Tech Stack Badges */}
                        {exp.techStack && exp.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                            {exp.techStack.map((tech, tIdx) => (
                              <span key={tIdx} className="text-[9px] font-heading font-black tracking-wider uppercase bg-charcoal/5 dark:bg-charcoal-light/30 text-charcoal/80 dark:text-slate-300 px-2.5 py-0.5 rounded border border-slate-200/10">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Accordion Toggle */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="mt-4">
                            <button
                              onClick={() => toggleAccordion(idx)}
                              className="flex items-center justify-between w-full py-2 px-3 bg-charcoal/5 hover:bg-charcoal/10 dark:bg-charcoal-light/10 dark:hover:bg-charcoal-light/15 rounded-lg text-[10px] font-heading font-black text-charcoal dark:text-white uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              <span>Contributions</span>
                              {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
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
                                  <ul className="mt-3 space-y-1.5 pl-4 list-disc text-xs text-charcoal/70 dark:text-slate-400 font-sans leading-relaxed">
                                    {exp.responsibilities.map((resp, rIdx) => (
                                      <li key={rIdx}>{resp}</li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
