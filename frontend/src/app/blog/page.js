'use client';

import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Search, Calendar, Clock, Loader2 } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import Link from 'next/link';

export default function BlogListingPage() {
  const { data, loading } = useSite();
  const blogs = data.blogs || [];

  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const categories = ['All', ...new Set(blogs.map(b => b.category || 'General'))];

  const filtered = blogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                          (post.excerpt && post.excerpt.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = activeCat === 'All' || (post.category || 'General') === activeCat;
    return matchesSearch && matchesCat;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-600 animate-spin mb-2" />
        <p className="text-sm text-slate-500">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        title="Blog & Insights" 
        subtitle="Articles and guides on database engineering, analytics, and business intelligence" 
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCat === cat 
                  ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-md' 
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-350 border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
              } cursor-pointer`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-sm"
          />
          <Search className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 dark:text-slate-400 text-lg">No articles found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(post => {
            const coverImage = post.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80';
            return (
              <div key={post._id || post.slug} className="glass-card overflow-hidden group shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div>
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-violet-650/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                      {post.category || 'Tech'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-405 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{post.readTime || '5 min read'}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 hover:text-violet-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-4">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-violet-605 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300"
                  >
                    Read Full Post →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
