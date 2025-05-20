
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HeartIcon } from './Icons';

const PersonalSection: React.FC = () => {
  const personalItems = [
    { 
      id: 'talk',
      title: 'Talk',
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
    }
  ];

  const notesItems = [
    'Remember to ask doctor about medication',
    'Workout schedule with Michael'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card className="overflow-hidden">
        <CardHeader className="bg-rezilia-pink bg-opacity-20 py-1 px-3 flex flex-row items-center gap-2">
          <HeartIcon />
          <h3 className="font-bold text-sm">Mom - Jane.D</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col divide-y">
            {personalItems.map(item => (
              <div key={item.id} className="p-2 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.title}</span>
                {item.badge && (
                  <span className="ml-auto badge badge-orange">{item.badge}</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-1 px-3 flex flex-row items-center gap-2">
          <span className="text-lg">📝</span>
          <h3 className="font-bold text-sm">Notes</h3>
        </CardHeader>
        <CardContent className="p-3">
          <ul className="list-disc pl-4 space-y-1">
            {notesItems.map((note, index) => (
              <li key={index} className="text-xs">{note}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalSection;
