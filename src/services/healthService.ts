
import { mockHealthData, mockCalendarEvents } from './mockData';

export interface HealthVitals {
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  weight: number;
}

export interface Activity {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const healthService = {
  // Mock get health vitals
  async getHealthVitals(): Promise<HealthVitals> {
    await delay(400);
    return mockHealthData.vitals;
  },

  // Mock get activities
  async getActivities(): Promise<Activity[]> {
    await delay(500);
    return mockHealthData.activities;
  },

  // Mock get calendar events
  async getCalendarEvents(): Promise<CalendarEvent[]> {
    await delay(300);
    return mockCalendarEvents;
  },

  // Mock add calendar event
  async addCalendarEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
    await delay(600);
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString()
    };
    mockCalendarEvents.push(newEvent);
    return newEvent;
  },

  // Mock update health vitals
  async updateHealthVitals(vitals: Partial<HealthVitals>): Promise<HealthVitals> {
    await delay(500);
    Object.assign(mockHealthData.vitals, vitals);
    return mockHealthData.vitals;
  }
};
