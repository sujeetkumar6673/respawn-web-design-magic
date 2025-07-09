
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCalendarContext } from '@/contexts/CalendarContext';
import EventFormDialog from '@/components/calendar/EventFormDialog';
import CalendarStyles from '@/components/calendar/CalendarStyles';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import FullCalendarView from '@/components/simplicia/FullCalendarView';

const SimpliciaPage: React.FC = () => {
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState('simplicia');

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {!isMobile && <Sidebar activePage={activePage} />}
      
      <div className={`flex-1 ${!isMobile ? 'ml-[220px]' : ''} p-4 h-screen overflow-hidden`}>
        {/* Header */}
        <div className="mb-4">
          <Header pageTitle="Simplicia" pageDescription="Care coordination and family presence management" />
        </div>

        {/* Main Content - Full Calendar Layout */}
        <div className="bg-white rounded-xl p-3 sm:p-6 flex-1 flex flex-col overflow-hidden h-[calc(100vh-160px)]">
          {/* Calendar Header with Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-rezilia-purple">Care Coordination</h1>
              <Button 
                onClick={() => setIsAddEventDialogOpen(true)}
                className="bg-rezilia-purple hover:bg-rezilia-purple/90 text-white rounded-full shadow-lg"
                size={isMobile ? "sm" : "default"}
              >
                <CalendarPlus className="mr-2 h-5 w-5" />
                <span>Add Event</span>
              </Button>
            </div>

            {/* Filter and View Controls */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Filter Options */}
              <ToggleGroup 
                type="single" 
                value={activeFilter} 
                onValueChange={(value) => value && setActiveFilter(value)}
                className="justify-start flex-wrap gap-1"
              >
                <ToggleGroupItem value="all" aria-label="All events" className="text-xs px-3 py-1">
                  All
                </ToggleGroupItem>
                <ToggleGroupItem value="caregivers" aria-label="Caregivers" className="text-xs px-3 py-1">
                  Caregivers
                </ToggleGroupItem>
                <ToggleGroupItem value="presences" aria-label="Family Presence" className="text-xs px-3 py-1">
                  Presence
                </ToggleGroupItem>
                <ToggleGroupItem value="todos" aria-label="To-dos" className="text-xs px-3 py-1">
                  To-dos
                </ToggleGroupItem>
                <ToggleGroupItem value="meds" aria-label="Medications" className="text-xs px-3 py-1">
                  Meds
                </ToggleGroupItem>
              </ToggleGroup>

              {/* View Type Toggle */}
              <ToggleGroup 
                type="single" 
                value={viewType} 
                onValueChange={(value) => value && setViewType(value as 'daily' | 'weekly' | 'monthly')}
                className="justify-start"
              >
                <ToggleGroupItem value="daily" aria-label="Daily view" className="text-xs px-3 py-1">
                  Daily
                </ToggleGroupItem>
                <ToggleGroupItem value="weekly" aria-label="Weekly view" className="text-xs px-3 py-1">
                  Weekly
                </ToggleGroupItem>
                <ToggleGroupItem value="monthly" aria-label="Monthly view" className="text-xs px-3 py-1">
                  Monthly
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {/* Full Calendar View */}
          <div className="flex-1 overflow-hidden">
            <FullCalendarView activeFilter={activeFilter} viewType={viewType} />
          </div>
        </div>

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
