
import React from 'react';
import { 
  ReziliaLogo, HomeIcon, SimpliciaBadge, ReziliaAIIcon, 
  AdmiliaIcon, CalendarIcon, DocumentIcon, HeartIcon,
  ForumIcon, DirectoryIcon, ProfileIcon, SettingIcon 
} from './Icons';

interface SidebarProps {
  activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
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

  return (
    <div className="sidebar h-screen bg-sidebar flex flex-col overflow-y-auto w-[230px] lg:w-[220px] md:w-[80px] sm:w-[70px]">
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
            <div className="text-white">
              {item.icon}
            </div>
            <div className="flex-1 text-sm font-medium md:hidden">
              {item.name}
            </div>
            {item.badge && (
              <div className="badge badge-orange md:hidden">
                {item.badge}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 md:p-2">
        <div className="text-white text-xs opacity-70 mb-1 md:hidden">Powered by Rezilia AI</div>
      </div>
    </div>
  );
};

export default Sidebar;
