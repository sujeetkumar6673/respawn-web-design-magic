
import React, { useEffect, useState } from 'react';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { isToday, format } from 'date-fns';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

const UpcomingEvents: React.FC = () => {
  const { selectedDate, setSelectedDate, events, getUpcomingEvents } = useCalendarContext();
  const isMobile = useIsMobile();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  
  // Update upcoming events whenever selected date changes
  useEffect(() => {
    console.log(`UpcomingEvents - selectedDate changed to: ${selectedDate.toDateString()}`);
    
    // Get events AFTER the selected date
    const upcoming = getUpcomingEvents(undefined, selectedDate);
    setUpcomingEvents(upcoming);
    
    console.log(`UpcomingEvents - Found ${upcoming.length} events after ${selectedDate.toDateString()}`);
    
    if (upcoming.length > 0) {
      console.log(`UpcomingEvents - First upcoming event: ${upcoming[0].title} on ${upcoming[0].date.toDateString()}`);
    }
  }, [selectedDate, events, getUpcomingEvents]);

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
