'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { Modal, ConfirmModal, Input, Textarea, SaveBtn } from '../../../components/ui/AdminUI';
import { Briefcase, Plus, Pencil, Trash2, MapPin, Calendar } from 'lucide-react';

const EMPTY = { company:'', role:'', location:'', startDate:'', endDate:'', isCurrent:false, description:'', responsibilities:'', techStack:'', order:0 };

export default function ExperienceManager() {
  const { authHeaders } = useAuth();
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [del, setDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.get('/api/experiences').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const openEdit = (item) => {
    setForm({ ...item, techStack:(item.techStack||[]).join(', '), responsibilities:(item.responsibilities||[]).join('\n') });
    setEditing(item._id); setModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    const payload = { ...form,
      techStack: form.techStack.split(',').map(s=>s.trim()).filter(Boolean),
      responsibilities: form.responsibilities.split('\n').map(s=>s.trim()).filter(Boolean),
    };
    try {
      if (editing) await api.put(`/api/experiences/${editing}`, payload, { headers: authHeaders() });
      else          await api.post('/api/experiences', payload, { headers: authHeaders() });
      toast.success('Experience saved!'); setModal(false); load();
    } catch(e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await api.delete(`/api/experiences/${del}`, { headers: authHeaders() }); toast.success('Deleted'); setDel(null); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><Briefcase size={22}/> Experience</h1>
          <p className="text-sm text-slate-400 mt-1">Manage work experience timeline</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setEditing(null); setModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-sm font-bold rounded-xl cursor-pointer hover:from-violet-700 hover:to-pink-600 transition">
          <Plus size={16}/> Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item._id} className="glass-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white">{item.role}</h3>
                <p className="text-sm text-violet-400 font-semibold mt-0.5">{item.company}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Calendar size={12}/>{item.startDate} – {item.isCurrent ? 'Present' : item.endDate}</span>
                  {item.location && <span className="flex items-center gap-1"><MapPin size={12}/>{item.location}</span>}
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {(item.techStack||[]).map((t,i) => <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{t}</span>)}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(item)} className="text-slate-500 hover:text-violet-400 cursor-pointer"><Pencil size={15}/></button>
                <button onClick={() => setDel(item._id)} className="text-slate-500 hover:text-red-400 cursor-pointer"><Trash2 size={15}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Experience' : 'Add Experience'} onClose={() => setModal(false)} wide>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Company *" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} required/>
              <Input label="Role / Title *" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} required/>
              <Input label="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
              <Input label="Start Date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})} placeholder="Jun 2025"/>
              <Input label="End Date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})} placeholder="Jul 2025" disabled={form.isCurrent}/>
              <div className="flex items-center gap-2 mt-5">
                <input type="checkbox" id="curr" checked={form.isCurrent} onChange={e=>setForm({...form,isCurrent:e.target.checked})} className="w-4 h-4 accent-violet-600"/>
                <label htmlFor="curr" className="text-sm text-slate-300">Currently Working Here</label>
              </div>
              <Input label="Order" type="number" value={form.order} onChange={e=>setForm({...form,order:+e.target.value})}/>
            </div>
            <Input label="Tech Stack (comma separated)" value={form.techStack} onChange={e=>setForm({...form,techStack:e.target.value})}/>
            <Textarea label="Brief Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={2}/>
            <Textarea label="Responsibilities (one per line)" value={form.responsibilities} onChange={e=>setForm({...form,responsibilities:e.target.value})} rows={5}/>
            <SaveBtn loading={saving}/>
          </form>
        </Modal>
      )}
      {del && <ConfirmModal message="Delete this experience?" onConfirm={handleDelete} onClose={() => setDel(null)}/>}
    </div>
  );
}
