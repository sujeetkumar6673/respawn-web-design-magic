
import React, { useState } from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';

interface CalendarModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onOpenChange }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Example events - in a real app, these would come from an API or context
  const upcomingEvents = [
    { 
      id: '1', 
      title: 'Dr. Johnson Appointment', 
      date: new Date(), 
      time: '10:30 AM',
      color: 'bg-blue-500',
      type: 'medical'
    },
    { 
      id: '2', 
      title: 'Medication: Lisinopril', 
      date: new Date(), 
      time: '8:00 AM, 8:00 PM',
      color: 'bg-purple-500',
      type: 'medication'
    },
    { 
      id: '3', 
      title: 'Nurse Visit - Sarah', 
      date: addDays(new Date(), 1), 
      time: '2:00 PM - 4:00 PM',
      color: 'bg-blue-500',
      type: 'caregiver'
    },
    { 
      id: '4', 
      title: 'Family Visit - Michael', 
      date: addDays(new Date(), 2), 
      time: '5:00 PM - 7:00 PM',
      color: 'bg-green-500',
      type: 'family'
    }
  ];

  // Filter events for the selected date
  const eventsForSelectedDate = date 
    ? upcomingEvents.filter(event => 
        format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
    : [];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[400px] md:w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Calendar</SheetTitle>
          <SheetDescription>View and manage your schedule</SheetDescription>
        </SheetHeader>
        
        <div className="grid gap-6 py-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border pointer-events-auto"
          />
          
          <div>
            <h3 className="font-medium mb-3">
              {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Select a date'}
            </h3>
            
            {eventsForSelectedDate.length > 0 ? (
              <div className="space-y-3">
                {eventsForSelectedDate.map(event => (
                  <Card key={event.id}>
                    <CardContent className="flex p-3 items-center gap-3">
                      <div className={`${event.color} w-2 h-full rounded-full`}></div>
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-500">{event.time}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No events scheduled for this day</p>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.slice(0, 3).map(event => (
                <Card key={event.id}>
                  <CardContent className="flex p-3 items-center gap-3">
                    <div className={`${event.color} w-2 h-full rounded-full`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-500">
                        {format(event.date, 'MMM d')} • {event.time}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CalendarModal;
