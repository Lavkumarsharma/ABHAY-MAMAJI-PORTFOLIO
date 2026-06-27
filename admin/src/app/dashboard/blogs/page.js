'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { Modal, ConfirmModal, Input, Textarea, Select, SaveBtn } from '../../../components/ui/AdminUI';
import { BookOpen, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';

const EMPTY = { title:'', slug:'', excerpt:'', content:'', category:'', status:'draft', isFeatured:false, readTime:'5 min read', seoTitle:'', seoDescription:'', order:0 };

export default function BlogsManager() {
  const { authHeaders } = useAuth();
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [del, setDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.get('/api/blogs?admin=true').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) await api.put(`/api/blogs/${editing}`, form, { headers: authHeaders() });
      else          await api.post('/api/blogs', form, { headers: authHeaders() });
      toast.success('Blog saved!'); setModal(false); load();
    } catch(e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await api.delete(`/api/blogs/${del}`, { headers: authHeaders() }); toast.success('Deleted'); setDel(null); load(); }
    catch { toast.error('Delete failed'); }
  };

  const toggleStatus = async (item) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    try {
      await api.put(`/api/blogs/${item._id}`, { ...item, status: newStatus }, { headers: authHeaders() });
      toast.success(`Post ${newStatus}`); load();
    } catch { toast.error('Failed to update status'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><BookOpen size={22}/> Blog Posts</h1>
          <p className="text-sm text-slate-400 mt-1">Manage articles and content</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setEditing(null); setModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-sm font-bold rounded-xl cursor-pointer hover:from-violet-700 hover:to-pink-600 transition">
          <Plus size={16}/> New Post
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 && <p className="text-slate-500 text-sm py-8 text-center">No blog posts yet. Create your first one!</p>}
        {items.map(item => (
          <div key={item._id} className="glass-card p-5 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === 'published' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                  {item.status}
                </span>
                {item.isFeatured && <span className="text-[10px] font-bold bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded-full">Featured</span>}
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">{item.excerpt}</p>
              <p className="text-[10px] text-slate-600 mt-1">{item.category} · {item.readTime}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0 items-center">
              <button onClick={() => toggleStatus(item)} title={item.status === 'published' ? 'Unpublish' : 'Publish'}
                className={`cursor-pointer ${item.status === 'published' ? 'text-emerald-400 hover:text-slate-400' : 'text-slate-500 hover:text-emerald-400'}`}>
                {item.status === 'published' ? <Eye size={15}/> : <EyeOff size={15}/>}
              </button>
              <button onClick={() => { setForm({...item}); setEditing(item._id); setModal(true); }} className="text-slate-500 hover:text-violet-400 cursor-pointer"><Pencil size={15}/></button>
              <button onClick={() => setDel(item._id)} className="text-slate-500 hover:text-red-400 cursor-pointer"><Trash2 size={15}/></button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Post' : 'New Post'} onClose={() => setModal(false)} wide>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Title *" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
              <Input label="Slug *" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} required placeholder="my-blog-post"/>
              <Input label="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
              <Input label="Read Time" value={form.readTime} onChange={e=>setForm({...form,readTime:e.target.value})} placeholder="5 min read"/>
              <Input label="Cover Image URL" value={form.image||''} onChange={e=>setForm({...form,image:e.target.value})}/>
              <Select label="Status" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Select>
              <Input label="Order" type="number" value={form.order} onChange={e=>setForm({...form,order:+e.target.value})}/>
              <div className="flex items-center gap-2 mt-5">
                <input type="checkbox" id="blogFeat" checked={form.isFeatured} onChange={e=>setForm({...form,isFeatured:e.target.checked})} className="w-4 h-4 accent-violet-600"/>
                <label htmlFor="blogFeat" className="text-sm text-slate-300">Featured Post</label>
              </div>
            </div>
            <Textarea label="Excerpt" value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})} rows={2}/>
            <Textarea label="Content (HTML supported)" value={form.content} onChange={e=>setForm({...form,content:e.target.value})} rows={10}/>
            <Input label="SEO Title" value={form.seoTitle} onChange={e=>setForm({...form,seoTitle:e.target.value})}/>
            <Textarea label="SEO Description" value={form.seoDescription} onChange={e=>setForm({...form,seoDescription:e.target.value})} rows={2}/>
            <SaveBtn loading={saving}/>
          </form>
        </Modal>
      )}
      {del && <ConfirmModal message="Delete this blog post permanently?" onConfirm={handleDelete} onClose={() => setDel(null)}/>}
    </div>
  );
}
