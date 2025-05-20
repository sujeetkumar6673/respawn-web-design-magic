
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from '@/components/ui/card';

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  return (
    <Card className="bg-white rounded-xl p-3 flex items-center gap-3">
      <div className="relative">
        <Avatar className="h-14 w-14 border-2 border-rezilia-blue">
          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop" alt={userName} />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-left">
        <h2 className="text-xl font-bold">HELLO, {userName.toUpperCase()}</h2>
        <p className="text-sm text-gray-600">How can we help you today ?</p>
        <a 
          href="/chat" 
          className="mt-1 inline-block text-xs text-rezilia-purple hover:text-rezilia-purple/80"
        >
          Check messages (3 unread)
        </a>
      </div>
    </Card>
  );
};

export default WelcomeMessage;
