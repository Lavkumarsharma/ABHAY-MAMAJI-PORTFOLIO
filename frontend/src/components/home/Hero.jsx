'use client';

import React, { useEffect, useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  const { data } = useSite();
  const settings = data.settings || {};
  const hero = settings.hero || {};
  const [typedText, setTypedText] = useState('');
  
  const titles = [settings.title || 'Data Analyst', 'SQL & Power BI Expert', 'Insight Architect'];
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentTitle = titles[titleIdx];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentTitle.substring(0, charIdx - 1));
        setCharIdx(prev => prev - 1);
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentTitle.substring(0, charIdx + 1));
        setCharIdx(prev => prev + 1);
      }, 100);
    }

    if (!isDeleting && charIdx === currentTitle.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setTitleIdx(prev => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, titleIdx]);

  const profileImg = hero.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';

  return (
    <section id="home" className="relative min-h-[85vh] lg:min-h-screen flex items-center lg:items-start justify-center pt-24 lg:pt-28 pb-16 overflow-hidden bg-white dark:bg-charcoal transition-colors duration-300">
      


      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column info */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
          
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-mustard font-heading text-lg font-black tracking-wider uppercase mb-2"
          >
            {hero.headingLine1 || "Hi there!"}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black text-charcoal dark:text-white leading-none tracking-tighter mb-4"
          >
            <span className="text-mustard">{settings.fullName ? settings.fullName.split(' ')[0].toUpperCase() : 'ABHAY'}</span>{' '}
            <span className="text-mustard">{settings.fullName ? settings.fullName.split(' ')[1].toUpperCase() : 'KUMAR'}</span>{' '}
            <span className="px-4 py-1.5 bg-mustard text-charcoal rounded-xl inline-block my-1 shadow-md border border-charcoal/10 uppercase tracking-tighter">
              {settings.fullName ? settings.fullName.split(' ').slice(2).join(' ').toUpperCase() : 'UPADHYAY'}
            </span>
          </motion.h1>
          
          {/* Badge box (Title & Role - matches dark boxes in reference) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6"
          >
            <div className="px-4 py-1.5 bg-charcoal dark:bg-charcoal-medium text-white text-xs font-heading font-black tracking-widest uppercase rounded">
              {typedText || 'DATA ANALYST'}
            </div>
            <div className="px-4 py-1.5 bg-mustard text-charcoal text-xs font-heading font-black tracking-widest uppercase rounded">
              READY TO HANDLE YOUR DATA
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-charcoal/80 dark:text-slate-300 max-w-xl mb-8 leading-relaxed text-sm sm:text-base font-sans font-medium"
          >
            {hero.subheading ? (
              hero.subheading
            ) : (
              <>
                Detail-oriented <span className="text-mustard font-heading font-black text-xs tracking-wider uppercase bg-mustard/15 px-2 py-0.5 rounded border border-mustard/20">Data Analyst</span> with a strong academic foundation in computer applications and data-centric problem solving. Skilled in data collection, cleaning, analysis, and visualization using <span className="text-mustard font-bold underline decoration-mustard decoration-2 underline-offset-2">Python</span>, <span className="text-mustard font-bold underline decoration-mustard decoration-2 underline-offset-2">SQL</span>, and <span className="text-mustard font-bold underline decoration-mustard decoration-2 underline-offset-2">Power BI</span>.
              </>
            )}
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
          >
            <a 
              href={hero.primaryButtonLink || '#projects'} 
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-xs font-heading font-black tracking-widest text-white bg-charcoal hover:bg-charcoal-medium dark:bg-white dark:text-charcoal dark:hover:bg-slate-100 rounded-full transition-all duration-300 shadow-md group cursor-pointer"
            >
              <span>{hero.primaryButtonText || 'VIEW MY WORK'}</span>
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={hero.secondaryButtonLink || '#contact'} 
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-xs font-heading font-black tracking-widest text-charcoal bg-mustard hover:bg-mustard-hover rounded-full transition-all duration-300 shadow-md cursor-pointer"
            >
              CONTACT ME
            </a>
            <a 
              href={settings.resumeLink || '#contact'} 
              download={!!settings.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-xs font-heading font-black tracking-widest text-charcoal border-2 border-charcoal/20 hover:border-charcoal dark:text-white dark:border-white/20 dark:hover:border-white rounded-full transition-all duration-300 shadow-sm cursor-pointer gap-2"
            >
              <Download size={14} /> DOWNLOAD RESUME
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start space-x-4"
          >
            {settings.github && (
              <a href={settings.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-charcoal/5 hover:bg-charcoal/10 dark:bg-white/5 dark:hover:bg-white/10 text-charcoal dark:text-white transition-all cursor-pointer">
                <Github size={18} />
              </a>
            )}
            {settings.linkedin && (
              <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-charcoal/5 hover:bg-charcoal/10 dark:bg-white/5 dark:hover:bg-white/10 text-charcoal dark:text-white transition-all cursor-pointer">
                <Linkedin size={18} />
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="p-3 rounded-full bg-charcoal/5 hover:bg-charcoal/10 dark:bg-white/5 dark:hover:bg-white/10 text-charcoal dark:text-white transition-all cursor-pointer">
                <Mail size={18} />
              </a>
            )}
          </motion.div>
        </div>

        {/* Right Column Profile — Frameless with smokey bottom fade */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[380px]"
          >
            <img
              src={profileImg}
              alt={settings.fullName || 'Abhay Kumar Upadhyay'}
              className="w-full object-cover"
            />
            {/* Smokey bottom fade — blends image into section background */}
            <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-white dark:from-charcoal via-white/60 dark:via-charcoal/60 to-transparent pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
