
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SimpliciaBadge } from '@/components/Icons';
import { CalendarPlus, Users, Clock, CheckSquare, Pill } from 'lucide-react';
import WeeklyCalendarView from '@/components/simplicia/WeeklyCalendarView';
import QuickActions from '@/components/simplicia/QuickActions';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCalendarContext } from '@/contexts/CalendarContext';
import { format } from 'date-fns';
import CalendarSection from '@/components/calendar/CalendarSection';
import DailyEvents from '@/components/calendar/DailyEvents';
import UpcomingEvents from '@/components/calendar/UpcomingEvents';
import EventFormDialog from '@/components/calendar/EventFormDialog';
import CalendarStyles from '@/components/calendar/CalendarStyles';

const SimpliciaPage: React.FC = () => {
  const [activeView, setActiveView] = useState('all');
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState('simplicia');
  
  const { selectedDate, events } = useCalendarContext();

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  // Event dots for calendar
  const eventDates: Record<string, number> = {};
  events.forEach(event => {
    const dateStr = format(event.date, 'yyyy-MM-dd');
    eventDates[dateStr] = (eventDates[dateStr] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {!isMobile && <Sidebar activePage={activePage} />}
      
      <div className={`flex-1 ${!isMobile ? 'ml-[220px]' : ''} p-4 h-screen overflow-hidden`}>
        {/* Header */}
        <div className="mb-4">
          <Header pageTitle="Simplicia" pageDescription="Care coordination and family presence management" />
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="care" className="h-[calc(100vh-160px)] flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="care">Care Coordination</TabsTrigger>
            <TabsTrigger value="calendar">Calendar & Events</TabsTrigger>
          </TabsList>

          {/* Care Coordination Tab */}
          <TabsContent value="care" className="flex-1 overflow-hidden">
            {/* Mobile Layout */}
            {isMobile ? (
              <div className="space-y-4 h-full overflow-y-auto pb-32">
                {/* View Type Selector - Mobile */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      View
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex gap-2">
                      <Button
                        variant={viewType === 'daily' ? 'default' : 'outline'}
                        className="flex-1 text-xs h-8"
                        onClick={() => setViewType('daily')}
                      >
                        Daily
                      </Button>
                      <Button
                        variant={viewType === 'weekly' ? 'default' : 'outline'}
                        className="flex-1 text-xs h-8"
                        onClick={() => setViewType('weekly')}
                      >
                        Weekly
                      </Button>
                      <Button
                        variant={viewType === 'monthly' ? 'default' : 'outline'}
                        className="flex-1 text-xs h-8"
                        onClick={() => setViewType('monthly')}
                      >
                        Monthly
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Categories - Mobile */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={activeView === 'all' ? 'default' : 'outline'}
                        className="justify-start text-xs h-8"
                        onClick={() => setActiveView('all')}
                      >
                        <div className="w-2 h-2 bg-gray-500 rounded mr-2"></div>
                        All Events
                      </Button>
                      <Button
                        variant={activeView === 'caregivers' ? 'default' : 'outline'}
                        className="justify-start text-xs h-8"
                        onClick={() => setActiveView('caregivers')}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded mr-2"></div>
                        Caregivers
                      </Button>
                      <Button
                        variant={activeView === 'presences' ? 'default' : 'outline'}
                        className="justify-start text-xs h-8"
                        onClick={() => setActiveView('presences')}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded mr-2"></div>
                        Presences
                      </Button>
                      <Button
                        variant={activeView === 'todos' ? 'default' : 'outline'}
                        className="justify-start text-xs h-8"
                        onClick={() => setActiveView('todos')}
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded mr-2"></div>
                        To-Dos
                      </Button>
                      <Button
                        variant={activeView === 'meds' ? 'default' : 'outline'}
                        className="justify-start text-xs h-8 col-span-2"
                        onClick={() => setActiveView('meds')}
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded mr-2"></div>
                        Meds Only
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Calendar - Mobile */}
                <Card className="flex-1">
                  <CardContent className="p-2">
                    <WeeklyCalendarView activeFilter={activeView} viewType={viewType} />
                  </CardContent>
                </Card>

                {/* Quick Actions - Mobile */}
                <QuickActions />

                {/* Notes Section - Mobile */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
                        Remember to pick up prescription for Mom
                      </div>
                      <div className="p-2 bg-blue-50 border border-blue-200 rounded text-blue-800">
                        Dr. appointment scheduled for next week
                      </div>
                      <div className="p-2 bg-green-50 border border-green-200 rounded text-green-800">
                        Physical therapy showing great progress
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Desktop Layout */
              <div className="grid grid-cols-12 gap-4 h-full">
                {/* Left Sidebar - Categories and View Types */}
                <div className="col-span-2 space-y-4">
                  {/* View Type Selector */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        View
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 p-3">
                      <Button
                        variant={viewType === 'daily' ? 'default' : 'outline'}
                        className="w-full justify-start text-xs h-8"
                        onClick={() => setViewType('daily')}
                      >
                        Daily
                      </Button>
                      <Button
                        variant={viewType === 'weekly' ? 'default' : 'outline'}
                        className="w-full justify-start text-xs h-8"
                        onClick={() => setViewType('weekly')}
                      >
                        Weekly
                      </Button>
                      <Button
                        variant={viewType === 'monthly' ? 'default' : 'outline'}
                        className="w-full justify-start text-xs h-8"
                        onClick={() => setViewType('monthly')}
                      >
                        Monthly
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Categories */}
                  <Card className="flex-1">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 p-3">
                      <Button
                        variant={activeView === 'all' ? 'default' : 'outline'}
                        className="w-full justify-start text-xs h-8"
                        onClick={() => setActiveView('all')}
                      >
                        <div className="w-2 h-2 bg-gray-500 rounded mr-2"></div>
                        All Events
                      </Button>
                      <Button
                        variant={activeView === 'caregivers' ? 'default' : 'outline'}
                        className="w-full justify-start text-xs h-8"
                        onClick={() => setActiveView('caregivers')}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded mr-2"></div>
                        Caregivers
                      </Button>
                      <Button
                        variant={activeView === 'presences' ? 'default' : 'outline'}
                        className="w-full justify-start text-xs h-8"
                        onClick={() => setActiveView('presences')}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded mr-2"></div>
                        Presences
                      </Button>
                      <Button
                        variant={activeView === 'todos' ? 'default' : 'outline'}
                        className="w-full justify-start text-xs h-8"
                        onClick={() => setActiveView('todos')}
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded mr-2"></div>
                        To-Dos
                      </Button>
                      <Button
                        variant={activeView === 'meds' ? 'default' : 'outline'}
                        className="w-full justify-start text-xs h-8"
                        onClick={() => setActiveView('meds')}
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded mr-2"></div>
                        Meds Only
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content - Calendar */}
                <div className="col-span-7">
                  <WeeklyCalendarView activeFilter={activeView} viewType={viewType} />
                </div>

                {/* Right Sidebar - Notes and Quick Actions */}
                <div className="col-span-3 space-y-4">
                  {/* Notes Section */}
                  <Card className="flex-1">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Notes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
                          Remember to pick up prescription for Mom
                        </div>
                        <div className="p-2 bg-blue-50 border border-blue-200 rounded text-blue-800">
                          Dr. appointment scheduled for next week
                        </div>
                        <div className="p-2 bg-green-50 border border-green-200 rounded text-green-800">
                          Physical therapy showing great progress
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <QuickActions />
                </div>
              </div>
            )}
          </TabsContent>

          {/* Calendar & Events Tab */}
          <TabsContent value="calendar" className="flex-1 overflow-hidden">
            <div className="bg-white rounded-xl p-3 sm:p-6 flex-1 flex flex-col overflow-hidden h-full">
              {isMobile ? (
                // Mobile view
                <div className="h-full overflow-y-auto pb-24 flex flex-col">
                  {/* Page Title and Add Event Button */}
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-rezilia-purple">Calendar</h1>
                    <Button 
                      onClick={() => setIsAddEventDialogOpen(true)}
                      className="bg-rezilia-purple hover:bg-rezilia-purple/90 text-white rounded-full shadow-lg"
                      size="sm"
                    >
                      <CalendarPlus className="mr-2 h-5 w-5" />
                      <span>Add Event</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-4 mb-10">
                    <CalendarSection eventDates={eventDates} />
                    <DailyEvents onAddEvent={() => setIsAddEventDialogOpen(true)} />
                    <UpcomingEvents />
                  </div>
                </div>
              ) : (
                // Desktop view
                <div className="flex flex-col space-y-6 h-full overflow-hidden flex-1">
                  {/* Page Title and Add Event Button */}
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-rezilia-purple">Calendar</h1>
                    <Button 
                      onClick={() => setIsAddEventDialogOpen(true)}
                      className="bg-rezilia-purple hover:bg-rezilia-purple/90 text-white rounded-full shadow-lg"
                    >
                      <CalendarPlus className="mr-2 h-5 w-5" />
                      <span>Add Event</span>
                    </Button>
                  </div>

                  {/* Calendar Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden flex-1 h-full">
                    <div className="lg:col-span-3 overflow-hidden">
                      <CalendarSection eventDates={eventDates} />
                    </div>
                    <div className="flex flex-col space-y-6 overflow-y-auto h-full pr-2">
                      <DailyEvents onAddEvent={() => setIsAddEventDialogOpen(true)} />
                      <UpcomingEvents />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Event Dialog */}
        <EventFormDialog 
          isOpen={isAddEventDialogOpen} 
          onOpenChange={setIsAddEventDialogOpen} 
        />

        {/* Calendar Styles */}
        <CalendarStyles />
      </div>

      {isMobile && <MobileNav activePage={activePage} onNavigate={handleNavigate} />}
    </div>
  );
};

export default SimpliciaPage;
