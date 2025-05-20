
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import MobileNav from '@/components/MobileNav';
import { CalendarPlus } from 'lucide-react';
import EventFormDialog from '@/components/calendar/EventFormDialog';
import CalendarSection from '@/components/calendar/CalendarSection';
import DailyEvents from '@/components/calendar/DailyEvents';
import UpcomingEvents from '@/components/calendar/UpcomingEvents';
import CalendarStyles from '@/components/calendar/CalendarStyles';

const CalendarPage = () => {
  const { selectedDate, events } = useCalendarContext();
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState('calendar');
  
  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  // Event dots for calendar
  const eventDates: Record<string, number> = {};
  events.forEach(event => {
    const dateStr = format(event.date, 'yyyy-MM-dd');
    eventDates[dateStr] = (eventDates[dateStr] || 0) + 1;
  });

  return (
    <div className="min-h-screen flex flex-col app-background pb-16 sm:pb-0">
      <div className="flex h-full flex-1 overflow-hidden">
        {/* Sidebar - only visible on desktop */}
        {!isMobile && <Sidebar activePage={activePage} />}
        
        {/* Main Content */}
        <div className={`flex-1 ${isMobile ? 'w-full' : 'ml-[220px]'} h-screen flex flex-col overflow-hidden`}>
          <div className="max-w-[1200px] mx-auto w-full p-3 sm:p-4 flex flex-col h-full">
            {/* Header */}
            <Header userName="Nina" />
            
            {/* Main Content */}
            <div className="bg-white rounded-b-xl p-3 sm:p-6 flex-1 flex flex-col overflow-hidden">
              <div className="flex flex-col space-y-6 h-full overflow-hidden">
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
                {isMobile ? (
                  <div className="flex flex-col space-y-4 overflow-hidden flex-1">
                    <CalendarSection eventDates={eventDates} />
                    <div className="overflow-y-auto flex-1">
                      <DailyEvents onAddEvent={() => setIsAddEventDialogOpen(true)} />
                      <div className="mt-4">
                        <UpcomingEvents />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden flex-1 h-full">
                    <div className="lg:col-span-3 overflow-hidden">
                      <CalendarSection eventDates={eventDates} />
                    </div>
                    <div className="flex flex-col space-y-6 overflow-y-auto h-full pr-2">
                      <DailyEvents onAddEvent={() => setIsAddEventDialogOpen(true)} />
                      <UpcomingEvents />
                    </div>
                  </div>
                )}
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

      {/* Calendar Styles */}
      <CalendarStyles />
    </div>
  );
};

export default CalendarPage;
