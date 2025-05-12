
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Calendar: React.FC = () => {
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const isMobile = useIsMobile();
  
  const dates = [
    [{ day: '1', isCurrentMonth: true }, { day: '2', isCurrentMonth: true }, { day: '3', isCurrentMonth: true }, 
     { day: '4', isCurrentMonth: true }, { day: '5', isCurrentMonth: true }, { day: '6', isCurrentMonth: true }, 
     { day: '7', isCurrentMonth: true }],
    [{ day: '8', isCurrentMonth: true }, { day: '9', isCurrentMonth: true }, { day: '10', isCurrentMonth: true }, 
     { day: '11', isCurrentMonth: true }, { day: '12', isCurrentMonth: true }, { day: '13', isCurrentMonth: true }, 
     { day: '14', isCurrentMonth: true }],
    [{ day: '15', isCurrentMonth: true }, { day: '16', isCurrentMonth: true }, { day: '17', isCurrentMonth: true }, 
     { day: '18', isCurrentMonth: true, isActive: true }, { day: '19', isCurrentMonth: true }, { day: '20', isCurrentMonth: true }, 
     { day: '21', isCurrentMonth: true }],
    [{ day: '22', isCurrentMonth: true }, { day: '23', isCurrentMonth: true }, { day: '24', isCurrentMonth: true }, 
     { day: '25', isCurrentMonth: true }, { day: '26', isCurrentMonth: true }, { day: '27', isCurrentMonth: true }, 
     { day: '28', isCurrentMonth: true }],
    [{ day: '29', isCurrentMonth: true }, { day: '30', isCurrentMonth: true }, { day: '31', isCurrentMonth: true }, 
     { day: '1', isCurrentMonth: false }, { day: '2', isCurrentMonth: false }, { day: '3', isCurrentMonth: false }, 
     { day: '4', isCurrentMonth: false }]
  ];

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-end gap-2">
          <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>May 2025</h2>
          <Badge className="bg-rezilia-orange text-white mb-1">1014</Badge>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
            <ChevronLeftIcon />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-0 sm:gap-1">
        {days.map((day, i) => (
          <div key={i} className="text-center font-medium text-xs sm:text-sm py-1">
            {day}
          </div>
        ))}
        
        {dates.flatMap((week, weekIdx) => 
          week.map((date, dateIdx) => (
            <div 
              key={`${weekIdx}-${dateIdx}`} 
              className={`calendar-day text-center py-1 text-sm ${date.isActive ? 'bg-rezilia-purple text-white rounded-full' : ''} 
                ${!date.isCurrentMonth ? 'text-gray-300' : ''}`}
            >
              {date.day}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;
