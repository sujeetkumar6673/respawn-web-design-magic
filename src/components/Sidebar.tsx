
import React, { useState, useEffect } from 'react';
import {
  ReziliaLogo, HomeIcon, SimpliciaBadge, ReziliaAIIcon,
  AdmiliaIcon, CalendarIcon, DocumentIcon, HeartIcon,
  ForumIcon, DirectoryIcon, ProfileIcon, SettingIcon,
  LogoutIcon
} from './Icons';
import { TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

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
  const { logout } = useAuth();

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  const mainNavItems: NavItem[] = [
    { id: 'home', name: 'Home', icon: <HomeIcon />, path: '/dashboard' },
    { id: 'simplicia', name: 'Simplicia', icon: <SimpliciaBadge />, path: '/simplicia' },
    { id: 'rezilia-ai', name: 'Rezilia AI', icon: <ReziliaAIIcon />, path: '/rezilia-ai' },
    { id: 'admilia', name: 'Admilia', icon: <AdmiliaIcon />, path: '/admilia' },
    { id: 'calendar', name: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
    { id: 'documents', name: 'Documents', icon: <DocumentIcon />, path: '/documents' },
    { id: 'family-hearts', name: 'Family Hearts', icon: <HeartIcon />, path: '/family-hearts' },
    { id: 'forum', name: 'Forum & Resources', icon: <ForumIcon />, path: '/forum' },
    { id: 'directory', name: 'Directory', icon: <DirectoryIcon />, path: '/directory' },
  ];

  const bottomNavItems: NavItem[] = [
    { id: 'profile', name: 'Profile', icon: <ProfileIcon />, path: '/profile' },
    { id: 'settings', name: 'Settings', icon: <SettingIcon />, path: '/settings' },
    { id: 'logout', name: 'Logout', icon: <LogoutIcon />, path: '/logout' },
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = location.pathname === item.path || (location.pathname === '/' && item.id === 'home');
    return (
      <Tooltip key={item.id}>
        <TooltipTrigger asChild>
          <Link to={item.path} className="block">
            <div className={`sidebar-item mb-1 ${isActive ? 'active' : ''} ${!isCollapsed ? 'justify-start' : 'justify-center'}`}>
              <div className="icon-3d">{item.icon}</div>
              {!isCollapsed && (
                <>
                  <div className="flex-1 text-sm font-medium">{item.name}</div>
                  {item.badge && <div className="badge badge-orange">{item.badge}</div>}
                </>
              )}
            </div>
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            <div className="flex items-center gap-2">
              <span>{item.name}</span>
              {item.badge && <div className="badge badge-orange">{item.badge}</div>}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    );
  };

  const handleLogout = () => {
    console.log('Logging out...');
    logout();
  };

  return (
    <div className={`sidebar fixed h-screen bg-rezilia-purple flex flex-col transition-all duration-300 z-10 ${isCollapsed ? 'w-[70px]' : 'w-[220px]'}`}>
      {/* Logo + Collapse Button */}
      <div className="flex justify-between items-center p-4">
        <div className={`${isCollapsed ? 'h-10 w-10 mx-auto' : 'h-16 w-16'} transition-all duration-300`}>
          <ReziliaLogo />
        </div>
        {!isCollapsed && (
          <button onClick={toggleSidebar} className="text-white ml-auto">
            ←
          </button>
        )}
        {isCollapsed && (
          <button onClick={toggleSidebar} className="text-white absolute top-4 right-2">
            →
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1 px-2 py-2">
        <TooltipProvider delayDuration={300}>
          {mainNavItems.map(renderNavItem)}
        </TooltipProvider>
      </ScrollArea>

      {/* Bottom Section */}
      <div className="px-2 py-3 border-t border-white/10">
        <TooltipProvider delayDuration={300}>
          {bottomNavItems.map(item =>
            item.id === 'logout' ? (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    className={`sidebar-item w-full ${!isCollapsed ? 'justify-start' : 'justify-center'}`}
                  >
                    <div className="icon-3d">{item.icon}</div>
                    {!isCollapsed && <div className="text-sm font-medium">Logout</div>}
                  </button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <span>Logout</span>
                  </TooltipContent>
                )}
              </Tooltip>
            ) : (
              renderNavItem(item)
            )
          )}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
