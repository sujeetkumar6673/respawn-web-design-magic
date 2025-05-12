
import React from 'react';
import { 
  HomeIcon, SimpliciaBadge, 
  DocumentIcon, ProfileIcon, CalendarIcon 
} from './Icons';

interface MobileNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'home', name: 'Home', icon: <HomeIcon /> },
    { id: 'simplicia', name: 'Simplicia', icon: <SimpliciaBadge /> },
    { id: 'calendar', name: 'Calendar', icon: <CalendarIcon /> },
    { id: 'documents', name: 'Docs', icon: <DocumentIcon /> },
    { id: 'profile', name: 'Profile', icon: <ProfileIcon /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around px-1 py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center justify-center p-2 rounded-lg ${
              activePage === item.id ? 'text-rezilia-purple' : 'text-gray-500'
            }`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.name}
          >
            <div className="h-6 w-6 mb-1">
              {item.icon}
            </div>
            <span className="text-xs font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
