'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { ConfirmModal, Modal } from '../../../components/ui/AdminUI';
import { MessageSquare, Trash2, MailOpen, Mail, Calendar } from 'lucide-react';

export default function MessagesManager() {
  const { authHeaders } = useAuth();
  const [items, setItems] = useState([]);
  const [del, setDel] = useState(null);
  const [viewing, setViewing] = useState(null);

  const load = () => api.get('/api/messages', { headers: authHeaders() }).then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    try { await api.put(`/api/messages/${id}/read`, {}, { headers: authHeaders() }); load(); }
    catch { toast.error('Failed to mark as read'); }
  };

  const handleDelete = async () => {
    try { await api.delete(`/api/messages/${del}`, { headers: authHeaders() }); toast.success('Message deleted'); setDel(null); load(); }
    catch { toast.error('Delete failed'); }
  };

  const openView = (item) => {
    setViewing(item);
    if (!item.isRead) markRead(item._id);
  };

  const unread = items.filter(m => !m.isRead).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <MessageSquare size={22}/> Messages
          {unread > 0 && <span className="ml-2 text-xs font-bold bg-pink-600 text-white px-2.5 py-0.5 rounded-full">{unread} new</span>}
        </h1>
        <p className="text-sm text-slate-400 mt-1">Contact form submissions from your portfolio visitors</p>
      </div>

      <div className="space-y-3">
        {items.length === 0 && <p className="text-slate-500 text-sm py-12 text-center">No messages yet.</p>}
        {items.map(msg => (
          <div key={msg._id}
            className={`glass-card p-5 flex items-start gap-4 cursor-pointer transition hover:border-violet-500/30 border ${msg.isRead ? 'border-transparent' : 'border-violet-500/20 bg-violet-950/10'}`}
            onClick={() => openView(msg)}>
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {msg.name[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-white">{msg.name}</span>
                {!msg.isRead && <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0"/>}
                <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
                  <Calendar size={11}/>{new Date(msg.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                </span>
              </div>
              <p className="text-xs text-violet-400">{msg.email}</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">{msg.subject}</p>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{msg.message}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0 items-center" onClick={e => e.stopPropagation()}>
              {!msg.isRead && (
                <button onClick={() => markRead(msg._id)} title="Mark as read" className="text-slate-500 hover:text-violet-400 cursor-pointer"><MailOpen size={15}/></button>
              )}
              <button onClick={() => setDel(msg._id)} className="text-slate-500 hover:text-red-400 cursor-pointer"><Trash2 size={15}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* View Message Modal */}
      {viewing && (
        <Modal title="Message Details" onClose={() => setViewing(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-500 mb-1">From</p>
                <p className="font-semibold text-white">{viewing.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <a href={`mailto:${viewing.email}`} className="font-semibold text-violet-400 hover:text-violet-300">{viewing.email}</a>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Subject</p>
              <p className="font-semibold text-white text-sm">{viewing.subject}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">Message</p>
              <div className="bg-slate-900/60 rounded-xl p-4 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {viewing.message}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <p className="text-xs text-slate-500">Received: {new Date(viewing.createdAt).toLocaleString()}</p>
              <a href={`mailto:${viewing.email}?subject=Re: ${encodeURIComponent(viewing.subject)}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-xs font-bold rounded-xl cursor-pointer hover:from-violet-700 hover:to-pink-600 transition">
                <Mail size={13}/> Reply via Email
              </a>
            </div>
          </div>
        </Modal>
      )}

      {del && <ConfirmModal message="Delete this message permanently?" onConfirm={handleDelete} onClose={() => setDel(null)}/>}
    </div>
  );
}
