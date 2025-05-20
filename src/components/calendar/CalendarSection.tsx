
import React, { useState, useEffect } from 'react';
import { format, startOfWeek, startOfMonth, addDays, isSameDay, isToday, isSameMonth, getDate, getDay, getDaysInMonth, addMonths, subMonths } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendarContext } from '@/contexts/CalendarContext';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CalendarSectionProps {
  onDateClick?: (date: Date) => void;
  eventDates?: Record<string, number>;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ 
  onDateClick = (date) => {}, 
  eventDates = {} 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const { selectedDate, setSelectedDate } = useCalendarContext();
  const [monthDays, setMonthDays] = useState<Date[]>([]);

  useEffect(() => {
    generateMonthDays(currentDate);
  }, [currentDate]);

  // Generate days for month view
  const generateMonthDays = (date: Date) => {
    const start = startOfMonth(date);
    const startDay = getDay(start);
    const daysInMonth = getDaysInMonth(date);
    const days: Date[] = [];

    // Add days from previous month to fill first week
    // Adjust for Sunday as the first day of week (0)
    const prevMonthDays = startDay === 0 ? 6 : startDay - 1;
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push(addDays(start, -i - 1));
    }

    // Add days from current month
    for (let i = 0; i < daysInMonth; i++) {
      days.push(addDays(start, i));
    }

    // Add days from next month to fill remaining cells (6 weeks × 7 days = 42 cells)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(addDays(addDays(start, daysInMonth), i - 1));
    }

    setMonthDays(days);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateClick(date);
  };

  const handleViewModeChange = (value: string) => {
    if (value === 'daily' || value === 'weekly' || value === 'monthly') {
      setViewMode(value);
      generateMonthDays(currentDate);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? subMonths(currentDate, 1)
      : addMonths(currentDate, 1);
    setCurrentDate(newDate);
  };

  // For daily/weekly view
  const generateTimeSlots = (): Date[] => {
    const start = startOfWeek(currentDate);
    const timeSlots: Date[] = [];
    
    if (viewMode === 'daily') {
      // Just show one day (the current selected date)
      timeSlots.push(new Date(currentDate));
    } else if (viewMode === 'weekly') {
      // Show 7 days for the week
      for (let i = 0; i < 7; i++) {
        timeSlots.push(addDays(start, i));
      }
    }
    
    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  const getEventColor = (index: number) => {
    const colors = ['#FF9F46', '#2717A5', '#62E884', '#67d6ff', '#FF719A'];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h2 className="text-xl font-bold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <ToggleGroup 
            type="single" 
            value={viewMode}
            onValueChange={handleViewModeChange}
            className="border rounded-md calendar-view-toggle"
          >
            <ToggleGroupItem value="daily" aria-label="Daily view">Day</ToggleGroupItem>
            <ToggleGroupItem value="weekly" aria-label="Weekly view">Week</ToggleGroupItem>
            <ToggleGroupItem value="monthly" aria-label="Monthly view">Month</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      {viewMode === 'monthly' ? (
        <div className="calendar-grid mb-4">
          <div className="grid grid-cols-7 gap-[1px]">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="p-2 text-center font-medium bg-gray-50 text-gray-500">
                {day}
              </div>
            ))}
            
            {monthDays.map((date, index) => {
              const isSelected = isSameDay(date, selectedDate);
              const isCurrent = isToday(date);
              const isOtherMonth = !isSameMonth(date, currentDate);
              const eventCount = eventDates ? eventDates[format(date, 'yyyy-MM-dd')] || 0 : 0;
              
              return (
                <div
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  className={`calendar-day ${isSelected ? 'selected' : ''} ${isOtherMonth ? 'other-month' : ''}`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center">
                      <div className={`day-number ${isCurrent ? 'today' : ''}`}>
                        {getDate(date)}
                      </div>
                      {index % 7 === 1 && getDate(date) === 6 && (
                        <div className="text-xs text-red-500">5-day</div>
                      )}
                    </div>
                    
                    {/* Show event indicators */}
                    <div className="flex flex-col gap-1 mt-1">
                      {/* Example events based on the reference image */}
                      {getDate(date) === 1 && (
                        <div className="event-indicator">
                          <span className="event-dot bg-green-500"></span>
                          <span className="text-xs">Create Wireframe</span>
                        </div>
                      )}
                      {getDate(date) === 6 && (
                        <>
                          <div className="event-indicator">
                            <span className="event-dot bg-red-400"></span>
                            <span className="text-xs">Send slide deck</span>
                          </div>
                          <div className="event-indicator">
                            <span className="event-dot bg-blue-400"></span>
                            <span className="text-xs">Call John</span>
                          </div>
                          <div className="event-indicator bg-purple-400 text-white px-1 rounded">
                            <span className="text-xs">Marketing Sync</span>
                          </div>
                          <div className="event-indicator">
                            <span className="event-dot bg-green-400"></span>
                            <span className="text-xs">Gogo Penguin</span>
                          </div>
                        </>
                      )}
                      {getDate(date) === 8 && (
                        <div className="event-indicator">
                          <span className="event-dot bg-orange-400"></span>
                          <span className="text-xs">Andrea Birthday</span>
                        </div>
                      )}
                      {getDate(date) === 20 && (
                        <div className="event-indicator">
                          <span className="event-dot"></span>
                          <span className="text-xs">Standup</span>
                        </div>
                      )}
                      {/* Dynamic events from context */}
                      {eventCount > 0 && eventCount <= 3 && getDate(date) !== 6 && getDate(date) !== 1 && getDate(date) !== 8 && getDate(date) !== 20 && (
                        Array.from({ length: eventCount }).map((_, i) => (
                          <div key={i} className="event-indicator">
                            <span className="event-dot" style={{ backgroundColor: getEventColor(i) }}></span>
                            <span className="text-xs">Event {i + 1}</span>
                          </div>
                        ))
                      )}
                      {eventCount > 3 && getDate(date) !== 6 && getDate(date) !== 1 && getDate(date) !== 8 && getDate(date) !== 20 && (
                        <>
                          <div className="event-indicator">
                            <span className="event-dot"></span>
                            <span className="text-xs">+{eventCount - 2} more</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex">
          {timeSlots.map((timeSlotDate, index) => {
            const isSelected = isSameDay(timeSlotDate, selectedDate);
            const isCurrentDay = isToday(timeSlotDate);
            const isDimmed = !isSameMonth(timeSlotDate, currentDate);
            const hasEvents = eventDates && eventDates[format(timeSlotDate, 'yyyy-MM-dd')];
            
            return (
              <div 
                key={index} 
                className={`
                  ${viewMode === 'daily' ? 'max-h-[250px] w-full' : 'flex-1'} p-1 border-b border-r 
                  ${isDimmed ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                  ${isSelected ? 'bg-rezilia-purple/5' : ''}
                  ${index % 7 === 6 ? 'border-r-0' : ''}
                  ${isCurrentDay ? 'bg-rezilia-green/10' : ''}
                  relative cursor-pointer hover:bg-gray-50
                `}
                onClick={() => handleDateSelect(timeSlotDate)}
              >
                <time
                  dateTime={format(timeSlotDate, 'yyyy-MM-dd')}
                  className="block antialiased tracking-wide uppercase text-xs"
                >
                  {format(timeSlotDate, 'EEE')}
                </time>
                <div className="flex items-center">
                  <span className="flex items-center justify-center leading-none p-1 font-semibold text-base">
                    {format(timeSlotDate, 'd')}
                  </span>
                  {hasEvents && (
                    <span className="ml-1 w-1.5 h-1.5 bg-rezilia-purple rounded-full" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CalendarSection;
