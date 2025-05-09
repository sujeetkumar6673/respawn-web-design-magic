
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from '@/components/ui/card';

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  return (
    <Card className="bg-white rounded-xl p-4 flex items-center gap-4 mb-6">
      <div className="relative">
        <Avatar className="h-16 w-16 border-2 border-rezilia-blue">
          <AvatarImage src="/lovable-uploads/6fc2af35-6587-4e5e-872e-874ef4f857c4.png" alt={userName} />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
          Shape
        </div>
      </div>
      <div className="text-left">
        <h2 className="text-2xl font-bold">HELLO, {userName.toUpperCase()}</h2>
        <p className="text-gray-600">How can we help you today ?</p>
      </div>
    </Card>
  );
};

export default WelcomeMessage;
