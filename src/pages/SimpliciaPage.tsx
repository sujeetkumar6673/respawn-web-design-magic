
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SimpliciaBadge } from '@/components/Icons';
import { CalendarPlus, Users, Clock, CheckSquare, Pill } from 'lucide-react';
import WeeklyCalendarView from '@/components/simplicia/WeeklyCalendarView';
import CaregiverList from '@/components/simplicia/CaregiverList';
import QuickActions from '@/components/simplicia/QuickActions';

const SimpliciaPage: React.FC = () => {
  const [activeView, setActiveView] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activePage="simplicia" />
      
      <div className="flex-1 ml-[220px] p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8">
              <SimpliciaBadge />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Simplicia</h1>
          </div>
          <p className="text-gray-600">Care coordination and family presence management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeView === 'all' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setActiveView('all')}
                >
                  <div className="w-3 h-3 bg-gray-500 rounded mr-2"></div>
                  All Events
                </Button>
                <Button
                  variant={activeView === 'caregivers' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setActiveView('caregivers')}
                >
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  Caregivers
                </Button>
                <Button
                  variant={activeView === 'presences' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setActiveView('presences')}
                >
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  Presences
                </Button>
                <Button
                  variant={activeView === 'todos' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setActiveView('todos')}
                >
                  <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                  To-Dos
                </Button>
                <Button
                  variant={activeView === 'meds' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setActiveView('meds')}
                >
                  <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                  Meds Only
                </Button>
              </CardContent>
            </Card>

            <CaregiverList />
          </div>

          {/* Main Content - Weekly Calendar */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Weekly Schedule</h2>
              <Button className="bg-rezilia-purple hover:bg-rezilia-purple/90">
                <CalendarPlus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>

            <WeeklyCalendarView activeFilter={activeView} />

            {/* Quick Actions */}
            <div className="mt-6">
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpliciaPage;
