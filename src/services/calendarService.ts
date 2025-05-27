
import { addDays, addWeeks, subDays } from 'date-fns';
import { mockCalendarEventsDetailed } from './mockData';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  color: string;
}

// Helper function to generate a random time between 8:00 and 18:00
const randomTime = () => {
  const hour = Math.floor(Math.random() * 10) + 8; // 8 to 18
  const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

// Color palette
const eventColors = ['#2717A5', '#FF9F46', '#FF719A', '#62E884', '#67d6ff', '#9467ff', '#ff6767'];

// Generate additional events
const generateAdditionalEvents = (): CalendarEvent[] => {
  const baseEvents = [
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
    }
  ];

  // Generate some more random events for better demonstration
  const randomEvents = Array.from({ length: 15 }, (_, i) => ({
    id: `random-${i + 18}`,
    title: `Event ${i + 1}`,
    date: addDays(new Date(), Math.floor(Math.random() * 60) - 30), // Random date between -30 and +30 days
    time: randomTime(),
    description: `Random event description ${i + 1}`,
    color: eventColors[Math.floor(Math.random() * eventColors.length)]
  }));

  return [...baseEvents, ...randomEvents];
};

// Mock API calls
export const calendarService = {
  // Get all calendar events
  getCalendarEvents: async (): Promise<CalendarEvent[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const baseEvents = mockCalendarEventsDetailed;
    const additionalEvents = generateAdditionalEvents();
    
    return [...baseEvents, ...additionalEvents];
  },

  // Add a new event
  addCalendarEvent: async (event: CalendarEvent): Promise<CalendarEvent> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In a real API, this would save to the database
    console.log('Adding event:', event);
    return event;
  },

  // Update an existing event
  updateCalendarEvent: async (eventId: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In a real API, this would update the database
    console.log('Updating event:', eventId, updates);
    return { ...updates } as CalendarEvent;
  },

  // Delete an event
  deleteCalendarEvent: async (eventId: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In a real API, this would delete from the database
    console.log('Deleting event:', eventId);
  }
};
