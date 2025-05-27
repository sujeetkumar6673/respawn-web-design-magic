
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isSameDay } from 'date-fns';
import { calendarService, CalendarEvent } from '@/services/calendarService';

interface CalendarContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  addEvent: (event: CalendarEvent) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getUpcomingEvents: (limit?: number) => CalendarEvent[];
  isLoading: boolean;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load events from service on component mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const calendarEvents = await calendarService.getCalendarEvents();
        setEvents(calendarEvents);
      } catch (error) {
        console.error('Failed to load calendar events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const addEvent = async (event: CalendarEvent) => {
    try {
      const newEvent = await calendarService.addCalendarEvent(event);
      setEvents(prevEvents => [...prevEvents, newEvent]);
    } catch (error) {
      console.error('Failed to add event:', error);
    }
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
      getUpcomingEvents,
      isLoading
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

export type { CalendarEvent };
