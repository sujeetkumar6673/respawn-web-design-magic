
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Calendar from '@/components/Calendar';
import ModulesSection from '@/components/ModulesSection';
import PersonalSection from '@/components/PersonalSection';
import ResourcesSection from '@/components/ResourcesSection';
import Schedule from '@/components/Schedule';
import WelcomeMessage from '@/components/WelcomeMessage';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const userName = "Nina";
  const isMobile = useIsMobile();
  
  return (
    <div className="app-background min-h-screen">
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar activePage="home" />
        
        {/* Main Content */}
        <div className={`flex-1 p-3 sm:p-4 overflow-y-auto ${isMobile ? 'w-full' : ''}`}>
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
                  
                  {/* Modules Section */}
                  <section>
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
                
                {/* Right Column */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Calendar - adjusted to align with welcome message */}
                  <div className="-mt-4 hidden sm:block">
                    <Calendar />
                  </div>
                  
                  {/* Schedule */}
                  <Schedule />
                </div>
              </div>
            </div>
            
            {/* Footer Pagination */}
            <div className="flex justify-center items-center gap-4 py-6 text-white">
              <button className="hover:bg-white/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span>14 / 35</span>
              <button className="hover:bg-white/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
