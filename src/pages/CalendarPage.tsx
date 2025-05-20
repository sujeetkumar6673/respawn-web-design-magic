
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import MobileNav from '@/components/MobileNav';
import { CalendarPlus } from 'lucide-react';
import EventFormDialog from '@/components/calendar/EventFormDialog';
import Calendar from '@/components/Calendar';
import { Card } from '@/components/ui/card';
import DailyEvents from '@/components/calendar/DailyEvents';
import UpcomingEvents from '@/components/calendar/UpcomingEvents';

const CalendarPage = () => {
  const { selectedDate, events } = useCalendarContext();
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState('calendar');
  
  // Force the component to rerender when selectedDate changes
  useEffect(() => {
    console.log(`CalendarPage - Date changed to: ${selectedDate.toDateString()}`);
    // Force a rerender of child components by updating the refresh key
    setRefreshKey(prevKey => prevKey + 1);
  }, [selectedDate]);
  
  const handleNavigate = (page: string) => {
    setActivePage(page);
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
            <Header userName="Nina" />
            
            {/* Main Content */}
            <div className="bg-white rounded-b-xl p-3 sm:p-6">
              <div className="flex flex-col space-y-6">
                {/* Page Title and Add Event Button */}
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-rezilia-purple">Calendar</h1>
                  <Button 
                    onClick={() => setIsAddEventDialogOpen(true)}
                    className="bg-rezilia-purple hover:bg-rezilia-purple/90 text-white rounded-full shadow-lg"
                    size={isMobile ? "sm" : "default"}
                  >
                    <CalendarPlus className="mr-2 h-5 w-5" />
                    <span>Add Event</span>
                  </Button>
                </div>

                {/* Calendar Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column - Calendar */}
                  <Card className="md:col-span-2">
                    <Calendar key={`calendar-${refreshKey}`} />
                  </Card>
                  
                  {/* Right Column - Events */}
                  <div className="flex flex-col space-y-6">
                    {/* Today's Events */}
                    <Card className="p-4">
                      <DailyEvents date={selectedDate} />
                    </Card>
                    
                    {/* Upcoming Events */}
                    <Card className="p-4">
                      <UpcomingEvents />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Dialog */}
      <EventFormDialog 
        isOpen={isAddEventDialogOpen} 
        onOpenChange={setIsAddEventDialogOpen} 
      />

      {/* Mobile Navigation - only visible on mobile */}
      {isMobile && <MobileNav activePage={activePage} onNavigate={handleNavigate} />}
    </div>
  );
};

export default CalendarPage;
