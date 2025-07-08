import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ShoppingCart, StickyNote, List, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  priority: z.string().min(1, "Priority is required"),
  dueDate: z.date().optional(),
});

const grocerySchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  category: z.string().min(1, "Category is required"),
  priority: z.string().min(1, "Priority is required"),
  store: z.string().optional(),
  notes: z.string().optional(),
});

const bulkGrocerySchema = z.object({
  items: z.string().min(1, "Items list is required"),
  category: z.string().min(1, "Category is required"),
  priority: z.string().min(1, "Priority is required"),
  store: z.string().optional(),
});

type NoteFormValues = z.infer<typeof noteSchema>;
type GroceryFormValues = z.infer<typeof grocerySchema>;
type BulkGroceryFormValues = z.infer<typeof bulkGrocerySchema>;

interface AddTaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onOpenChange }) => {
  const [groceryMode, setGroceryMode] = useState<'single' | 'bulk'>('single');

  const noteForm = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      content: '',
      priority: 'medium',
      dueDate: undefined,
    }
  });

  const groceryForm = useForm<GroceryFormValues>({
    resolver: zodResolver(grocerySchema),
    defaultValues: {
      itemName: '',
      quantity: '',
      category: 'food',
      priority: 'medium',
      store: '',
      notes: '',
    }
  });

  const bulkGroceryForm = useForm<BulkGroceryFormValues>({
    resolver: zodResolver(bulkGrocerySchema),
    defaultValues: {
      items: '',
      category: 'food',
      priority: 'medium',
      store: '',
    }
  });

  const onNoteSubmit = (data: NoteFormValues) => {
    console.log('Creating note:', data);
    toast.success("Note created successfully", {
      description: `"${data.title}" has been added to your notes`,
    });
    onOpenChange(false);
    noteForm.reset();
  };

  const onGrocerySubmit = (data: GroceryFormValues) => {
    console.log('Creating grocery item:', data);
    toast.success("Grocery item added successfully", {
      description: `"${data.itemName}" (${data.quantity}) added to shopping list`,
    });
    onOpenChange(false);
    groceryForm.reset();
  };

  const onBulkGrocerySubmit = (data: BulkGroceryFormValues) => {
    const items = data.items.split('\n').filter(item => item.trim() !== '');
    console.log('Creating bulk grocery items:', { ...data, itemsArray: items });
    toast.success("Grocery items added successfully", {
      description: `${items.length} items added to your shopping list`,
    });
    onOpenChange(false);
    bulkGroceryForm.reset();
  };

  const handleModalClose = () => {
    onOpenChange(false);
    noteForm.reset();
    groceryForm.reset();
    bulkGroceryForm.reset();
    setGroceryMode('single');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Create a new note or add items to your shopping list
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <StickyNote className="w-4 h-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="groceries" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Groceries & Shopping
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="space-y-4 mt-4">
            <Form {...noteForm}>
              <form onSubmit={noteForm.handleSubmit(onNoteSubmit)} className="space-y-4">
                <FormField
                  control={noteForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter note title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={noteForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your note content" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={noteForm.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={noteForm.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date (Optional)</FormLabel>
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
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={handleModalClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                    <StickyNote className="w-4 h-4 mr-2" />
                    Create Note
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="groceries" className="space-y-4 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Button
                type="button"
                variant={groceryMode === 'single' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setGroceryMode('single')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Single Item
              </Button>
              <Button
                type="button"
                variant={groceryMode === 'bulk' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setGroceryMode('bulk')}
                className="flex items-center gap-2"
              >
                <List className="w-4 h-4" />
                Bulk Add
              </Button>
            </div>

            {groceryMode === 'single' ? (
              <Form {...groceryForm}>
                <form onSubmit={groceryForm.handleSubmit(onGrocerySubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={groceryForm.control}
                      name="itemName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Item Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter item name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={groceryForm.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2 kg, 5 pieces" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={groceryForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="food">Food & Beverages</SelectItem>
                              <SelectItem value="household">Household Items</SelectItem>
                              <SelectItem value="personal">Personal Care</SelectItem>
                              <SelectItem value="health">Health & Medicine</SelectItem>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="electronics">Electronics</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={groceryForm.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={groceryForm.control}
                    name="store"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Store (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter store name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={groceryForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any specific requirements or notes" 
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="pt-4">
                    <Button type="button" variant="outline" onClick={handleModalClose}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-green-500 hover:bg-green-600">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Shopping List
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            ) : (
              <Form {...bulkGroceryForm}>
                <form onSubmit={bulkGroceryForm.handleSubmit(onBulkGrocerySubmit)} className="space-y-4">
                  <FormField
                    control={bulkGroceryForm.control}
                    name="items"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Items List</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter each item on a new line:&#10;tomato (for salads)&#10;whole grain bread&#10;pick up fresh bananas&#10;olive oil&#10;cereals, peanut butter, and herbal tea"
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={bulkGroceryForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category (Applied to all items)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="food">Food & Beverages</SelectItem>
                              <SelectItem value="household">Household Items</SelectItem>
                              <SelectItem value="personal">Personal Care</SelectItem>
                              <SelectItem value="health">Health & Medicine</SelectItem>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="electronics">Electronics</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={bulkGroceryForm.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority (Applied to all items)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={bulkGroceryForm.control}
                    name="store"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Store (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter store name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="pt-4">
                    <Button type="button" variant="outline" onClick={handleModalClose}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-green-500 hover:bg-green-600">
                      <List className="w-4 h-4 mr-2" />
                      Add All Items
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
