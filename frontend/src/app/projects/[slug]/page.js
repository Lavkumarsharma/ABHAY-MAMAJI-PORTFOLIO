'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSite } from '../../../context/SiteContext';
import { Github, ExternalLink, ArrowLeft, CheckCircle2, Award, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data, loading } = useSite();
  const projects = data.projects || [];
  
  const project = projects.find(p => p.slug === slug);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-600 animate-spin mb-2" />
        <p className="text-sm text-slate-500">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Project Not Found</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">The project you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => router.push('/')}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 rounded-xl shadow cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const coverImage = project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80';
  const related = projects.filter(p => p.category === project.category && p.slug !== slug).slice(0, 3);

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 mb-8 cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Back to Projects</span>
      </button>

      {/* Hero Header */}
      <div className="mb-8">
        <span className="text-xs font-bold bg-violet-100 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 px-3 py-1 rounded-full uppercase tracking-wider">
          {project.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          {project.title}
        </h1>
      </div>

      {/* Main Cover Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-slate-900 mb-10">
        <img 
          src={coverImage} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Project details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Left Side */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Project Overview</h2>
            <p className="text-slate-650 dark:text-slate-350 text-base leading-relaxed whitespace-pre-line">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Key Features</h2>
              <ul className="space-y-2.5">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-650 dark:text-slate-350">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcomes */}
          {project.outcomes && project.outcomes.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Project Outcomes</h2>
              <ul className="space-y-2.5">
                {project.outcomes.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-650 dark:text-slate-350">
                    <Award className="w-5 h-5 text-pink-500 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack && project.techStack.map((tech, idx) => (
                <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 px-3 py-1.5 rounded-lg font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 shadow-sm space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Project Links</h3>
            
            {project.githubLink && (
              <a 
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-750 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-705 border border-slate-200/50 dark:border-slate-700/50 rounded-xl transition-all cursor-pointer"
              >
                <Github size={16} />
                <span>View Source Code</span>
              </a>
            )}

            {project.liveLink && (
              <a 
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 rounded-xl shadow hover:from-violet-700 hover:to-pink-600 transition-all cursor-pointer"
              >
                <ExternalLink size={16} />
                <span>View Live Dashboard</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {related.length > 0 && (
        <div className="border-t border-slate-200 dark:border-slate-800 pt-12 mt-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map(rel => (
              <Link key={rel.slug} href={`/projects/${rel.slug}`} className="glass-card overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={rel.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'} 
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">{rel.title}</h3>
                  <span className="text-[10px] text-violet-600 dark:text-violet-405 font-semibold">{rel.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
