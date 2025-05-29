
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Calendar from '@/components/Calendar';
import ModulesSection from '@/components/ModulesSection';
import PersonalSection from '@/components/PersonalSection';
import ResourcesSection from '@/components/ResourcesSection';
import Schedule from '@/components/Schedule';
import WelcomeMessage from '@/components/WelcomeMessage';
import MobileNav from '@/components/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { CalendarProvider } from '@/contexts/CalendarContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState('home');
  const navigate = useNavigate();
  
  const handleNavigate = (page: string) => {
    setActivePage(page);
    
    // Handle navigation based on the selected page
    switch(page) {
      case 'calendar':
        navigate('/calendar');
        break;
      // Add other navigation cases as needed
      default:
        // Default to home
        navigate('/');
    }
  };
  
  return (
    <div className="app-background min-h-screen max-h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar - only visible on desktop */}
        {!isMobile && <Sidebar activePage={activePage} />}
        
        {/* Main Content */}
        <div className={`flex-1 min-h-0 p-2 flex flex-col overflow-hidden ${isMobile ? 'w-full' : 'ml-[220px]'}`}>
          <div className="max-w-[1200px] mx-auto flex flex-col h-full w-full min-h-0 overflow-hidden">
            {/* Header - Fixed at top */}
            <div className="flex-shrink-0">
              <Header />
            </div>
            
            {/* Main Dashboard - Scrollable content */}
            <div className="bg-white rounded-b-xl flex-1 min-h-0 overflow-hidden">
              {isMobile ? (
                // Mobile view - Proper scrolling
                <ScrollArea className="h-full">
                  <div className="p-3 space-y-4 pb-24">
                    {/* Welcome Message */}
                    <WelcomeMessage />
                    
                    {/* Calendar and Schedule - layout for mobile */}
                    <section className="mt-2 mb-6">
                      <h2 className="text-sm font-bold mb-2">Calendar & Schedule</h2>
                      <CalendarProvider>
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-7" style={{ height: '180px' }}>
                            <Calendar />
                          </div>
                          <div className="col-span-5 border-l pl-1 flex flex-col" style={{ height: '180px' }}>
                            <Schedule />
                          </div>
                        </div>
                      </CalendarProvider>
                    </section>
                    
                    {/* Modules Section */}
                    <section className="mt-6 pt-2">
                      <h2 className="text-base font-bold mb-2">Modules</h2>
                      <ModulesSection />
                    </section>
                    
                    {/* Personal Section */}
                    <section className="mt-4">
                      <PersonalSection />
                    </section>
                    
                    {/* Resources Section */}
                    <section className="mt-4 mb-10">
                      <h2 className="text-base font-bold mb-2">Resources</h2>
                      <ResourcesSection />
                    </section>
                  </div>
                </ScrollArea>
              ) : (
                // Desktop view - Two column layout with proper scrolling
                <div className="h-full flex">
                  {/* Left Column - Main content with vertical scroll */}
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-3 space-y-4 pr-6">
                        {/* Welcome Message */}
                        <WelcomeMessage />
                        
                        {/* Modules Section */}
                        <section>
                          <h2 className="text-base font-bold mb-2">Modules</h2>
                          <ModulesSection />
                        </section>
                        
                        {/* Personal Section */}
                        <section className="mt-4">
                          <PersonalSection />
                        </section>
                        
                        {/* Resources Section */}
                        <section className="mt-4 pb-6">
                          <h2 className="text-base font-bold mb-2">Resources</h2>
                          <ResourcesSection />
                        </section>
                      </div>
                    </ScrollArea>
                  </div>
                  
                  {/* Right Column - Calendar and Schedule with fixed width */}
                  <div className="w-80 flex-shrink-0 min-h-0 overflow-hidden border-l">
                    <div className="h-full flex flex-col">
                      <CalendarProvider>
                        <div className="flex-shrink-0 p-3 pb-0">
                          <Calendar />
                        </div>
                        <div className="flex-1 min-h-0 overflow-hidden">
                          <ScrollArea className="h-full">
                            <div className="p-3 pt-0">
                              <Schedule />
                            </div>
                          </ScrollArea>
                        </div>
                      </CalendarProvider>
                    </div>
                  </div>
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

export default Index;
