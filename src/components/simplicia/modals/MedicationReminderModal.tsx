import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Pill, Plus, Trash2, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

const medicationSchema = z.object({
  medicationName: z.string().min(1, "Medication name is required"),
  medicationType: z.string().min(1, "Medication type is required"),
  dosage: z.string().min(1, "Dosage is required"),
  strength: z.string().min(1, "Strength is required"),
  prescribedBy: z.string().min(1, "Prescribing doctor is required"),
  instructions: z.string().optional(),
  withFood: z.boolean().default(false),
  beforeMeals: z.boolean().default(false),
  afterMeals: z.boolean().default(false),
  atBedtime: z.boolean().default(false),
  asNeeded: z.boolean().default(false),
  sideEffects: z.string().optional(),
});

interface MedicationSchedule {
  id: string;
  date: Date;
  time: string;
  dosage?: string;
  notes?: string;
}

type MedicationFormValues = z.infer<typeof medicationSchema>;

interface MedicationReminderModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MedicationReminderModal: React.FC<MedicationReminderModalProps> = ({ isOpen, onOpenChange }) => {
  const [schedules, setSchedules] = useState<MedicationSchedule[]>([]);
  const [scheduleMode, setScheduleMode] = useState<'simple' | 'custom'>('simple');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('08:00');

  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      medicationName: '',
      medicationType: 'tablet',
      dosage: '',
      strength: '',
      prescribedBy: '',
      instructions: '',
      withFood: false,
      beforeMeals: false,
      afterMeals: false,
      atBedtime: false,
      asNeeded: false,
      sideEffects: '',
    }
  });

  // Clear schedules when switching modes
  const handleModeChange = (mode: 'simple' | 'custom') => {
    setScheduleMode(mode);
    setSchedules([]); // Clear existing schedules when switching modes
  };

  const addSimpleSchedule = (frequency: string, duration: number) => {
    const newSchedules: MedicationSchedule[] = [];
    const startDate = new Date();
    
    switch (frequency) {
      case 'once-daily':
        for (let i = 0; i < duration; i++) {
          newSchedules.push({
            id: `${Date.now()}-${i}`,
            date: addDays(startDate, i),
            time: '08:00',
          });
        }
        break;
      case 'twice-daily':
        for (let i = 0; i < duration; i++) {
          newSchedules.push(
            {
              id: `${Date.now()}-${i}-morning`,
              date: addDays(startDate, i),
              time: '08:00',
            },
            {
              id: `${Date.now()}-${i}-evening`,
              date: addDays(startDate, i),
              time: '20:00',
            }
          );
        }
        break;
      case 'three-times-daily':
        for (let i = 0; i < duration; i++) {
          newSchedules.push(
            {
              id: `${Date.now()}-${i}-morning`,
              date: addDays(startDate, i),
              time: '08:00',
            },
            {
              id: `${Date.now()}-${i}-noon`,
              date: addDays(startDate, i),
              time: '13:00',
            },
            {
              id: `${Date.now()}-${i}-evening`,
              date: addDays(startDate, i),
              time: '20:00',
            }
          );
        }
        break;
    }
    
    setSchedules(newSchedules);
  };

  const addCustomSchedule = () => {
    if (!selectedDate || !selectedTime) return;
    
    const newSchedule: MedicationSchedule = {
      id: `custom-${Date.now()}`,
      date: selectedDate,
      time: selectedTime,
      dosage: form.getValues('dosage'),
    };
    
    setSchedules(prev => [...prev, newSchedule].sort((a, b) => 
      a.date.getTime() - b.date.getTime() || a.time.localeCompare(b.time)
    ));
  };

  const removeSchedule = (id: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  const updateSchedule = (id: string, updates: Partial<MedicationSchedule>) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === id ? { ...schedule, ...updates } : schedule
    ));
  };

  const onSubmit = (data: MedicationFormValues) => {
    if (schedules.length === 0) {
      toast.error("Please add at least one medication schedule");
      return;
    }
    
    console.log('Creating medication prescription:', {
      ...data,
      schedules: schedules.map(s => ({
        date: format(s.date, 'yyyy-MM-dd'),
        time: s.time,
        dosage: s.dosage || data.dosage,
        notes: s.notes,
      })),
    });
    
    toast.success("Medication prescription added", {
      description: `${data.medicationName} scheduled for ${schedules.length} doses`,
    });
    
    onOpenChange(false);
    form.reset();
    setSchedules([]);
  };

  const groupSchedulesByDate = () => {
    const grouped = schedules.reduce((acc, schedule) => {
      const dateKey = format(schedule.date, 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(schedule);
      return acc;
    }, {} as Record<string, MedicationSchedule[]>);
    
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-purple-500" />
            Add Prescribed Medication
          </DialogTitle>
          <DialogDescription>
            Add medication with flexible scheduling - supports complex patterns like different frequencies per week
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Medication Info */}
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
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="strength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strength *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 500mg" {...field} />
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
                    <FormLabel>Default Dosage *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1 tablet" {...field} />
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

            {/* Schedule Configuration */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Medication Schedule</h3>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={scheduleMode === 'simple' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleModeChange('simple')}
                  >
                    Quick Setup
                  </Button>
                  <Button
                    type="button"
                    variant={scheduleMode === 'custom' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleModeChange('custom')}
                  >
                    Custom Schedule
                  </Button>
                </div>
              </div>

              <Tabs value={scheduleMode} onValueChange={(value) => handleModeChange(value as 'simple' | 'custom')}>
                <TabsContent value="simple" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Quick Schedule Templates</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addSimpleSchedule('once-daily', 7)}
                        >
                          Once Daily - 7 days
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addSimpleSchedule('twice-daily', 7)}
                        >
                          Twice Daily - 7 days
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addSimpleSchedule('three-times-daily', 7)}
                        >
                          3x Daily - 7 days
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addSimpleSchedule('once-daily', 14)}
                        >
                          Once Daily - 14 days
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="custom" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Add Individual Doses</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4 items-end">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-2">Date</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !selectedDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarUI
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-2">Time</label>
                          <Input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={addCustomSchedule}
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Dose
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Schedule Preview */}
            {schedules.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Schedule Preview ({schedules.length} doses)
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-60 overflow-y-auto">
                  <div className="space-y-3">
                    {groupSchedulesByDate().map(([dateKey, daySchedules]) => (
                      <div key={dateKey} className="border rounded-lg p-3">
                        <div className="font-medium text-sm mb-2">
                          {format(new Date(dateKey), "EEEE, MMM dd, yyyy")}
                        </div>
                        <div className="space-y-2">
                          {daySchedules.map((schedule) => (
                            <div key={schedule.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <div className="flex items-center gap-3">
                                <Badge variant="outline">{schedule.time}</Badge>
                                <span className="text-sm">
                                  {schedule.dosage || form.getValues('dosage')}
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSchedule(schedule.id)}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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
                      <FormLabel>Take with food</FormLabel>
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
                      <FormLabel>Before meals</FormLabel>
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
                      <FormLabel>After meals</FormLabel>
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
                      <FormLabel>At bedtime</FormLabel>
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
                    <FormLabel>Take as needed (PRN)</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
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
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                Add Medication ({schedules.length} doses)
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationReminderModal;
