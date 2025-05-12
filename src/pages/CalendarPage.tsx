
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, addDays, isToday, startOfMonth, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MobileNav from '@/components/MobileNav';
import { CalendarPlus, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

// Define the event type
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  color: string;
}

// Form validation schema
const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date(),
  time: z.string().min(1, "Time is required"),
  description: z.string().optional(),
  color: z.string().default("#2717A5")
});

type EventFormValues = z.infer<typeof eventFormSchema>;

const CalendarPage = () => {
  const { selectedDate, setSelectedDate } = useCalendarContext();
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
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
  
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState('calendar');
  
  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  // Setup form with react-hook-form
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      date: selectedDate,
      time: '',
      description: '',
      color: '#2717A5'
    }
  });

  // Get events for selected date
  const eventsForSelectedDate = events.filter(event => 
    isSameDay(event.date, selectedDate)
  );

  // Get upcoming events (next 7 days)
  const upcomingEvents = events
    .filter(event => event.date >= new Date() && 
      event.date <= addDays(new Date(), 7))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Handle form submission
  const onSubmit = (data: EventFormValues) => {
    // Create a new event with all required fields explicitly set
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: data.title,
      date: data.date,
      time: data.time,
      description: data.description || '',
      color: data.color
    };
    
    setEvents([...events, newEvent]);
    setIsAddEventDialogOpen(false);
    form.reset();
    
    toast("Event added successfully", {
      description: `${newEvent.title} on ${format(newEvent.date, 'PPP')} at ${newEvent.time}`,
      position: "top-center"
    });
  };

  // Event dots for calendar
  const eventDates: Record<string, number> = {};
  events.forEach(event => {
    const dateStr = format(event.date, 'yyyy-MM-dd');
    eventDates[dateStr] = (eventDates[dateStr] || 0) + 1;
  });

  return (
    <div className="app-background min-h-screen pb-16 sm:pb-0">
      <div className="flex h-full">
        {/* Sidebar - only visible on desktop */}
        {!isMobile && <Sidebar activePage={activePage} />}
        
        {/* Main Content */}
        <div className={`flex-1 p-3 sm:p-4 overflow-y-auto ${isMobile ? 'w-full' : 'ml-[220px]'}`}>
          <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <Header userName="Nina" />
            
            {/* Main Content */}
            <div className="bg-white rounded-b-xl p-3 sm:p-6">
              <div className="flex flex-col space-y-6">
                {/* Page Title and Add Event Button */}
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-rezilia-purple">Calendar</h1>
                  <Button 
                    onClick={() => setIsAddEventDialogOpen(true)}
                    className="bg-rezilia-purple hover:bg-rezilia-purple/90 text-white"
                    size={isMobile ? "sm" : "default"}
                  >
                    <CalendarPlus className="mr-2 h-5 w-5" />
                    <span className="text-lg">Add Event</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Calendar Section */}
                  <div className="bg-rezilia-lightblue rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-rezilia-purple">
                        {format(selectedDate, 'MMMM yyyy')}
                      </h2>
                      <Badge className="bg-rezilia-orange text-white">
                        {Object.values(eventDates).reduce((sum, count) => sum + count, 0)} Events
                      </Badge>
                    </div>
                    
                    <CalendarUI
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="border-none rounded-lg bg-white p-2 shadow-sm pointer-events-auto"
                      modifiers={{
                        eventDay: (date) => Boolean(eventDates[format(date, 'yyyy-MM-dd')])
                      }}
                      modifiersClassNames={{
                        today: "bg-rezilia-green text-white",
                        eventDay: "font-bold"
                      }}
                      components={{
                        DayContent: ({ date }) => {
                          const formattedDate = format(date, 'yyyy-MM-dd');
                          const hasEvents = Boolean(eventDates[formattedDate]);
                          
                          return (
                            <div className="relative flex items-center justify-center w-full h-full">
                              <div className={isToday(date) ? "text-white font-bold" : ""}>
                                {date.getDate()}
                              </div>
                              {hasEvents && (
                                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-rezilia-purple rounded-full" />
                              )}
                            </div>
                          );
                        }
                      }}
                    />
                  </div>

                  {/* Selected Date Events */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-rezilia-purple mb-4">
                      Events on {format(selectedDate, 'MMMM d, yyyy')}
                      {isToday(selectedDate) && <span className="ml-2 text-sm text-rezilia-green">(Today)</span>}
                    </h2>
                    
                    {eventsForSelectedDate.length > 0 ? (
                      <div className="space-y-3">
                        {eventsForSelectedDate.map((event) => (
                          <div 
                            key={event.id}
                            className="p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                            style={{ borderLeftWidth: '4px', borderLeftColor: event.color }}
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-bold text-lg">{event.title}</h3>
                              <span className="text-lg">{event.time}</span>
                            </div>
                            {event.description && (
                              <p className="text-gray-600 mt-1">{event.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <CalendarIcon className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                        <p className="text-lg">No events scheduled for this day</p>
                        <Button 
                          variant="outline" 
                          className="mt-4 border-rezilia-purple text-rezilia-purple hover:bg-rezilia-purple hover:text-white"
                          onClick={() => setIsAddEventDialogOpen(true)}
                        >
                          Add Event
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Upcoming Events */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-rezilia-purple mb-4">Upcoming Events</h2>
                    
                    {upcomingEvents.length > 0 ? (
                      <div className="overflow-y-auto max-h-[400px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Event</TableHead>
                              <TableHead>Time</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {upcomingEvents.map((event) => (
                              <TableRow 
                                key={event.id}
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => setSelectedDate(event.date)}
                              >
                                <TableCell className="font-medium">
                                  {isToday(event.date) ? (
                                    <span className="text-rezilia-green font-bold">Today</span>
                                  ) : (
                                    format(event.date, 'MMM d')
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <div 
                                      className="w-3 h-3 rounded-full mr-2" 
                                      style={{ backgroundColor: event.color }}
                                    />
                                    {event.title}
                                  </div>
                                </TableCell>
                                <TableCell>{event.time}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p className="text-lg">No upcoming events</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-rezilia-purple">Add New Event</DialogTitle>
            <DialogDescription>
              Fill in the details for your new calendar event
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">Event Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="text-lg p-6" 
                        placeholder="Enter event name"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">Date</FormLabel>
                    <FormControl>
                      <div className="border rounded-md p-2">
                        <CalendarUI
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="pointer-events-auto"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">Time</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="time"
                        className="text-lg p-6" 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">Description (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="text-lg p-6" 
                        placeholder="Enter event details"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">Event Color</FormLabel>
                    <FormControl>
                      <div className="flex gap-3">
                        {['#2717A5', '#FF9F46', '#FF719A', '#62E884'].map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => form.setValue('color', color)}
                            className={`w-8 h-8 rounded-full border-2 ${
                              field.value === color ? 'border-black' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color }}
                            aria-label={`Select ${color} color`}
                          />
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddEventDialogOpen(false)}
                  className="text-lg px-6 py-5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-rezilia-purple hover:bg-rezilia-purple/90 text-white text-lg px-6 py-5"
                >
                  Add Event
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Mobile Navigation - only visible on mobile */}
      {isMobile && <MobileNav activePage={activePage} onNavigate={handleNavigate} />}

      <style>
        {`
        .rdp {
          --rdp-accent-color: var(--rezilia-purple);
          margin: 0;
        }
        .rdp-months {
          justify-content: center;
        }
        .rdp-caption {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          text-align: center;
        }
        .rdp-cell {
          opacity: 1 !important;
        }
        .rdp-button {
          opacity: 1 !important;
          font-size: 16px !important;
        }
        .rdp-day:not(.rdp-day_outside) {
          font-weight: normal !important;
          color: #333 !important;
        }
        .rdp-day_today {
          background-color: var(--rezilia-green) !important;
          color: white !important;
        }
        .rdp-day_selected {
          background-color: var(--rezilia-purple) !important;
          color: white !important;
        }
        `}
      </style>
    </div>
  );
};

export default CalendarPage;
