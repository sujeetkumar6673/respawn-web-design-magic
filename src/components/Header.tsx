
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, SimpliciaBadge } from './Icons';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';

interface HeaderProps {
  pageTitle?: string;
  pageDescription?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, pageDescription }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  
  // Use actual user data or fallback to default
  const userName = user?.name || 'User';
  const userEmail = user?.email || '';
  const userRole = user?.role || 'User';
  
  // Generate initials from user name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const handleSignOut = () => {
    // Call the logout function from AuthContext
    logout();
    
    // Show a success toast
    toast.success("Signed out successfully!");
    
    // Redirect to landing page immediately
    navigate('/');
  };
  
  return (
    <header className="bg-white rounded-t-xl p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <ChevronLeftIcon />
        </Button>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {pageTitle ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6">
                  <SimpliciaBadge />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
              </div>
              {pageDescription && (
                <p className="text-sm text-gray-600 ml-9">{pageDescription}</p>
              )}
            </div>
          ) : (
            <div>
              <span>Welcome to Rezilia ;)</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" className="hidden md:flex">Contact</Button>
        
        {/* Help/Question Icon */}
        <Button variant="ghost" size="icon" className="relative text-rezilia-pink">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-rezilia-orange text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">1</span>
        </Button>
        
        {/* Notification Dropdown */}
        <NotificationDropdown />
        
        {/* Avatar with Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer hover:ring-2 hover:ring-rezilia-purple/30 transition-all">
              <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop" alt={userName} />
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3">
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-2 border-b">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop" alt={userName} />
                  <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-gray-500">{userRole}</p>
                  {userEmail && (
                    <p className="text-xs text-gray-400">{userEmail}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-700 hover:text-rezilia-purple"
                  onClick={() => navigate('/profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-700 hover:text-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
