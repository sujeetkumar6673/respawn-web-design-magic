
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNav from '@/components/MobileNav';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Edit, Settings, User, Calendar, Mail, Phone, MapPin, Building, Briefcase, 
  Plus, Users, Shield, Crown, Clock, CheckCircle, Activity, Heart,
  Star, Award, TrendingUp, Calendar as CalendarIcon
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserManagementModal from '@/components/profile/UserManagementModal';
import TeamMembersList from '@/components/profile/TeamMembersList';
import { userManagementService, TeamMember } from '@/services/userManagementService';
import { toast } from "sonner";

const ProfilePage = () => {
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState('profile');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  // Load team members on component mount
  useEffect(() => {
    if (user?.id) {
      loadTeamMembers();
    }
  }, [user?.id]);

  const loadTeamMembers = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      const members = await userManagementService.getTeamMembers(user.id);
      setTeamMembers(members);
    } catch (error) {
      console.error('Error loading team members:', error);
      toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (userData: any) => {
    if (!user?.id) return;
    
    try {
      const newMember = await userManagementService.addTeamMember(user.id, userData);
      setTeamMembers(prev => [...prev, newMember]);
    } catch (error) {
      console.error('Error adding team member:', error);
      throw error;
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!user?.id) return;
    
    try {
      await userManagementService.removeTeamMember(user.id, memberId);
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
      toast.success("Team member removed successfully");
    } catch (error) {
      console.error('Error removing team member:', error);
      toast.error("Failed to remove team member");
    }
  };

  // Calculate some stats
  const profileCompleteness = 85;
  const monthlyActivity = 92;
  const joinedDate = new Date();
  const daysSinceJoined = Math.floor((Date.now() - joinedDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen flex flex-col app-background pb-16 sm:pb-0">
      <div className="flex h-full flex-1 overflow-hidden">
        {/* Sidebar - only visible on desktop */}
        {!isMobile && <Sidebar activePage={activePage} />}
        
        {/* Main Content */}
        <div className={`flex-1 ${isMobile ? 'w-full' : 'ml-[220px]'} h-screen flex flex-col overflow-hidden`}>
          <div className="max-w-[1200px] mx-auto w-full p-3 sm:p-4 flex flex-col h-full">
            {/* Header */}
            <Header />
            
            {/* Main Content */}
            <div className="bg-white rounded-b-xl p-3 sm:p-6 flex-1 flex flex-col overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="flex flex-col space-y-8">
                  {/* Enhanced Profile Header with Background */}
                  <div className="relative bg-gradient-to-r from-rezilia-purple to-rezilia-blue rounded-xl p-6 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                    
                    <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
                          <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Nina" alt={user?.name} />
                          <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 bg-rezilia-green text-white rounded-full p-2">
                          <Crown className="h-4 w-4" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-3xl font-bold">{user?.name || "User Name"}</h1>
                          <Badge className="bg-white/20 text-white border-white/30">
                            <Shield className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        </div>
                        <p className="text-white/80 mb-4">Account Owner • Care Coordinator</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            <Star className="h-3 w-3 mr-1" />
                            Top Coordinator
                          </Badge>
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            <Award className="h-3 w-3 mr-1" />
                            Active Member
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </Button>
                          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-600 font-medium">Team Members</p>
                            <p className="text-2xl font-bold text-blue-700">{teamMembers.length}</p>
                          </div>
                          <Users className="h-8 w-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-green-600 font-medium">Profile Complete</p>
                            <p className="text-2xl font-bold text-green-700">{profileCompleteness}%</p>
                          </div>
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-purple-600 font-medium">Activity Score</p>
                            <p className="text-2xl font-bold text-purple-700">{monthlyActivity}%</p>
                          </div>
                          <Activity className="h-8 w-8 text-purple-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-orange-600 font-medium">Days Active</p>
                            <p className="text-2xl font-bold text-orange-700">{daysSinceJoined}</p>
                          </div>
                          <CalendarIcon className="h-8 w-8 text-orange-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  {/* Enhanced Team Management Section */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                          <Heart className="h-6 w-6 text-rezilia-pink" />
                          Care Team Management
                        </h2>
                        <p className="text-gray-600 mt-1">Manage your family members, patients, and professional caregivers</p>
                      </div>
                      <Button 
                        onClick={() => setIsAddUserModalOpen(true)}
                        className="bg-rezilia-purple hover:bg-rezilia-purple/90 flex items-center gap-2 shadow-lg"
                      >
                        <Plus className="h-4 w-4" />
                        Add Member
                      </Button>
                    </div>

                    {isLoading ? (
                      <Card>
                        <CardContent className="text-center py-8">
                          <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <TeamMembersList 
                        members={teamMembers} 
                        onRemoveMember={handleRemoveMember}
                      />
                    )}
                  </div>

                  <Separator />
                  
                  {/* Enhanced Profile Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <Card className="bg-white shadow-lg border-l-4 border-l-rezilia-purple">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <User className="h-5 w-5 mr-2 text-rezilia-purple" />
                          Personal Information
                        </CardTitle>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Profile Completeness</span>
                            <span className="font-medium">{profileCompleteness}%</span>
                          </div>
                          <Progress value={profileCompleteness} className="mt-1" />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Mail className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{user?.email || "email@example.com"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Phone className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{user?.phone || "(555) 123-4567"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{user?.city || "City"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="font-medium">{new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Enhanced Subscription Information */}
                    <Card className="bg-white shadow-lg border-l-4 border-l-rezilia-green">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <div className="flex items-center">
                            <Crown className="h-5 w-5 mr-2 text-rezilia-green" />
                            Premium Plan
                          </div>
                          <Badge className="bg-rezilia-green text-white">
                            Active
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-rezilia-green/10 to-rezilia-blue/10 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-rezilia-green" />
                            <span className="text-sm font-medium">Plan Benefits</span>
                          </div>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• Unlimited team members</li>
                            <li>• Advanced care coordination</li>
                            <li>• Priority support</li>
                            <li>• Advanced analytics</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Team Members</span>
                            <span className="font-medium">{teamMembers.length}/Unlimited</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Next billing</span>
                            <span className="font-medium">{new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Status</span>
                            <Badge className="bg-rezilia-green text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              All features unlocked
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full hover:bg-rezilia-green hover:text-white transition-colors">
                          Manage Subscription
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>

                  {/* Recent Activity Section */}
                  <Card className="bg-white shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-rezilia-purple" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 border-l-4 border-l-blue-400 bg-blue-50 rounded-r-lg">
                          <Users className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-blue-900">Team member added</p>
                            <p className="text-sm text-blue-600">2 hours ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 border-l-4 border-l-green-400 bg-green-50 rounded-r-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-900">Profile updated</p>
                            <p className="text-sm text-green-600">1 day ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 border-l-4 border-l-purple-400 bg-purple-50 rounded-r-lg">
                          <Calendar className="h-5 w-5 text-purple-600" />
                          <div>
                            <p className="font-medium text-purple-900">Appointment scheduled</p>
                            <p className="text-sm text-purple-600">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - only visible on mobile */}
      {isMobile && <MobileNav activePage={activePage} onNavigate={handleNavigate} />}
      
      {/* User Management Modal */}
      <UserManagementModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default ProfilePage;
