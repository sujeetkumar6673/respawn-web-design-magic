
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdmiliaIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Construction, Clock, Lightbulb } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdmiliaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activePage="admilia" />
      <div className="flex-1 ml-[220px] p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12">
              <AdmiliaIcon />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admilia</h1>
              <p className="text-gray-600">Automating admin tasks & Library forms</p>
            </div>
          </div>

          {/* Under Development Alert */}
          <Alert className="mb-8 border-orange-200 bg-orange-50">
            <Construction className="h-4 w-4 text-orange-600" />
            <AlertTitle className="text-orange-800">Under Development</AlertTitle>
            <AlertDescription className="text-orange-700">
              We're working hard to bring you the best administrative automation experience. 
              Admilia will streamline your library forms and admin tasks like never before!
            </AlertDescription>
          </Alert>

          {/* Coming Soon Features */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Coming Soon Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Smart Form Management</h3>
                  <p className="text-blue-700 text-sm">Automated form processing and digital workflows for library administration.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">Intelligent Scheduling</h3>
                  <p className="text-green-700 text-sm">AI-powered appointment booking and resource management system.</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-2">User Management Hub</h3>
                  <p className="text-purple-700 text-sm">Streamlined member registration and account management tools.</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-2">Workflow Automation</h3>
                  <p className="text-orange-700 text-sm">Custom automation rules for repetitive administrative tasks.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Development Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Development Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-white rounded border-l-4 border-l-blue-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Phase 1: Core Infrastructure</p>
                    <p className="text-sm text-gray-600">Setting up the foundation for admin automation</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white rounded border-l-4 border-l-yellow-500">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Phase 2: Form Management System</p>
                    <p className="text-sm text-gray-600">Digital forms and automated processing</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white rounded border-l-4 border-l-gray-300">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-medium">Phase 3: Advanced Features</p>
                    <p className="text-sm text-gray-600">AI-powered insights and workflow optimization</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button disabled className="cursor-not-allowed opacity-50">
                  Stay Tuned for Updates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdmiliaPage;
