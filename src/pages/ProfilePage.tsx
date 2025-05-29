
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
import { Edit, Settings, User, Calendar, Mail, Phone, MapPin, Building, Briefcase, Plus, Users } from 'lucide-react';
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
      throw error; // Re-throw to be handled by the modal
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
                  {/* Profile Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Nina" alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-rezilia-purple">{user?.name || "User Name"}</h1>
                      <p className="text-gray-500 mt-1">Account Owner - Subscription Active</p>
                      
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

                  {/* Team Management Section */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Care Team Management</h2>
                        <p className="text-gray-600 mt-1">Manage your family members, patients, and professional caregivers</p>
                      </div>
                      <Button 
                        onClick={() => setIsAddUserModalOpen(true)}
                        className="bg-rezilia-purple hover:bg-rezilia-purple/90 flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Member
                      </Button>
                    </div>

                    {isLoading ? (
                      <Card>
                        <CardContent className="text-center py-8">
                          <p className="text-gray-500">Loading team members...</p>
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
                  
                  {/* Profile Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                          <span>{user?.email || "email@example.com"}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{user?.phone || "(555) 123-4567"}</span>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                          <span>{user?.city || "City"}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Account created: {new Date().toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Subscription Information */}
                    <Card className="bg-white shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Briefcase className="h-5 w-5 mr-2 text-rezilia-purple" />
                          Subscription Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 flex justify-center">•</span>
                          <span>Premium Plan - Active</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 flex justify-center">•</span>
                          <span>Team Members: {teamMembers.length}/10</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 flex justify-center">•</span>
                          <span>Next billing: {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 flex justify-center">•</span>
                          <span className="text-rezilia-green">All features unlocked</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Manage Subscription</Button>
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
