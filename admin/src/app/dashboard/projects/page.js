'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { Modal, ConfirmModal, Input, Textarea, SaveBtn } from '../../../components/ui/AdminUI';
import { FolderKanban, Plus, Pencil, Trash2, Star, ExternalLink, Github } from 'lucide-react';
import { useImageUploadWithCrop } from '../../../hooks/useImageUploadWithCrop';

const EMPTY = { title:'', slug:'', category:'', description:'', longDescription:'', techStack:'', githubLink:'', liveLink:'', features:'', outcomes:'', isFeatured:false, order:0 };

export default function ProjectsManager() {
  const { authHeaders } = useAuth();
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [del, setDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const { CropModalNode, openCropPicker } = useImageUploadWithCrop(authHeaders);

  const load = () => api.get('/api/projects').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal(true); };
  const openEdit = (item) => {
    setForm({ ...item, techStack: (item.techStack||[]).join(', '), features: (item.features||[]).join('\n'), outcomes: (item.outcomes||[]).join('\n') });
    setEditing(item._id); setModal(true);
  };


  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const payload = { ...form,
      slug: form.slug || generateSlug(form.title),
      techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean),
      features:  form.features.split('\n').map(s => s.trim()).filter(Boolean),
      outcomes:  form.outcomes.split('\n').map(s => s.trim()).filter(Boolean),
    };
    try {
      if (editing) await api.put(`/api/projects/${editing}`, payload, { headers: authHeaders() });
      else          await api.post('/api/projects', payload, { headers: authHeaders() });
      toast.success('Project saved!'); setModal(false); load();
    } catch(e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/projects/${del}`, { headers: authHeaders() });
      toast.success('Project deleted'); setDel(null); load();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      {CropModalNode}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><FolderKanban size={22}/> Projects</h1>
          <p className="text-sm text-slate-400 mt-1">Manage portfolio projects</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-sm font-bold rounded-xl cursor-pointer hover:from-violet-700 hover:to-pink-600 transition">
          <Plus size={16}/> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item._id} className="glass-card p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-white truncate">{item.title}</h3>
                  {item.isFeatured && <Star size={13} className="text-amber-400 fill-amber-400 flex-shrink-0"/>}
                </div>
                <span className="text-xs text-violet-400 font-semibold">{item.category}</span>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {item.githubLink && <a href={item.githubLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white"><Github size={15}/></a>}
                {item.liveLink   && <a href={item.liveLink}   target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white"><ExternalLink size={15}/></a>}
                <button onClick={() => openEdit(item)} className="text-slate-500 hover:text-violet-400 cursor-pointer"><Pencil size={15}/></button>
                <button onClick={() => setDel(item._id)} className="text-slate-500 hover:text-red-400 cursor-pointer"><Trash2 size={15}/></button>
              </div>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
            <div className="flex flex-wrap gap-1">
              {(item.techStack||[]).slice(0,4).map((t,i) => <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Project' : 'Add Project'} onClose={() => setModal(false)} wide>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Title *" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
              <Input label="Category *" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} required/>
              <div className="flex flex-col gap-2">
                <Input label="Cover Image URL" value={form.image||''} onChange={e=>setForm({...form,image:e.target.value})}/>
                {form.image && (
                  <img src={form.image} alt="Cover preview" className="w-20 h-14 object-cover rounded-xl border border-slate-700" />
                )}
                <button
                  type="button"
                  onClick={() => openCropPicker({ aspect: 16/9, onUploaded: (url) => setForm(prev => ({ ...prev, image: url })) })}
                  className="w-full py-2 rounded-xl border border-dashed border-violet-600/50 text-xs font-semibold text-violet-400 hover:bg-violet-600/10 transition cursor-pointer"
                >
                  📷 Choose &amp; Crop Cover Image (16:9)
                </button>
              </div>
              <Input label="GitHub Link" value={form.githubLink} onChange={e=>setForm({...form,githubLink:e.target.value})}/>
              <Input label="Live Link" value={form.liveLink} onChange={e=>setForm({...form,liveLink:e.target.value})}/>
              <Input label="Order" type="number" value={form.order} onChange={e=>setForm({...form,order:+e.target.value})}/>
              <div className="flex items-center gap-2 mt-5">
                <input type="checkbox" id="feat" checked={form.isFeatured} onChange={e=>setForm({...form,isFeatured:e.target.checked})} className="w-4 h-4 accent-violet-600"/>
                <label htmlFor="feat" className="text-sm text-slate-300">Featured</label>
              </div>
            </div>
            <Input label="Tech Stack (comma separated)" value={form.techStack} onChange={e=>setForm({...form,techStack:e.target.value})} placeholder="SQL, Power BI, Python"/>
            <Textarea label="Short Description *" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={2} required/>
            <Textarea label="Long Description" value={form.longDescription} onChange={e=>setForm({...form,longDescription:e.target.value})} rows={4}/>
            <Textarea label="Key Features (one per line)" value={form.features} onChange={e=>setForm({...form,features:e.target.value})} rows={3}/>
            <Textarea label="Outcomes (one per line)" value={form.outcomes} onChange={e=>setForm({...form,outcomes:e.target.value})} rows={3}/>
            <SaveBtn loading={saving}/>
          </form>
        </Modal>
      )}

      {del && <ConfirmModal message="Delete this project permanently?" onConfirm={handleDelete} onClose={() => setDel(null)}/>}
    </div>
  );
}
