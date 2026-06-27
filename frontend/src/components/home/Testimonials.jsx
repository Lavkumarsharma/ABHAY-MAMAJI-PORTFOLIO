'use client';

import React, { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Star, ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';

export default function Testimonials() {
  const { data } = useSite();
  const testimonials = data.testimonials || [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const handlePrev = () => {
    setIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIndex(prev => (prev + 1) % testimonials.length);
  };

  if (testimonials.length === 0) {
    return null;
  }

  const activeReview = testimonials[index];
  const ratingStars = Array(5).fill(0).map((_, idx) => (
    <Star 
      key={idx} 
      size={14} 
      className={idx < activeReview.rating ? "text-mustard fill-mustard" : "text-slate-200 dark:text-slate-700"} 
    />
  ));

  return (
    <section id="testimonials" className="py-16 px-6 sm:px-8 lg:px-12 bg-content-bg dark:bg-content-bg-dark transition-colors duration-300">
      
      {/* Card UI Wrapper */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-charcoal rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10 md:p-16 shadow-sm">
        
        <SectionHeading 
          title="Testimonials" 
          subtitle="Client & Colleague Feedback" 
        />

        <div className="relative bg-slate-50 dark:bg-charcoal-medium p-8 sm:p-10 rounded-2xl border border-slate-100 dark:border-slate-800/30 max-w-4xl mx-auto">
          <div className="absolute top-4 right-4 flex space-x-2 z-10">
            {activeReview.linkedinUrl && (
              <a 
                href={activeReview.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-slate-200/50 dark:hover:bg-charcoal text-slate-500 hover:text-mustard transition-colors cursor-pointer"
              >
                <Linkedin size={16} />
              </a>
            )}
          </div>

          <div className="min-h-[160px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex space-x-1 mb-4">
                  {ratingStars}
                </div>

                <p className="text-sm sm:text-base text-charcoal/80 dark:text-slate-300 italic mb-6 leading-relaxed font-sans font-medium">
                  "{activeReview.review}"
                </p>

                <div className="flex items-center gap-4">
                  {activeReview.image ? (
                    <img 
                      src={activeReview.image} 
                      alt={activeReview.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-mustard shadow-sm"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-charcoal text-mustard flex items-center justify-center font-heading font-black text-sm shadow border border-mustard/20">
                      {activeReview.name[0]}
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-heading font-black text-charcoal dark:text-white uppercase tracking-wider">
                      {activeReview.name}
                    </h4>
                    <p className="text-[10px] font-sans font-semibold text-slate-500 dark:text-slate-400">
                      {activeReview.role} {activeReview.company ? `at ${activeReview.company}` : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-lg bg-white dark:bg-charcoal hover:bg-slate-100 dark:hover:bg-charcoal-light border border-slate-200/50 dark:border-slate-800/30 text-charcoal dark:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-lg bg-white dark:bg-charcoal hover:bg-slate-100 dark:hover:bg-charcoal-light border border-slate-200/50 dark:border-slate-800/30 text-charcoal dark:text-white transition-colors cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
