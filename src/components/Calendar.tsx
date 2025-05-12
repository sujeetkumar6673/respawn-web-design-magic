
import React from 'react';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, addDays } from 'date-fns';
import { useCalendarContext } from '@/contexts/CalendarContext';

const Calendar: React.FC = () => {
  const isMobile = useIsMobile();
  const { selectedDate, setSelectedDate } = useCalendarContext();
  const today = new Date();

  // Create dummy event counts for the current month
  const eventCounts: Record<string, number> = {
    [format(today, 'yyyy-MM-dd')]: 4,
    [format(addDays(today, 1), 'yyyy-MM-dd')]: 2,
    [format(addDays(today, 3), 'yyyy-MM-dd')]: 1,
    [format(addDays(today, 7), 'yyyy-MM-dd')]: 3,
    [format(addDays(today, 14), 'yyyy-MM-dd')]: 2,
    [format(addDays(today, 18), 'yyyy-MM-dd')]: 5,
  };

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-end gap-2">
          <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>
            {format(selectedDate, 'MMMM yyyy')}
          </h2>
          <Badge className="bg-rezilia-orange text-white mb-1">
            {Object.values(eventCounts).reduce((sum, count) => sum + count, 0)}
          </Badge>
        </div>
      </div>
      
      <div className="calendar-container">
        <CalendarUI
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="pointer-events-auto"
          modifiers={{
            eventDay: (date) => Boolean(eventCounts[format(date, 'yyyy-MM-dd')])
          }}
          modifiersClassNames={{
            eventDay: "event-day" 
          }}
          components={{
            DayContent: ({ date, ...props }) => {
              const formattedDate = format(date, 'yyyy-MM-dd');
              const hasEvents = Boolean(eventCounts[formattedDate]);
              
              return (
                <div className="relative flex items-center justify-center w-full h-full">
                  <div {...props} />
                  {hasEvents && (
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-rezilia-purple rounded-full" />
                  )}
                </div>
              );
            }
          }}
        />
      </div>

      <style>
        {`
        .event-day {
          font-weight: bold;
          position: relative;
        }
        .rdp-day {
          color: #333;
        }
        .rdp-day_selected {
          background-color: var(--rezilia-purple);
          color: white;
        }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
          background-color: rgba(39, 23, 165, 0.1);
        }
        .rdp {
          --rdp-accent-color: var(--rezilia-purple);
          margin: 0;
        }
        .rdp-months {
          justify-content: center;
        }
        .rdp-caption {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          text-align: center;
        }
        `}
      </style>
    </div>
  );
};

export default Calendar;
