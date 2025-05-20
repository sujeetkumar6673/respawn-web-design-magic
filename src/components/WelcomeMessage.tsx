
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from '@/components/ui/card';

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  return (
    <Card className="bg-white rounded-md p-2 flex items-center gap-2 mb-2">
      <div className="relative">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border border-rezilia-blue">
          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop" alt={userName} />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-left">
        <h2 className="text-sm sm:text-base md:text-lg font-bold">HELLO, {userName.toUpperCase()}</h2>
        <p className="text-xs sm:text-sm text-gray-600">How can we help you today?</p>
        <a 
          href="/chat" 
          className="text-xs sm:text-sm text-rezilia-purple hover:text-rezilia-purple/80"
        >
          Check messages (3 unread)
        </a>
      </div>
    </Card>
  );
};

export default WelcomeMessage;
