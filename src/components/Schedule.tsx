
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  color: string;
  borderColor: string;
}

const Schedule: React.FC = () => {
  const scheduleItems: ScheduleItem[] = [
    {
      id: 'meditation',
      time: '08:00 am',
      title: 'Meditation and mindfulness',
      subtitle: 'Running',
      color: 'bg-[#F2FCE2]',
      borderColor: 'border-l-green-500'
    },
    {
      id: 'breakfast',
      time: '09:45 am',
      title: 'Breakfast with Mom',
      subtitle: 'Check Groceries List',
      color: 'bg-[#FEC6A1]/30',
      borderColor: 'border-l-orange-400'
    },
    {
      id: 'meeting',
      time: '10:50 am',
      title: 'Online meeting',
      color: 'bg-[#FFDCE5]',
      borderColor: 'border-l-red-500'
    }
  ];

  const upcomingItems: ScheduleItem[] = [
    {
      id: 'doctor',
      time: '',
      title: 'Mom\'s Doctor Appointment',
      color: 'bg-[#E5DEFF]',
      borderColor: 'border-l-purple-500'
    }
  ];

  return (
    <div className="mt-4">
      <div className="mb-2">
        <h3 className="font-bold text-gray-800 px-1">TODAY</h3>
      </div>
      <div className="space-y-3">
        {scheduleItems.map(item => (
          <div key={item.id} className="flex">
            <div className="w-24 text-sm text-gray-500 pt-2">{item.time}</div>
            <div className={`flex-1 p-3 rounded-md ${item.color} border-l-4 ${item.borderColor}`}>
              <div className="font-medium">{item.title}</div>
              {item.subtitle && <div className="text-sm text-gray-600">{item.subtitle}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 mb-2">
        <h3 className="font-bold text-gray-800 px-1">UPCOMING</h3>
      </div>
      <div className="space-y-3">
        {upcomingItems.map(item => (
          <div key={item.id} className="flex">
            {item.time && (
              <div className="w-24 text-sm text-gray-500 pt-2">{item.time}</div>
            )}
            <div className={`flex-1 p-3 rounded-md ${item.color} border-l-4 ${item.borderColor}
              ${!item.time ? 'ml-24' : ''}`}>
              <div className="font-medium">{item.title}</div>
              {item.subtitle && <div className="text-sm text-gray-600">{item.subtitle}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
