'use client';

import React from 'react';
import { useSite } from '../../context/SiteContext';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function Blog() {
  const { data } = useSite();
  const blogs = data.blogs || [];

  const displayBlogs = [...blogs]
    .filter(b => b.status === 'published')
    .sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.order - b.order;
    })
    .slice(0, 3);

  if (displayBlogs.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-16 px-6 sm:px-8 lg:px-12 bg-content-bg dark:bg-content-bg-dark transition-colors duration-300">
      
      {/* Card UI Wrapper */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-charcoal rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10 md:p-16 shadow-sm">
        
        <SectionHeading 
          title="Blog" 
          subtitle="Articles & Insights" 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {displayBlogs.map((post, idx) => {
            const coverImage = post.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80';
            return (
              <motion.div
                key={post._id || post.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-50 dark:bg-charcoal-medium overflow-hidden group rounded-2xl border border-slate-100 dark:border-slate-800/30 hover:border-mustard/35 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative"
              >
                {/* Hover accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-mustard scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div>
                  <div className="relative aspect-video overflow-hidden border-b border-slate-200/40 dark:border-slate-800/40">
                    <img 
                      src={coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-mustard text-charcoal text-[9px] font-heading font-black px-2.5 py-1 rounded shadow-md uppercase tracking-wider">
                      {post.category || 'Tech'}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[10px] font-sans font-semibold text-slate-500 dark:text-slate-300 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{post.readTime || '5 MIN READ'}</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-heading font-black text-charcoal dark:text-white line-clamp-2 mb-2 uppercase tracking-tight leading-snug group-hover:text-mustard transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-charcoal/70 dark:text-slate-400 line-clamp-3 leading-relaxed font-sans">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-4">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-heading font-black text-charcoal hover:text-mustard dark:text-white dark:hover:text-mustard uppercase tracking-widest transition-colors group/link"
                  >
                    <span>Read Full Post</span>
                    <ArrowRight size={12} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {blogs.length > 3 && (
          <div className="text-center mt-12">
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center px-8 py-3 text-xs font-heading font-black tracking-widest text-white bg-charcoal hover:bg-charcoal-medium dark:bg-white dark:text-charcoal dark:hover:bg-slate-100 rounded-full transition-all duration-300 shadow-md cursor-pointer"
            >
              BROWSE ALL ARTICLES
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
