
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SimpliciaBadge } from '@/components/Icons';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface HealthGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: string;
  deadline: string;
}

const SimpliciaPage: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Dummy data for health metrics
  const healthMetrics: HealthMetric[] = [
    { id: '1', name: 'Blood Pressure', value: 120, unit: 'mmHg', status: 'good', trend: 'stable' },
    { id: '2', name: 'Heart Rate', value: 72, unit: 'bpm', status: 'good', trend: 'down' },
    { id: '3', name: 'Blood Sugar', value: 95, unit: 'mg/dL', status: 'good', trend: 'stable' },
    { id: '4', name: 'Weight', value: 165, unit: 'lbs', status: 'warning', trend: 'up' },
    { id: '5', name: 'BMI', value: 24.2, unit: '', status: 'good', trend: 'stable' },
    { id: '6', name: 'Cholesterol', value: 180, unit: 'mg/dL', status: 'good', trend: 'down' },
  ];

  // Dummy data for health goals
  const healthGoals: HealthGoal[] = [
    {
      id: '1',
      title: 'Daily Steps',
      description: 'Walk 10,000 steps daily',
      progress: 75,
      target: '10,000 steps',
      deadline: 'Daily'
    },
    {
      id: '2',
      title: 'Weight Loss',
      description: 'Lose 5 pounds by month end',
      progress: 60,
      target: '5 lbs',
      deadline: '2024-02-01'
    },
    {
      id: '3',
      title: 'Water Intake',
      description: 'Drink 8 glasses of water daily',
      progress: 87,
      target: '8 glasses',
      deadline: 'Daily'
    },
    {
      id: '4',
      title: 'Exercise',
      description: 'Exercise 30 minutes, 5 times a week',
      progress: 40,
      target: '150 min/week',
      deadline: 'Weekly'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

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
          <p className="text-gray-600">Your personal health tracking dashboard</p>
        </div>

        {/* Health Metrics Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthMetrics.map((metric) => (
              <Card 
                key={metric.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMetric === metric.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {metric.name}
                    </CardTitle>
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {metric.value}
                        <span className="text-sm font-normal text-gray-500 ml-1">
                          {metric.unit}
                        </span>
                      </div>
                    </div>
                    <div className="text-lg">
                      {getTrendIcon(metric.trend)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Health Goals */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Health Goals</h2>
            <Button variant="outline" size="sm">
              Add New Goal
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {healthGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Target: {goal.target}</span>
                      <span>Due: {goal.deadline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <span className="text-lg">📊</span>
              <span>Log Metrics</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <span className="text-lg">🎯</span>
              <span>Set Goal</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <span className="text-lg">📈</span>
              <span>View Trends</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <span className="text-lg">📋</span>
              <span>Health Report</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpliciaPage;
