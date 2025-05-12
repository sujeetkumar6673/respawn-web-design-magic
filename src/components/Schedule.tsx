
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, isEqual, parse, isValid } from 'date-fns';
import { useCalendarContext } from '@/contexts/CalendarContext';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  color: string;
  borderColor: string;
  date: Date;
}

const allScheduleItems: ScheduleItem[] = [
  // Today's tasks
  {
    id: 'meditation',
    time: '08:00 am',
    title: 'Meditation and mindfulness',
    subtitle: 'Running',
    color: 'bg-[#D7F8E3]',
    borderColor: '#42BD7D',
    date: new Date()
  },
  {
    id: 'breakfast',
    time: '09:45 am',
    title: 'Breakfast with Mom',
    subtitle: 'Check Groceries List',
    color: 'bg-[#FFE6D5]',
    borderColor: '#FF8651',
    date: new Date()
  },
  {
    id: 'meeting',
    time: '10:50 am',
    title: 'Online meeting',
    color: 'bg-[#FFD6DE]',
    borderColor: '#FF5A74',
    date: new Date()
  },
  {
    id: 'doctor',
    time: '14:30 pm',
    title: 'Mom\'s Doctor Appointment',
    color: 'bg-[#EBE3FF]',
    borderColor: '#7B5AC5',
    date: new Date()
  },
  
  // Tomorrow's tasks
  {
    id: 'yoga',
    time: '08:30 am',
    title: 'Yoga session',
    subtitle: 'Living Room',
    color: 'bg-[#D7F8E3]',
    borderColor: '#42BD7D',
    date: new Date(new Date().setDate(new Date().getDate() + 1))
  },
  {
    id: 'shopping',
    time: '11:00 am',
    title: 'Grocery Shopping',
    subtitle: 'Central Market',
    color: 'bg-[#FFE6D5]',
    borderColor: '#FF8651',
    date: new Date(new Date().setDate(new Date().getDate() + 1))
  },
  
  // Day after tomorrow
  {
    id: 'gardening',
    time: '09:00 am',
    title: 'Gardening',
    subtitle: 'Backyard',
    color: 'bg-[#D7F8E3]',
    borderColor: '#42BD7D',
    date: new Date(new Date().setDate(new Date().getDate() + 3))
  },
  
  // Day after day after tomorrow
  {
    id: 'coffee',
    time: '10:00 am',
    title: 'Coffee with Friends',
    subtitle: 'Downtown Cafe',
    color: 'bg-[#FFE6D5]',
    borderColor: '#FF8651',
    date: new Date(new Date().setDate(new Date().getDate() + 7))
  },
  {
    id: 'cinema',
    time: '18:00 pm',
    title: 'Cinema with Grandchildren',
    subtitle: 'City Mall',
    color: 'bg-[#FFD6DE]',
    borderColor: '#FF5A74',
    date: new Date(new Date().setDate(new Date().getDate() + 7))
  },
  
  // Two weeks from now
  {
    id: 'family-dinner',
    time: '17:00 pm',
    title: 'Family Dinner',
    subtitle: 'Home',
    color: 'bg-[#EBE3FF]',
    borderColor: '#7B5AC5',
    date: new Date(new Date().setDate(new Date().getDate() + 14))
  },
  
  // 18 days from now
  {
    id: 'book-club',
    time: '16:00 pm',
    title: 'Book Club Meeting',
    subtitle: 'Community Center',
    color: 'bg-[#D7F8E3]',
    borderColor: '#42BD7D',
    date: new Date(new Date().setDate(new Date().getDate() + 18))
  },
  {
    id: 'check-up',
    time: '11:30 am',
    title: 'Annual Health Check-up',
    subtitle: 'Central Hospital',
    color: 'bg-[#FFD6DE]',
    borderColor: '#FF5A74',
    date: new Date(new Date().setDate(new Date().getDate() + 18))
  }
];

const Schedule: React.FC = () => {
  const isMobile = useIsMobile();
  const { selectedDate } = useCalendarContext();
  
  // Filter schedule items for the selected date
  const scheduleItems = allScheduleItems.filter(item => 
    isEqual(
      new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()),
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    )
  );
  
  const upcomingItems = allScheduleItems.filter(item => 
    item.date > selectedDate && 
    !isEqual(
      new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()),
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    )
  ).slice(0, 3); // Just get the next 3 upcoming tasks regardless of date

  // Determine time column width based on device
  const timeColWidth = isMobile ? "w-12" : "w-24";
  const fontSize = isMobile ? "text-xs" : "text-sm";
  
  return (
    <div className={`mt-2 sm:mt-4 ${isMobile ? 'px-0' : 'px-1 sm:px-0'}`}>
      <div className="mb-2 sm:mb-4 flex justify-between items-center">
        <h3 className="font-bold text-gray-800 text-sm sm:text-base">
          {isEqual(
            new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()),
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
          ) ? 'TODAY' : format(selectedDate, 'MMMM d, yyyy').toUpperCase()}
        </h3>
        <span className="text-xs text-gray-500">
          {scheduleItems.length} task{scheduleItems.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="relative">
        {scheduleItems.length > 0 ? (
          scheduleItems.map((item) => (
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
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No tasks scheduled for this day</p>
          </div>
        )}
      </div>

      {upcomingItems.length > 0 && (
        <>
          <div className="mt-4 sm:mt-8 mb-2 sm:mb-4">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">UPCOMING</h3>
          </div>
          <div className="relative">        
            {upcomingItems.map((item) => (
              <div key={item.id} className="flex mb-2 sm:mb-4">
                <div className={`${timeColWidth} relative`}>
                  <div className={`${fontSize} text-gray-500 pt-2`}>
                    {format(item.date, 'MMM d')}
                  </div>
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
        </>
      )}
    </div>
  );
};

export default Schedule;
