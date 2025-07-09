
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { SimpliciaBadge } from '@/components/Icons';
import { CalendarPlus } from 'lucide-react';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { format } from 'date-fns';
import CalendarSection from '@/components/calendar/CalendarSection';
import DailyEvents from '@/components/calendar/DailyEvents';
import UpcomingEvents from '@/components/calendar/UpcomingEvents';
import EventFormDialog from '@/components/calendar/EventFormDialog';
import CalendarStyles from '@/components/calendar/CalendarStyles';

const SimpliciaPage: React.FC = () => {
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState('simplicia');
  
  const { selectedDate, events } = useCalendarContext();

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
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {!isMobile && <Sidebar activePage={activePage} />}
      
      <div className={`flex-1 ${!isMobile ? 'ml-[220px]' : ''} p-4 h-screen overflow-hidden`}>
        {/* Header */}
        <div className="mb-4">
          <Header pageTitle="Simplicia" pageDescription="Care coordination and family presence management" />
        </div>

        {/* Main Calendar Content */}
        <div className="bg-white rounded-xl p-3 sm:p-6 flex-1 flex flex-col overflow-hidden h-[calc(100vh-160px)]">
          {isMobile ? (
            // Mobile view
            <div className="h-full overflow-y-auto pb-24 flex flex-col">
              {/* Page Title and Add Event Button */}
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-rezilia-purple">Calendar</h1>
                <Button 
                  onClick={() => setIsAddEventDialogOpen(true)}
                  className="bg-rezilia-purple hover:bg-rezilia-purple/90 text-white rounded-full shadow-lg"
                  size="sm"
                >
                  <CalendarPlus className="mr-2 h-5 w-5" />
                  <span>Add Event</span>
                </Button>
              </div>
              
              <div className="space-y-4 mb-10">
                <CalendarSection eventDates={eventDates} />
                <DailyEvents onAddEvent={() => setIsAddEventDialogOpen(true)} />
                <UpcomingEvents />
              </div>
            </div>
          ) : (
            // Desktop view
            <div className="flex flex-col space-y-6 h-full overflow-hidden flex-1">
              {/* Page Title and Add Event Button */}
              <div className="flex justify-between items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-rezilia-purple">Calendar</h1>
                <Button 
                  onClick={() => setIsAddEventDialogOpen(true)}
                  className="bg-rezilia-purple hover:bg-rezilia-purple/90 text-white rounded-full shadow-lg"
                >
                  <CalendarPlus className="mr-2 h-5 w-5" />
                  <span>Add Event</span>
                </Button>
              </div>

              {/* Calendar Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden flex-1 h-full">
                <div className="lg:col-span-3 overflow-hidden">
                  <CalendarSection eventDates={eventDates} />
                </div>
                <div className="flex flex-col space-y-6 overflow-y-auto h-full pr-2">
                  <DailyEvents onAddEvent={() => setIsAddEventDialogOpen(true)} />
                  <UpcomingEvents />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Event Dialog */}
        <EventFormDialog 
          isOpen={isAddEventDialogOpen} 
          onOpenChange={setIsAddEventDialogOpen} 
        />

        {/* Calendar Styles */}
        <CalendarStyles />
      </div>

      {isMobile && <MobileNav activePage={activePage} onNavigate={handleNavigate} />}
    </div>
  );
};

export default SimpliciaPage;
