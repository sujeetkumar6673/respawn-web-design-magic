
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNav from '@/components/MobileNav';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Edit, Settings, User, Calendar, Mail, Phone, MapPin, Building, Briefcase } from 'lucide-react';

const ProfilePage = () => {
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState('profile');
  
  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className="min-h-screen flex flex-col app-background pb-16 sm:pb-0">
      <div className="flex h-full flex-1 overflow-hidden">
        {/* Sidebar - only visible on desktop */}
        {!isMobile && <Sidebar activePage={activePage} />}
        
        {/* Main Content */}
        <div className={`flex-1 ${isMobile ? 'w-full' : 'ml-[220px]'} h-screen flex flex-col overflow-hidden`}>
          <div className="max-w-[1200px] mx-auto w-full p-3 sm:p-4 flex flex-col h-full">
            {/* Header */}
            <Header userName="Nina" />
            
            {/* Main Content */}
            <div className="bg-white rounded-b-xl p-3 sm:p-6 flex-1 flex flex-col overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="flex flex-col space-y-8">
                  {/* Profile Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Nina" alt="Nina" />
                      <AvatarFallback>NA</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-rezilia-purple">Nina Anderson</h1>
                      <p className="text-gray-500 mt-1">Parent of Alex (Grade 3) and Emily (Grade 5)</p>
                      
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Edit className="h-4 w-4" />
                          <span>Edit Profile</span>
                        </Button>
                        
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Profile Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Personal Information */}
                    <Card className="bg-white shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <User className="h-5 w-5 mr-2 text-rezilia-purple" />
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>nina.anderson@example.com</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>(555) 123-4567</span>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                          <span>123 Main Street, Apt 4B<br />San Francisco, CA 94105</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>May 15, 1985</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Work Information */}
                    <Card className="bg-white shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Briefcase className="h-5 w-5 mr-2 text-rezilia-purple" />
                          Work Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <span>TechInnovate Inc.</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 flex justify-center">•</span>
                          <span>Senior Product Manager</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 flex justify-center">•</span>
                          <span>5 years at company</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>nina.a@techinnovate.com</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Family Information */}
                    <Card className="bg-white shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <User className="h-5 w-5 mr-2 text-rezilia-purple" />
                          Family Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 border rounded-lg flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Alex" alt="Alex" />
                              <AvatarFallback>AA</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Alex Anderson</p>
                              <p className="text-sm text-gray-500">Grade 3, Ms. Johnson's Class</p>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Emily" alt="Emily" />
                              <AvatarFallback>EA</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Emily Anderson</p>
                              <p className="text-sm text-gray-500">Grade 5, Mr. Thomas's Class</p>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Robert" alt="Robert" />
                              <AvatarFallback>RA</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Robert Anderson</p>
                              <p className="text-sm text-gray-500">Spouse</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Additional Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-white shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Preferences</CardTitle>
                        <CardDescription>Your notification and platform preferences</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-center justify-between">
                            <span className="text-gray-700">Email Notifications</span>
                            <span className="font-medium text-rezilia-green">Enabled</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-700">SMS Notifications</span>
                            <span className="font-medium text-rezilia-green">Enabled</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-700">Newsletter</span>
                            <span className="font-medium text-gray-400">Disabled</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-700">Language</span>
                            <span className="font-medium">English (US)</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-700">Time Zone</span>
                            <span className="font-medium">Pacific Time (US)</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Manage Preferences</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="bg-white shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Security & Privacy</CardTitle>
                        <CardDescription>Manage your account security settings</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-center justify-between">
                            <span className="text-gray-700">Two-Factor Authentication</span>
                            <span className="font-medium text-rezilia-green">Enabled</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-700">Password</span>
                            <span className="font-medium">Last Changed: 45 days ago</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-700">Login History</span>
                            <span className="font-medium text-blue-500">View</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-700">Privacy Settings</span>
                            <span className="font-medium text-blue-500">View</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-700">Data Sharing</span>
                            <span className="font-medium text-gray-400">Disabled</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Security Settings</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - only visible on mobile */}
      {isMobile && <MobileNav activePage={activePage} onNavigate={handleNavigate} />}
    </div>
  );
};

export default ProfilePage;
