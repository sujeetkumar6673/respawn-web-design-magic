
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReziliaAIIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Construction, Clock, Lightbulb, Sparkles } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ReziliaAIPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activePage="rezilia-ai" />
      <div className="flex-1 ml-[220px] p-6">
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

          {/* Under Development Alert */}
          <Alert className="mb-8 border-purple-200 bg-purple-50">
            <Construction className="h-4 w-4 text-purple-600" />
            <AlertTitle className="text-purple-800">Under Development</AlertTitle>
            <AlertDescription className="text-purple-700">
              We're building something amazing! Rezilia AI will be your personal resilience coach, 
              providing intelligent insights and personalized guidance for your wellness journey.
            </AlertDescription>
          </Alert>

          {/* Coming Soon Features */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI-Powered Features Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Intelligent Chat Assistant</h3>
                  <p className="text-blue-700 text-sm">24/7 AI coach providing personalized resilience guidance and support.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">Smart Goal Setting</h3>
                  <p className="text-green-700 text-sm">AI-recommended goals based on your progress and resilience patterns.</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-900 mb-2">Personalized Insights</h3>
                  <p className="text-yellow-700 text-sm">Daily AI-generated insights tailored to your resilience journey.</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-2">Progress Analytics</h3>
                  <p className="text-purple-700 text-sm">Advanced AI analytics to track and optimize your resilience growth.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Development Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                AI Development Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-white rounded border-l-4 border-l-purple-500">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Phase 1: AI Foundation</p>
                    <p className="text-sm text-gray-600">Training models for resilience coaching and assessment</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white rounded border-l-4 border-l-blue-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Phase 2: Chat Intelligence</p>
                    <p className="text-sm text-gray-600">Conversational AI for personalized coaching sessions</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white rounded border-l-4 border-l-gray-300">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-medium">Phase 3: Advanced Analytics</p>
                    <p className="text-sm text-gray-600">Predictive insights and adaptive learning algorithms</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button disabled className="cursor-not-allowed opacity-50">
                  AI Magic Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReziliaAIPage;
