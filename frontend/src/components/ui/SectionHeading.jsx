'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, center = false }) {
  return (
    <div className={`mb-10 flex flex-col ${center ? 'items-center text-center' : 'items-start text-left'}`}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4"
      >
        {/* The horizontal dash line + arrow head (matches image visual style) */}
        <span className="w-12 h-1 bg-charcoal dark:bg-white relative flex items-center">
          <span className="absolute right-0 w-2 h-2 bg-charcoal dark:bg-white rounded-full" />
        </span>
        
        <h2 className="text-3xl md:text-5xl font-heading font-black text-charcoal dark:text-white tracking-tighter uppercase leading-none">
          {title}
        </h2>
      </motion.div>
      
      {subtitle && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3"
        >
          {/* Tagline / subhead badge */}
          <span className="inline-block px-3 py-1 bg-mustard text-charcoal text-[11px] font-heading font-black tracking-widest uppercase rounded">
            {subtitle}
          </span>
        </motion.div>
      )}
    </div>
  );
}
