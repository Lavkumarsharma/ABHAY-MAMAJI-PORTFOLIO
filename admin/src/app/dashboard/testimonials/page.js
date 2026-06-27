'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { Modal, ConfirmModal, Input, Textarea, SaveBtn } from '../../../components/ui/AdminUI';
import { Star, Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const EMPTY = { name:'', role:'', company:'', review:'', rating:5, linkedinUrl:'', isActive:true, order:0 };

export default function TestimonialsManager() {
  const { authHeaders } = useAuth();
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [del, setDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.get('/api/testimonials?admin=true').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) await api.put(`/api/testimonials/${editing}`, form, { headers: authHeaders() });
      else          await api.post('/api/testimonials', form, { headers: authHeaders() });
      toast.success('Saved!'); setModal(false); load();
    } catch(e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await api.delete(`/api/testimonials/${del}`, { headers: authHeaders() }); toast.success('Deleted'); setDel(null); load(); }
    catch { toast.error('Delete failed'); }
  };

  const toggleActive = async (item) => {
    try {
      await api.put(`/api/testimonials/${item._id}`, { ...item, isActive: !item.isActive }, { headers: authHeaders() });
      toast.success('Updated'); load();
    } catch { toast.error('Failed'); }
  };

  const Stars = ({ n }) => (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => <Star key={i} size={13} className={i<=n ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}/>)}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><Star size={22}/> Testimonials</h1>
          <p className="text-sm text-slate-400 mt-1">Manage reviews and recommendations</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setEditing(null); setModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-sm font-bold rounded-xl cursor-pointer hover:from-violet-700 hover:to-pink-600 transition">
          <Plus size={16}/> Add Review
        </button>
      </div>

      <div className="space-y-4">
        {items.length === 0 && <p className="text-slate-500 text-sm py-8 text-center">No testimonials yet.</p>}
        {items.map(item => (
          <div key={item._id} className="glass-card p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {item.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <Stars n={item.rating}/>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
                    {item.isActive ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <p className="text-xs text-violet-400">{item.role}{item.company && ` · ${item.company}`}</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 italic">"{item.review}"</p>
              </div>
              <div className="flex gap-2 flex-shrink-0 items-center">
                <button onClick={() => toggleActive(item)} className="cursor-pointer text-slate-500 hover:text-emerald-400">
                  {item.isActive ? <ToggleRight size={18} className="text-emerald-400"/> : <ToggleLeft size={18}/>}
                </button>
                <button onClick={() => { setForm({...item}); setEditing(item._id); setModal(true); }} className="text-slate-500 hover:text-violet-400 cursor-pointer"><Pencil size={14}/></button>
                <button onClick={() => setDel(item._id)} className="text-slate-500 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Testimonial' : 'Add Testimonial'} onClose={() => setModal(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Role *" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} required placeholder="Senior Developer"/>
              <Input label="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Rating: {form.rating} / 5</label>
              <input type="range" min="1" max="5" value={form.rating}
                onChange={e=>setForm({...form,rating:+e.target.value})}
                className="w-full accent-amber-400"/>
            </div>
            <Textarea label="Review *" value={form.review} onChange={e=>setForm({...form,review:e.target.value})} rows={4} required/>
            <Input label="LinkedIn URL" value={form.linkedinUrl} onChange={e=>setForm({...form,linkedinUrl:e.target.value})}/>
            <Input label="Order" type="number" value={form.order} onChange={e=>setForm({...form,order:+e.target.value})}/>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="tActive" checked={form.isActive} onChange={e=>setForm({...form,isActive:e.target.checked})} className="w-4 h-4 accent-violet-600"/>
              <label htmlFor="tActive" className="text-sm text-slate-300">Active (visible on site)</label>
            </div>
            <SaveBtn loading={saving}/>
          </form>
        </Modal>
      )}
      {del && <ConfirmModal message="Delete this testimonial?" onConfirm={handleDelete} onClose={() => setDel(null)}/>}
    </div>
  );
}
