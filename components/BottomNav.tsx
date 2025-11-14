import React from 'react';
import { ActiveTab } from '../types.ts';
import { Home, Library, Plus } from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAddModal: () => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const activeClasses = 'text-brand-primary';
  const inactiveClasses = 'text-gray-600';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors duration-200 rounded-full ${isActive ? activeClasses : inactiveClasses}`}
      aria-label={label}
    >
      <div className={`p-3 rounded-full ${isActive ? 'bg-brand-primary/10' : ''}`}>
        {icon}
      </div>
      <span className={`text-xs font-medium mt-1 ${isActive ? 'text-brand-primary' : 'text-gray-700'}`}>{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, onOpenAddModal }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 z-10 w-full max-w-md mx-auto flex items-center justify-around px-2">
      <NavItem
        label="Daily Gist"
        icon={<Home size={24} />}
        isActive={activeTab === 'gist'}
        onClick={() => setActiveTab('gist')}
      />
      
      <div className="flex-shrink-0">
        <button
          onClick={onOpenAddModal}
          className="bg-brand-primary text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg hover:bg-brand-primary/90 transition-transform transform hover:scale-105 active:scale-95"
          aria-label="Save to library"
        >
          <Plus size={28} />
        </button>
      </div>

      <NavItem
        label="Library"
        icon={<Library size={24} />}
        isActive={activeTab === 'library'}
        onClick={() => setActiveTab('library')}
      />
    </nav>
  );
};

export default BottomNav;