import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Tab {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface SidebarProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tabs, activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`bg-white h-full shadow-md flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className={`p-5 border-b flex justify-between items-center ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed && <h1 className="text-2xl font-bold text-blue-600">Simpl.ai</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-grow">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={`/${tab.id === 'dashboard' ? '' : tab.id}`}
            className={`flex items-center w-full p-4 text-left hover:bg-gray-100 transition-colors duration-200 ${
              activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {!isCollapsed && <span className="ml-3">{tab.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;