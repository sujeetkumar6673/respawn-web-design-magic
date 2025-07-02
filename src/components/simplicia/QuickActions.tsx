
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, CheckSquare, Pill, CalendarPlus, Phone } from 'lucide-react';
import ScheduleCaregiverModal from './modals/ScheduleCaregiverModal';
import PlanVisitModal from './modals/PlanVisitModal';
import AddTaskModal from './modals/AddTaskModal';
import MedicationReminderModal from './modals/MedicationReminderModal';
import EmergencyContactModal from './modals/EmergencyContactModal';
import CalendarModal from './modals/CalendarModal';
import { useIsMobile } from '@/hooks/use-mobile';

const QuickActions: React.FC = () => {
  // State to track which modal is open
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Function to close all modals
  const closeAllModals = () => setActiveModal(null);

  // Action definitions
  const actions = [
    {
      id: 'add-caregiver',
      title: 'Schedule Caregiver',
      description: 'Book a nurse or home health aide',
      icon: Users,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'add-presence',
      title: 'Plan Family Visit',
      description: 'Schedule family member presence',
      icon: Clock,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'add-todo',
      title: 'Add Task',
      description: 'Create a to-do item',
      icon: CheckSquare,
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'add-med',
      title: 'Medication Reminder',
      description: 'Set medicine schedule',
      icon: Pill,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'emergency',
      title: 'Emergency Contact',
      description: 'Quick access to emergency services',
      icon: Phone,
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'calendar',
      title: 'View Full Calendar',
      description: 'Open detailed calendar view',
      icon: CalendarPlus,
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  // Calculate button sizes based on screen width
  const buttonHeight = isMobile ? 'h-24' : 'h-28';
  const iconSize = isMobile ? 'w-5 h-5' : 'w-6 h-6';
  const fontSize = isMobile ? 'text-xs' : 'text-sm';
  const descriptionSize = isMobile ? 'text-[10px]' : 'text-xs';

  // Handle click on action button
  const handleActionClick = (id: string) => {
    console.log('Action clicked:', id);
    setActiveModal(id);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {actions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className={`${buttonHeight} flex flex-col items-center justify-center p-2 text-white border-0 ${action.color} overflow-hidden`}
                  onClick={() => handleActionClick(action.id)}
                >
                  <IconComponent className={`${iconSize} mb-1`} />
                  <span className={`${fontSize} font-medium text-center leading-tight px-1 mb-0.5`}>
                    {action.title}
                  </span>
                  <span className={`${descriptionSize} opacity-90 text-center leading-tight px-1`}>
                    {action.description}
                  </span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modal Components */}
      <ScheduleCaregiverModal 
        isOpen={activeModal === 'add-caregiver'} 
        onOpenChange={(open) => !open && closeAllModals()}
      />

      <PlanVisitModal
        isOpen={activeModal === 'add-presence'} 
        onOpenChange={(open) => !open && closeAllModals()}
      />

      <AddTaskModal
        isOpen={activeModal === 'add-todo'} 
        onOpenChange={(open) => !open && closeAllModals()}
      />

      <MedicationReminderModal
        isOpen={activeModal === 'add-med'} 
        onOpenChange={(open) => !open && closeAllModals()}
      />

      <EmergencyContactModal
        isOpen={activeModal === 'emergency'} 
        onOpenChange={(open) => !open && closeAllModals()}
      />

      <CalendarModal
        isOpen={activeModal === 'calendar'} 
        onOpenChange={(open) => !open && closeAllModals()}
      />
    </>
  );
};

export default QuickActions;
