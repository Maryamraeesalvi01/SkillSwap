import { useSkillSwap } from '../hooks/useSkillSwap';
import { MessageCircle } from 'lucide-react';

const Matches = ({ onStartChat }) => {
  const { matches } = useSkillSwap();
  if (!matches.length)
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No matches yet. Connect with skill exchanges to find matches!</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((m) => (
        <div key={m.id} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <img src={m.userAvatar} alt={m.userName} className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="font-semibold">{m.userName}</h3>
              <p className="text-xs text-gray-500">{new Date(m.matchedAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="bg-green-50 border rounded-lg p-2">
              <p className="text-sm text-green-700">Teaches: {m.skillOffered}</p>
            </div>
            <div className="bg-blue-50 border rounded-lg p-2">
              <p className="text-sm text-blue-700">Wants: {m.skillWanted}</p>
            </div>
          </div>

           <button
            onClick={() => onStartChat(m)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg flex items-center justify-center space-x-1"
          >
            <MessageCircle size={16} />
            <span>Start Chat</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Matches;