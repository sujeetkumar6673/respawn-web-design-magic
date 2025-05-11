
import React from 'react';

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
      borderColor: 'border-l-[#42BD7D]'
    },
    {
      id: 'breakfast',
      time: '09:45 am',
      title: 'Breakfast with Mom',
      subtitle: 'Check Groceries List',
      color: 'bg-[#FFE6D5]',
      borderColor: 'border-l-[#FF8651]'
    },
    {
      id: 'meeting',
      time: '10:50 am',
      title: 'Online meeting',
      color: 'bg-[#FFD6DE]',
      borderColor: 'border-l-[#FF5A74]'
    }
  ];

  const upcomingItems: ScheduleItem[] = [
    {
      id: 'doctor',
      time: '',
      title: 'Mom\'s Doctor Appointment',
      color: 'bg-[#EBE3FF]',
      borderColor: 'border-l-[#7B5AC5]'
    }
  ];

  return (
    <div className="mt-4">
      <div className="mb-4">
        <h3 className="font-bold text-gray-800 px-1">TODAY</h3>
      </div>
      <div className="space-y-4">
        {scheduleItems.map(item => (
          <div key={item.id} className="flex">
            <div className="w-20 text-sm text-gray-500 pt-2">{item.time}</div>
            <div className="relative flex-1">
              {/* Using actual border and correct solid color */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-2`} 
                style={{ backgroundColor: item.borderColor.replace('border-l-', '') }}
              ></div>
              <div className={`h-full pl-5 py-3 pr-3 rounded-md ${item.color}`}>
                <div className="font-medium text-gray-800">{item.title}</div>
                {item.subtitle && <div className="text-sm text-gray-600 mt-1">{item.subtitle}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 mb-4">
        <h3 className="font-bold text-gray-800 px-1">UPCOMING</h3>
      </div>
      <div className="space-y-4">
        {upcomingItems.map(item => (
          <div key={item.id} className="flex">
            <div className="w-20 text-sm text-gray-500 pt-2">
              {/* Placeholder for alignment */}
            </div>
            <div className="relative flex-1">
              {/* Using actual border and correct solid color */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-2`} 
                style={{ backgroundColor: item.borderColor.replace('border-l-', '') }}
              ></div>
              <div className={`h-full pl-5 py-3 pr-3 rounded-md ${item.color}`}>
                <div className="font-medium text-gray-800">{item.title}</div>
                {item.subtitle && <div className="text-sm text-gray-600 mt-1">{item.subtitle}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
