import React, { useState } from 'react';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import ChatContactList, { Contact } from '@/components/chat/ChatContactList';
import ChatContainer from '@/components/chat/ChatContainer';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const ChatPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('chat');
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>('1');
  
  // Mock data for contacts
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      lastMessage: "She's doing well! We just finished her therapy session.",
      timestamp: new Date(Date.now() - 3600000 * 2),
      unreadCount: 0,
      status: 'online'
    },
    {
      id: '2',
      name: 'Mark Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      lastMessage: "I'll send the medication schedule tonight",
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 2,
      status: 'away'
    },
    {
      id: '3',
      name: 'Dr. Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop',
      lastMessage: "Let's discuss the treatment plan next week",
      timestamp: new Date(Date.now() - 86400000 * 2),
      unreadCount: 0,
      status: 'offline'
    },
    {
      id: '4',
      name: 'Family Group',
      avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=200&auto=format&fit=crop',
      lastMessage: 'Thanks for the update everyone!',
      timestamp: new Date(Date.now() - 86400000 * 3),
      unreadCount: 0,
      status: 'online'
    }
  ];
  
  const currentUser = {
    id: 'current-user',
    name: 'Nina',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop'
  };
  
  const selectedContact = contacts.find(c => c.id === selectedContactId);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    
    // Handle navigation based on the selected page
    switch(page) {
      case 'home':
        navigate('/');
        break;
      case 'calendar':
        navigate('/calendar');
        break;
      default:
        // Stay on chat page
    }
  };

  // Function to go back to contact list on mobile
  const handleBackToContacts = () => {
    setSelectedContactId(undefined);
  };

  return (
    <div className="app-background min-h-screen h-screen flex flex-col pb-16 sm:pb-0">
      <div className="flex h-full overflow-hidden">
        {/* Sidebar - only visible on desktop */}
        {!isMobile && <Sidebar activePage={activePage} />}
        
        {/* Main Content */}
        <div className={`flex-1 p-3 sm:p-4 flex flex-col overflow-hidden ${isMobile ? 'w-full' : 'ml-[220px]'}`}>
          <div className="max-w-[1200px] mx-auto flex flex-col h-full overflow-hidden">
            {/* Header */}
            <Header userName={currentUser.name} />
            
            {/* Chat Interface */}
            <div className="bg-white rounded-b-xl flex-1 overflow-hidden flex flex-col">
              {isMobile ? (
                // Mobile layout - show either contact list or chat based on selection
                selectedContactId ? (
                  // Show chat with back button
                  <div className="flex flex-col h-full">
                    <div className="p-2 border-b">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleBackToContacts}
                        className="flex items-center"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to contacts
                      </Button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      {selectedContact && (
                        <ChatContainer 
                          currentUser={currentUser} 
                          contact={selectedContact} 
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  // Show contact list
                  <ChatContactList 
                    contacts={contacts} 
                    selectedContactId={selectedContactId}
                    onSelectContact={setSelectedContactId}
                  />
                )
              ) : (
                // Desktop layout - side by side
                <div className="flex h-full">
                  {/* Contact List */}
                  <ChatContactList 
                    contacts={contacts} 
                    selectedContactId={selectedContactId}
                    onSelectContact={setSelectedContactId}
                  />
                  
                  {/* Chat Container */}
                  {selectedContact && (
                    <div className="flex-1 overflow-hidden">
                      <ChatContainer 
                        currentUser={currentUser} 
                        contact={selectedContact} 
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - only visible on mobile */}
      {isMobile && <MobileNav activePage={activePage} onNavigate={handleNavigate} />}
    </div>
  );
};

export default ChatPage;
