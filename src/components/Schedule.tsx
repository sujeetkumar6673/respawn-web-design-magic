
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, isEqual } from 'date-fns';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { Link } from 'react-router-dom';
import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Helper function to format time to 12-hour format with AM/PM
const formatTimeWithAMPM = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const Schedule: React.FC = () => {
  const isMobile = useIsMobile();
  const { selectedDate, getEventsForDate, getUpcomingEvents } = useCalendarContext();
  
  // Get events for the selected date
  const scheduleItems = getEventsForDate(selectedDate);
  
  // Get upcoming events (limited to 3 for desktop, 2 for mobile)
  const upcomingItems = getUpcomingEvents(isMobile ? 2 : 3);

  // Determine time column width based on device
  const timeColWidth = isMobile ? "w-[60px]" : "w-24";
  const fontSize = isMobile ? "text-[10px]" : "text-sm";
  
  return (
    <div className={`${isMobile ? 'px-0' : 'mt-4 px-1 sm:px-0'}`}>
      <div className="mb-1 flex justify-between items-center">
        <h3 className="font-bold text-gray-800 text-xs">
          {isEqual(
            new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()),
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
          ) ? 'TODAY' : format(selectedDate, 'MMM d').toUpperCase()}
        </h3>
        {!isMobile && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {scheduleItems.length} task{scheduleItems.length !== 1 ? 's' : ''}
            </span>
            <Link to="/calendar">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-rezilia-purple text-rezilia-purple hover:bg-rezilia-purple hover:text-white hidden sm:flex"
              >
                <CalendarPlus className="h-4 w-4 mr-1" />
                <span>View Calendar</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className={`relative ${isMobile ? 'max-h-[220px]' : 'max-h-[300px]'} overflow-y-auto ${isMobile ? 'pr-0' : 'pr-1'}`}>
        {scheduleItems.length > 0 ? (
          scheduleItems.map((item, index) => (
            <div key={item.id} className={`relative mb-1 ${index > 0 ? 'mt-1' : ''}`}>
              <div className="flex">
                {/* Time column */}
                <div className={`${timeColWidth} flex-shrink-0 relative`}>
                  <div className={`${fontSize} text-gray-500 pt-1 pl-1 whitespace-nowrap`}>{formatTimeWithAMPM(item.time)}</div>
                </div>
                
                {/* Task card */}
                <div className="flex-1 min-w-0">
                  <div 
                    className={`pl-1.5 py-1 pr-1 rounded-r-md bg-opacity-10 overflow-hidden`}
                    style={{ 
                      borderLeft: `1.5px solid ${item.color}`,
                      backgroundColor: `${item.color}10` 
                    }}
                  >
                    <div className={`font-medium text-gray-800 ${fontSize} truncate`}>{item.title}</div>
                    {!isMobile && item.description && 
                      <div className="text-xs text-gray-600 mt-0.5 truncate">{item.description}</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-1">
            <p className={`text-gray-500 ${fontSize}`}>No events. Enjoy today!</p>
          </div>
        )}
      </div>

      {/* Show upcoming events for both mobile and desktop */}
      {upcomingItems.length > 0 && (
        <>
          <div className="mt-3 mb-1 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-xs">UPCOMING</h3>
          </div>
          <div className="relative">        
            {upcomingItems.map((item, index) => (
              <div key={item.id} className="mb-2 flex">
                {/* Time and date column */}
                <div className={`${timeColWidth} flex-shrink-0 relative`}>
                  <div className={`${fontSize} text-gray-500 pt-1 pl-1`}>
                    <div>{format(item.date, 'M/d')}</div>
                    <div className="whitespace-nowrap">{formatTimeWithAMPM(item.time)}</div>
                  </div>
                </div>
                
                {/* Event card */}
                <div className="flex-1 min-w-0">
                  <div 
                    className={`pl-1.5 py-1 pr-1 rounded-r-md bg-opacity-10 overflow-hidden`}
                    style={{ 
                      borderLeft: `1.5px solid ${item.color}`,
                      backgroundColor: `${item.color}10` 
                    }}
                  >
                    <div className={`font-medium text-gray-800 ${fontSize} truncate`}>{item.title}</div>
                    {item.description && 
                      <div className={`${isMobile ? 'text-[8px]' : 'text-xs'} text-gray-600 mt-0.5 truncate`}>
                        {item.description}
                      </div>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Schedule;
