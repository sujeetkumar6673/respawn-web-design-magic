
import React, { useState } from 'react';
import { 
  ReziliaLogo, HomeIcon, SimpliciaBadge, ReziliaAIIcon, 
  AdmiliaIcon, CalendarIcon, DocumentIcon, HeartIcon,
  ForumIcon, DirectoryIcon, ProfileIcon, SettingIcon 
} from './Icons';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Menu, X } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

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

  // Sidebar content component to be used in both desktop and mobile views
  const SidebarContent = () => (
    <div className="h-full flex flex-col">
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
            onClick={() => isMobile && setIsOpen(false)}
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

  // For Mobile: Use Drawer component
  if (isMobile) {
    return (
      <>
        {/* Mobile Hamburger Menu */}
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 bg-rezilia-purple p-2 rounded-md text-white"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>

        {/* Mobile Drawer */}
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="bg-rezilia-purple h-[80vh]">
            <div className="absolute top-2 right-2">
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white p-2 rounded-full hover:bg-white/10"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>
            <SidebarContent />
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // For Desktop: Collapsible sidebar
  return (
    <div className={`sidebar relative h-screen bg-rezilia-purple flex flex-col overflow-y-auto transition-all duration-300 ${isOpen ? 'w-[220px]' : 'w-[70px]'}`}>
      {/* Toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="absolute -right-3 top-6 bg-rezilia-purple text-white p-1 rounded-full shadow-md"
        aria-label={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      
      <div className="flex justify-center py-6">
        <div className={`${isOpen ? 'h-12 w-12' : 'h-10 w-10'} transition-all duration-300`}>
          <ReziliaLogo />
        </div>
      </div>
      
      <div className="flex-1 px-2 py-2">
        {navItems.map((item) => (
          <div 
            key={item.id} 
            className={`sidebar-item mb-1 ${activePage === item.id ? 'active' : ''} ${!isOpen ? 'justify-center' : ''}`}
            title={!isOpen ? item.name : undefined}  // Show tooltip when collapsed
          >
            <div className="icon-3d">
              {item.icon}
            </div>
            {isOpen && (
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
        ))}
      </div>
      
      {isOpen && (
        <div className="p-4">
          <div className="text-white text-xs opacity-70 mb-1">Powered by Rezilia AI</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
