
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
      date: addDays(new Date(), 2),
      time: '13:00',
      description: 'At favorite restaurant',
      color: '#FF9F46'
    },
    {
      id: '3',
      title: 'Medication Reminder',
      date: addDays(new Date(), 1),
      time: '09:00',
      description: 'Take morning pills',
      color: '#FF719A'
    }
  ]);

  const addEvent = (event: CalendarEvent) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(event.date, date)
    );
  };

  const getUpcomingEvents = (limit?: number) => {
    const filteredEvents = events
      .filter(event => event.date >= new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime());
      
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
