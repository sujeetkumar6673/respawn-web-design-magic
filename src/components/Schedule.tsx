
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  color: string;
}

const Schedule: React.FC = () => {
  const scheduleItems: ScheduleItem[] = [
    {
      id: 'meditation',
      time: '08:00 am',
      title: 'Meditation and mindfulness',
      subtitle: 'Running',
      color: 'bg-rezilia-lightblue'
    },
    {
      id: 'breakfast',
      time: '09:45 am',
      title: 'Breakfast with Mom',
      subtitle: 'Check Groceries List',
      color: 'bg-rezilia-pink'
    },
    {
      id: 'meeting',
      time: '10:50 am',
      title: 'Online meeting',
      color: 'bg-rezilia-pink'
    }
  ];

  const upcomingItems: ScheduleItem[] = [
    {
      id: 'doctor',
      time: '',
      title: 'Mom\'s Doctor Appointment',
      color: 'bg-rezilia-purple'
    }
  ];

  return (
    <div>
      <Card>
        <CardHeader className="py-2 px-4">
          <h3 className="font-bold">TODAY</h3>
        </CardHeader>
        <CardContent className="p-3">
          {scheduleItems.map(item => (
            <div key={item.id} className="flex mb-3">
              <div className="w-24 text-sm text-gray-500 pt-1">{item.time}</div>
              <div className={`flex-1 schedule-item ${item.color} border-l-rezilia-purple`}>
                <div className="font-medium">{item.title}</div>
                {item.subtitle && <div className="text-sm">{item.subtitle}</div>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader className="py-2 px-4">
          <h3 className="font-bold">UPCOMING</h3>
        </CardHeader>
        <CardContent className="p-3">
          {upcomingItems.map(item => (
            <div key={item.id} className={`schedule-item ${item.color} border-l-rezilia-purple`}>
              <div className="font-medium">{item.title}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;
