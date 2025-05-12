
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, isEqual } from 'date-fns';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { Link } from 'react-router-dom';
import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Schedule: React.FC = () => {
  const isMobile = useIsMobile();
  const { selectedDate, getEventsForDate, getUpcomingEvents } = useCalendarContext();
  
  // Get events for the selected date
  const scheduleItems = getEventsForDate(selectedDate);
  
  // Get upcoming events (limited to 3)
  const upcomingItems = getUpcomingEvents(3);

  // Determine time column width based on device
  const timeColWidth = isMobile ? "w-12" : "w-24";
  const fontSize = isMobile ? "text-xs" : "text-sm";
  
  return (
    <div className={`mt-2 sm:mt-4 ${isMobile ? 'px-0' : 'px-1 sm:px-0'}`}>
      {!isMobile && (
        <div className="mb-2 sm:mb-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-sm sm:text-base">
            {isEqual(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()),
              new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
            ) ? 'TODAY' : format(selectedDate, 'MMMM d, yyyy').toUpperCase()}
          </h3>
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
        </div>
      )}

      {isMobile && (
        <div className="event-list-mobile">
          {scheduleItems.length > 0 ? (
            scheduleItems.map((item) => (
              <div key={item.id} className="event-item-mobile">
                <div className="event-time-mobile">{item.time}</div>
                <div className="event-title-mobile">{item.title}</div>
                {item.description && (
                  <div className="text-xs text-white/80 mt-1">{item.description}</div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-white/80">
              <p>No events scheduled for today</p>
            </div>
          )}
        </div>
      )}

      {!isMobile && (
        <div className="relative">
          {scheduleItems.length > 0 ? (
            scheduleItems.map((item) => (
              <div key={item.id} className="relative mb-2 sm:mb-4">
                <div className="flex">
                  {/* Time column */}
                  <div className={`${timeColWidth} relative`}>
                    <div className={`${fontSize} text-gray-500 pt-2`}>{item.time}</div>
                  </div>
                  
                  {/* Task card */}
                  <div className="flex-1">
                    <div 
                      className={`pl-3 sm:pl-4 py-2 sm:py-3 pr-2 sm:pr-3 rounded-r-md bg-opacity-20`}
                      style={{ 
                        borderLeft: `4px solid ${item.color}`,
                        backgroundColor: `${item.color}20` 
                      }}
                    >
                      <div className={`font-medium text-gray-800 ${fontSize}`}>{item.title}</div>
                      {item.description && <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>{item.description}</div>}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No tasks scheduled for this day</p>
            </div>
          )}
        </div>
      )}

      {upcomingItems.length > 0 && !isMobile && (
        <>
          <div className="mt-4 sm:mt-8 mb-2 sm:mb-4 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">UPCOMING</h3>
            <Link to="/calendar" className="sm:hidden">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-rezilia-purple text-rezilia-purple hover:bg-rezilia-purple hover:text-white"
              >
                <CalendarPlus className="h-3 w-3 mr-1" />
                <span>View All</span>
              </Button>
            </Link>
          </div>
          <div className="relative">        
            {upcomingItems.map((item) => (
              <div key={item.id} className="flex mb-2 sm:mb-4">
                <div className={`${timeColWidth} relative`}>
                  <div className={`${fontSize} text-gray-500 pt-2`}>
                    {format(item.date, 'MMM d')}
                  </div>
                </div>
                <div className="flex-1">
                  <div 
                    className={`pl-3 sm:pl-4 py-2 sm:py-3 pr-2 sm:pr-3 rounded-r-md bg-opacity-20`}
                    style={{ 
                      borderLeft: `4px solid ${item.color}`,
                      backgroundColor: `${item.color}20` 
                    }}
                  >
                    <div className={`font-medium text-gray-800 ${fontSize}`}>{item.title}</div>
                    {item.description && <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>{item.description}</div>}
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
