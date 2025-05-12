
import React from 'react';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { isToday, format } from 'date-fns';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';

const UpcomingEvents: React.FC = () => {
  const { setSelectedDate, getUpcomingEvents } = useCalendarContext();
  
  // Get upcoming events (limited to 7)
  const upcomingEvents = getUpcomingEvents(7);

  return (
    <div className="col-span-1 lg:col-span-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-rezilia-purple mb-4">Upcoming Events</h2>
      
      {upcomingEvents.length > 0 ? (
        <div className="overflow-y-auto max-h-[400px]">
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
                  <TableCell>{event.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No upcoming events</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
