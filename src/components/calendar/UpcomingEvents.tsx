
import React, { useEffect, useState } from 'react';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { isToday, format } from 'date-fns';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarEvent } from '@/contexts/CalendarContext';

const UpcomingEvents: React.FC = () => {
  const { selectedDate, setSelectedDate, events } = useCalendarContext();
  const isMobile = useIsMobile();
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  
  // Update upcoming events whenever selected date changes
  useEffect(() => {
    // Validate selectedDate is a Date object
    if (!(selectedDate instanceof Date)) {
      console.error("Selected date is not a Date object:", selectedDate);
      return;
    }
    
    console.log(`UpcomingEvents - Getting events after ${selectedDate.toDateString()}`);
    
    // Filter and sort upcoming events directly in the component
    // This ensures we get the latest data on every render
    const filteredEvents = events
      .filter(event => {
        // Only include events that are AFTER the current selected date
        const eventDate = new Date(event.date);
        const selectedDateCopy = new Date(selectedDate);
        
        // Reset hours to compare just the dates
        eventDate.setHours(0, 0, 0, 0);
        selectedDateCopy.setHours(0, 0, 0, 0);
        
        return eventDate > selectedDateCopy;
      })
      .sort((a, b) => {
        // Sort by date first
        const dateComparison = a.date.getTime() - b.date.getTime();
        if (dateComparison !== 0) return dateComparison;
        
        // Then by time if dates are equal
        const aTime = a.time.replace(':', '');
        const bTime = b.time.replace(':', '');
        return parseInt(aTime) - parseInt(bTime);
      });
    
    console.log(`UpcomingEvents - Found ${filteredEvents.length} events after ${selectedDate.toDateString()}`);
    
    if (filteredEvents.length > 0) {
      console.log(`UpcomingEvents - First upcoming event: ${filteredEvents[0].title} on ${filteredEvents[0].date.toDateString()}`);
    }
    
    // Force state update after filtering
    setUpcomingEvents([...filteredEvents]);
    
  }, [selectedDate, events]);

  return (
    <div className="col-span-1 lg:col-span-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col h-full">
      <h2 className="text-xl font-bold text-rezilia-purple mb-4">Upcoming Events</h2>
      
      {upcomingEvents.length > 0 ? (
        <ScrollArea className="flex-1 h-[180px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingEvents.map((event) => (
                <TableRow 
                  key={event.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedDate(event.date)}
                >
                  <TableCell className="font-medium">
                    {isToday(event.date) ? (
                      <span className="text-rezilia-green font-bold">Today</span>
                    ) : (
                      format(event.date, 'MMM d')
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: event.color }}
                      />
                      {event.title}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{event.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No upcoming events</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
