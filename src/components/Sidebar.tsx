
import React, { useState, useEffect } from 'react';
import { 
  ReziliaLogo, HomeIcon, SimpliciaBadge, ReziliaAIIcon, 
  AdmiliaIcon, CalendarIcon, DocumentIcon, HeartIcon,
  ForumIcon, DirectoryIcon, ProfileIcon, SettingIcon 
} from './Icons';
import { TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  activePage: string;
}

interface NavItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: string;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  // Check local storage for user preference on sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  const navItems: NavItem[] = [
    { id: 'home', name: 'Home', icon: <HomeIcon />, badge: '340', path: '/' },
    { id: 'simplicia', name: 'Simplicia', icon: <SimpliciaBadge />, path: '/simplicia' },
    { id: 'rezilia-ai', name: 'Rezilia AI', icon: <ReziliaAIIcon />, path: '/rezilia-ai' },
    { id: 'admilia', name: 'Admilia', icon: <AdmiliaIcon />, path: '/admilia' },
    { id: 'calendar', name: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
    { id: 'documents', name: 'Documents', icon: <DocumentIcon />, path: '/documents' },
    { id: 'family-hearts', name: 'Family Hearts', icon: <HeartIcon />, path: '/family-hearts' },
    { id: 'forum', name: 'Forum & Resources', icon: <ForumIcon />, path: '/forum' },
    { id: 'directory', name: 'Directory', icon: <DirectoryIcon />, path: '/directory' },
    { id: 'profile', name: 'Profile', icon: <ProfileIcon />, path: '/profile' },
    { id: 'settings', name: 'Settings', icon: <SettingIcon />, path: '/settings' },
  ];

  return (
    <div className={`sidebar fixed h-screen bg-rezilia-purple flex flex-col overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-[70px]' : 'w-[220px]'}`}>
      <div className="flex justify-center py-6">
        <div className={`${isCollapsed ? 'h-10 w-10' : 'h-12 w-12'} transition-all duration-300`}>
          <ReziliaLogo />
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-2 py-2">
        <TooltipProvider delayDuration={300}>
          {navItems.map((item) => {
            // Check if this item's path matches the current location
            const isActive = location.pathname === item.path || 
                            (location.pathname === '/' && item.id === 'home');
              
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Link to={item.path} className="block">
                    <div 
                      className={`sidebar-item mb-1 ${isActive ? 'active' : ''} ${!isCollapsed ? 'justify-start' : 'justify-center'}`}
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
                  </Link>
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
            );
          })}
        </TooltipProvider>
      </ScrollArea>
      
      {!isCollapsed && (
        <div className="p-4 border-t border-white/10">
          <div className="text-white text-xs opacity-70">Powered by Rezilia AI</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
