
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HeartIcon } from './Icons';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="overflow-hidden">
        <CardHeader className="bg-rezilia-pink bg-opacity-20 py-2 px-4 flex flex-row items-center gap-2">
          <HeartIcon />
          <h3 className="font-bold">Mom - Jane.D</h3>
        </CardHeader>
        <CardContent className="p-0">
          {personalItems.map(item => (
            <div key={item.id} className="p-3 border-b flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
              {item.badge && (
                <span className="ml-auto badge badge-orange">{item.badge}</span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-2 px-4 flex flex-row items-center gap-2">
          <span className="text-xl">📝</span>
          <h3 className="font-bold">Notes</h3>
        </CardHeader>
        <CardContent className="p-4">
          <ul className="list-disc pl-5 space-y-1">
            {notesItems.map((note, index) => (
              <li key={index} className="text-sm">{note}</li>
            ))}
          </ul>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Groceries & Shopping</h4>
            <ul className="list-disc pl-5 space-y-1">
              {groceryItems.map((item, index) => (
                <li key={index} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalSection;
