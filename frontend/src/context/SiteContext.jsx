'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SiteContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const SiteProvider = ({ children }) => {
  const [data, setData] = useState({
    settings: {},
    experiences: [],
    projects: [],
    skills: [],
    education: [],
    certifications: [],
    testimonials: [],
    blogs: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');

  const fetchBootstrap = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/settings/bootstrap`);
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bootstrap data:', err);
      setError('Could not retrieve portfolio data. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBootstrap();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    }
  }, [theme]);

  return (
    <SiteContext.Provider value={{ data, loading, error, theme, toggleTheme, refetch: fetchBootstrap }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
