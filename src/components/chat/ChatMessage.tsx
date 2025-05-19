
import React from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ChatMessageProps {
  message: string;
  sender: string;
  timestamp: Date;
  isCurrentUser: boolean;
  avatar?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  timestamp,
  isCurrentUser,
  avatar
}) => {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isCurrentUser ? "justify-end" : "justify-start"
    )}>
      {!isCurrentUser && (
        <div className="flex-shrink-0 mr-3">
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src={avatar} alt={sender} />
            <AvatarFallback>{sender.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      )}
      <div className={cn(
        "max-w-[80%]",
        isCurrentUser ? "order-1" : "order-2"
      )}>
        {!isCurrentUser && <p className="text-xs text-gray-500 mb-1">{sender}</p>}
        <div className={cn(
          "p-3 rounded-xl",
          isCurrentUser 
            ? "bg-rezilia-purple text-white rounded-tr-none" 
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        )}>
          <p className="text-sm">{message}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {isCurrentUser && (
        <div className="flex-shrink-0 ml-3">
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src={avatar} alt={sender} />
            <AvatarFallback>{sender.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
