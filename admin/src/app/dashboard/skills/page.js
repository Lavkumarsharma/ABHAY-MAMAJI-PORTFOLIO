'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { Modal, ConfirmModal, Input, Select, SaveBtn } from '../../../components/ui/AdminUI';
import { Zap, Plus, Pencil, Trash2 } from 'lucide-react';

const EMPTY = { name:'', category:'Tools', proficiency:80, order:0 };
const CATEGORIES = ['Tools','Backend','Database','Frontend','DevOps'];

export default function SkillsManager() {
  const { authHeaders } = useAuth();
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [del, setDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.get('/api/skills').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = items.filter(s => s.category === cat);
    return acc;
  }, {});

  const openEdit = (item) => { setForm({...item}); setEditing(item._id); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) await api.put(`/api/skills/${editing}`, form, { headers: authHeaders() });
      else          await api.post('/api/skills', form, { headers: authHeaders() });
      toast.success('Skill saved!'); setModal(false); load();
    } catch(e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await api.delete(`/api/skills/${del}`, { headers: authHeaders() }); toast.success('Skill deleted'); setDel(null); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><Zap size={22}/> Skills</h1>
          <p className="text-sm text-slate-400 mt-1">Manage technical skills and proficiency levels</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setEditing(null); setModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-sm font-bold rounded-xl cursor-pointer hover:from-violet-700 hover:to-pink-600 transition">
          <Plus size={16}/> Add Skill
        </button>
      </div>

      {CATEGORIES.map(cat => grouped[cat]?.length > 0 && (
        <div key={cat} className="glass-card p-5">
          <h2 className="text-sm font-bold text-violet-400 uppercase tracking-wider mb-4">{cat}</h2>
          <div className="space-y-3">
            {grouped[cat].map(s => (
              <div key={s._id} className="flex items-center gap-4">
                <span className="text-sm text-slate-200 w-28 flex-shrink-0 font-medium">{s.name}</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-600 to-pink-500 rounded-full" style={{width:`${s.proficiency}%`}}/>
                </div>
                <span className="text-xs text-violet-400 font-bold w-8 text-right">{s.proficiency}%</span>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(s)} className="text-slate-500 hover:text-violet-400 cursor-pointer"><Pencil size={14}/></button>
                  <button onClick={() => setDel(s._id)} className="text-slate-500 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {modal && (
        <Modal title={editing ? 'Edit Skill' : 'Add Skill'} onClose={() => setModal(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Skill Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
            <Select label="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Proficiency: {form.proficiency}%</label>
              <input type="range" min="0" max="100" value={form.proficiency}
                onChange={e=>setForm({...form,proficiency:+e.target.value})}
                className="w-full accent-violet-600"/>
            </div>
            <Input label="Order" type="number" value={form.order} onChange={e=>setForm({...form,order:+e.target.value})}/>
            <SaveBtn loading={saving}/>
          </form>
        </Modal>
      )}

      {del && <ConfirmModal message="Delete this skill?" onConfirm={handleDelete} onClose={() => setDel(null)}/>}
    </div>
  );
}
