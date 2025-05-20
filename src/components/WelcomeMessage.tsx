
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from '@/components/ui/card';

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  return (
    <Card className="bg-white rounded-xl p-2 flex items-center gap-2">
      <div className="relative">
        <Avatar className="h-10 w-10 border-2 border-rezilia-blue">
          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop" alt={userName} />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-left">
        <h2 className="text-lg font-bold">HELLO, {userName.toUpperCase()}</h2>
        <p className="text-xs text-gray-600">How can we help you today?</p>
        <a 
          href="/chat" 
          className="text-xs text-rezilia-purple hover:text-rezilia-purple/80"
        >
          Check messages (3 unread)
        </a>
      </div>
    </Card>
  );
};

export default WelcomeMessage;
