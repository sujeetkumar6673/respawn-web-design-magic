
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  color: string;
  borderColor: string;
}

const Schedule: React.FC = () => {
  const isMobile = useIsMobile();
  
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

  // Determine time column width based on device
  const timeColWidth = isMobile ? "w-16" : "w-24";

  return (
    <div className="mt-4 px-1 sm:px-0">
      <div className="mb-4">
        <h3 className="font-bold text-gray-800">TODAY</h3>
      </div>
      <div className="relative">
        {scheduleItems.map((item, index) => (
          <div key={item.id} className="relative mb-8 last:mb-4">
            <div className="flex">
              {/* Time column */}
              <div className={`${timeColWidth} relative`}>
                <div className="text-sm text-gray-500 pt-2">{item.time}</div>
                
                {/* Vertical line */}
                {index < scheduleItems.length - 1 && (
                  <div 
                    className="absolute left-[7px] top-7 w-0.5 h-[calc(100%+16px)]" 
                    style={{ backgroundColor: item.borderColor }}
                  ></div>
                )}
              </div>
              
              {/* Task card */}
              <div className="flex-1">
                <div 
                  className={`pl-4 py-3 pr-3 rounded-r-md ${item.color}`}
                  style={{ borderLeft: `4px solid ${item.borderColor}` }}
                >
                  <div className="font-medium text-gray-800">{item.title}</div>
                  {item.subtitle && <div className="text-sm text-gray-600 mt-1">{item.subtitle}</div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 mb-4">
        <h3 className="font-bold text-gray-800">UPCOMING</h3>
      </div>
      <div className="relative">        
        {/* Upcoming items */}
        {upcomingItems.map((item) => (
          <div key={item.id} className="flex mb-4">
            <div className={`${timeColWidth} relative`}>
              <div className="text-sm text-gray-500 pt-2">{item.time}</div>
              {/* Vertical line for upcoming items if needed */}
              <div 
                className="absolute left-[7px] top-2 bottom-0 w-0.5 h-full" 
                style={{ backgroundColor: item.borderColor }}
              ></div>
            </div>
            <div className="flex-1">
              <div 
                className={`pl-4 py-3 pr-3 rounded-r-md ${item.color}`}
                style={{ borderLeft: `4px solid ${item.borderColor}` }}
              >
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
