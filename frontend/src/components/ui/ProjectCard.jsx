'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProjectCard({ project }) {
  const { title, slug, category, description, techStack, image, githubLink, liveLink } = project;

  const coverImage = image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80';

  return (
    <motion.div 
      layout
      className="bg-slate-50 dark:bg-charcoal-medium overflow-hidden group rounded-2xl border border-slate-100 dark:border-slate-800/30 hover:border-mustard/35 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Top hover accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-mustard scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video border-b border-slate-200/40 dark:border-slate-800/40">
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-mustard text-charcoal text-[9px] font-heading font-black px-2.5 py-1 rounded shadow-md uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base font-heading font-black text-charcoal dark:text-white mb-2 line-clamp-1 uppercase tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-charcoal/70 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed font-sans">
            {description}
          </p>

          {/* Tech Badges (uppercase, blocky look) */}
          <div className="flex flex-wrap gap-1 mb-5">
            {techStack && techStack.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="text-[9px] font-heading font-black tracking-wider uppercase bg-charcoal/5 dark:bg-charcoal-light/30 text-charcoal/80 dark:text-slate-200 px-2 py-0.5 rounded">
                {tech}
              </span>
            ))}
            {techStack && techStack.length > 3 && (
              <span className="text-[9px] font-heading font-black tracking-wider uppercase bg-mustard/15 text-mustard px-2 py-0.5 rounded">
                +{techStack.length - 3} MORE
              </span>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200/40 dark:border-slate-800/40 mt-auto">
          <Link 
            href={`/projects/${slug}`}
            className="inline-flex items-center text-xs font-heading font-black text-charcoal hover:text-mustard dark:text-white dark:hover:text-mustard uppercase tracking-widest transition-colors group/link"
          >
            <span>Learn More</span>
            <ArrowRight size={12} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex items-center space-x-3">
            {githubLink && (
              <a 
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/60 hover:text-mustard dark:text-white dark:hover:text-mustard transition-colors cursor-pointer"
                title="View Source Code"
              >
                <Github size={16} />
              </a>
            )}
            {liveLink && (
              <a 
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/60 hover:text-mustard dark:text-white dark:hover:text-mustard transition-colors cursor-pointer"
                title="View Live Site"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
