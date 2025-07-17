import { useSkillSwap } from '../hooks/useSkillSwap';
import { MessageCircle } from 'lucide-react';

const Chats = ({ onOpenChat }) => {
  const { chats } = useSkillSwap();
  if (!chats.length)
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No chats yet. Start connecting with your matches!</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chats.map((c) => (
        <div key={c.id} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <img src={c.userAvatar} alt={c.userName} className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="font-semibold">{c.userName}</h3>
              <p className="text-xs text-gray-500">{c.messages.length} messages</p>
            </div>
          </div>

          {c.lastMessage && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600 truncate">{c.lastMessage}</p>
            </div>
          )}

          <button
            onClick={() => onOpenChat(c)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg flex items-center justify-center space-x-1"
          >
            <MessageCircle size={16} />
            <span>Open Chat</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Chats;