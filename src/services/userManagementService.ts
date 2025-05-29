
import { User } from './authService';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: 'FamilyMember' | 'patient' | 'FamilyCareGiver';
  avatar?: string;
  addedBy: string; // User ID of the owner who added this member
  addedAt: Date;
}

// Generate a unique GUID
const generateGUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userManagementService = {
  // Get team members for a specific owner
  async getTeamMembers(ownerId: string): Promise<TeamMember[]> {
    await delay(300);
    
    const storedMembers = localStorage.getItem(`team_members_${ownerId}`);
    if (storedMembers) {
      try {
        const members = JSON.parse(storedMembers);
        return members.map((member: any) => ({
          ...member,
          addedAt: new Date(member.addedAt)
        }));
      } catch (error) {
        console.error('Error parsing stored team members:', error);
        return [];
      }
    }
    
    return [];
  },

  // Add a new team member
  async addTeamMember(ownerId: string, memberData: Omit<TeamMember, 'id' | 'addedBy' | 'addedAt'>): Promise<TeamMember> {
    await delay(500);
    
    const newMember: TeamMember = {
      ...memberData,
      id: generateGUID(),
      addedBy: ownerId,
      addedAt: new Date(),
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&seed=${memberData.name}`
    };

    // Get existing members
    const existingMembers = await this.getTeamMembers(ownerId);
    
    // Check if email already exists
    const emailExists = existingMembers.some(member => member.email === memberData.email);
    if (emailExists) {
      throw new Error('A team member with this email already exists');
    }
    
    // Add new member
    const updatedMembers = [...existingMembers, newMember];
    
    // Store in localStorage
    localStorage.setItem(`team_members_${ownerId}`, JSON.stringify(updatedMembers));
    
    return newMember;
  },

  // Remove a team member
  async removeTeamMember(ownerId: string, memberId: string): Promise<void> {
    await delay(300);
    
    const existingMembers = await this.getTeamMembers(ownerId);
    const updatedMembers = existingMembers.filter(member => member.id !== memberId);
    
    localStorage.setItem(`team_members_${ownerId}`, JSON.stringify(updatedMembers));
  },

  // Update team member
  async updateTeamMember(ownerId: string, memberId: string, updates: Partial<TeamMember>): Promise<TeamMember> {
    await delay(400);
    
    const existingMembers = await this.getTeamMembers(ownerId);
    const memberIndex = existingMembers.findIndex(member => member.id === memberId);
    
    if (memberIndex === -1) {
      throw new Error('Team member not found');
    }
    
    const updatedMember = { ...existingMembers[memberIndex], ...updates };
    existingMembers[memberIndex] = updatedMember;
    
    localStorage.setItem(`team_members_${ownerId}`, JSON.stringify(existingMembers));
    
    return updatedMember;
  },

  // Get team member by ID
  async getTeamMember(ownerId: string, memberId: string): Promise<TeamMember | null> {
    await delay(200);
    
    const members = await this.getTeamMembers(ownerId);
    return members.find(member => member.id === memberId) || null;
  }
};
