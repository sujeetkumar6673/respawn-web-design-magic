
import React, { useState } from 'react';
import { 
  ReziliaLogo, HomeIcon, SimpliciaBadge, ReziliaAIIcon, 
  AdmiliaIcon, CalendarIcon, DocumentIcon, HeartIcon,
  ForumIcon, DirectoryIcon, ProfileIcon, SettingIcon 
} from './Icons';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();
  
  const navItems = [
    { id: 'home', name: 'Home', icon: <HomeIcon />, badge: '340' },
    { id: 'simplicia', name: 'Simplicia', icon: <SimpliciaBadge /> },
    { id: 'rezilia-ai', name: 'Rezilia AI', icon: <ReziliaAIIcon /> },
    { id: 'admilia', name: 'Admilia', icon: <AdmiliaIcon /> },
    { id: 'calendar', name: 'Calendar', icon: <CalendarIcon /> },
    { id: 'documents', name: 'Documents', icon: <DocumentIcon /> },
    { id: 'family-hearts', name: 'Family Hearts', icon: <HeartIcon /> },
    { id: 'forum', name: 'Forum & Resources', icon: <ForumIcon /> },
    { id: 'directory', name: 'Directory', icon: <DirectoryIcon /> },
    { id: 'profile', name: 'Profile', icon: <ProfileIcon /> },
    { id: 'settings', name: 'Settings', icon: <SettingIcon /> },
  ];

  // Mobile sidebar toggle
  if (isMobile && !isOpen) {
    return (
      <div className="mobile-toggle h-screen fixed left-0 top-0 z-30">
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-rezilia-purple p-3 rounded-r-lg mt-4 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className={`sidebar ${isMobile ? 'fixed left-0 top-0 z-40' : 'relative'} h-screen bg-rezilia-purple flex flex-col overflow-y-auto ${isMobile ? 'w-[240px]' : 'w-[220px]'}`}>
      {isMobile && (
        <div className="absolute right-2 top-2">
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 text-white/80 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      
      <div className="flex justify-center py-6">
        <div className="h-16 w-16 md:h-12 md:w-12 sm:h-10 sm:w-10">
          <ReziliaLogo />
        </div>
      </div>
      
      <div className="flex-1 px-3 py-2">
        {navItems.map((item) => (
          <div 
            key={item.id} 
            className={`sidebar-item mb-1 ${activePage === item.id ? 'active' : ''}`}
          >
            <div className="icon-3d">
              {item.icon}
            </div>
            <div className="flex-1 text-sm font-medium">
              {item.name}
            </div>
            {item.badge && (
              <div className="badge badge-orange">
                {item.badge}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4">
        <div className="text-white text-xs opacity-70 mb-1">Powered by Rezilia AI</div>
      </div>
    </div>
  );
};

export default Sidebar;
