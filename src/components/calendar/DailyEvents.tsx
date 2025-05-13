
import React from 'react';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { isToday, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';

interface DailyEventsProps {
  onAddEvent: () => void;
}

const DailyEvents: React.FC<DailyEventsProps> = ({ onAddEvent }) => {
  const { selectedDate, getEventsForDate } = useCalendarContext();
  
  // Get events for selected date
  const eventsForSelectedDate = getEventsForDate(selectedDate);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-rezilia-purple mb-4">
        Events on {format(selectedDate, 'MMMM d, yyyy')}
        {isToday(selectedDate) && <span className="ml-2 text-sm text-rezilia-green">(Today)</span>}
      </h2>
      
      {eventsForSelectedDate.length > 0 ? (
        <div className="space-y-3">
          {eventsForSelectedDate.map((event) => (
            <div 
              key={event.id}
              className="p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
              style={{ borderLeftWidth: '4px', borderLeftColor: event.color }}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{event.title}</h3>
                <span className="text-lg">{event.time}</span>
              </div>
              {event.description && (
                <p className="text-gray-600 mt-1 line-clamp-2">{event.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-300 mb-2" />
          <p className="text-lg">No events. Enjoy today!</p>
          <Button 
            variant="outline" 
            className="mt-4 border-rezilia-purple text-rezilia-purple hover:bg-rezilia-purple hover:text-white"
            onClick={onAddEvent}
          >
            Add Event
          </Button>
        </div>
      )}
    </div>
  );
};

export default DailyEvents;
