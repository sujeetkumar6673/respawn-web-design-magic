
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Mom Card - Takes 1 column */}
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
      
      {/* Notes Card - Takes 1 column */}
      <Card className="h-64 sm:h-64 md:h-80 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="py-3 px-4 bg-blue-600 text-white">
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <h3 className="font-bold text-sm">Notes</h3>
          </div>
        </CardHeader>
        <ScrollArea className="h-[calc(100%-50px)]">
          <CardContent className="p-4">
            <ul className="space-y-3">
              {notesItems.map((note, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </ScrollArea>
      </Card>

      {/* Groceries & Shopping Card - Takes 1 column */}
      <Card className="h-64 sm:h-64 md:h-80 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="py-3 px-4 bg-green-600 text-white">
          <div className="flex items-center gap-2">
            <span className="text-lg">🛒</span>
            <h3 className="font-bold text-sm">Groceries & Shopping</h3>
          </div>
        </CardHeader>
        <ScrollArea className="h-[calc(100%-50px)]">
          <CardContent className="p-4">
            <ul className="space-y-3">
              {groceryItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default PersonalSection;
