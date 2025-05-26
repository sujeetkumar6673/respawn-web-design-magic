
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Phone } from 'lucide-react';

interface Caregiver {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'busy' | 'offline';
  nextVisit?: string;
  phone: string;
}

const CaregiverList: React.FC = () => {
  const caregivers: Caregiver[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Registered Nurse',
      status: 'available',
      nextVisit: 'Today 9:00 AM',
      phone: '+1 (555) 123-4567'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      role: 'Primary Care',
      status: 'busy',
      nextVisit: 'Wed 11:00 AM',
      phone: '+1 (555) 234-5678'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      role: 'Physical Therapist',
      status: 'available',
      nextVisit: 'Thu 3:00 PM',
      phone: '+1 (555) 345-6789'
    },
    {
      id: '4',
      name: 'James Wilson',
      role: 'Home Health Aide',
      status: 'offline',
      nextVisit: 'Fri 10:00 AM',
      phone: '+1 (555) 456-7890'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Available Caregivers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {caregivers.map((caregiver) => (
          <div key={caregiver.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="text-sm">
                  {caregiver.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusDot(caregiver.status)} rounded-full border-2 border-white`}></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {caregiver.name}
                </h4>
                <Badge className={`${getStatusColor(caregiver.status)} text-xs`}>
                  {caregiver.status}
                </Badge>
              </div>
              
              <p className="text-xs text-gray-500 mb-2">{caregiver.role}</p>
              
              {caregiver.nextVisit && (
                <div className="flex items-center text-xs text-gray-600 mb-1">
                  <Clock className="w-3 h-3 mr-1" />
                  {caregiver.nextVisit}
                </div>
              )}
              
              <div className="flex items-center text-xs text-gray-600">
                <Phone className="w-3 h-3 mr-1" />
                {caregiver.phone}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CaregiverList;
