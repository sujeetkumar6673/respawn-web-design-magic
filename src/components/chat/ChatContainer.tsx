
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
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Initialize SignalR connection once when component mounts
  useEffect(() => {
    if (!currentUser) return;

    const handleMessageReceived = (chatMessage: ChatMessageType) => {
      console.log('Received message:', chatMessage);
      
      // Only add message if it's relevant to current chat
      if ((chatMessage.senderId === currentUser.id && chatMessage.receiverId === contact?.id) ||
          (chatMessage.senderId === contact?.id && chatMessage.receiverId === currentUser.id)) {
        
        const newMessage: Message = {
          id: `${Date.now()}-${Math.random()}`,
          text: chatMessage.content,
          sender: chatMessage.senderId === currentUser.id ? currentUser.name : contact?.name || 'Unknown',
          senderId: chatMessage.senderId,
          timestamp: new Date(chatMessage.sentAt),
        };

        setMessages(prev => [...prev, newMessage]);
        
        // Show toast if message is from contact
        if (chatMessage.senderId !== currentUser.id && contact) {
          toast.success(`New message from ${contact.name}`);
        }
      }
    };

    startConnection(handleMessageReceived);

    // Cleanup connection on unmount
    return () => {
      stopConnection();
    };
  }, [currentUser]); // Only depend on currentUser, not contact

  // Load chat history when contact changes
  useEffect(() => {
    if (!contact || !currentUser) return;

    const loadChatHistory = async () => {
      setLoading(true);
      try {
        console.log(`Loading chat history between ${currentUser.id} and ${contact.id}`);
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
        console.log(`Loaded ${convertedMessages.length} messages for chat`);
      } catch (error) {
        console.error('Error loading chat history:', error);
        // Fallback to mock data if API fails
        const mockMessages = [
          {
            id: '1',
            text: `Hi ${contact.name}, how are you doing?`,
            sender: currentUser.name,
            senderId: currentUser.id,
            timestamp: new Date(Date.now() - 3600000 * 3),
          },
          {
            id: '2',
            text: `Hello ${currentUser.name}! I'm doing well, thanks for asking.`,
            sender: contact.name,
            senderId: contact.id,
            timestamp: new Date(Date.now() - 3600000 * 2),
          },
        ];
        setMessages(mockMessages);
      } finally {
        setLoading(false);
      }
    };

    loadChatHistory();
  }, [contact, currentUser]); // Load chat history when contact or user changes

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const element = scrollAreaRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!contact) return;

    const chatMessage: ChatMessageType = {
      senderId: currentUser.id,
      senderType: 'User',
      receiverId: contact.id,
      receiverType: 'User',
      content: text,
      sentAt: new Date().toISOString(),
    };

    console.log('Sending message:', chatMessage);

    // Send message via SignalR
    sendMessage(chatMessage);

    // Add message to local state immediately for better UX
    const newMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      sender: currentUser.name,
      senderId: currentUser.id,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <ChatHeader contact={contact} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading chat history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader contact={contact} />
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.text}
                sender={msg.sender}
                timestamp={msg.timestamp}
                isCurrentUser={msg.senderId === currentUser.id}
                avatar={msg.senderId === currentUser.id ? currentUser.avatar : contact.avatar}
              />
            ))
          )}
        </div>
      </ScrollArea>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
