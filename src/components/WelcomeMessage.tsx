
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  return (
    <Card className="bg-white rounded-md p-1 flex items-center gap-2 mb-1">
      <div className="relative">
        <Avatar className="h-8 w-8 border border-rezilia-blue">
          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop" alt={userName} />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-left">
        <h2 className="text-sm font-bold leading-tight">HELLO, {userName.toUpperCase()}</h2>
        <p className="text-xs text-gray-600 leading-tight">How can we help you today?</p>
        <Link 
          to="/chat" 
          className="text-xs text-rezilia-purple hover:text-rezilia-purple/80 leading-tight"
        >
          Check messages (3 unread)
        </Link>
      </div>
    </Card>
  );
};

export default WelcomeMessage;
