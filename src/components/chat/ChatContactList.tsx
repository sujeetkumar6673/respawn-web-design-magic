
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  timestamp?: Date;
  unreadCount?: number;
  status: 'online' | 'offline' | 'away';
}

interface ChatContactListProps {
  contacts: Contact[];
  selectedContactId?: string;
  onSelectContact: (contactId: string) => void;
}

const ChatContactList: React.FC<ChatContactListProps> = ({
  contacts,
  selectedContactId,
  onSelectContact,
}) => {
  return (
    <div className="border-r w-full md:w-72 flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">Messages</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {contacts.map((contact) => (
            <Button
              key={contact.id}
              variant="ghost"
              className={cn(
                "w-full justify-start px-2 py-3 h-auto mb-1 hover:bg-gray-100",
                selectedContactId === contact.id && "bg-gray-100"
              )}
              onClick={() => onSelectContact(contact.id)}
            >
              <div className="flex items-center w-full">
                <div className="relative flex-shrink-0">
                  <Avatar className="h-10 w-10 border border-gray-200">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span 
                    className={cn(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                      contact.status === 'online' ? 'bg-green-500' : 
                      contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    )} 
                  />
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{contact.name}</p>
                    {contact.timestamp && (
                      <p className="text-xs text-gray-500">
                        {contact.timestamp.toLocaleDateString([], { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    )}
                  </div>
                  {contact.lastMessage && (
                    <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                  )}
                </div>
                {contact.unreadCount && contact.unreadCount > 0 && (
                  <div className="ml-2 bg-rezilia-pink text-white rounded-full w-5 h-5 flex items-center justify-center">
                    <span className="text-xs">{contact.unreadCount}</span>
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatContactList;
