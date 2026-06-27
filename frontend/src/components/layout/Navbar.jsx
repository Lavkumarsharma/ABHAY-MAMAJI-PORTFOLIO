'use client';

import React, { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { data, theme, toggleTheme } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const settings = data.settings || {};
  const navbar = settings.navbar || { logoText: 'Abhay', logoAccent: 'Upadhyay', links: [] };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-charcoal/90 backdrop-blur-md border-b border-mustard/20 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-heading font-black tracking-tight text-white uppercase">
              {navbar.logoText || 'Abhay'}
              <span className="text-mustard">
                {navbar.logoAccent || ' Upadhyay'}
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navbar.links && navbar.links.map((link, idx) => (
              <a 
                key={idx} 
                href={link.path} 
                className="text-sm font-heading font-black tracking-wider text-white hover:text-mustard transition-colors duration-200 uppercase"
              >
                {link.name}
              </a>
            ))}

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA */}
            {navbar.ctaText && (
              <a 
                href={navbar.ctaPath || '#contact'} 
                className="inline-flex items-center justify-center px-5 py-2 text-xs font-heading font-black tracking-widest text-charcoal bg-mustard hover:bg-mustard-hover rounded-full shadow-md transition-all duration-200 cursor-pointer uppercase"
              >
                {navbar.ctaText}
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none cursor-pointer transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-charcoal border-b border-mustard/20">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navbar.links && navbar.links.map((link, idx) => (
              <a
                key={idx}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-md text-sm font-heading font-black tracking-wider text-white hover:text-mustard hover:bg-white/5 transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
            {navbar.ctaText && (
              <div className="px-3 py-2">
                <a
                  href={navbar.ctaPath || '#contact'}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2.5 text-sm font-heading font-black tracking-widest text-charcoal bg-mustard hover:bg-mustard-hover rounded-full shadow-md uppercase transition-colors"
                >
                  {navbar.ctaText}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
