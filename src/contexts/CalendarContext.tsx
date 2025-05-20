
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { addDays, addWeeks, subDays, isSameDay } from 'date-fns';

// Define the event type
export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  color: string;
}

interface CalendarContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  addEvent: (event: CalendarEvent) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getUpcomingEvents: (limit?: number, startDate?: Date) => CalendarEvent[];
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

// Helper function to generate a random time between 8:00 and 18:00
const randomTime = () => {
  const hour = Math.floor(Math.random() * 10) + 8; // 8 to 18
  const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

// Color palette
const eventColors = ['#2717A5', '#FF9F46', '#FF719A', '#62E884', '#67d6ff', '#9467ff', '#ff6767'];

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    // Today's events
    {
      id: '1',
      title: 'Doctor Appointment',
      date: new Date(),
      time: '10:00',
      description: 'Annual check-up',
      color: '#2717A5'
    },
    {
      id: '2',
      title: 'Lunch with Family',
      date: new Date(),
      time: '13:00',
      description: 'At favorite restaurant',
      color: '#FF9F46'
    },
    {
      id: '3',
      title: 'Medication Reminder',
      date: new Date(),
      time: '09:00',
      description: 'Take morning pills',
      color: '#FF719A'
    },
    {
      id: '4',
      title: 'Physical Therapy',
      date: new Date(),
      time: '15:30',
      description: 'With Dr. Johnson',
      color: '#62E884'
    },
    {
      id: '5',
      title: 'Evening Walk',
      date: new Date(),
      time: '18:00',
      description: 'Around the park',
      color: '#67d6ff'
    },
    
    // Tomorrow's events
    {
      id: '6',
      title: 'Book Club',
      date: addDays(new Date(), 1),
      time: '16:00',
      description: 'Discussing "The Great Gatsby"',
      color: '#FF9F46'
    },
    {
      id: '7',
      title: 'Grocery Shopping',
      date: addDays(new Date(), 2),
      time: '11:00',
      description: 'Pick up weekly essentials',
      color: '#2717A5'
    },
    
    // Later this week
    {
      id: '8',
      title: 'Dentist Appointment',
      date: addDays(new Date(), 3),
      time: '14:00',
      description: 'Teeth cleaning',
      color: '#9467ff'
    },
    {
      id: '9',
      title: 'Family Dinner',
      date: addDays(new Date(), 3),
      time: '19:00',
      description: 'At mom\'s house',
      color: '#FF719A'
    },
    {
      id: '10',
      title: 'Movie Night',
      date: addDays(new Date(), 4),
      time: '20:00',
      description: 'Watch new release',
      color: '#67d6ff'
    },
    
    // Next week
    {
      id: '11',
      title: 'Eye Doctor',
      date: addDays(new Date(), 7),
      time: '11:30',
      description: 'Annual eye exam',
      color: '#2717A5'
    },
    {
      id: '12',
      title: 'Birthday Party',
      date: addDays(new Date(), 8),
      time: '15:00',
      description: 'John\'s 60th birthday',
      color: '#FF9F46'
    },
    {
      id: '13',
      title: 'Yoga Class',
      date: addDays(new Date(), 9),
      time: '08:00',
      description: 'Morning stretching',
      color: '#62E884'
    },
    
    // Next month
    {
      id: '14',
      title: 'Annual Checkup',
      date: addWeeks(new Date(), 4),
      time: '09:30',
      description: 'With Dr. Smith',
      color: '#FF719A'
    },
    {
      id: '15',
      title: 'Concert',
      date: addWeeks(new Date(), 4),
      time: '19:30',
      description: 'Symphony Orchestra',
      color: '#9467ff'
    },
    
    // Last month
    {
      id: '16',
      title: 'Flu Shot',
      date: subDays(new Date(), 25),
      time: '10:00',
      description: 'Annual vaccination',
      color: '#ff6767'
    },
    {
      id: '17',
      title: 'Cooking Class',
      date: subDays(new Date(), 20),
      time: '17:00',
      description: 'Learn to make pasta',
      color: '#FF9F46'
    },
    
    // Generate some more random events for better demonstration
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `random-${i + 18}`,
      title: `Event ${i + 1}`,
      date: addDays(new Date(), Math.floor(Math.random() * 60) - 30), // Random date between -30 and +30 days
      time: randomTime(),
      description: `Random event description ${i + 1}`,
      color: eventColors[Math.floor(Math.random() * eventColors.length)]
    }))
  ]);

  const addEvent = (event: CalendarEvent) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(event.date, date)
    ).sort((a, b) => {
      const aTime = parseInt(a.time.replace(':', ''));
      const bTime = parseInt(b.time.replace(':', ''));
      return aTime - bTime;
    });
  };

  const getUpcomingEvents = (limit?: number, startDate: Date = new Date()) => {
    const filteredEvents = events
      .filter(event => event.date >= startDate)
      .sort((a, b) => {
        if (a.date.getTime() !== b.date.getTime()) {
          return a.date.getTime() - b.date.getTime();
        }
        const aTime = parseInt(a.time.replace(':', ''));
        const bTime = parseInt(b.time.replace(':', ''));
        return aTime - bTime;
      });
      
    return limit ? filteredEvents.slice(0, limit) : filteredEvents;
  };

  return (
    <CalendarContext.Provider value={{ 
      selectedDate, 
      setSelectedDate, 
      events, 
      setEvents, 
      addEvent,
      getEventsForDate,
      getUpcomingEvents
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = (): CalendarContextType => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
};
