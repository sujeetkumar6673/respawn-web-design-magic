
import React, { useState, useEffect } from 'react';
import { 
  ReziliaLogo, HomeIcon, SimpliciaBadge, ReziliaAIIcon, 
  AdmiliaIcon, CalendarIcon, DocumentIcon, HeartIcon,
  ForumIcon, DirectoryIcon, ProfileIcon, SettingIcon 
} from './Icons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  activePage: string;
}

interface NavItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Check local storage for user preference on sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);
  
  // Save preference when changed
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  const navItems: NavItem[] = [
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
    <div className={`sidebar relative h-screen bg-rezilia-purple flex flex-col overflow-y-auto transition-all duration-300 ${isCollapsed ? 'w-[70px]' : 'w-[220px]'}`}>
      {/* Toggle button with improved visibility */}
      <button 
        onClick={toggleSidebar} 
        className="absolute -right-3 top-6 bg-white text-rezilia-purple p-1.5 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-colors"
        aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
      
      <div className="flex justify-center py-6">
        <div className={`${isCollapsed ? 'h-10 w-10' : 'h-12 w-12'} transition-all duration-300`}>
          <ReziliaLogo />
        </div>
      </div>
      
      <div className="flex-1 px-2 py-2">
        <TooltipProvider delayDuration={300}>
          {navItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <div 
                  className={`sidebar-item mb-1 ${activePage === item.id ? 'active' : ''} ${!isCollapsed ? 'justify-start' : 'justify-center'}`}
                >
                  <div className="icon-3d">
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <>
                      <div className="flex-1 text-sm font-medium">
                        {item.name}
                      </div>
                      {item.badge && (
                        <div className="badge badge-orange">
                          {item.badge}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                    {item.badge && (
                      <div className="badge badge-orange">
                        {item.badge}
                      </div>
                    )}
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      
      {!isCollapsed && (
        <div className="p-4">
          <div className="text-white text-xs opacity-70 mb-1">Powered by Rezilia AI</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
