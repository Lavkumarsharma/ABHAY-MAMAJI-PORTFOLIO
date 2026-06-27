'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { Modal, ConfirmModal, Input, Textarea, SaveBtn } from '../../../components/ui/AdminUI';
import { Award, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';

const EMPTY = { title:'', issuer:'', issuedDate:'', expiryDate:'', credentialId:'', credentialUrl:'', skills:'', order:0 };

export default function CertificationsManager() {
  const { authHeaders } = useAuth();
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [del, setDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.get('/api/certifications').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    const payload = { ...form, skills: form.skills.split(',').map(s=>s.trim()).filter(Boolean) };
    try {
      if (editing) await api.put(`/api/certifications/${editing}`, payload, { headers: authHeaders() });
      else          await api.post('/api/certifications', payload, { headers: authHeaders() });
      toast.success('Saved!'); setModal(false); load();
    } catch(e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await api.delete(`/api/certifications/${del}`, { headers: authHeaders() }); toast.success('Deleted'); setDel(null); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><Award size={22}/> Certifications</h1>
          <p className="text-sm text-slate-400 mt-1">Manage professional certifications</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setEditing(null); setModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-sm font-bold rounded-xl cursor-pointer hover:from-violet-700 hover:to-pink-600 transition">
          <Plus size={16}/> Add Certification
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item._id} className="glass-card p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-violet-400 font-semibold mt-1">{item.issuer}</p>
                <p className="text-xs text-slate-500 mt-1">{item.issuedDate} {item.credentialId && `· ID: ${item.credentialId}`}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(item.skills||[]).map((s,i) => <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{s}</span>)}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {item.credentialUrl && <a href={item.credentialUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white"><ExternalLink size={13}/></a>}
                <button onClick={() => { setForm({...item, skills:(item.skills||[]).join(', ')}); setEditing(item._id); setModal(true); }} className="text-slate-500 hover:text-violet-400 cursor-pointer"><Pencil size={14}/></button>
                <button onClick={() => setDel(item._id)} className="text-slate-500 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Certification' : 'Add Certification'} onClose={() => setModal(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Title *" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
            <Input label="Issuer *" value={form.issuer} onChange={e=>setForm({...form,issuer:e.target.value})} required/>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Issued Date" value={form.issuedDate} onChange={e=>setForm({...form,issuedDate:e.target.value})} placeholder="Jul 2025"/>
              <Input label="Expiry Date" value={form.expiryDate} onChange={e=>setForm({...form,expiryDate:e.target.value})} placeholder="No Expiry"/>
            </div>
            <Input label="Credential ID" value={form.credentialId} onChange={e=>setForm({...form,credentialId:e.target.value})}/>
            <Input label="Credential URL" value={form.credentialUrl} onChange={e=>setForm({...form,credentialUrl:e.target.value})}/>
            <Input label="Skills (comma separated)" value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})} placeholder="Power BI, SQL, Python"/>
            <Input label="Order" type="number" value={form.order} onChange={e=>setForm({...form,order:+e.target.value})}/>
            <SaveBtn loading={saving}/>
          </form>
        </Modal>
      )}
      {del && <ConfirmModal message="Delete this certification?" onConfirm={handleDelete} onClose={() => setDel(null)}/>}
    </div>
  );
}
