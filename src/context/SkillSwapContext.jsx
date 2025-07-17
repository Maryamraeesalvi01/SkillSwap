import { createContext, useState, useEffect } from 'react';

export const SkillSwapContext = createContext();

export const SkillSwapProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [skillPosts, setSkillPosts] = useState([]);
  const [matches, setMatches] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [chats, setChats] = useState([]);

  // Persist to localStorage
  useEffect(() => {
    const keys = ['skillswap_user', 'skillswap_posts', 'skillswap_matches', 'skillswap_chats'];
    const [u, p, m, c] = keys.map(k => JSON.parse(localStorage.getItem(k) || (k.includes('posts') || k.includes('matches') || k.includes('chats') ? '[]' : 'null')));
    setUser(u); setSkillPosts(p); setMatches(m); setChats(c);
  }, []);

  useEffect(() => { localStorage.setItem('skillswap_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('skillswap_posts', JSON.stringify(skillPosts)); }, [skillPosts]);
  useEffect(() => { localStorage.setItem('skillswap_matches', JSON.stringify(matches)); }, [matches]);
  useEffect(() => { localStorage.setItem('skillswap_chats', JSON.stringify(chats)); }, [chats]);

  const addSkillPost = (post) =>
    setSkillPosts(prev => [{ id: Date.now(), ...post, likes: 0, isLiked: false }, ...prev]);

  const toggleLike = (postId) =>
    setSkillPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked } : p
      )
    );

  const addMatch = (post) => {
    const newMatch = { id: Date.now(), postId: post.id, userName: post.userName, userAvatar: post.userAvatar, skillOffered: post.skillOffered, skillWanted: post.skillWanted, matchedAt: new Date().toISOString() };
    setMatches(prev => [newMatch, ...prev]);
    setNotifications(prev => [...prev, { id: Date.now(), message: `New match with ${post.userName}!`, type: 'match', createdAt: new Date().toISOString() }]);
  };

  const startChat = (match) => {
    const existing = chats.find(c => c.matchId === match.id);
    if (existing) return existing;
    const newChat = { id: Date.now(), matchId: match.id, userName: match.userName, userAvatar: match.userAvatar, messages: [], lastMessage: null, createdAt: new Date().toISOString() };
    setChats(prev => [newChat, ...prev]);
    return newChat;
  };

  const sendMessage = (chatId, text) =>
    setChats(prev =>
      prev.map(c =>
        c.id === chatId
          ? { ...c, messages: [...c.messages, { id: Date.now(), text, sender: user.name, timestamp: new Date().toISOString() }], lastMessage: text }
          : c
      )
    );

  return (
    <SkillSwapContext.Provider
      value={{ user, setUser, skillPosts, matches, notifications, chats, addSkillPost, toggleLike, addMatch, startChat, sendMessage }}
    >
      {children}
    </SkillSwapContext.Provider>
  );
};