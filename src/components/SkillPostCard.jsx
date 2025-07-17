import { Heart, Star, Users, Clock } from 'lucide-react';
import { useSkillSwap } from '../hooks/useSkillSwap';

const SkillPostCard = ({ post }) => {
  const { user, toggleLike, addMatch } = useSkillSwap();
  const mine = post.userId === user.id;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img src={post.userAvatar} alt={post.userName} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-semibold">{post.userName}</h3>
            <p className="text-xs text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" /> {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        {!mine && (
          <button onClick={() => addMatch(post)} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-lg text-sm">
            Connect
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="bg-green-50 border rounded-lg p-3">
          <div className="flex items-center text-green-700 mb-1">
            <Star size={16} className="mr-2" />
            <span className="text-sm font-medium">Can teach:</span>
          </div>
          <p className="text-green-800 font-semibold">{post.skillOffered}</p>
        </div>

        <div className="bg-blue-50 border rounded-lg p-3">
          <div className="flex items-center text-blue-700 mb-1">
            <Users size={16} className="mr-2" />
            <span className="text-sm font-medium">Wants to learn:</span>
          </div>
          <p className="text-blue-800 font-semibold">{post.skillWanted}</p>
        </div>

        {post.description && <p className="text-sm text-gray-600">{post.description}</p>}

        <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
          <div className="flex space-x-2">
            <span className="bg-gray-100 px-2 py-1 rounded">{post.level}</span>
            <span className="bg-gray-100 px-2 py-1 rounded">{post.duration}</span>
            <span className="bg-gray-100 px-2 py-1 rounded">{post.format}</span>
          </div>
          <button onClick={() => toggleLike(post.id)} className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'text-gray-400'}`}>
            <Heart size={16} fill={post.isLiked ? 'currentColor' : 'none'} />
            <span>{post.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillPostCard;