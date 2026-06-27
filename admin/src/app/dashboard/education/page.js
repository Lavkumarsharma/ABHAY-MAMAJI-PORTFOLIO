'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { Modal, ConfirmModal, Input, Textarea, SaveBtn } from '../../../components/ui/AdminUI';
import { GraduationCap, Plus, Pencil, Trash2 } from 'lucide-react';

const EMPTY = { institution:'', degree:'', field:'', startYear:'', endYear:'', grade:'', description:'', order:0 };

export default function EducationManager() {
  const { authHeaders } = useAuth();
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [del, setDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.get('/api/education').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) await api.put(`/api/education/${editing}`, form, { headers: authHeaders() });
      else          await api.post('/api/education', form, { headers: authHeaders() });
      toast.success('Saved!'); setModal(false); load();
    } catch(e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await api.delete(`/api/education/${del}`, { headers: authHeaders() }); toast.success('Deleted'); setDel(null); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><GraduationCap size={22}/> Education</h1>
          <p className="text-sm text-slate-400 mt-1">Manage academic qualifications</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setEditing(null); setModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-sm font-bold rounded-xl cursor-pointer hover:from-violet-700 hover:to-pink-600 transition">
          <Plus size={16}/> Add Education
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item._id} className="glass-card p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white truncate">{item.degree}</h3>
                {item.field && <p className="text-sm text-violet-400 font-semibold">{item.field}</p>}
                <p className="text-sm text-slate-300 mt-1">{item.institution}</p>
                <p className="text-xs text-slate-500 mt-1">{item.startYear} – {item.endYear} {item.grade && `· ${item.grade}`}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setForm({...item}); setEditing(item._id); setModal(true); }} className="text-slate-500 hover:text-violet-400 cursor-pointer"><Pencil size={14}/></button>
                <button onClick={() => setDel(item._id)} className="text-slate-500 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Education' : 'Add Education'} onClose={() => setModal(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Institution *" value={form.institution} onChange={e=>setForm({...form,institution:e.target.value})} required/>
            <Input label="Degree *" value={form.degree} onChange={e=>setForm({...form,degree:e.target.value})} required/>
            <Input label="Field of Study" value={form.field} onChange={e=>setForm({...form,field:e.target.value})}/>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Year" value={form.startYear} onChange={e=>setForm({...form,startYear:e.target.value})} placeholder="2023"/>
              <Input label="End Year" value={form.endYear} onChange={e=>setForm({...form,endYear:e.target.value})} placeholder="2026"/>
            </div>
            <Input label="Grade / Result" value={form.grade} onChange={e=>setForm({...form,grade:e.target.value})} placeholder="First Class"/>
            <Textarea label="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={3}/>
            <Input label="Order" type="number" value={form.order} onChange={e=>setForm({...form,order:+e.target.value})}/>
            <SaveBtn loading={saving}/>
          </form>
        </Modal>
      )}
      {del && <ConfirmModal message="Delete this education entry?" onConfirm={handleDelete} onClose={() => setDel(null)}/>}
    </div>
  );
}
