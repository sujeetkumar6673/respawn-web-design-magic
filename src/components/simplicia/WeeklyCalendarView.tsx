
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WeeklyCalendarViewProps {
  activeFilter: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  type: 'caregiver' | 'presence' | 'todo' | 'med';
  time: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
  day: number; // 0-6 (Sunday-Saturday)
}

const WeeklyCalendarView: React.FC<WeeklyCalendarViewProps> = ({ activeFilter }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timePeriods = [
    { key: 'morning', label: 'Morning', time: '6AM-12PM' },
    { key: 'afternoon', label: 'Afternoon', time: '12PM-6PM' },
    { key: 'evening', label: 'Evening', time: '6PM-9PM' },
    { key: 'night', label: 'After Dinner', time: '9PM+' }
  ];

  // Sample events matching the mind map design with time periods
  const events: CalendarEvent[] = [
    { id: '1', title: 'Nurse Sarah', type: 'caregiver', time: '9:00 AM', period: 'morning', day: 1 },
    { id: '2', title: 'Family Visit', type: 'presence', time: '2:00 PM', period: 'afternoon', day: 1 },
    { id: '3', title: 'Buy Groceries', type: 'todo', time: '10:00 AM', period: 'morning', day: 2 },
    { id: '4', title: 'Morning Meds', type: 'med', time: '8:00 AM', period: 'morning', day: 2 },
    { id: '5', title: 'Dr. Johnson', type: 'caregiver', time: '11:00 AM', period: 'morning', day: 3 },
    { id: '6', title: 'John Present', type: 'presence', time: '6:00 PM', period: 'evening', day: 3 },
    { id: '7', title: 'Physical Therapy', type: 'caregiver', time: '3:00 PM', period: 'afternoon', day: 4 },
    { id: '8', title: 'Evening Meds', type: 'med', time: '7:00 PM', period: 'evening', day: 4 },
    { id: '9', title: 'Cleaning', type: 'todo', time: '9:00 AM', period: 'morning', day: 5 },
    { id: '10', title: 'Family Dinner', type: 'presence', time: '8:00 PM', period: 'evening', day: 5 },
    { id: '11', title: 'Night Meds', type: 'med', time: '10:00 PM', period: 'night', day: 1 },
    { id: '12', title: 'Bedtime Reading', type: 'todo', time: '9:30 PM', period: 'night', day: 2 },
    { id: '13', title: 'Late Visit', type: 'presence', time: '10:30 PM', period: 'night', day: 6 },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'caregiver': return 'bg-blue-500';
      case 'presence': return 'bg-green-500';
      case 'todo': return 'bg-orange-500';
      case 'med': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => {
        if (activeFilter === 'caregivers') return event.type === 'caregiver';
        if (activeFilter === 'presences') return event.type === 'presence';
        if (activeFilter === 'todos') return event.type === 'todo';
        if (activeFilter === 'meds') return event.type === 'med';
        return true;
      });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">This Week</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-8 gap-1 h-[400px]">
          {/* Header row */}
          <div className="text-xs font-medium text-gray-500 p-2">Time</div>
          {days.map((day, index) => (
            <div key={index} className="text-xs font-medium text-gray-500 p-2 text-center">
              {day}
            </div>
          ))}

          {/* Time period rows */}
          {timePeriods.map((period) => (
            <React.Fragment key={period.key}>
              <div className="text-xs text-gray-600 p-2 border-t border-gray-100 flex flex-col justify-start">
                <div className="font-medium">{period.label}</div>
                <div className="text-[10px] text-gray-400 mt-1">{period.time}</div>
              </div>
              {days.map((_, dayIndex) => {
                const periodEvents = filteredEvents.filter(
                  event => event.day === dayIndex && event.period === period.key
                );
                
                return (
                  <div key={dayIndex} className="border-t border-gray-100 p-1 min-h-[90px] overflow-hidden">
                    <div className="space-y-1">
                      {periodEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`${getEventColor(event.type)} text-white text-[10px] p-1.5 rounded truncate leading-tight`}
                          title={`${event.title} - ${event.time}`}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="opacity-90 truncate">{event.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCalendarView;
