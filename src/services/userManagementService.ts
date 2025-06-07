
import { User } from './authService';
import { buildApiUrl } from '@/config/environment';
import axios from 'axios';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  role: 'FamilyMember' | 'patient' | 'FamilyCareGiver';
  avatar?: string;
  addedBy: string; // User ID of the owner who added this member
  addedAt: Date;
}

// Real API request interface for adding members
interface AddMemberRequest {
  email: string;
  password: string;
  fullName: string;
  gender: string;
  consent: boolean;
  acceptedTerms: boolean;
  roles: string[];
  assessments: any[];
  subscriptionName: string;
  userAccountId: string;
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

// Map role to API format
const mapRoleToApiFormat = (role: string): string => {
  switch (role) {
    case 'FamilyMember': return 'family-member';
    case 'patient': return 'patient';
    case 'FamilyCareGiver': return 'family-caregiver';
    default: return 'family-member';
  }
};

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

  // Add a new team member using real API
  async addTeamMember(ownerId: string, memberData: Omit<TeamMember, 'id' | 'addedBy' | 'addedAt'>): Promise<TeamMember> {
    console.log('=== Adding Team Member via API ===');
    console.log('Owner ID:', ownerId);
    console.log('Member Data:', memberData);

    try {
      // Prepare API request payload
      const apiRequest: AddMemberRequest = {
        email: memberData.email,
        password: memberData.password,
        fullName: memberData.name,
        gender: memberData.gender,
        consent: true, // Fixed default value
        acceptedTerms: true, // Fixed default value
        roles: [mapRoleToApiFormat(memberData.role)],
        assessments: [], // Fixed default value (empty array)
        subscriptionName: "", // Fixed default value (empty string)
        userAccountId: ownerId // User ID from AuthContext
      };

      console.log('=== API Request Payload ===');
      console.log(JSON.stringify(apiRequest, null, 2));

      // Make API call
      const apiUrl = 'https://ca-talos-qa-user-service-api.agreeablehill-e8515896.eastus.azurecontainerapps.io/user/member';
      console.log('API URL:', apiUrl);

      const response = await axios.post(apiUrl, apiRequest, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        }
      });

      console.log('=== API Response ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(response.data, null, 2));

      // Create TeamMember object from API response
      const newMember: TeamMember = {
        id: response.data.id || response.data.userId || generateGUID(),
        name: memberData.name,
        email: memberData.email,
        password: memberData.password,
        gender: memberData.gender,
        role: memberData.role,
        addedBy: ownerId,
        addedAt: new Date(),
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&seed=${memberData.name}`
      };

      // Store in localStorage for local state management
      const existingMembers = await this.getTeamMembers(ownerId);
      const updatedMembers = [...existingMembers, newMember];
      localStorage.setItem(`team_members_${ownerId}`, JSON.stringify(updatedMembers));

      console.log('=== Member Added Successfully ===');
      console.log('New Member:', newMember);

      return newMember;

    } catch (error: any) {
      console.error('=== API Error ===');
      console.error('Error details:', error);
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        
        // Handle specific API errors
        if (error.response.status === 400) {
          throw new Error('Invalid member data. Please check all fields.');
        } else if (error.response.status === 409) {
          throw new Error('A team member with this email already exists');
        } else if (error.response.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        } else {
          throw new Error(`API Error: ${error.response.data?.message || 'Failed to add team member'}`);
        }
      } else if (error.request) {
        console.error('Network error:', error.message);
        throw new Error('Network error. Please check your internet connection.');
      } else {
        console.error('Unexpected error:', error.message);
        throw new Error('Failed to add team member. Please try again.');
      }
    }
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
