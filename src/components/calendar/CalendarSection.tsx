
import React from 'react';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { format, isToday } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface CalendarSectionProps {
  eventDates: Record<string, number>;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ eventDates }) => {
  const { selectedDate, setSelectedDate } = useCalendarContext();

  return (
    <div className="bg-rezilia-lightblue rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-rezilia-purple">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <Badge className="bg-rezilia-orange text-white">
          {Object.values(eventDates).reduce((sum, count) => sum + count, 0)} Events
        </Badge>
      </div>
      
      <CalendarUI
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && setSelectedDate(date)}
        className="border-none rounded-lg bg-white p-2 shadow-sm pointer-events-auto"
        modifiers={{
          eventDay: (date) => Boolean(eventDates[format(date, 'yyyy-MM-dd')])
        }}
        modifiersClassNames={{
          today: "bg-rezilia-green text-white",
          eventDay: "font-bold"
        }}
        components={{
          DayContent: ({ date }) => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            const hasEvents = Boolean(eventDates[formattedDate]);
            
            return (
              <div className="relative flex items-center justify-center w-full h-full">
                <div className={isToday(date) ? "text-white font-bold" : ""}>
                  {date.getDate()}
                </div>
                {hasEvents && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-rezilia-purple rounded-full" />
                )}
              </div>
            );
          }
        }}
      />
    </div>
  );
};

export default CalendarSection;
