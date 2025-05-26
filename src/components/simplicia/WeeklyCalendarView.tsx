
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
  duration: number; // in hours
  day: number; // 0-6 (Sunday-Saturday)
  startHour: number; // 0-23
}

const WeeklyCalendarView: React.FC<WeeklyCalendarViewProps> = ({ activeFilter }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Sample events matching the mind map design
  const events: CalendarEvent[] = [
    { id: '1', title: 'Nurse Sarah', type: 'caregiver', time: '9:00 AM', duration: 4, day: 1, startHour: 9 },
    { id: '2', title: 'Family Visit', type: 'presence', time: '2:00 PM', duration: 3, day: 1, startHour: 14 },
    { id: '3', title: 'Buy Groceries', type: 'todo', time: '10:00 AM', duration: 2, day: 2, startHour: 10 },
    { id: '4', title: 'Morning Meds', type: 'med', time: '8:00 AM', duration: 1, day: 2, startHour: 8 },
    { id: '5', title: 'Dr. Johnson', type: 'caregiver', time: '11:00 AM', duration: 2, day: 3, startHour: 11 },
    { id: '6', title: 'John Present', type: 'presence', time: '6:00 PM', duration: 4, day: 3, startHour: 18 },
    { id: '7', title: 'Physical Therapy', type: 'caregiver', time: '3:00 PM', duration: 2, day: 4, startHour: 15 },
    { id: '8', title: 'Evening Meds', type: 'med', time: '7:00 PM', duration: 1, day: 4, startHour: 19 },
    { id: '9', title: 'Cleaning', type: 'todo', time: '9:00 AM', duration: 3, day: 5, startHour: 9 },
    { id: '10', title: 'Family Dinner', type: 'presence', time: '5:00 PM', duration: 3, day: 5, startHour: 17 },
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
      <CardHeader>
        <CardTitle className="text-lg">This Week</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-8 gap-1">
          {/* Header row */}
          <div className="text-xs font-medium text-gray-500 p-2">Time</div>
          {days.map((day, index) => (
            <div key={index} className="text-xs font-medium text-gray-500 p-2 text-center">
              {day}
            </div>
          ))}

          {/* Time slots */}
          {hours.slice(6, 22).map((hour) => (
            <React.Fragment key={hour}>
              <div className="text-xs text-gray-400 p-2 border-t">
                {hour === 0 ? '12 AM' : hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
              </div>
              {days.map((_, dayIndex) => {
                const dayEvents = filteredEvents.filter(
                  event => event.day === dayIndex && event.startHour <= hour && event.startHour + event.duration > hour
                );
                
                return (
                  <div key={dayIndex} className="border-t border-gray-100 min-h-[40px] p-1 relative">
                    {dayEvents.map((event) => {
                      if (event.startHour === hour) {
                        return (
                          <div
                            key={event.id}
                            className={`${getEventColor(event.type)} text-white text-xs p-1 rounded mb-1 truncate`}
                            style={{ height: `${event.duration * 40 - 4}px` }}
                          >
                            {event.title}
                          </div>
                        );
                      }
                      return null;
                    })}
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
