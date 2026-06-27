'use client';

import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Mail, Phone, MapPin, Send, Briefcase } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-toastify';

export default function Contact() {
  const { data } = useSite();
  const settings = data.settings || {};
  const about = settings.about || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/api/messages', formData);
      toast.success('Your message has been sent successfully!');

      // Format WhatsApp details
      const cleanPhone = settings.phone ? settings.phone.replace(/[^0-9+]/g, '') : '+919006786961';
      const waText = `*New Portfolio Enquiry*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Subject:* ${formData.subject}\n*Message:* ${formData.message}`;
      const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(waText)}`;
      
      // Open WhatsApp redirect
      window.open(waUrl, '_blank');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-6 sm:px-8 lg:px-12 bg-content-bg dark:bg-content-bg-dark transition-colors duration-300">
      
      {/* Card UI Wrapper */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-charcoal rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10 md:p-16 shadow-sm">
        
        <SectionHeading 
          title="Contact" 
          subtitle="Get in Touch & Collaborate" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Info Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-heading font-black text-charcoal dark:text-white uppercase tracking-tight mb-4">
              Contact Information
            </h3>

            {/* Email card */}
            <div className="bg-slate-50 dark:bg-charcoal-medium p-5 rounded-2xl border border-slate-100 dark:border-slate-800/30 flex items-center gap-4">
              <div className="p-3 bg-mustard rounded-full text-charcoal shadow-sm">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] font-heading font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">Email Me</p>
                <a href={`mailto:${settings.email || 'abhayupadhyay807@gmail.com'}`} className="text-sm font-sans font-bold text-charcoal dark:text-slate-200 hover:text-mustard dark:hover:text-mustard transition-colors">
                  {settings.email || 'abhayupadhyay807@gmail.com'}
                </a>
              </div>
            </div>

            {/* Phone card */}
            <div className="bg-slate-50 dark:bg-charcoal-medium p-5 rounded-2xl border border-slate-100 dark:border-slate-800/30 flex items-center gap-4">
              <div className="p-3 bg-mustard rounded-full text-charcoal shadow-sm">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-heading font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">Call Me</p>
                <a href={`tel:${settings.phone || '+91 9006786961'}`} className="text-sm font-sans font-bold text-charcoal dark:text-slate-200 hover:text-mustard dark:hover:text-mustard transition-colors">
                  {settings.phone || '+91 9006786961'}
                </a>
              </div>
            </div>

            {/* Location card */}
            <div className="bg-slate-50 dark:bg-charcoal-medium p-5 rounded-2xl border border-slate-100 dark:border-slate-800/30 flex items-center gap-4">
              <div className="p-3 bg-mustard rounded-full text-charcoal shadow-sm">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-heading font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">Location</p>
                <span className="text-sm font-sans font-bold text-charcoal dark:text-slate-200">
                  {settings.location || 'Gopalganj, Bihar, India'}
                </span>
              </div>
            </div>

            {/* Availability Badge */}
            {about.openToWork && (
              <div className="bg-slate-50 dark:bg-charcoal-medium p-5 rounded-2xl border-l-4 border-mustard dark:border-mustard border-y border-r border-slate-100 dark:border-slate-800/30 flex items-center gap-4">
                <div className="p-3 bg-mustard/20 rounded-full text-mustard shadow-sm">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-heading font-black tracking-widest text-mustard uppercase">Availability</p>
                  <span className="text-xs font-sans font-bold text-charcoal/80 dark:text-slate-300">
                    Open to Full-time & Internship Roles
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-charcoal-medium p-8 rounded-2xl border border-slate-100 dark:border-slate-800/30">
            <h3 className="text-lg font-heading font-black text-charcoal dark:text-white uppercase tracking-tight mb-6">
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-heading font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal text-charcoal dark:text-white text-xs font-sans font-medium focus:outline-none focus:border-mustard transition-colors"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-heading font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal text-charcoal dark:text-white text-xs font-sans font-medium focus:outline-none focus:border-mustard transition-colors"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] font-heading font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal text-charcoal dark:text-white text-xs font-sans font-medium focus:outline-none focus:border-mustard transition-colors"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-heading font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal text-charcoal dark:text-white text-xs font-sans font-medium focus:outline-none focus:border-mustard transition-colors"
                  placeholder="Write message here..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 text-xs font-heading font-black tracking-widest text-white bg-charcoal hover:bg-charcoal-medium dark:bg-white dark:text-charcoal dark:hover:bg-slate-100 rounded-full transition-all duration-300 shadow disabled:opacity-50 cursor-pointer"
              >
                <span>{submitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
