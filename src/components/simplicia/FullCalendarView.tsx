
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Clock, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, eachDayOfInterval, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';

interface FullCalendarViewProps {
  activeFilter: string;
  viewType: 'daily' | 'weekly' | 'monthly';
}

interface CalendarEvent {
  id: string;
  title: string;
  type: 'caregiver' | 'presence' | 'todo' | 'med';
  time: string;
  date: Date;
  description?: string;
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

const FullCalendarView: React.FC<FullCalendarViewProps> = ({ activeFilter, viewType }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

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
    }
  ];

  // Sample events with dates
  const events: CalendarEvent[] = [
    // Today's events
    { id: '1', title: 'Nurse Sarah', type: 'caregiver', time: '9:00 AM', date: new Date() },
    { id: '2', title: 'Morning Meds', type: 'med', time: '8:00 AM', date: new Date() },
    { id: '3', title: 'Family Visit', type: 'presence', time: '2:00 PM', date: new Date() },
    
    // Tomorrow's events
    { id: '4', title: 'Dr. Johnson', type: 'caregiver', time: '11:00 AM', date: addDays(new Date(), 1) },
    { id: '5', title: 'Evening Meds', type: 'med', time: '7:00 PM', date: addDays(new Date(), 1) },
    
    // This week's events
    { id: '6', title: 'Physical Therapy', type: 'caregiver', time: '3:00 PM', date: addDays(new Date(), 3) },
    { id: '7', title: 'Buy Groceries', type: 'todo', time: '10:00 AM', date: addDays(new Date(), 2) },
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

  const handlePrevious = () => {
    if (viewType === 'weekly') {
      setCurrentDate(subWeeks(currentDate, 1));
    } else if (viewType === 'monthly') {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const handleNext = () => {
    if (viewType === 'weekly') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else if (viewType === 'monthly') {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const getViewTitle = () => {
    if (viewType === 'daily') {
      return format(currentDate, 'EEEE, MMMM d, yyyy');
    } else if (viewType === 'weekly') {
      const weekStart = startOfWeek(currentDate);
      const weekEnd = addDays(weekStart, 6);
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
    } else {
      return format(currentDate, 'MMMM yyyy');
    }
  };

  const renderCalendarGrid = () => {
    if (viewType === 'monthly') {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
      
      // Pad the month to show complete weeks
      const startDay = monthStart.getDay();
      const paddedDays = [];
      
      // Add empty cells for days before month start
      for (let i = 0; i < startDay; i++) {
        paddedDays.push(null);
      }
      
      // Add all days of the month
      monthDays.forEach(day => paddedDays.push(day));
      
      // Group into weeks
      const weeks = [];
      for (let i = 0; i < paddedDays.length; i += 7) {
        weeks.push(paddedDays.slice(i, i + 7));
      }
      
      return (
        <div className="flex flex-col h-full">
          {/* Days header */}
          <div className="grid grid-cols-7 border-b">
            {days.map(day => (
              <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="flex-1 overflow-auto">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 min-h-[120px]">
                {week.map((day, dayIndex) => (
                  <div key={dayIndex} className="border-r border-b p-2 min-h-[120px]">
                    {day && (
                      <>
                        <div className="font-medium text-sm mb-1">
                          {format(day, 'd')}
                        </div>
                        <div className="space-y-1">
                          {filteredEvents
                            .filter(event => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                            .slice(0, 3)
                            .map(event => (
                              <div
                                key={event.id}
                                className={`${getEventColor(event.type)} text-white text-xs p-1 rounded truncate`}
                                title={`${event.title} - ${event.time}`}
                              >
                                {event.title}
                              </div>
                            ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (viewType === 'weekly') {
      const weekStart = startOfWeek(currentDate);
      const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
      
      return (
        <div className="flex flex-col h-full">
          {/* Days header */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-2 text-center font-medium text-gray-500 text-sm border-r">Time</div>
            {weekDays.map((day, index) => (
              <div key={index} className="p-2 text-center font-medium text-gray-500 text-sm border-r">
                <div>{format(day, 'EEE')}</div>
                <div className="text-lg font-bold">{format(day, 'd')}</div>
              </div>
            ))}
          </div>
          
          {/* Hours grid */}
          <div className="flex-1 overflow-auto">
            {hours.map(hour => (
              <div key={hour} className="grid grid-cols-8 min-h-[60px] border-b">
                <div className="p-2 text-sm text-gray-500 border-r">
                  {format(new Date().setHours(hour, 0), 'h:mm a')}
                </div>
                {weekDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="p-1 border-r min-h-[60px]">
                    {filteredEvents
                      .filter(event => 
                        format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') &&
                        parseInt(event.time.split(':')[0]) === hour
                      )
                      .map(event => (
                        <div
                          key={event.id}
                          className={`${getEventColor(event.type)} text-white text-xs p-1 rounded mb-1 truncate`}
                          title={`${event.title} - ${event.time}`}
                        >
                          {event.title}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Daily view
      return (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-auto">
            {hours.map(hour => (
              <div key={hour} className="flex border-b min-h-[80px]">
                <div className="w-20 p-2 text-sm text-gray-500 border-r">
                  {format(new Date().setHours(hour, 0), 'h:mm a')}
                </div>
                <div className="flex-1 p-2">
                  {filteredEvents
                    .filter(event => 
                      format(event.date, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd') &&
                      parseInt(event.time.split(':')[0]) === hour
                    )
                    .map(event => (
                      <div
                        key={event.id}
                        className={`${getEventColor(event.type)} text-white text-sm p-2 rounded mb-2`}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs opacity-90">{event.time}</div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <CardTitle className="text-lg">{getViewTitle()}</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Available Caregivers */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">Available:</span>
            <div className="flex -space-x-2">
              {caregivers.filter(c => c.status === 'available').map((caregiver) => (
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
                  <HoverCardContent className="w-64 p-3">
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
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        {renderCalendarGrid()}
      </CardContent>
    </Card>
  );
};

export default FullCalendarView;
