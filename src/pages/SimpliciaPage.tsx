
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SimpliciaBadge } from '@/components/Icons';
import { CalendarPlus, Users, Clock, CheckSquare, Pill } from 'lucide-react';
import WeeklyCalendarView from '@/components/simplicia/WeeklyCalendarView';
import QuickActions from '@/components/simplicia/QuickActions';
import Header from '@/components/Header';

const SimpliciaPage: React.FC = () => {
  const [activeView, setActiveView] = useState('all');
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar activePage="simplicia" />
      
      <div className="flex-1 ml-[220px] p-4 h-screen overflow-hidden">
        {/* Header */}
        <div className="mb-4">
          <Header userName="Nina" pageTitle="Simplicia" pageDescription="Care coordination and family presence management" />
        </div>

        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-240px)]">
          {/* Left Sidebar - Categories and View Types */}
          <div className="col-span-2 space-y-4">
            {/* View Type Selector */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  View
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-3">
                <Button
                  variant={viewType === 'daily' ? 'default' : 'outline'}
                  className="w-full justify-start text-xs h-8"
                  onClick={() => setViewType('daily')}
                >
                  Daily
                </Button>
                <Button
                  variant={viewType === 'weekly' ? 'default' : 'outline'}
                  className="w-full justify-start text-xs h-8"
                  onClick={() => setViewType('weekly')}
                >
                  Weekly
                </Button>
                <Button
                  variant={viewType === 'monthly' ? 'default' : 'outline'}
                  className="w-full justify-start text-xs h-8"
                  onClick={() => setViewType('monthly')}
                >
                  Monthly
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-3">
                <Button
                  variant={activeView === 'all' ? 'default' : 'outline'}
                  className="w-full justify-start text-xs h-8"
                  onClick={() => setActiveView('all')}
                >
                  <div className="w-2 h-2 bg-gray-500 rounded mr-2"></div>
                  All Events
                </Button>
                <Button
                  variant={activeView === 'caregivers' ? 'default' : 'outline'}
                  className="w-full justify-start text-xs h-8"
                  onClick={() => setActiveView('caregivers')}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded mr-2"></div>
                  Caregivers
                </Button>
                <Button
                  variant={activeView === 'presences' ? 'default' : 'outline'}
                  className="w-full justify-start text-xs h-8"
                  onClick={() => setActiveView('presences')}
                >
                  <div className="w-2 h-2 bg-green-500 rounded mr-2"></div>
                  Presences
                </Button>
                <Button
                  variant={activeView === 'todos' ? 'default' : 'outline'}
                  className="w-full justify-start text-xs h-8"
                  onClick={() => setActiveView('todos')}
                >
                  <div className="w-2 h-2 bg-orange-500 rounded mr-2"></div>
                  To-Dos
                </Button>
                <Button
                  variant={activeView === 'meds' ? 'default' : 'outline'}
                  className="w-full justify-start text-xs h-8"
                  onClick={() => setActiveView('meds')}
                >
                  <div className="w-2 h-2 bg-purple-500 rounded mr-2"></div>
                  Meds Only
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Calendar */}
          <div className="col-span-7">
            <WeeklyCalendarView activeFilter={activeView} viewType={viewType} />
          </div>

          {/* Right Sidebar - Notes and Quick Actions */}
          <div className="col-span-3 space-y-4">
            {/* Notes Section */}
            <Card className="flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Notes</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
                    Remember to pick up prescription for Mom
                  </div>
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-blue-800">
                    Dr. appointment scheduled for next week
                  </div>
                  <div className="p-2 bg-green-50 border border-green-200 rounded text-green-800">
                    Physical therapy showing great progress
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1 text-white border-0 bg-blue-500 hover:bg-blue-600">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Schedule Caregiver</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1 text-white border-0 bg-green-500 hover:bg-green-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Plan Visit</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1 text-white border-0 bg-orange-500 hover:bg-orange-600">
                    <CheckSquare className="w-4 h-4" />
                    <span className="text-xs">Add Task</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1 text-white border-0 bg-purple-500 hover:bg-purple-600">
                    <Pill className="w-4 h-4" />
                    <span className="text-xs">Med Reminder</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpliciaPage;
