'use client';

import React, { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const { data } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const settings = data.settings || {};

  const dbLinks = settings.navbar?.links?.length > 0 ? settings.navbar.links : [
    { name: 'Home', path: '#home' },
    { name: 'About Me', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Education & Exp', path: '#resume' },
    { name: 'Portfolio', path: '#projects' },
    { name: 'Contact', path: '#contact' }
  ];

  // Remap stale paths that no longer match a real section ID
  const pathRemap = { '#education': '#resume', '#experience': '#resume', '/': '#home' };

  const navLinks = dbLinks.map(link => {
    const resolved = pathRemap[link.path] || link.path;
    const id = resolved.startsWith('#') ? resolved.substring(1) : 'home';
    return { name: link.name, path: resolved, id };
  });

  // IntersectionObserver to track active section while scrolling
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -55% 0px', // Trigger when section is around center
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      navLinks.forEach(link => {
        const el = document.getElementById(link.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [data]);

  return (
    <>
      {/* Horizontal Top Navbar for PC / Desktop & Mobile Headers */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-charcoal/95 border-b border-charcoal-medium/40 z-40 flex items-center justify-between px-6 sm:px-10 lg:px-16 shadow-sm backdrop-blur transition-all duration-300">
        
        {/* Branding / Logo */}
        <a href="#home" className="flex items-center space-x-2">
          <span className="font-heading text-lg sm:text-xl font-black tracking-tighter uppercase text-white">
            {settings.navbar?.logoText || 'ABHAY'} <span className="text-mustard">{settings.navbar?.logoAccent || 'UPADHYAY'}</span>
          </span>
        </a>

        {/* PC / Desktop Navigation Links (Horizontal Menu) */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.path}
                className={`
                  relative font-heading text-xs font-black tracking-widest uppercase py-1.5 transition-all duration-300
                  ${isActive ? 'text-mustard scale-105' : 'text-white/80 hover:text-mustard'}
                `}
              >
                <span>{link.name}</span>
                {/* Active Indicator Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-mustard rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Header Icons & Hamburger Menu button */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-charcoal-light/20 text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer menu overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-45 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer (Slides from the right) */}
      <aside className={`
        fixed top-0 right-0 h-full w-64 bg-white dark:bg-charcoal z-50 sidebar-shadow transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between py-8 px-6
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div>
          {/* Header inside drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
            <span className="font-heading text-base font-black tracking-tight uppercase text-charcoal dark:text-white">
              MENU
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-charcoal dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links inside mobile drawer */}
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    relative flex items-center font-heading text-sm font-black tracking-wider uppercase py-2 transition-all duration-300
                    ${isActive ? 'text-mustard pl-4 scale-105' : 'text-charcoal/70 dark:text-white hover:text-mustard'}
                  `}
                >
                  {/* Left Bullet Indicator */}
                  {isActive && (
                    <span className="absolute left-0 w-2 h-2 bg-mustard rounded-full" />
                  )}
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Drawer footer */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <span className="text-[10px] font-sans font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            © 2026 Abhay Upadhyay
          </span>
        </div>
      </aside>
    </>
  );
}
