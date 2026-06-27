'use client';

import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const { data } = useSite();
  const settings = data.settings || {};
  const footer = settings.footer || { tagline: '', quickLinks: [], copyrightText: '' };

  return (
    <footer className="bg-slate-100 dark:bg-[#0c0c12] border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Info */}
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              {settings.fullName || 'Abhay Kumar Upadhyay'}
            </span>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {footer.tagline || 'Analyzing data to build insights and drive decisions.'}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-200 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {footer.quickLinks && footer.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.path} className="text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact/Social */}
          <div>
            <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-200 tracking-wider uppercase">
              Connect
            </h3>
            <div className="flex space-x-4 mt-4">
              {settings.github && (
                <a href={settings.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white hover:text-mustard dark:hover:text-mustard transition-colors cursor-pointer">
                  <Github size={18} />
                </a>
              )}
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white hover:text-mustard dark:hover:text-mustard transition-colors cursor-pointer">
                  <Linkedin size={18} />
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white hover:text-mustard dark:hover:text-mustard transition-colors cursor-pointer">
                  <Mail size={18} />
                </a>
              )}
            </div>
            <div className="mt-4 space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center space-x-2">
                <MapPin size={12} />
                <span>{settings.location || 'Gopalganj, Bihar, India'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={12} />
                <span>{settings.phone || '+91 9006786961'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {footer.copyrightText || `© ${new Date().getFullYear()} Abhay Kumar Upadhyay. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
