
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { addDays, isSameDay } from 'date-fns';

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
  getUpcomingEvents: (limit?: number) => CalendarEvent[];
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
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
    }
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

  const getUpcomingEvents = (limit?: number) => {
    const filteredEvents = events
      .filter(event => event.date >= new Date())
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
