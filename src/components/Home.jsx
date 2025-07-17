import { useState } from 'react';
import { Search } from 'lucide-react';
import { useSkillSwap } from '../hooks/useSkillSwap';
import SkillPostCard from './SkillPostCard';

const Home = () => {
  const { skillPosts } = useSkillSwap();
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('all');
  const [format, setFormat] = useState('all');

  const filtered = skillPosts.filter((p) => {
    const q = query.toLowerCase();
    return (
      (p.skillOffered.toLowerCase().includes(q) || p.skillWanted.toLowerCase().includes(q) || p.userName.toLowerCase().includes(q)) &&
      (level === 'all' || p.level === level) &&
      (format === 'all' || p.format === format)
    );
  });

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Search skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg"
          />
        </div>

        <select value={level} onChange={(e) => setLevel(e.target.value)} className="px-4 py-3 border rounded-lg">
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <select value={format} onChange={(e) => setFormat(e.target.value)} className="px-4 py-3 border rounded-lg">
          <option value="all">All Formats</option>
          <option value="online">Online</option>
          <option value="in-person">In Person</option>
          <option value="either">Either</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.length ? (
          filtered.map((post) => <SkillPostCard key={post.id} post={post} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;