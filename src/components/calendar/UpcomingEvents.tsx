
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
  
  // Filter and update upcoming events whenever selected date or events change
  useEffect(() => {
    // Safety check for selectedDate
    if (!(selectedDate instanceof Date)) {
      console.error("Selected date is not a Date object:", selectedDate);
      return;
    }
    
    console.log(`UpcomingEvents - Filtering events after ${selectedDate.toDateString()}`);
    
    // Create a copy of the selected date to avoid mutating the original
    const referenceDate = new Date(selectedDate);
    // Reset time to start of day for accurate date comparison
    referenceDate.setHours(0, 0, 0, 0);
    
    // Filter and sort upcoming events
    const filtered = events
      .filter(event => {
        // Ensure event.date is a Date object
        if (!(event.date instanceof Date)) {
          console.error("Event date is not a Date object:", event);
          return false;
        }
        
        // Create a copy of the event date to avoid mutating the original
        const eventDay = new Date(event.date);
        // Reset time to start of day for accurate date comparison
        eventDay.setHours(0, 0, 0, 0);
        
        // Only include events that occur AFTER the reference date (not on the same day)
        return eventDay.getTime() > referenceDate.getTime();
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
    
    console.log(`UpcomingEvents - Found ${filtered.length} events after ${selectedDate.toDateString()}`);
    
    if (filtered.length > 0) {
      console.log(`UpcomingEvents - First upcoming event: ${filtered[0].title} on ${filtered[0].date.toDateString()} at ${filtered[0].time}`);
    }
    
    // Update state with the new filtered events
    setUpcomingEvents(filtered);
  }, [selectedDate, events]);

  // Force rerender when date changes
  useEffect(() => {
    console.log("Date changed, upcoming events component will rerender");
  }, [selectedDate]);

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
