
import React from 'react';
import { HomeIcon, CalendarIcon, ProfileIcon, SettingIcon } from './Icons';
import { Link, useLocation } from 'react-router-dom';

interface MobileNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activePage, onNavigate }) => {
  const location = useLocation();
  
  // Navigation items with their routes
  const navItems = [
    { id: 'home', icon: <HomeIcon />, label: 'Home', path: '/' },
    { id: 'calendar', icon: <CalendarIcon />, label: 'Calendar', path: '/calendar' },
    { id: 'profile', icon: <ProfileIcon />, label: 'Profile', path: '/profile' },
    { id: 'settings', icon: <SettingIcon />, label: 'Settings', path: '/settings' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="grid grid-cols-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (location.pathname === '/' && item.id === 'home');
          
          return (
            <Link 
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center py-3 ${
                isActive ? 'text-rezilia-purple' : 'text-gray-500'
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <div className={`mb-1 ${isActive ? 'text-rezilia-purple' : 'text-gray-500'}`}>
                {item.icon}
              </div>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
