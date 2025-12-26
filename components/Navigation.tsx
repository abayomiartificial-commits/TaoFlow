
import React from 'react';
import { Wind, Activity, Play, Users, Settings } from 'lucide-react';
import { Tab } from '../types';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: Tab.Dashboard, icon: Wind, label: 'Inicio' },
    { id: Tab.Practice, icon: Activity, label: 'Práctica IA' },
    { id: Tab.Learn, icon: Play, label: 'Aprender' },
    { id: Tab.Community, icon: Users, label: 'Comunidad' },
    { id: Tab.Profile, icon: Settings, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-stone-900 text-stone-100 p-2 md:relative md:w-64 md:h-screen flex md:flex-col justify-around md:justify-start shadow-2xl z-50 border-t border-stone-800 md:border-t-0">
      <div className="hidden md:flex items-center gap-3 mb-10 px-4 mt-6">
        <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-teal-900/50">
          <Wind className="text-white" />
        </div>
        <span className="text-2xl font-serif tracking-wide">TaoFlow</span>
      </div>
      
      <div className="flex md:flex-col w-full justify-around md:justify-start gap-1 md:gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col md:flex-row items-center md:gap-4 p-2 md:px-6 md:py-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'text-teal-400 bg-stone-800 md:translate-x-1' 
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] md:text-base mt-1 md:mt-0 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
