
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HeartIcon } from './Icons';
import { ScrollArea } from '@/components/ui/scroll-area';

const PersonalSection: React.FC = () => {
  const personalItems = [
    { 
      id: 'talk',
      title: 'Talk :) - Where Life Connects',
      icon: '💬',
      type: 'mom'
    },
    { 
      id: 'medication',
      title: 'Medication',
      icon: '💊',
      type: 'mom'
    },
    { 
      id: 'expenses',
      title: 'Expenses',
      icon: '📊',
      badge: '7d'
    },
    { 
      id: 'partners',
      title: 'Partners Offers',
      icon: '🎁',
      type: 'mom'
    }
  ];

  const notesItems = [
    'Remember to ask doctor about medication side effects',
    'Workout schedule with Michael',
    'Need to schedule eye exam - check available dates with Dr.L'
  ];

  const groceryItems = [
    'tomato (for salads)',
    'whole grain bread',
    'pick up fresh bananas',
    'olive oil',
    'read more cereals, peanut butter, and herbal tea'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card className="overflow-hidden h-64 sm:h-64 md:h-80">
        <CardHeader className="bg-rezilia-pink bg-opacity-20 py-2 px-3 flex flex-row items-center gap-2">
          <HeartIcon />
          <h3 className="font-bold text-sm">Mom - Jane.D</h3>
        </CardHeader>
        <ScrollArea className="h-[calc(100%-42px)]">
          <CardContent className="p-0">
            {personalItems.map(item => (
              <div key={item.id} className="p-2 border-b flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <span className="text-lg sm:text-xl">{item.icon}</span>
                <span className="text-sm">{item.title}</span>
                {item.badge && (
                  <span className="ml-auto badge badge-orange text-xs">{item.badge}</span>
                )}
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
      
      <Card className="h-64 sm:h-64 md:h-80">
        <CardHeader className="py-2 px-3 flex flex-row items-center gap-2">
          <span className="text-lg sm:text-xl">📝</span>
          <h3 className="font-bold text-sm">Notes</h3>
        </CardHeader>
        <ScrollArea className="h-[calc(100%-42px)]">
          <CardContent className="p-3">
            <ul className="list-disc pl-4 space-y-1.5">
              {notesItems.map((note, index) => (
                <li key={index} className="text-sm">{note}</li>
              ))}
            </ul>

            <div className="mt-3">
              <h4 className="font-medium text-sm mb-2">Groceries & Shopping</h4>
              <ul className="list-disc pl-4 space-y-1.5">
                {groceryItems.map((item, index) => (
                  <li key={index} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default PersonalSection;
