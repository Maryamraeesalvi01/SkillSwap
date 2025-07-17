// src/components/Login.jsx
import { useState } from 'react';
import { generateAvatar } from '../utils/avatar';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ name: '', email: '', location: '', bio: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    onLogin({ id: Date.now(), ...form, avatar: generateAvatar(form.name), joinedAt: new Date().toISOString() });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">SkillSwap</h1>
        <input required placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
        <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
        <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
        <textarea placeholder="Bio" rows="3" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg">Join SkillSwap</button>
      </form>
    </div>
  );
};

export default Login;