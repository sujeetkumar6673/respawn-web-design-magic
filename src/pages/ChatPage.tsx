import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import ChatContactList, { Contact } from '@/components/chat/ChatContactList';
import ChatContainer from '@/components/chat/ChatContainer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { contactService, CurrentUser } from '@/services/contactService';

const ChatPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('chat');
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>('00000000-0000-0000-0000-000000000002');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load contacts and current user data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Use the first user from mockUsers as default
        // In a real app, this would come from authentication context
        const userId = '00000000-0000-0000-0000-000000000001';
        
        const [userContacts, user] = await Promise.all([
          contactService.getContactsForUser(userId),
          contactService.getCurrentUser(userId)
        ]);
        
        setContacts(userContacts);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error loading chat data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  
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

  if (loading || !currentUser) {
    return (
      <div className="app-background min-h-screen h-screen flex flex-col pb-16 sm:pb-0">
        <div className="flex h-full overflow-hidden">
          {!isMobile && <Sidebar activePage={activePage} />}
          <div className={`flex-1 p-3 sm:p-4 flex flex-col overflow-hidden ${isMobile ? 'w-full' : 'ml-[220px]'}`}>
            <div className="max-w-[1200px] mx-auto flex flex-col h-full overflow-hidden">
              <Header userName="Loading..." />
              <div className="bg-white rounded-b-xl flex-1 overflow-hidden flex items-center justify-center">
                <p>Loading chat...</p>
              </div>
            </div>
          </div>
        </div>
        {isMobile && <MobileNav activePage={activePage} onNavigate={handleNavigate} />}
      </div>
    );
  }

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
