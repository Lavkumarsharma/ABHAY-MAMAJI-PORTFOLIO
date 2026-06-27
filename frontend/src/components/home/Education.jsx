'use client';

import React from 'react';
import { useSite } from '../../context/SiteContext';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export default function Education() {
  const { data } = useSite();
  const education = data.education || [];

  return (
    <section id="education" className="py-20 bg-slate-50 dark:bg-[#0c0c12] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Education" 
          subtitle="My Academic Qualifications and Foundations in Computer Applications" 
        />

        {education.length === 0 ? (
          <p className="text-center text-slate-500">No education details listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {education.map((edu, idx) => (
              <motion.div
                key={edu._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-violet-100 dark:bg-violet-950/30 rounded-xl w-fit mb-4 text-violet-600 dark:text-violet-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  {edu.field && (
                    <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 mt-1">
                      {edu.field}
                    </p>
                  )}
                  <p className="text-sm text-slate-700 dark:text-white font-medium mt-2">
                    {edu.institution}
                  </p>
                  {edu.description && (
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{edu.startYear} – {edu.endYear}</span>
                  </div>
                  {edu.grade && (
                    <div className="flex items-center gap-1 bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900 text-violet-600 dark:text-violet-400 py-1 px-2.5 rounded-full font-semibold">
                      <Award size={14} />
                      <span>{edu.grade}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
