
import React from 'react';
import { Separator } from "@/components/ui/separator";

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
      color: 'bg-[#D7F8E3]',
      borderColor: '#42BD7D'
    },
    {
      id: 'breakfast',
      time: '09:45 am',
      title: 'Breakfast with Mom',
      subtitle: 'Check Groceries List',
      color: 'bg-[#FFE6D5]',
      borderColor: '#FF8651'
    },
    {
      id: 'meeting',
      time: '10:50 am',
      title: 'Online meeting',
      color: 'bg-[#FFD6DE]',
      borderColor: '#FF5A74'
    }
  ];

  const upcomingItems: ScheduleItem[] = [
    {
      id: 'doctor',
      time: '',
      title: 'Mom\'s Doctor Appointment',
      color: 'bg-[#EBE3FF]',
      borderColor: '#7B5AC5'
    }
  ];

  return (
    <div className="mt-4">
      <div className="mb-4">
        <h3 className="font-bold text-gray-800 px-1">TODAY</h3>
      </div>
      <div>
        {scheduleItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex">
              <div className="w-20 text-sm text-gray-500 pt-2">{item.time}</div>
              <div className="relative flex-1">
                <div 
                  className={`h-full pl-5 py-3 pr-3 rounded-r-md ${item.color}`}
                  style={{ borderLeft: `4px solid ${item.borderColor}` }}
                >
                  <div className="font-medium text-gray-800">{item.title}</div>
                  {item.subtitle && <div className="text-sm text-gray-600 mt-1">{item.subtitle}</div>}
                </div>
              </div>
            </div>
            {index < scheduleItems.length - 1 && (
              <div className="pl-20 pr-0 py-2">
                <Separator className="bg-gray-200" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-8 mb-4">
        <h3 className="font-bold text-gray-800 px-1">UPCOMING</h3>
      </div>
      <div>
        {upcomingItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex">
              <div className="w-20 text-sm text-gray-500 pt-2">
                {/* Placeholder for alignment */}
              </div>
              <div className="relative flex-1">
                <div 
                  className={`h-full pl-5 py-3 pr-3 rounded-r-md ${item.color}`}
                  style={{ borderLeft: `4px solid ${item.borderColor}` }}
                >
                  <div className="font-medium text-gray-800">{item.title}</div>
                  {item.subtitle && <div className="text-sm text-gray-600 mt-1">{item.subtitle}</div>}
                </div>
              </div>
            </div>
            {index < upcomingItems.length - 1 && (
              <div className="pl-20 pr-0 py-2">
                <Separator className="bg-gray-200" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
