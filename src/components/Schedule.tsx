
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
  const timeColWidth = isMobile ? "w-12" : "w-24";
  const fontSize = isMobile ? "text-xs" : "text-sm";
  
  return (
    <div className={`mt-2 sm:mt-4 ${isMobile ? 'px-0' : 'px-1 sm:px-0'}`}>
      <div className="mb-2 sm:mb-4">
        <h3 className="font-bold text-gray-800 text-sm sm:text-base">TODAY</h3>
      </div>
      <div className="relative">
        {scheduleItems.map((item) => (
          <div key={item.id} className="relative mb-2 sm:mb-4">
            <div className="flex">
              {/* Time column */}
              <div className={`${timeColWidth} relative`}>
                <div className={`${fontSize} text-gray-500 pt-2`}>{item.time}</div>
              </div>
              
              {/* Task card */}
              <div className="flex-1">
                <div 
                  className={`pl-3 sm:pl-4 py-2 sm:py-3 pr-2 sm:pr-3 rounded-r-md ${item.color}`}
                  style={{ borderLeft: `4px solid ${item.borderColor}` }}
                >
                  <div className={`font-medium text-gray-800 ${fontSize}`}>{item.title}</div>
                  {item.subtitle && <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>{item.subtitle}</div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-8 mb-2 sm:mb-4">
        <h3 className="font-bold text-gray-800 text-sm sm:text-base">UPCOMING</h3>
      </div>
      <div className="relative">        
        {/* Upcoming items */}
        {upcomingItems.map((item) => (
          <div key={item.id} className="flex mb-2 sm:mb-4">
            <div className={`${timeColWidth} relative`}>
              <div className={`${fontSize} text-gray-500 pt-2`}>{item.time}</div>
            </div>
            <div className="flex-1">
              <div 
                className={`pl-3 sm:pl-4 py-2 sm:py-3 pr-2 sm:pr-3 rounded-r-md ${item.color}`}
                style={{ borderLeft: `4px solid ${item.borderColor}` }}
              >
                <div className={`font-medium text-gray-800 ${fontSize}`}>{item.title}</div>
                {item.subtitle && <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>{item.subtitle}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
