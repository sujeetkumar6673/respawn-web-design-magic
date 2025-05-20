import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay, isToday, isSameMonth } from 'date-fns';
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { useCalendarContext } from '@/contexts/CalendarContext';

interface CalendarSectionProps {
  onDateClick: (date: Date) => void;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'daily'>('month');
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

  const generateTimeSlots = (): Date[] => {
    const start = startOfWeek(currentDate);
    const timeSlots: Date[] = [];
    for (let i = 0; i < 7; i++) {
      timeSlots.push(addDays(start, i));
    }
    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-rezilia-purple">Calendar</h2>
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
      
      <div className="flex">
        {timeSlots.map((timeSlotDate, index) => {
          const isSelected = isSameDay(timeSlotDate, selectedDate);
          const isToday = isSameDay(timeSlotDate, new Date());
          const isDimmed = !isSameMonth(timeSlotDate, currentDate);

          return (
            
            <div 
              key={index} 
              className={`
                ${viewMode === 'daily' ? 'max-h-[250px]' : 'min-h-[50px]'} p-1 border-b border-r 
                ${isDimmed ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                ${isSelected ? 'bg-rezilia-purple/5' : ''}
                ${viewMode === 'month' && index % 7 === 6 ? 'border-r-0' : ''}
                ${isToday ? 'bg-rezilia-green/10' : ''}
                relative
              `}
              onClick={() => onDateClick(timeSlotDate)}
            >
              <time
                dateTime={format(timeSlotDate, 'yyyy-MM-dd')}
                className="block antialiased tracking-wide uppercase text-xs"
              >
                {format(timeSlotDate, 'EEE')}
              </time>
              <span className="flex items-center justify-center rounded-full leading-none p-1 font-semibold text-base">
                {format(timeSlotDate, 'd')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarSection;
