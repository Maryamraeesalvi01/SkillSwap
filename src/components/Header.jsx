import { Plus, MessageCircle, Heart, Search } from 'lucide-react';
import { useSkillSwap } from '../hooks/useSkillSwap';

const Header = ({ activeTab, setActiveTab, setShowSkillForm }) => {
  const { user, setUser, matches, chats } = useSkillSwap();

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillswap_user');
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SkillSwap
              </h1>
              <nav className="hidden md:flex space-x-6">
                {['home', 'matches', 'chats'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-md text-sm font-medium capitalize ${
                      activeTab === tab ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab} {tab === 'matches' && `(${matches.length})`}
                    {tab === 'chats' && `(${chats.length})`}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSkillForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-lg flex items-center space-x-1 text-sm"
              >
                <Plus size={16} />
                <span>Add Skill</span>
              </button>

              <div className="flex items-center space-x-2">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                <span className="hidden md:inline text-sm font-medium text-gray-700">{user.name}</span>
                <button onClick={logout} className="text-gray-500 hover:text-gray-700 text-sm">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="md:hidden bg-white border-t">
        <div className="flex justify-around py-2">
          {[
            { tab: 'home', icon: Search, label: 'Home' },
            { tab: 'matches', icon: Heart, label: 'Matches' },
            { tab: 'chats', icon: MessageCircle, label: 'Chats' },
          ].map(({ tab, icon: Icon, label }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === tab ? 'text-purple-600' : 'text-gray-500'}`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;