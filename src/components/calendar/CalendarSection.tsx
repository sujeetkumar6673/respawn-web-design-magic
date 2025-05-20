
import React, { useState, useEffect } from 'react';
import { format, startOfWeek, startOfMonth, addDays, isSameDay, isToday, isSameMonth, getDate, getDay, getDaysInMonth } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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
    setCurrentDate(selectedDate);
    generateMonthDays(selectedDate);
  }, [selectedDate]);

  // Generate days for month view
  const generateMonthDays = (date: Date) => {
    const start = startOfMonth(date);
    const startDay = getDay(start);
    const daysInMonth = getDaysInMonth(date);
    const days: Date[] = [];

    // Add days from previous month to fill first week
    const prevMonthDays = startDay;
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

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setCurrentDate(date);
      setSelectedDate(date);
      onDateClick(date);
    }
  };

  const handleViewModeChange = (value: string) => {
    if (value === 'daily' || value === 'weekly' || value === 'monthly') {
      setViewMode(value);
      generateMonthDays(currentDate);
    }
  };

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
    } else {
      // For monthly, we'll still use the week view row to show days
      // as the full month is displayed in the Calendar component
      for (let i = 0; i < 7; i++) {
        timeSlots.push(addDays(start, i));
      }
    }
    
    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-rezilia-purple">Calendar</h2>
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
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {viewMode === 'monthly' ? (
        <div className="calendar-grid">
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
              const hasEvents = eventDates && eventDates[format(date, 'yyyy-MM-dd')];
              const eventCount = eventDates ? eventDates[format(date, 'yyyy-MM-dd')] || 0 : 0;
              
              return (
                <div
                  key={index}
                  onClick={() => onDateClick(date)}
                  className={`calendar-day ${isSelected ? 'selected' : ''} ${isOtherMonth ? 'other-month' : ''}`}
                >
                  <div className={`day-number ${isCurrent ? 'today' : ''}`}>
                    {getDate(date)}
                  </div>
                  
                  {/* Show event indicators */}
                  {eventCount > 0 && (
                    <div className="flex flex-col gap-1 mt-1">
                      {Array.from({ length: Math.min(eventCount, 3) }).map((_, i) => (
                        <div key={i} className="event-indicator">
                          <span className="event-dot"></span>
                          {i === 0 && eventCount > 3 ? `+${eventCount - 2} more` : ''}
                        </div>
                      ))}
                    </div>
                  )}
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
                onClick={() => onDateClick(timeSlotDate)}
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
