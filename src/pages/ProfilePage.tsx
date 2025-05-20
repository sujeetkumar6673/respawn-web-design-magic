
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ProfilePage = () => {
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = React.useState('profile');
  
  const profileInfo = {
    name: "Nina Adams",
    role: "Family Caregiver",
    email: "nina.adams@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Care Lane, San Francisco, CA",
    joinDate: "March 12, 2023",
    bio: "Dedicated caregiver for my mother Jane who was diagnosed with early onset Alzheimer's. I'm passionate about providing the best care possible and finding resources to help both of us on this journey."
  };

  const stats = [
    { label: "Check-ins", value: "156" },
    { label: "Tasks", value: "42" },
    { label: "Resources", value: "17" },
    { label: "Notes", value: "24" }
  ];

  return (
    <div className="app-background min-h-screen h-screen flex flex-col pb-16 sm:pb-0">
      <div className="flex h-full overflow-hidden">
        {/* Sidebar - only visible on desktop */}
        {!isMobile && <Sidebar activePage={activePage} />}
        
        {/* Main Content */}
        <div className={`flex-1 p-3 sm:p-4 flex flex-col overflow-hidden ${isMobile ? 'w-full' : 'ml-[220px]'}`}>
          <div className="max-w-[1200px] mx-auto flex flex-col h-full overflow-hidden">
            {/* Header */}
            <Header userName={profileInfo.name} />
            
            {/* Profile Content */}
            <div className="bg-white rounded-b-xl p-3 sm:p-4 flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Left Column - Profile Info */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop" alt={profileInfo.name} />
                          <AvatarFallback>NA</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold">{profileInfo.name}</h2>
                        <p className="text-muted-foreground">{profileInfo.role}</p>
                        <Badge className="mt-2 bg-rezilia-purple">Caregiver</Badge>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium">{profileInfo.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone:</span>
                          <span className="font-medium">{profileInfo.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Member since:</span>
                          <span className="font-medium">{profileInfo.joinDate}</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="grid grid-cols-2 gap-2">
                        {stats.map((stat, index) => (
                          <Card key={index} className="p-2">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">{stat.label}</p>
                              <p className="text-lg font-bold">{stat.value}</p>
                            </div>
                          </Card>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <Button className="w-full bg-rezilia-purple hover:bg-rezilia-purple/80">Edit Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Right Column - Additional Information */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Bio */}
                  <Card>
                    <CardHeader className="pb-2">
                      <h3 className="text-lg font-semibold">About</h3>
                    </CardHeader>
                    <CardContent>
                      <p>{profileInfo.bio}</p>
                    </CardContent>
                  </Card>
                  
                  {/* Recent Activity */}
                  <Card>
                    <CardHeader className="pb-2">
                      <h3 className="text-lg font-semibold">Recent Activity</h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="border-l-4 border-rezilia-purple pl-3 py-1">
                        <p className="font-medium">Added note about medication</p>
                        <p className="text-sm text-muted-foreground">Today, 9:30 AM</p>
                      </div>
                      <div className="border-l-4 border-rezilia-orange pl-3 py-1">
                        <p className="font-medium">Scheduled doctor appointment</p>
                        <p className="text-sm text-muted-foreground">Yesterday, 2:15 PM</p>
                      </div>
                      <div className="border-l-4 border-rezilia-blue pl-3 py-1">
                        <p className="font-medium">Updated care plan</p>
                        <p className="text-sm text-muted-foreground">May 18, 4:45 PM</p>
                      </div>
                      <div className="border-l-4 border-rezilia-green pl-3 py-1">
                        <p className="font-medium">Downloaded resources on memory care</p>
                        <p className="text-sm text-muted-foreground">May 15, 11:20 AM</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Care Team */}
                  <Card>
                    <CardHeader className="pb-2">
                      <h3 className="text-lg font-semibold">Care Team</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Dr. Jane Doe</p>
                            <p className="text-sm text-muted-foreground">Primary Physician</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>MS</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Mark Smith</p>
                            <p className="text-sm text-muted-foreground">Therapist</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Sarah Johnson</p>
                            <p className="text-sm text-muted-foreground">Social Worker</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - only visible on mobile */}
      {isMobile && <MobileNav activePage={activePage} onNavigate={setActivePage} />}
    </div>
  );
};

export default ProfilePage;
