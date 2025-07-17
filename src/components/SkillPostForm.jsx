import { useState } from 'react';
import { X } from 'lucide-react';
import { useSkillSwap } from '../hooks/useSkillSwap';

const SkillPostForm = ({ onClose }) => {
  const { addSkillPost } = useSkillSwap();
  const [form, setForm] = useState({
    skillOffered: '',
    skillWanted: '',
    description: '',
    level: 'beginner',
    duration: '1-2 hours',
    format: 'online',
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.skillOffered || !form.skillWanted) return;
    addSkillPost(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Skill Exchange</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <input placeholder="I can teach" value={form.skillOffered} onChange={(e) => setForm({ ...form, skillOffered: e.target.value })} required className="w-full" />
          <input placeholder="I want to learn" value={form.skillWanted} onChange={(e) => setForm({ ...form, skillWanted: e.target.value })} required className="w-full" />
          <textarea placeholder="Description" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full">
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="1-2 hours">1-2 hours</option>
              <option value="2-3 hours">2-3 hours</option>
              <option value="Multiple sessions">Multiple sessions</option>
            </select>

            <select value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value })} className="w-full">
              <option value="online">Online</option>
              <option value="in-person">In Person</option>
              <option value="either">Either</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 border py-3 rounded-lg">
              Cancel
            </button>
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg">
              Create Exchange
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillPostForm;