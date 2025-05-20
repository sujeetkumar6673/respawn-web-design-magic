
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from '@/components/ui/card';

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  return (
    <Card className="bg-white rounded-md p-1.5 sm:p-2 md:p-3 flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2 md:mb-3">
      <div className="relative">
        <Avatar className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 border border-rezilia-blue">
          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop" alt={userName} />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-left">
        <h2 className="text-xs sm:text-sm md:text-base font-bold">HELLO, {userName.toUpperCase()}</h2>
        <p className="text-[10px] sm:text-xs text-gray-600">How can we help you today?</p>
        <a 
          href="/chat" 
          className="text-[10px] sm:text-xs text-rezilia-purple hover:text-rezilia-purple/80"
        >
          Check messages (3 unread)
        </a>
      </div>
    </Card>
  );
};

export default WelcomeMessage;
