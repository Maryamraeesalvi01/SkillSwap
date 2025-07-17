import { useState } from 'react';
import { useSkillSwap } from '../hooks/useSkillSwap';
import Login from './Login';
import Header from './Header';
import Home from './Home';
import Matches from './Matches';
import Chats from './Chats';
import SkillPostForm from './SkillPostForm';
import Chat from './Chat';

const SkillSwapApp = () => {
  const { user, setUser } = useSkillSwap();
  const [activeTab, setActiveTab] = useState('home');
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} setShowSkillForm={setShowSkillForm} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && <Home />}
        {activeTab === 'matches' && <Matches onStartChat={setActiveChat} />}
        {activeTab === 'chats' && <Chats onOpenChat={setActiveChat} />}
      </main>

      {showSkillForm && <SkillPostForm onClose={() => setShowSkillForm(false)} />}
      {activeChat && <Chat chat={activeChat} onClose={() => setActiveChat(null)} />}
    </div>
  );
};

export default SkillSwapApp;