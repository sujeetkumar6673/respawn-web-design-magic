
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Pill } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { format, addDays, addWeeks, addMonths } from 'date-fns';
import { cn } from '@/lib/utils';

const medicationSchema = z.object({
  medicationName: z.string().min(1, "Medication name is required"),
  medicationType: z.string().min(1, "Medication type is required"),
  dosage: z.string().min(1, "Dosage is required"),
  strength: z.string().min(1, "Strength is required"),
  frequency: z.string().min(1, "Frequency is required"),
  timesPerDay: z.number().min(1, "Times per day is required"),
  startDate: z.date({ required_error: "Start date is required" }),
  duration: z.string().min(1, "Duration is required"),
  durationValue: z.number().min(1, "Duration value is required"),
  prescribedBy: z.string().min(1, "Prescribing doctor is required"),
  instructions: z.string().optional(),
  withFood: z.boolean().default(false),
  beforeMeals: z.boolean().default(false),
  afterMeals: z.boolean().default(false),
  atBedtime: z.boolean().default(false),
  asNeeded: z.boolean().default(false),
  sideEffects: z.string().optional(),
  times: z.array(z.string()).min(1, "At least one time is required"),
});

type MedicationFormValues = z.infer<typeof medicationSchema>;

interface MedicationReminderModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MedicationReminderModal: React.FC<MedicationReminderModalProps> = ({ isOpen, onOpenChange }) => {
  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      medicationName: '',
      medicationType: 'tablet',
      dosage: '',
      strength: '',
      frequency: 'daily',
      timesPerDay: 1,
      startDate: new Date(),
      duration: 'days',
      durationValue: 7,
      prescribedBy: '',
      instructions: '',
      withFood: false,
      beforeMeals: false,
      afterMeals: false,
      atBedtime: false,
      asNeeded: false,
      sideEffects: '',
      times: ['08:00'],
    }
  });

  const watchTimesPerDay = form.watch('timesPerDay');
  const watchDuration = form.watch('duration');
  const watchDurationValue = form.watch('durationValue');
  const watchStartDate = form.watch('startDate');

  // Calculate end date based on duration
  const calculateEndDate = () => {
    if (!watchStartDate) return null;
    
    switch (watchDuration) {
      case 'days':
        return addDays(watchStartDate, watchDurationValue);
      case 'weeks':
        return addWeeks(watchStartDate, watchDurationValue);
      case 'months':
        return addMonths(watchStartDate, watchDurationValue);
      default:
        return addDays(watchStartDate, watchDurationValue);
    }
  };

  // Update times array when timesPerDay changes
  React.useEffect(() => {
    const currentTimes = form.getValues('times');
    const newTimes = Array(watchTimesPerDay).fill(0).map((_, index) => {
      if (currentTimes[index]) return currentTimes[index];
      
      // Default time suggestions based on frequency
      const defaultTimes = ['08:00', '12:00', '18:00', '22:00'];
      return defaultTimes[index] || '08:00';
    });
    
    form.setValue('times', newTimes);
  }, [watchTimesPerDay, form]);

  const onSubmit = (data: MedicationFormValues) => {
    const endDate = calculateEndDate();
    
    console.log('Creating medication prescription:', {
      ...data,
      endDate: endDate ? format(endDate, 'PPP') : null,
    });
    
    toast.success("Medication prescription added", {
      description: `${data.medicationName} (${data.strength}) scheduled ${data.frequency} until ${endDate ? format(endDate, 'MMM dd, yyyy') : 'ongoing'}`,
    });
    
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-purple-500" />
            Add Prescribed Medication
          </DialogTitle>
          <DialogDescription>
            Add a medication prescribed by your doctor with complete dosage and schedule information
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="medicationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Amoxicillin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="medicationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="capsule">Capsule</SelectItem>
                        <SelectItem value="syrup">Syrup</SelectItem>
                        <SelectItem value="injection">Injection</SelectItem>
                        <SelectItem value="drops">Drops</SelectItem>
                        <SelectItem value="cream">Cream/Ointment</SelectItem>
                        <SelectItem value="inhaler">Inhaler</SelectItem>
                        <SelectItem value="patch">Patch</SelectItem>
                        <SelectItem value="suppository">Suppository</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="strength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strength *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 500mg, 5ml" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1 tablet, 2 capsules" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="twice-daily">Twice Daily</SelectItem>
                        <SelectItem value="three-times-daily">Three Times Daily</SelectItem>
                        <SelectItem value="four-times-daily">Four Times Daily</SelectItem>
                        <SelectItem value="every-other-day">Every Other Day</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="as-needed">As Needed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timesPerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Times Per Day *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max="6"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prescribedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prescribed By *</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Times */}
            <div className="space-y-2">
              <FormLabel>Medication Times *</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {Array(watchTimesPerDay).fill(0).map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`times.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="time" 
                            {...field}
                            placeholder={`Time ${index + 1}`}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarUI
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Duration *</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="durationValue"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                            <SelectItem value="months">Months</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {calculateEndDate() && (
                  <p className="text-xs text-gray-500">
                    Ends: {format(calculateEndDate()!, "PPP")}
                  </p>
                )}
              </div>
            </div>

            {/* Meal Instructions */}
            <div className="space-y-3">
              <FormLabel>Meal Instructions</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="withFood"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Take with food</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="beforeMeals"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Before meals</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="afterMeals"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>After meals</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="atBedtime"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>At bedtime</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="asNeeded"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Take as needed (PRN)</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Instructions</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special instructions from the doctor..."
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sideEffects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Known Side Effects</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List any known side effects to watch for..."
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                Add Medication
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationReminderModal;
