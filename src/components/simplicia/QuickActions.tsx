
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

const QuickActions: React.FC = () => {
  // State to track which modal is open
  const [activeModal, setActiveModal] = useState<string | null>(null);

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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {actions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className={`h-20 flex flex-col items-center justify-center space-y-2 text-white border-0 ${action.color}`}
                  onClick={() => setActiveModal(action.id)}
                >
                  <IconComponent className="w-6 h-6" />
                  <div className="text-center">
                    <div className="text-sm font-medium">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
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
