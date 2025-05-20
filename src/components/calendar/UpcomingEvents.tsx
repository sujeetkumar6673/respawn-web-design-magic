
import React from 'react';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { isToday, format } from 'date-fns';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

const UpcomingEvents: React.FC = () => {
  const { setSelectedDate, getUpcomingEvents } = useCalendarContext();
  const isMobile = useIsMobile();
  
  // Get upcoming events (increased from 3 to 4 for mobile to show more events)
  const upcomingEvents = getUpcomingEvents(isMobile ? 4 : 7);

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col h-full">
      <h2 className="text-lg font-bold text-rezilia-purple mb-3">Upcoming Events</h2>
      
      <ScrollArea className="flex-1 h-[calc(100%-40px)]">
        {upcomingEvents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Event</TableHead>
                <TableHead className="text-xs">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingEvents.map((event) => (
                <TableRow 
                  key={event.id}
                  className="cursor-pointer hover:bg-gray-50 text-xs"
                  onClick={() => setSelectedDate(event.date)}
                >
                  <TableCell className="font-medium py-2">
                    {isToday(event.date) ? (
                      <span className="text-rezilia-green font-bold">Today</span>
                    ) : (
                      format(event.date, 'MMM d')
                    )}
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="flex items-center">
                      <div 
                        className="w-2 h-2 rounded-full mr-2" 
                        style={{ backgroundColor: event.color }}
                      />
                      {event.title}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-2">{event.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No upcoming events</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default UpcomingEvents;
