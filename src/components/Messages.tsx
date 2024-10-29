import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, Slack, Instagram, Mail, Send, Briefcase, User, Users, AlertCircle } from 'lucide-react';
import { Message } from '../models';

interface MessagesProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const Messages: React.FC<MessagesProps> = ({ messages, setMessages }) => {
  const location = useLocation();
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'work' | 'personal' | 'social' | 'overdue' | 'all'>('all');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && ['work', 'personal', 'social', 'overdue', 'all'].includes(category)) {
      setActiveCategory(category as 'work' | 'personal' | 'social' | 'overdue' | 'all');
    }
  }, [location]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && replyingTo) {
      setMessages(messages.map(msg => 
        msg.id === replyingTo ? { ...msg, replied: true } : msg
      ));
      setNewMessage('');
      setReplyingTo(null);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'slack':
        return <Slack size={16} className="text-green-500" />;
      case 'teams':
        return <MessageSquare size={16} className="text-blue-500" />;
      case 'instagram':
        return <Instagram size={16} className="text-pink-500" />;
      case 'email':
      case 'gmail':
        return <Mail size={16} className="text-red-500" />;
      case 'outlook':
        return <Mail size={16} className="text-blue-500" />;
      case 'whatsapp':
        return <img src="https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png" alt="WhatsApp" className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'work':
        return <Briefcase size={16} className="text-blue-500" />;
      case 'personal':
        return <User size={16} className="text-green-500" />;
      case 'social':
        return <Users size={16} className="text-purple-500" />;
      default:
        return null;
    }
  };

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const filteredMessages = activeCategory === 'all' 
    ? messages 
    : activeCategory === 'overdue'
    ? messages.filter(message => new Date(message.timestamp) < oneWeekAgo)
    : messages.filter(msg => msg.category === activeCategory);

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold mb-6">Messages</h2>
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded ${activeCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveCategory('work')}
          className={`px-4 py-2 rounded ${activeCategory === 'work' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Work
        </button>
        <button
          onClick={() => setActiveCategory('personal')}
          className={`px-4 py-2 rounded ${activeCategory === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Personal
        </button>
        <button
          onClick={() => setActiveCategory('social')}
          className={`px-4 py-2 rounded ${activeCategory === 'social' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Social
        </button>
        <button
          onClick={() => setActiveCategory('overdue')}
          className={`px-4 py-2 rounded ${activeCategory === 'overdue' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Overdue
        </button>
      </div>
      <div className="space-y-4 mb-6 h-96 overflow-y-auto">
        {filteredMessages.map((message) => (
          <div key={message.id} className="bg-gray-100 p-4 rounded-lg flex items-start">
            <div className="mr-3 mt-1">{getPlatformIcon(message.platform)}</div>
            <div className="flex-grow">
              <strong>{message.sender}:</strong> {message.content}
            </div>
            <div className="ml-3 flex items-center">
              {getCategoryIcon(message.category)}
              <button 
                onClick={() => setReplyingTo(message.id)}
                className="ml-3 text-blue-500 hover:text-blue-700"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex flex-col">
        {replyingTo && (
          <div className="mb-3 text-sm text-gray-600">
            Replying to: {messages.find(msg => msg.id === replyingTo)?.content}
          </div>
        )}
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow border rounded-l-lg p-3"
            placeholder="Type a reply..."
            disabled={!replyingTo}
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-6 py-3 rounded-r-lg flex items-center"
            disabled={!replyingTo}
          >
            <Send size={18} className="mr-2" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Messages;