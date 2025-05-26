
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReziliaAIIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Lightbulb, Target } from 'lucide-react';

const ReziliaAIPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12">
            <ReziliaAIIcon />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rezilia AI</h1>
            <p className="text-gray-600">Your AI Resilience Coach</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                AI Chat Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Chat with our AI resilience coach for personalized guidance and support.
              </p>
              <Button className="w-full">Start Conversation</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Goal Setting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Set and track your resilience goals with AI-powered recommendations.
              </p>
              <Button variant="outline" className="w-full">Set Goals</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Daily Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Receive daily insights and tips to build your resilience muscle.
              </p>
              <Button variant="outline" className="w-full">View Insights</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Monitor your resilience journey with detailed analytics and reports.
              </p>
              <Button variant="outline" className="w-full">View Progress</Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button size="sm">Daily Check-in</Button>
              <Button size="sm" variant="outline">Mood Tracker</Button>
              <Button size="sm" variant="outline">Stress Assessment</Button>
              <Button size="sm" variant="outline">Mindfulness Exercise</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReziliaAIPage;
