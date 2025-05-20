
import React, { useState } from 'react';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { 
  format, 
  isToday, 
  isSameMonth, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  addDays, 
  subDays, 
  isSameDay, 
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks
} from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CalendarSectionProps {
  eventDates: Record<string, number>;
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CalendarSection: React.FC<CalendarSectionProps> = ({ eventDates }) => {
  const { selectedDate, setSelectedDate } = useCalendarContext();
  const [viewMode, setViewMode] = useState<'daily' | 'week' | 'month'>('month');
  
  // Get days based on the view mode
  const getDaysForView = () => {
    if (viewMode === 'month') {
      // Month view (original implementation)
      const firstDayOfMonth = startOfMonth(selectedDate);
      const lastDayOfMonth = endOfMonth(selectedDate);
      const startDate = subDays(firstDayOfMonth, (firstDayOfMonth.getDay() + 6) % 7); // Monday as first day
      const endDate = addDays(lastDayOfMonth, 7 - lastDayOfMonth.getDay());
      
      return eachDayOfInterval({
        start: startDate,
        end: endDate
      });
    } else if (viewMode === 'week') {
      // Week view (Monday to Sunday)
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start on Monday
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 }); // End on Sunday
      
      return eachDayOfInterval({
        start: weekStart,
        end: weekEnd
      });
    } else {
      // Daily view (just the current day)
      return [selectedDate];
    }
  };
  
  const calendarDays = getDaysForView();
  
  // Navigation functions based on view mode
  const handlePrev = () => {
    if (viewMode === 'month') {
      const newDate = new Date(selectedDate);
      newDate.setMonth(selectedDate.getMonth() - 1);
      setSelectedDate(newDate);
    } else if (viewMode === 'week') {
      setSelectedDate(subWeeks(selectedDate, 1));
    } else {
      // Daily view
      setSelectedDate(subDays(selectedDate, 1));
    }
  };
  
  const handleNext = () => {
    if (viewMode === 'month') {
      const newDate = new Date(selectedDate);
      newDate.setMonth(selectedDate.getMonth() + 1);
      setSelectedDate(newDate);
    } else if (viewMode === 'week') {
      setSelectedDate(addWeeks(selectedDate, 1));
    } else {
      // Daily view
      setSelectedDate(addDays(selectedDate, 1));
    }
  };
  
  // Format the header text based on view mode
  const getHeaderText = () => {
    if (viewMode === 'month') {
      return format(selectedDate, 'MMMM yyyy');
    } else if (viewMode === 'week') {
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
    } else {
      // Daily view
      return format(selectedDate, 'MMMM d, yyyy');
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      {/* Header with view options, month and event count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-rezilia-purple">
            {getHeaderText()}
          </h2>
          <Badge className="ml-2 bg-rezilia-orange text-white">
            {Object.values(eventDates).reduce((sum, count) => sum + count, 0)} Events
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <ToggleGroup 
            type="single" 
            value={viewMode} 
            onValueChange={(value) => {
              if (value) setViewMode(value as 'daily' | 'week' | 'month');
            }}
            className="border rounded-md calendar-view-toggle"
          >
            <ToggleGroupItem value="daily" aria-label="Daily view" className="text-xs sm:text-sm px-2 sm:px-3">
              Daily
            </ToggleGroupItem>
            <ToggleGroupItem value="week" aria-label="Week view" className="text-xs sm:text-sm px-2 sm:px-3">
              Weekly
            </ToggleGroupItem>
            <ToggleGroupItem value="month" aria-label="Month view" className="text-xs sm:text-sm px-2 sm:px-3">
              Monthly
            </ToggleGroupItem>
          </ToggleGroup>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full border-rezilia-purple text-rezilia-purple" 
              onClick={handlePrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full border-rezilia-purple text-rezilia-purple" 
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="rounded-lg bg-white overflow-hidden">
        {viewMode !== 'daily' && (
          /* Days of week headers - only show for week and month views */
          <div className={`grid ${viewMode === 'month' ? 'grid-cols-7' : 'grid-cols-7'} gap-0 border-b`}>
            {DAYS_OF_WEEK.map((day) => (
              <div 
                key={day} 
                className="py-2 text-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>
        )}
        
        {/* Calendar cells */}
        <div className={`grid ${viewMode === 'month' ? 'grid-cols-7' : viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-1'} gap-0`}>
          {calendarDays.map((date, index) => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            const isCurrentMonth = isSameMonth(date, selectedDate);
            const isSelected = isSameDay(date, selectedDate);
            const hasEvents = Boolean(eventDates[formattedDate]);
            const events = eventDates[formattedDate] || 0;
            
            // Only show different background for other months in month view
            const isDimmed = viewMode === 'month' && !isCurrentMonth;
            
            return (
              <div 
                key={index} 
                className={`
                  ${viewMode === 'daily' ? 'max-h-[300px]' : 'min-h-[60px]'} p-1 border-b border-r 
                  ${isDimmed ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                  ${isSelected ? 'bg-rezilia-purple/5' : ''}
                  ${viewMode === 'month' && index % 7 === 6 ? 'border-r-0' : ''}
                  ${viewMode === 'week' && index % 7 === 6 ? 'border-r-0' : ''}
                  ${viewMode === 'daily' ? 'border-r-0' : ''}
                  ${viewMode === 'month' && index >= calendarDays.length - 7 ? 'border-b-0' : ''}
                  ${viewMode === 'week' && index >= calendarDays.length - 7 ? 'border-b-0' : ''}
                  ${viewMode === 'daily' ? 'border-b-0' : ''}
                `}
                onClick={() => viewMode === 'daily' ? null : setSelectedDate(date)}
              >
                <div className="flex flex-col h-full">
                  {/* Date number */}
                  <div className="flex justify-between items-center">
                    <div 
                      className={`
                        w-6 h-6 flex items-center justify-center text-sm
                        ${isToday(date) ? 'bg-rezilia-green text-white rounded-full font-medium' : ''}
                      `}
                    >
                      {date.getDate()}
                    </div>
                    {hasEvents && !isToday(date) && viewMode !== 'daily' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-rezilia-purple"></div>
                    )}
                  </div>
                  
                  {/* Event indicators */}
                  <div className="mt-1 space-y-1">
                    {hasEvents && (viewMode === 'daily' || isCurrentMonth) && (
                      <div className="flex flex-col space-y-1">
                        {viewMode === 'daily' ? (
                          /* For daily view, show all events with more details */
                          <div className="mt-4">
                            {events > 0 && (
                              <div className="text-sm font-medium text-gray-700 mb-2">
                                All Events ({events})
                              </div>
                            )}
                          </div>
                        ) : (
                          /* For week and month views, show compact event indicators */
                          [...Array(Math.min(events, 2))].map((_, i) => (
                            <div 
                              key={i} 
                              className="text-[10px] px-1 py-0.5 rounded-sm bg-rezilia-purple/10 text-rezilia-purple truncate"
                            >
                              {i === 0 && events > 2 
                                ? `${events} events` 
                                : i === 0 
                                  ? "Event" 
                                  : "Another event"}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
