
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Clock, Phone } from 'lucide-react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

interface WeeklyCalendarViewProps {
  activeFilter: string;
  viewType: 'daily' | 'weekly' | 'monthly';
}

interface CalendarEvent {
  id: string;
  title: string;
  type: 'caregiver' | 'presence' | 'todo' | 'med';
  time: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
  day: number; // 0-6 (Sunday-Saturday)
  date?: Date;
}

interface Caregiver {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'busy' | 'offline';
  nextVisit?: string;
  phone: string;
  initials: string;
  avatar: string;
}

const WeeklyCalendarView: React.FC<WeeklyCalendarViewProps> = ({ activeFilter, viewType }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timePeriods = [
    { key: 'morning', label: 'Morning', time: '6AM-12PM' },
    { key: 'afternoon', label: 'Afternoon', time: '12PM-6PM' },
    { key: 'evening', label: 'Evening', time: '6PM-9PM' },
    { key: 'night', label: 'After Dinner', time: '9PM+' }
  ];

  const caregivers: Caregiver[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Registered Nurse',
      status: 'available',
      nextVisit: 'Today 9:00 AM',
      phone: '+1 (555) 123-4567',
      initials: 'SJ',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      role: 'Primary Care',
      status: 'busy',
      nextVisit: 'Wed 11:00 AM',
      phone: '+1 (555) 234-5678',
      initials: 'DM',
      avatar: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      role: 'Physical Therapist',
      status: 'available',
      nextVisit: 'Thu 3:00 PM',
      phone: '+1 (555) 345-6789',
      initials: 'ER',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'James Wilson',
      role: 'Home Health Aide',
      status: 'available',
      nextVisit: 'Fri 10:00 AM',
      phone: '+1 (555) 456-7890',
      initials: 'JW',
      avatar: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop&crop=face'
    }
  ];

  // Enhanced events with more medications at the same times
  const events: CalendarEvent[] = [
    // Monday
    { id: '1', title: 'Nurse Sarah', type: 'caregiver', time: '9:00 AM', period: 'morning', day: 1 },
    { id: '2', title: 'Buy Groceries', type: 'todo', time: '10:00 AM', period: 'morning', day: 1 },
    { id: '3', title: 'Morning Meds', type: 'med', time: '8:00 AM', period: 'morning', day: 1 },
    { id: '4', title: 'Family Visit', type: 'presence', time: '2:00 PM', period: 'afternoon', day: 1 },
    { id: '5', title: 'Evening Meds', type: 'med', time: '7:00 PM', period: 'evening', day: 1 },
    { id: '6', title: 'Night Meds', type: 'med', time: '10:00 PM', period: 'night', day: 1 },
    
    // Tuesday
    { id: '7', title: 'Dr. Johnson', type: 'caregiver', time: '11:00 AM', period: 'morning', day: 2 },
    { id: '8', title: 'Morning Meds', type: 'med', time: '8:00 AM', period: 'morning', day: 2 },
    { id: '9', title: 'Bedtime Reading', type: 'todo', time: '9:30 PM', period: 'night', day: 2 },
    { id: '10', title: 'Evening Meds', type: 'med', time: '7:00 PM', period: 'evening', day: 2 },
    
    // Wednesday
    { id: '11', title: 'John Present', type: 'presence', time: '6:00 PM', period: 'evening', day: 3 },
    { id: '12', title: 'Morning Meds', type: 'med', time: '8:00 AM', period: 'morning', day: 3 },
    { id: '13', title: 'Lunch Meds', type: 'med', time: '12:00 PM', period: 'afternoon', day: 3 },
    { id: '14', title: 'Evening Meds', type: 'med', time: '7:00 PM', period: 'evening', day: 3 },
    
    // Thursday
    { id: '15', title: 'Physical Therapy', type: 'caregiver', time: '3:00 PM', period: 'afternoon', day: 4 },
    { id: '16', title: 'Morning Meds', type: 'med', time: '8:00 AM', period: 'morning', day: 4 },
    { id: '17', title: 'Pain Meds', type: 'med', time: '2:00 PM', period: 'afternoon', day: 4 },
    { id: '18', title: 'Evening Meds', type: 'med', time: '7:00 PM', period: 'evening', day: 4 },
    
    // Friday
    { id: '19', title: 'Cleaning', type: 'todo', time: '9:00 AM', period: 'morning', day: 5 },
    { id: '20', title: 'Family Dinner', type: 'presence', time: '8:00 PM', period: 'evening', day: 5 },
    { id: '21', title: 'Morning Meds', type: 'med', time: '8:00 AM', period: 'morning', day: 5 },
    { id: '22', title: 'Vitamin D', type: 'med', time: '8:00 AM', period: 'morning', day: 5 },
    { id: '23', title: 'Blood Pressure', type: 'med', time: '8:00 AM', period: 'morning', day: 5 },
    { id: '24', title: 'Evening Meds', type: 'med', time: '7:00 PM', period: 'evening', day: 5 },
    
    // Saturday
    { id: '25', title: 'Late Visit', type: 'presence', time: '10:30 PM', period: 'night', day: 6 },
    { id: '26', title: 'Morning Meds', type: 'med', time: '8:00 AM', period: 'morning', day: 6 },
    { id: '27', title: 'Calcium', type: 'med', time: '8:00 AM', period: 'morning', day: 6 },
    { id: '28', title: 'Iron Pills', type: 'med', time: '8:00 AM', period: 'morning', day: 6 },
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

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
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

  const renderMonthlyView = () => {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Group days into weeks
    const weeks = [];
    let currentWeek = [];
    
    // Add empty cells for days before month start
    const startDay = monthStart.getDay();
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }
    
    monthDays.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    // Fill last week if needed
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }
    
    return (
      <div className="grid grid-cols-7 gap-1 h-full">
        {/* Header row */}
        {days.map((day, index) => (
          <div key={index} className="text-xs font-medium text-gray-500 p-2 text-center">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {weeks.map((week, weekIndex) => (
          week.map((day, dayIndex) => (
            <div key={`${weekIndex}-${dayIndex}`} className="border border-gray-100 p-1 min-h-[80px]">
              {day && (
                <>
                  <div className="text-xs font-medium mb-1">{format(day, 'd')}</div>
                  <div className="space-y-1">
                    {filteredEvents.filter(event => event.day === day.getDay()).slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={`${getEventColor(event.type)} text-white text-[9px] p-1 rounded truncate`}
                        title={`${event.title} - ${event.time}`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))
        ))}
      </div>
    );
  };

  const renderDailyView = () => {
    const todayEvents = filteredEvents.filter(event => event.day === new Date().getDay());
    
    return (
      <div className="space-y-4">
        {timePeriods.map((period) => {
          const periodEvents = todayEvents.filter(event => event.period === period.key);
          
          return (
            <div key={period.key} className="border rounded-lg p-4">
              <h3 className="font-medium text-sm mb-2">{period.label} ({period.time})</h3>
              <div className="space-y-2">
                {periodEvents.length > 0 ? (
                  periodEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`${getEventColor(event.type)} text-white text-xs p-2 rounded flex justify-between items-center`}
                    >
                      <span>{event.title}</span>
                      <span>{event.time}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-xs">No events</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeeklyView = () => {
    return (
      <div className="grid grid-cols-8 gap-1 h-full">
        {/* Header row */}
        <div className="text-xs font-medium text-gray-500 p-2 flex items-center">Time</div>
        {days.map((day, index) => (
          <div key={index} className="text-xs font-medium text-gray-500 p-2 text-center flex items-center justify-center">
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
                <div key={dayIndex} className="border-t border-gray-100 p-1 min-h-[100px] overflow-hidden">
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
    );
  };

  const getViewTitle = () => {
    switch (viewType) {
      case 'daily': return 'Today';
      case 'weekly': return 'This Week';
      case 'monthly': return 'This Month';
      default: return 'This Week';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{getViewTitle()}</CardTitle>
          
          {/* Available Caregivers Avatars */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">Available:</span>
            <div className="flex -space-x-2">
              {caregivers.map((caregiver) => (
                <HoverCard key={caregiver.id}>
                  <HoverCardTrigger>
                    <div className="relative cursor-pointer">
                      <Avatar className="w-8 h-8 border-2 border-white hover:z-10 transition-transform hover:scale-110">
                        <AvatarImage src={caregiver.avatar} alt={caregiver.name} />
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-800 font-medium">
                          {caregiver.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusDot(caregiver.status)} rounded-full border-2 border-white`}></div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 p-3 bg-white border shadow-lg">
                    <div className="space-y-2">
                      <div className="font-medium text-sm">{caregiver.name}</div>
                      <div className="text-xs text-gray-500">{caregiver.role}</div>
                      {caregiver.nextVisit && (
                        <div className="flex items-center text-xs text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          {caregiver.nextVisit}
                        </div>
                      )}
                      <div className="flex items-center text-xs text-gray-600">
                        <Phone className="w-3 h-3 mr-1" />
                        {caregiver.phone}
                      </div>
                      <div className={`inline-block px-2 py-1 text-xs rounded-full ${
                        caregiver.status === 'available' ? 'bg-green-100 text-green-800' :
                        caregiver.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {caregiver.status}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 h-[calc(100%-80px)]">
        {viewType === 'monthly' && renderMonthlyView()}
        {viewType === 'daily' && renderDailyView()}
        {viewType === 'weekly' && renderWeeklyView()}
      </CardContent>
    </Card>
  );
};

export default WeeklyCalendarView;
