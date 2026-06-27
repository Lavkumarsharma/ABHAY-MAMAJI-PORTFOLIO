'use client';

import React from 'react';
import { useSite } from '../../context/SiteContext';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Award, ExternalLink } from 'lucide-react';

export default function Certifications() {
  const { data } = useSite();
  const certifications = data.certifications || [];

  return (
    <section id="certifications" className="py-16 px-6 sm:px-8 lg:px-12 bg-content-bg dark:bg-content-bg-dark transition-colors duration-300">
      
      {/* Card UI Wrapper */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-charcoal rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10 md:p-16 shadow-sm">
        
        <SectionHeading 
          title="Certifications" 
          subtitle="Achievements & Credentials" 
        />

        {certifications.length === 0 ? (
          <p className="text-center text-slate-500 font-sans font-medium text-sm">No certifications listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert._id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-50 dark:bg-charcoal-medium p-6 rounded-2xl border border-slate-100 dark:border-slate-800/30 hover:border-mustard/35 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Hover accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-mustard scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-mustard rounded-full text-charcoal shadow-sm">
                      <Award size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-heading font-black tracking-wider text-charcoal/50 dark:text-slate-400 uppercase">
                        {cert.issuer}
                      </span>
                      <p className="text-[9px] font-heading font-black tracking-wider text-mustard uppercase">
                        {cert.issuedDate}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-sm font-heading font-black text-charcoal dark:text-white mb-3 uppercase tracking-tight leading-snug">
                    {cert.title}
                  </h3>

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {cert.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[8px] font-heading font-black tracking-wider uppercase bg-charcoal/5 dark:bg-charcoal-light/30 text-charcoal/80 dark:text-slate-200 px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between text-[10px] font-sans font-medium text-charcoal/60 dark:text-slate-400">
                  <span>ID: {cert.credentialId || 'N/A'}</span>
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-heading font-black text-charcoal hover:text-mustard dark:text-white dark:hover:text-mustard uppercase tracking-widest cursor-pointer"
                    >
                      <span>Verify</span>
                      <ExternalLink size={10} />
                    </a>
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
