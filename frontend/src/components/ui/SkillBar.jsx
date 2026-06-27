'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SkillBar({ name, proficiency }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-heading font-black tracking-wider text-charcoal dark:text-white uppercase">{name}</span>
        <span className="text-xs font-heading font-black text-mustard">{proficiency}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 dark:bg-charcoal rounded-full overflow-hidden border border-slate-200/40 dark:border-slate-800/40">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-mustard rounded-full"
        />
      </div>
    </div>
  );
}
