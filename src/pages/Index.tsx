
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
    <div className="app-background min-h-screen pb-16 sm:pb-0">
      <div className="flex h-full">
        {/* Sidebar - only visible on desktop */}
        {!isMobile && <Sidebar activePage={activePage} />}
        
        {/* Main Content */}
        <div className={`flex-1 p-3 sm:p-4 overflow-y-auto ${isMobile ? 'w-full' : 'ml-[220px]'}`}>
          <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <Header userName={userName} />
            
            {/* Main Dashboard */}
            <div className="bg-white rounded-b-xl p-3 sm:p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                  {/* Welcome Message */}
                  <WelcomeMessage userName={userName} />
                  
                  {/* Calendar and Schedule - layout for mobile */}
                  {isMobile && (
                    <section className="mt-4">
                      <h2 className="text-xl font-bold mb-3">Calendar & Schedule</h2>
                      <CalendarProvider>
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-7 h-full">
                            <Calendar />
                          </div>
                          <div className="col-span-5 border-l pl-1 flex flex-col h-full">
                            <Schedule />
                          </div>
                        </div>
                      </CalendarProvider>
                    </section>
                  )}
                  
                  {/* Modules Section */}
                  <section>
                    <h2 className="text-xl font-bold mb-3">Modules</h2>
                    <ModulesSection />
                  </section>
                  
                  {/* Personal Section */}
                  <section>
                    <PersonalSection />
                  </section>
                  
                  {/* Resources Section */}
                  <section>
                    <h2 className="text-xl font-bold mb-4">Resources</h2>
                    <ResourcesSection />
                  </section>
                </div>
                
                {/* Right Column - Calendar and Schedule only shown on desktop here */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Calendar - desktop position */}
                  {!isMobile && (
                    <CalendarProvider>
                      <div className="-mt-4 hidden sm:block">
                        <Calendar />
                      </div>
                      <Schedule />
                    </CalendarProvider>
                  )}
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
