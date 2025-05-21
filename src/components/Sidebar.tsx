
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, MessageCircle, User } from 'lucide-react';

interface SidebarProps {
  activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  // Create sidebar items with their routes and icons
  const sidebarItems = [
    { 
      name: 'Home', 
      icon: <Home size={20} />, 
      route: '/dashboard',
      active: activePage === 'home'
    },
    { 
      name: 'Calendar', 
      icon: <Calendar size={20} />, 
      route: '/calendar',
      active: activePage === 'calendar'
    },
    { 
      name: 'Chat', 
      icon: <MessageCircle size={20} />, 
      route: '/chat',
      active: activePage === 'chat'
    },
    { 
      name: 'Profile', 
      icon: <User size={20} />, 
      route: '/profile',
      active: activePage === 'profile'
    }
  ];
  
  return (
    <div className="h-screen fixed w-[220px] bg-rezilia-purple flex flex-col border-r border-gray-200">
      {/* App Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700/40">
        <h1 className="text-white font-bold text-lg">Rezilia Health</h1>
      </div>
      
      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.route}
                className={`sidebar-item ${item.active ? 'active' : ''}`}
              >
                <div className="icon-3d-wrapper">
                  <div className="icon-3d-inner">
                    {item.icon}
                  </div>
                </div>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Bottom Section - Version info */}
      <div className="px-4 py-3 text-xs text-white/60">
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
