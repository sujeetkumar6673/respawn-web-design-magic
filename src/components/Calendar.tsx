
import React from 'react';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { Link } from 'react-router-dom';
import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Calendar: React.FC = () => {
  const isMobile = useIsMobile();
  const { selectedDate, setSelectedDate, events } = useCalendarContext();

  // Create event counts for the calendar
  const eventCounts: Record<string, number> = {};
  events.forEach(event => {
    const dateStr = format(event.date, 'yyyy-MM-dd');
    eventCounts[dateStr] = (eventCounts[dateStr] || 0) + 1;
  });

  return (
    <div className="bg-white rounded-lg p-1 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-end gap-1">
          <h2 className={`${isMobile ? 'text-sm' : 'text-2xl'} font-bold`}>
            {format(selectedDate, isMobile ? 'MMM yyyy' : 'MMMM yyyy')}
          </h2>
          {!isMobile && (
            <Badge className="bg-rezilia-orange text-white mb-1 text-xs">
              {Object.values(eventCounts).reduce((sum, count) => sum + count, 0)}
            </Badge>
          )}
        </div>
        {!isMobile && (
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
        )}
      </div>
      
      <div className={`calendar-container ${isMobile ? 'scale-[0.7] origin-top-left -mr-12 -mb-8' : ''}`}>
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
            DayContent: ({ date }) => {
              const formattedDate = format(date, 'yyyy-MM-dd');
              const hasEvents = Boolean(eventCounts[formattedDate]);
              
              return (
                <div className="relative flex items-center justify-center w-full h-full">
                  <div>{date.getDate()}</div>
                  {hasEvents && (
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-rezilia-purple rounded-full" />
                  )}
                </div>
              );
            }
          }}
        />
      </div>

      <style>{`
        .event-day {
          font-weight: bold;
          position: relative;
        }
        .rdp-day {
          color: #333 !important;
          opacity: 1 !important;
        }
        .rdp-day_selected {
          background-color: var(--rezilia-purple) !important;
          color: white !important;
        }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
          background-color: rgba(39, 23, 165, 0.1) !important;
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
        .rdp-cell {
          opacity: 1 !important;
        }
        .rdp-button {
          opacity: 1 !important;
        }
        .rdp-day_today {
          background-color: #f0f0f0 !important;
        }
        .rdp-head_cell {
          color: #666 !important;
          font-weight: 600 !important;
        }
        .rdp-day:not(.rdp-day_outside) {
          font-weight: normal !important;
          color: #333 !important;
          display: block !important;
          visibility: visible !important;
        }
        .calendar-container {
          min-height: ${isMobile ? '150px' : '300px'};
        }
        .rdp-tbody {
          visibility: visible !important;
        }
        .rdp-button_reset {
          visibility: visible !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
        ${isMobile ? `
        .rdp-table {
          font-size: 0.65rem;
        }
        .rdp-button {
          width: 20px !important;
          height: 20px !important;
          padding: 0 !important;
        }
        .rdp-head_cell {
          font-size: 0.55rem;
          padding: 0 !important;
        }
        .rdp-caption_label {
          font-size: 0.7rem;
        }
        .rdp-nav {
          transform: scale(0.7);
        }
        ` : ''}
      `}</style>
    </div>
  );
};

export default Calendar;
