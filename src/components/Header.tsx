
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="bg-white rounded-t-xl p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <ChevronLeftIcon />
        </Button>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div>
            <span className="relative">
              Welcome to Rezilia ;)
              <Badge className="absolute -top-2 -right-8 bg-rezilia-orange text-white">NEW</Badge>
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" className="hidden md:flex">Contact</Button>
        <Button variant="ghost" size="icon" className="relative text-rezilia-pink">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-rezilia-orange text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">1</span>
        </Button>
        <Button variant="ghost" size="icon" className="relative text-yellow-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-rezilia-orange text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
        </Button>
        <Link to="/profile">
          <Avatar className="cursor-pointer hover:opacity-90 transition-opacity">
            <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop" alt={userName} />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;
