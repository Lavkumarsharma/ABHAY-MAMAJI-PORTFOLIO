'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { Input, Textarea, SaveBtn } from '../../../components/ui/AdminUI';
import { Settings } from 'lucide-react';
import { useImageUploadWithCrop } from '../../../hooks/useImageUploadWithCrop';

const tabs = ['Personal', 'Hero', 'Navbar', 'About', 'Footer', 'Theme'];

export default function SettingsManager() {
  const { authHeaders } = useAuth();
  const [activeTab, setActiveTab] = useState('Personal');
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const { CropModalNode, openCropPicker } = useImageUploadWithCrop(authHeaders);

  useEffect(() => {
    api.get('/api/settings').then(r => setForm(r.data)).catch(() => toast.error('Failed to load settings'));
  }, []);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('resume', file);
    try {
      toast.info('Uploading resume PDF...');
      const res = await api.post('/api/upload/resume', formData, {
        headers: {
          ...authHeaders(),
          'Content-Type': 'multipart/form-data',
        },
      });
      set('resumeLink', res.data.url);
      toast.success('Resume PDF uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Resume upload failed.');
    }
  };

  const set = (path, value) => {
    setForm(prev => {
      const parts = path.split('.');
      const updated = { ...prev };
      let cur = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        cur[parts[i]] = { ...cur[parts[i]] };
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      return updated;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/api/settings', form, { headers: authHeaders() });
      toast.success('Settings saved successfully!');
    } catch { toast.error('Failed to save settings'); }
    finally { setSaving(false); }
  };

  if (!form) return <div className="text-slate-400 py-20 text-center">Loading settings...</div>;

  return (
    <div className="space-y-6">
      {CropModalNode}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><Settings size={22} /> Site Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage global portfolio configuration and content</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${activeTab === t ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="glass-card p-6 space-y-5">
        {activeTab === 'Personal' && (<>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={form.fullName || ''} onChange={e => set('fullName', e.target.value)} />
            <Input label="Title" value={form.title || ''} onChange={e => set('title', e.target.value)} />
            <Input label="Email" type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} />
            <Input label="Phone" value={form.phone || ''} onChange={e => set('phone', e.target.value)} />
            <Input label="Location" value={form.location || ''} onChange={e => set('location', e.target.value)} />
            <div className="flex flex-col gap-1.5">
              <Input label="Resume Link (URL)" value={form.resumeLink || ''} onChange={e => set('resumeLink', e.target.value)} />
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleResumeUpload}
                className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-700 cursor-pointer"
              />
            </div>
            <Input label="GitHub URL" value={form.github || ''} onChange={e => set('github', e.target.value)} />
            <Input label="LinkedIn URL" value={form.linkedin || ''} onChange={e => set('linkedin', e.target.value)} />
            <Input label="Twitter URL" value={form.twitter || ''} onChange={e => set('twitter', e.target.value)} />
          </div>
          <Textarea label="Tagline" value={form.tagline || ''} onChange={e => set('tagline', e.target.value)} rows={2} />
        </>)}

        {activeTab === 'Hero' && (<>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Heading Line 1" value={form.hero?.headingLine1 || ''} onChange={e => set('hero.headingLine1', e.target.value)} />
            <Input label="Heading Line 2 (Name)" value={form.hero?.headingLine2 || ''} onChange={e => set('hero.headingLine2', e.target.value)} />
            <Input label="Heading Line 3 (Role)" value={form.hero?.headingLine3 || ''} onChange={e => set('hero.headingLine3', e.target.value)} />
            <div className="flex flex-col gap-2">
              <Input label="Profile Image URL" value={form.hero?.profileImage || ''} onChange={e => set('hero.profileImage', e.target.value)} />
              {form.hero?.profileImage && (
                <img src={form.hero.profileImage} alt="Hero preview" className="w-20 h-28 object-cover rounded-xl border border-slate-700" />
              )}
              <button
                type="button"
                onClick={() => openCropPicker({ aspect: 3/4, onUploaded: (url) => set('hero.profileImage', url) })}
                className="w-full py-2 rounded-xl border border-dashed border-violet-600/50 text-xs font-semibold text-violet-400 hover:bg-violet-600/10 transition cursor-pointer"
              >
                📷 Choose &amp; Crop Hero Photo (3:4)
              </button>
            </div>
            <Input label="Primary Button Text" value={form.hero?.primaryButtonText || ''} onChange={e => set('hero.primaryButtonText', e.target.value)} />
            <Input label="Primary Button Link" value={form.hero?.primaryButtonLink || ''} onChange={e => set('hero.primaryButtonLink', e.target.value)} />
            <Input label="Secondary Button Text" value={form.hero?.secondaryButtonText || ''} onChange={e => set('hero.secondaryButtonText', e.target.value)} />
            <Input label="Secondary Button Link" value={form.hero?.secondaryButtonLink || ''} onChange={e => set('hero.secondaryButtonLink', e.target.value)} />
          </div>
          <Textarea label="Subheading / Bio Text" value={form.hero?.subheading || ''} onChange={e => set('hero.subheading', e.target.value)} rows={3} />
        </>)}

        {activeTab === 'Navbar' && (<>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Logo Text" value={form.navbar?.logoText || ''} onChange={e => set('navbar.logoText', e.target.value)} />
            <Input label="Logo Accent" value={form.navbar?.logoAccent || ''} onChange={e => set('navbar.logoAccent', e.target.value)} />
            <Input label="CTA Button Text" value={form.navbar?.ctaText || ''} onChange={e => set('navbar.ctaText', e.target.value)} />
            <Input label="CTA Button Link" value={form.navbar?.ctaPath || ''} onChange={e => set('navbar.ctaPath', e.target.value)} />
          </div>
          <div className="border-t border-slate-800/80 pt-6 mt-6">
            <h3 className="text-sm font-bold text-white mb-4">Navbar Navigation Links</h3>
            <div className="space-y-3">
              {(form.navbar?.links || []).map((link, idx) => (
                <div key={idx} className="flex gap-3 items-center bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
                  <div className="flex-grow grid grid-cols-2 gap-3">
                    <Input 
                      placeholder="Link Label (e.g. About)" 
                      value={link.name || ''} 
                      onChange={e => {
                        const newLinks = [...(form.navbar?.links || [])];
                        newLinks[idx] = { ...newLinks[idx], name: e.target.value };
                        set('navbar.links', newLinks);
                      }} 
                    />
                    <Input 
                      placeholder="Link Path (e.g. #about)" 
                      value={link.path || ''} 
                      onChange={e => {
                        const newLinks = [...(form.navbar?.links || [])];
                        newLinks[idx] = { ...newLinks[idx], path: e.target.value };
                        set('navbar.links', newLinks);
                      }} 
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      const newLinks = (form.navbar?.links || []).filter((_, i) => i !== idx);
                      set('navbar.links', newLinks);
                    }}
                    className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer self-center mt-6"
                  >
                    Delete
                  </button>
                </div>
              ))}
              
              <button 
                type="button"
                onClick={() => {
                  const newLinks = [...(form.navbar?.links || []), { name: '', path: '' }];
                  set('navbar.links', newLinks);
                }}
                className="w-full py-2.5 rounded-xl border border-dashed border-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:border-slate-700 transition cursor-pointer bg-slate-900/20"
              >
                + Add Navigation Link
              </button>
            </div>
          </div>
        </>)}

        {activeTab === 'About' && (<>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Section Heading" value={form.about?.heading || ''} onChange={e => set('about.heading', e.target.value)} />
            <Input label="Section Subheading" value={form.about?.subheading || ''} onChange={e => set('about.subheading', e.target.value)} />
            <div className="flex flex-col gap-2">
              <Input label="Profile Image URL" value={form.about?.profileImage || ''} onChange={e => set('about.profileImage', e.target.value)} />
              {form.about?.profileImage && (
                <img src={form.about.profileImage} alt="About preview" className="w-20 h-20 object-cover rounded-xl border border-slate-700" />
              )}
              <button
                type="button"
                onClick={() => openCropPicker({ aspect: 1, onUploaded: (url) => set('about.profileImage', url) })}
                className="w-full py-2 rounded-xl border border-dashed border-violet-600/50 text-xs font-semibold text-violet-400 hover:bg-violet-600/10 transition cursor-pointer"
              >
                📷 Choose &amp; Crop About Photo (1:1)
              </button>
            </div>
            <Input label="Years of Experience" value={form.about?.yearsOfExperience || ''} onChange={e => set('about.yearsOfExperience', e.target.value)} />
            <Input label="Projects Completed" value={form.about?.projectsCompleted || ''} onChange={e => set('about.projectsCompleted', e.target.value)} />
            <Input label="Technologies Mastered" value={form.about?.technologiesMastered || ''} onChange={e => set('about.technologiesMastered', e.target.value)} />
          </div>
          <Textarea label="Bio" value={form.about?.bio || ''} onChange={e => set('about.bio', e.target.value)} rows={5} />
          <div className="flex items-center gap-3">
            <input type="checkbox" id="openToWork" checked={form.about?.openToWork || false}
              onChange={e => set('about.openToWork', e.target.checked)}
              className="w-4 h-4 accent-violet-600" />
            <label htmlFor="openToWork" className="text-sm text-slate-300">Open to Work</label>
          </div>
        </>)}

        {activeTab === 'Footer' && (<>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Footer Tagline" value={form.footer?.tagline || ''} onChange={e => set('footer.tagline', e.target.value)} />
            <Input label="Copyright Text" value={form.footer?.copyrightText || ''} onChange={e => set('footer.copyrightText', e.target.value)} />
          </div>
          <div className="border-t border-slate-800/80 pt-6 mt-6">
            <h3 className="text-sm font-bold text-white mb-4">Footer Quick Links</h3>
            <div className="space-y-3">
              {(form.footer?.quickLinks || []).map((link, idx) => (
                <div key={idx} className="flex gap-3 items-center bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
                  <div className="flex-grow grid grid-cols-2 gap-3">
                    <Input 
                      placeholder="Link Label (e.g. Projects)" 
                      value={link.name || ''} 
                      onChange={e => {
                        const newLinks = [...(form.footer?.quickLinks || [])];
                        newLinks[idx] = { ...newLinks[idx], name: e.target.value };
                        set('footer.quickLinks', newLinks);
                      }} 
                    />
                    <Input 
                      placeholder="Link Path (e.g. #projects)" 
                      value={link.path || ''} 
                      onChange={e => {
                        const newLinks = [...(form.footer?.quickLinks || [])];
                        newLinks[idx] = { ...newLinks[idx], path: e.target.value };
                        set('footer.quickLinks', newLinks);
                      }} 
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      const newLinks = (form.footer?.quickLinks || []).filter((_, i) => i !== idx);
                      set('footer.quickLinks', newLinks);
                    }}
                    className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer self-center mt-6"
                  >
                    Delete
                  </button>
                </div>
              ))}
              
              <button 
                type="button"
                onClick={() => {
                  const newLinks = [...(form.footer?.quickLinks || []), { name: '', path: '' }];
                  set('footer.quickLinks', newLinks);
                }}
                className="w-full py-2.5 rounded-xl border border-dashed border-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:border-slate-700 transition cursor-pointer bg-slate-900/20"
              >
                + Add Quick Link
              </button>
            </div>
          </div>
        </>)}

        {activeTab === 'Theme' && (<>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Primary Color (hex)" value={form.theme?.primaryColor || ''} onChange={e => set('theme.primaryColor', e.target.value)} />
            <Input label="Accent Color (hex)" value={form.theme?.accentColor || ''} onChange={e => set('theme.accentColor', e.target.value)} />
            <Input label="Background Color (hex)" value={form.theme?.backgroundColor || ''} onChange={e => set('theme.backgroundColor', e.target.value)} />
            <Input label="Font Family" value={form.theme?.fontFamily || ''} onChange={e => set('theme.fontFamily', e.target.value)} />
          </div>
        </>)}

        <div className="pt-2"><SaveBtn loading={saving} /></div>
      </form>
    </div>
  );
}
