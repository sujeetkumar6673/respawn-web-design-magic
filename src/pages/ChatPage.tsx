
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
import { useAuth } from '@/contexts/AuthContext';

const ChatPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [activePage, setActivePage] = useState('chat');
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>(undefined);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load contacts and current user data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Use authenticated user ID, fallback to default for demo
        const userId = authUser?.id || '00000000-0000-0000-0000-000000000001';
        console.log('Loading chat data for user:', userId);
        
        const [userContacts, user] = await Promise.all([
          contactService.getContactsForUser(userId),
          contactService.getCurrentUser(userId)
        ]);
        
        setContacts(userContacts);
        setCurrentUser(user);
        
        // Auto-select first contact if available
        if (userContacts.length > 0 && !selectedContactId) {
          setSelectedContactId(userContacts[0].id);
          console.log('Auto-selected first contact:', userContacts[0].name);
        }
      } catch (error) {
        console.error('Error loading chat data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [authUser, selectedContactId]);
  
  const selectedContact = contacts.find(c => c.id === selectedContactId);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    
    // Handle navigation based on the selected page
    switch(page) {
      case 'home':
        navigate('/dashboard');
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

  // Handle contact selection and log for debugging
  const handleSelectContact = (contactId: string) => {
    console.log('Selected contact:', contactId);
    setSelectedContactId(contactId);
  };

  if (loading || !currentUser) {
    return (
      <div className="app-background min-h-screen h-screen flex flex-col pb-16 sm:pb-0">
        <div className="flex h-full overflow-hidden">
          {!isMobile && <Sidebar activePage={activePage} />}
          <div className={`flex-1 p-3 sm:p-4 flex flex-col overflow-hidden ${isMobile ? 'w-full' : 'ml-[220px]'}`}>
            <div className="max-w-[1200px] mx-auto flex flex-col h-full overflow-hidden">
              <Header />
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
            <Header />
            
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
                    onSelectContact={handleSelectContact}
                  />
                )
              ) : (
                // Desktop layout - side by side
                <div className="flex h-full">
                  {/* Contact List */}
                  <ChatContactList 
                    contacts={contacts} 
                    selectedContactId={selectedContactId}
                    onSelectContact={handleSelectContact}
                  />
                  
                  {/* Chat Container */}
                  {selectedContact ? (
                    <div className="flex-1 overflow-hidden">
                      <ChatContainer 
                        currentUser={currentUser} 
                        contact={selectedContact} 
                      />
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                      <p>Select a contact to start chatting</p>
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
