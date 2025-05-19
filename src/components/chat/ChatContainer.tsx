
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { Contact } from './ChatContactList';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: string;
  senderId: string;
  timestamp: Date;
}

interface ChatContainerProps {
  currentUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  contact: Contact;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ currentUser, contact }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Mock data for initial messages
  useEffect(() => {
    // Demo conversation data
    if (contact) {
      const mockMessages = [
        {
          id: '1',
          text: `Hi, how is mom doing today?`,
          sender: currentUser.name,
          senderId: currentUser.id,
          timestamp: new Date(Date.now() - 3600000 * 3), // 3 hours ago
        },
        {
          id: '2',
          text: `She's doing well! We just finished her physical therapy session and she's resting now.`,
          sender: contact.name,
          senderId: contact.id,
          timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
        },
        {
          id: '3',
          text: `That's great to hear! Did she eat her lunch properly?`,
          sender: currentUser.name,
          senderId: currentUser.id,
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        },
        {
          id: '4',
          text: `Yes, she had her full meal and also took her medication on time.`,
          sender: contact.name,
          senderId: contact.id,
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        }
      ];
      setMessages(mockMessages);
    }
  }, [contact, currentUser.name, currentUser.id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const element = scrollAreaRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: currentUser.name,
      senderId: currentUser.id,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate reply after a delay
    setTimeout(() => {
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        text: getRandomReply(),
        sender: contact.name,
        senderId: contact.id,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, replyMessage]);
      toast.success("New message from " + contact.name);
    }, 3000);
  };

  const getRandomReply = () => {
    const replies = [
      "Thanks for checking in! Everything is going according to schedule.",
      "I'll update the care journal with today's activities shortly.",
      "She's been asking when you'll visit next. Any plans to come by?",
      "We've been doing those exercises the doctor recommended. Progress is slow but steady.",
      "Just gave her the medication. She's resting comfortably now.",
      "I think we might need more supplies soon. Could you help with that?"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader contact={contact} />
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
              isCurrentUser={msg.senderId === currentUser.id}
              avatar={msg.senderId === currentUser.id ? currentUser.avatar : contact.avatar}
            />
          ))}
        </div>
      </ScrollArea>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
