
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ForumIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { MessageCircle, BookOpen, Users, TrendingUp } from 'lucide-react';

const ForumPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12">
            <ForumIcon />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Forum & Resources</h1>
            <p className="text-gray-600">Connect, learn, and share with the community</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">567</div>
              <div className="text-sm text-gray-600">Discussions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">89</div>
              <div className="text-sm text-gray-600">Resources</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm text-gray-600">Trending Topics</div>
            </CardContent>
          </Card>
        </div>

        {/* Forum Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Community Discussions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <h4 className="font-medium">Caregiver Support Group</h4>
                <p className="text-sm text-gray-600">125 members • 45 new posts</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <h4 className="font-medium">Health & Wellness Tips</h4>
                <p className="text-sm text-gray-600">89 members • 23 new posts</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <h4 className="font-medium">Technology Help</h4>
                <p className="text-sm text-gray-600">156 members • 12 new posts</p>
              </div>
              <Button className="w-full">View All Categories</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resource Library</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <h4 className="font-medium">Healthcare Guides</h4>
                <p className="text-sm text-gray-600">25 documents • Updated daily</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <h4 className="font-medium">Emergency Contacts</h4>
                <p className="text-sm text-gray-600">Local resources • Always current</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <h4 className="font-medium">Video Tutorials</h4>
                <p className="text-sm text-gray-600">30 videos • Step-by-step guides</p>
              </div>
              <Button variant="outline" className="w-full">Browse Resources</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Forum Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-white rounded border">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">New member Sarah joined Caregiver Support Group</h4>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded border">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Dr. Johnson posted in Health & Wellness Tips</h4>
                  <p className="text-sm text-gray-600">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded border">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">New resource added: "Managing Medication Schedules"</h4>
                  <p className="text-sm text-gray-600">6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForumPage;
