
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, Video } from 'lucide-react';

interface ChatHeaderProps {
  contact: {
    name: string;
    avatar?: string;
    status: 'online' | 'offline' | 'away';
  };
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ contact }) => {
  return (
    <div className="p-3 border-b flex items-center justify-between bg-white">
      <div className="flex items-center">
        <div className="relative">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span 
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              contact.status === 'online' ? 'bg-green-500' : 
              contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
            }`} 
          />
        </div>
        <div className="ml-3">
          <h2 className="font-medium">{contact.name}</h2>
          <p className="text-xs text-gray-500">
            {contact.status === 'online' 
              ? 'Online' 
              : contact.status === 'away' 
                ? 'Away' 
                : 'Offline'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-rezilia-purple">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-rezilia-purple">
          <Video className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
