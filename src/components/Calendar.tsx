
import React from 'react';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { Link } from 'react-router-dom';
import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CalendarStyles from './calendar/CalendarStyles';

const Calendar: React.FC = () => {
  const isMobile = useIsMobile();
  const { selectedDate, setSelectedDate, events } = useCalendarContext();

  // Create event counts for the calendar
  const eventCounts: Record<string, number> = {};
  events.forEach(event => {
    const dateStr = format(event.date, 'yyyy-MM-dd');
    eventCounts[dateStr] = (eventCounts[dateStr] || 0) + 1;
  });

  // Format month and date for mobile view
  const currentMonth = format(selectedDate, 'MMMM').toUpperCase();
  const currentDay = format(selectedDate, 'd');

  return (
    <div className={`${isMobile ? 'bg-transparent' : 'bg-white'} rounded-lg p-3 sm:p-4 ${!isMobile && 'shadow-sm'}`}>
      {!isMobile ? (
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-end gap-2">
            <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>
              {format(selectedDate, 'MMMM yyyy')}
            </h2>
            <Badge className="bg-rezilia-orange text-white mb-1">
              {Object.values(eventCounts).reduce((sum, count) => sum + count, 0)}
            </Badge>
          </div>
          <Link to="/calendar">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-rezilia-purple hover:bg-rezilia-purple/10"
            >
              <CalendarPlus className="h-4 w-4 mr-1" />
              <span>All Events</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-between mb-2 text-white">
          <h2 className="text-lg font-bold">
            {format(selectedDate, 'MMMM yyyy')}
          </h2>
          <div className="text-white">{currentDay} {currentMonth}</div>
        </div>
      )}
      
      <div className="calendar-container">
        <CalendarUI
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className={`pointer-events-auto ${isMobile ? 'mobile-calendar' : ''}`}
          modifiers={{
            eventDay: (date) => Boolean(eventCounts[format(date, 'yyyy-MM-dd')])
          }}
          modifiersClassNames={{
            eventDay: "event-day" 
          }}
          components={{
            DayContent: ({ date }) => {
              const formattedDate = format(date, 'yyyy-MM-dd');
              const hasEvents = Boolean(eventCounts[formattedDate]);
              
              return (
                <div className="relative flex items-center justify-center w-full h-full">
                  <div>{date.getDate()}</div>
                  {hasEvents && (
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-rezilia-blue rounded-full" />
                  )}
                </div>
              );
            }
          }}
        />
      </div>

      {/* Add Calendar styles */}
      <CalendarStyles />
    </div>
  );
};

export default Calendar;
