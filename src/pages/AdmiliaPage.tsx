
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdmiliaIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Users, Settings } from 'lucide-react';

const AdmiliaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
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

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Form Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Streamline library forms and administrative paperwork with automated workflows.
              </p>
              <Button className="w-full">Manage Forms</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Scheduling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Automate appointment scheduling and resource booking for library services.
              </p>
              <Button variant="outline" className="w-full">View Schedule</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Efficiently manage library member registrations and account updates.
              </p>
              <Button variant="outline" className="w-full">Manage Users</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-600" />
                Workflow Automation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Set up automated workflows for repetitive administrative tasks.
              </p>
              <Button variant="outline" className="w-full">Configure Workflows</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Administrative Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded border">
                <div>
                  <h4 className="font-medium">Library Card Applications</h4>
                  <p className="text-sm text-gray-600">12 pending applications</p>
                </div>
                <Button size="sm">Review</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded border">
                <div>
                  <h4 className="font-medium">Resource Booking Requests</h4>
                  <p className="text-sm text-gray-600">8 pending requests</p>
                </div>
                <Button size="sm" variant="outline">Process</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded border">
                <div>
                  <h4 className="font-medium">Monthly Reports</h4>
                  <p className="text-sm text-gray-600">Due in 3 days</p>
                </div>
                <Button size="sm" variant="outline">Generate</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdmiliaPage;
