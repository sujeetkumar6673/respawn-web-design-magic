
import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay, isToday, isSameMonth } from 'date-fns';
import { Calendar as CalendarIcon } from "lucide-react";
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

  useEffect(() => {
    setCurrentDate(selectedDate);
  }, [selectedDate]);

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
            className="border rounded-md"
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
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {viewMode === 'monthly' ? (
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
          />
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
                  ${viewMode === 'monthly' && index % 7 === 6 ? 'border-r-0' : ''}
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
