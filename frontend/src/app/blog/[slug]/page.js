'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSite } from '../../../context/SiteContext';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data, loading } = useSite();
  const blogs = data.blogs || [];

  const post = blogs.find(b => b.slug === slug);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-600 animate-spin mb-2" />
        <p className="text-sm text-slate-500">Loading article details...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Article Not Found</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">The article you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => router.push('/blog')}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 rounded-xl shadow cursor-pointer"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const coverImage = post.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80';
  const related = blogs.filter(b => b.category === post.category && b.slug !== slug).slice(0, 3);

  const handleShare = (platform) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = encodeURIComponent(`Check out this post: ${post.title}`);
    
    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 mb-8 cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Back to Articles</span>
      </button>

      {/* Header */}
      <div className="mb-6">
        <span className="text-xs font-bold bg-violet-100 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 px-3 py-1 rounded-full uppercase tracking-wider">
          {post.category || 'Tech'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4 tracking-tight leading-tight">
          {post.title}
        </h1>
        
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-6">
          <span>By {post.author || 'Abhay Kumar Upadhyay'}</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{post.readTime || '5 min read'}</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-slate-900 mb-10">
        <img 
          src={coverImage} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose dark:prose-invert max-w-none mb-12">
        <div 
          className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>

      {/* Share Section */}
      <div className="border-y border-slate-200 dark:border-slate-800 py-6 my-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Share2 size={16} />
          <span>Share this article</span>
        </span>
        <div className="flex space-x-3">
          <button 
            onClick={() => handleShare('twitter')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-205 dark:hover:bg-slate-700 text-xs font-semibold text-slate-750 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <Twitter size={14} />
            <span>Twitter</span>
          </button>
          <button 
            onClick={() => handleShare('facebook')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-205 dark:hover:bg-slate-700 text-xs font-semibold text-slate-750 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <Facebook size={14} />
            <span>Facebook</span>
          </button>
          <button 
            onClick={() => handleShare('linkedin')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-205 dark:hover:bg-slate-700 text-xs font-semibold text-slate-750 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </button>
        </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="pt-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map(rel => (
              <Link key={rel.slug} href={`/blog/${rel.slug}`} className="glass-card overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={rel.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'} 
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-1">{rel.title}</h3>
                  <span className="text-[10px] text-violet-650 dark:text-violet-400 font-semibold">{rel.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
