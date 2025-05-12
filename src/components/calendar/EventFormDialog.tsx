
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useCalendarContext } from '@/contexts/CalendarContext';

// Form validation schema
const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  time: z.string().min(1, "Time is required"),
  description: z.string().optional(),
  color: z.string().default("#2717A5")
});

export type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventFormDialog: React.FC<EventFormDialogProps> = ({ isOpen, onOpenChange }) => {
  const { selectedDate, setEvents } = useCalendarContext();

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

  // Handle form submission
  const onSubmit = (data: EventFormValues) => {
    // Create a new event with all required fields
    const newEvent = {
      id: Date.now().toString(),
      title: data.title,
      date: data.date,
      time: data.time,
      description: data.description || '',
      color: data.color
    };
    
    setEvents(prev => [...prev, newEvent]);
    onOpenChange(false);
    form.reset();
    
    toast("Event added successfully", {
      description: `${newEvent.title} on ${new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(newEvent.date)} at ${newEvent.time}`,
      position: "top-center"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
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

            <DialogFooter className="mt-6 sm:space-x-2 gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="text-lg px-6 py-5 w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-rezilia-purple hover:bg-rezilia-purple/90 text-white text-lg px-6 py-5 w-full sm:w-auto"
              >
                Add Event
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
