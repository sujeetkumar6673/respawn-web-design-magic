
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, User } from 'lucide-react';
import { SimpliciaBadge } from './Icons';

interface MobileNavProps {
  activePage: string;
  onNavigate?: (page: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activePage, onNavigate }) => {
  // Navigation items with their routes and icons
  const navItems = [
    { 
      name: 'home', 
      icon: <Home size={22} strokeWidth={activePage === 'home' ? 2.5 : 2} />, 
      route: '/dashboard',
      label: 'Home'
    },
    { 
      name: 'calendar', 
      icon: <Calendar size={22} strokeWidth={activePage === 'calendar' ? 2.5 : 2} />, 
      route: '/calendar',
      label: 'Calendar'  
    },
    { 
      name: 'simplicia', 
      icon: <div className="w-5 h-5"><SimpliciaBadge /></div>, 
      route: '/simplicia',
      label: 'Simplicia'  
    },
    { 
      name: 'profile', 
      icon: <User size={22} strokeWidth={activePage === 'profile' ? 2.5 : 2} />, 
      route: '/profile',
      label: 'Profile'  
    },
  ];
  
  // Handle item click if onNavigate is provided
  const handleItemClick = (pageName: string) => {
    if (onNavigate) {
      onNavigate(pageName);
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <Link 
            key={item.name}
            to={item.route}
            className={`flex flex-col items-center py-1 px-4 ${
              activePage === item.name 
                ? 'text-rezilia-purple font-medium' 
                : 'text-gray-500'
            }`}
            onClick={() => handleItemClick(item.name)}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
