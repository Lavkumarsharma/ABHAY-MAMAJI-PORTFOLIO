'use client';

import React from 'react';
import { SiteProvider } from '../../context/SiteContext';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

export default function ClientLayout({ children }) {
  return (
    <SiteProvider>
      <div className="flex flex-col min-h-screen bg-content-bg dark:bg-content-bg-dark text-charcoal dark:text-content-bg transition-colors duration-300">
        <Sidebar />
        <div className="flex-grow flex flex-col pt-16">
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </SiteProvider>
  );
}
