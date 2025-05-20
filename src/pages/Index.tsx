
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
  const userName = "Nina";
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
    <div className="app-background min-h-screen h-screen flex flex-col pb-16 sm:pb-0">
      <div className="flex h-full overflow-hidden">
        {/* Sidebar - only visible on desktop */}
        {!isMobile && <Sidebar activePage={activePage} />}
        
        {/* Main Content */}
        <div className={`flex-1 p-1.5 sm:p-2 md:p-3 flex flex-col overflow-hidden ${isMobile ? 'w-full' : 'ml-[220px]'}`}>
          <div className="max-w-[1200px] mx-auto flex flex-col h-full overflow-hidden">
            {/* Header */}
            <Header userName={userName} />
            
            {/* Main Dashboard */}
            <div className="bg-white rounded-b-xl p-1.5 sm:p-2 md:p-3 flex-1 overflow-hidden">
              <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-1.5 sm:gap-2">
                {/* Left Column */}
                <div className="lg:col-span-2 h-full">
                  <ScrollArea className="h-full pr-1">
                    <div className="space-y-1.5 sm:space-y-2 pb-1.5 sm:pb-2">
                      {/* Welcome Message */}
                      <WelcomeMessage userName={userName} />
                      
                      {/* Calendar and Schedule - layout for mobile */}
                      {isMobile && (
                        <section className="mt-1 mb-1.5 sm:mb-2">
                          <h2 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1">Calendar & Schedule</h2>
                          <CalendarProvider>
                            <div className="grid grid-cols-12 gap-1">
                              <div className="col-span-7" style={{ height: '180px' }}>
                                <Calendar />
                              </div>
                              <div className="col-span-5 border-l pl-1 flex flex-col" style={{ height: '180px' }}>
                                <Schedule />
                              </div>
                            </div>
                          </CalendarProvider>
                        </section>
                      )}
                      
                      {/* Modules Section */}
                      <section>
                        <h2 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1">Modules</h2>
                        <ModulesSection />
                      </section>
                      
                      {/* Personal Section */}
                      <section>
                        <PersonalSection />
                      </section>
                      
                      {/* Resources Section */}
                      <section>
                        <h2 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1">Resources</h2>
                        <ResourcesSection />
                      </section>
                    </div>
                  </ScrollArea>
                </div>
                
                {/* Right Column - Calendar and Schedule only shown on desktop here */}
                <div className="h-full hidden lg:block">
                  {/* Calendar - desktop position */}
                  <CalendarProvider>
                    <div className="-mt-1">
                      <Calendar />
                    </div>
                    <Schedule />
                  </CalendarProvider>
                </div>
              </div>
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
