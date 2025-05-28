
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { Contact } from './ChatContactList';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { startConnection, sendMessage, stopConnection } from '@/services/signalRService';
import { getChatHistory } from '@/services/chatApiService';
import { ChatMessage as ChatMessageType } from '@/types/chat';

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
  const isMobile = useIsMobile();

  // Initialize SignalR connection and load chat history
  useEffect(() => {
    if (!contact || !currentUser) return;

    // Initialize SignalR connection
    const handleMessageReceived = (chatMessage: ChatMessageType) => {
      console.log('Received message:', chatMessage);
      
      // Convert ChatMessage to our local Message format
      const newMessage: Message = {
        id: Date.now().toString(),
        text: chatMessage.content,
        sender: chatMessage.senderId === currentUser.id ? currentUser.name : contact.name,
        senderId: chatMessage.senderId,
        timestamp: new Date(chatMessage.sentAt),
      };

      setMessages(prev => [...prev, newMessage]);
      
      // Show toast if message is from contact
      if (chatMessage.senderId !== currentUser.id) {
        toast.success(`New message from ${contact.name}`);
      }
    };

    startConnection(handleMessageReceived);

    // Load chat history
    const loadChatHistory = async () => {
      try {
        const history = await getChatHistory(currentUser.id, contact.id);
        
        // Convert ChatMessage[] to Message[]
        const convertedMessages: Message[] = history.map((msg, index) => ({
          id: `${msg.sentAt}-${index}`,
          text: msg.content,
          sender: msg.senderId === currentUser.id ? currentUser.name : contact.name,
          senderId: msg.senderId,
          timestamp: new Date(msg.sentAt),
        }));

        setMessages(convertedMessages);
      } catch (error) {
        console.error('Error loading chat history:', error);
        // Fallback to mock data if API fails
        const mockMessages = [
          {
            id: '1',
            text: `Hi, how is mom doing today?`,
            sender: currentUser.name,
            senderId: currentUser.id,
            timestamp: new Date(Date.now() - 3600000 * 3),
          },
          {
            id: '2',
            text: `She's doing well! We just finished her physical therapy session and she's resting now.`,
            sender: contact.name,
            senderId: contact.id,
            timestamp: new Date(Date.now() - 3600000 * 2),
          },
        ];
        setMessages(mockMessages);
      }
    };

    loadChatHistory();

    // Cleanup connection on unmount
    return () => {
      stopConnection();
    };
  }, [contact, currentUser]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const element = scrollAreaRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const chatMessage: ChatMessageType = {
      senderId: currentUser.id,
      senderType: 'User', // You might want to make this dynamic
      receiverId: contact.id,
      receiverType: 'User', // You might want to make this dynamic
      content: text,
      sentAt: new Date().toISOString(),
    };

    // Send message via SignalR
    sendMessage(chatMessage);

    // Add message to local state immediately for better UX
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: currentUser.name,
      senderId: currentUser.id,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
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
