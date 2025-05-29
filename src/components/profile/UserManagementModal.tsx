
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Phone, Mail, MapPin, User } from 'lucide-react';

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  role: 'FamilyMember' | 'patient' | 'FamilyCareGiver';
}

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: UserFormData) => void;
}

const UserManagementModal: React.FC<UserManagementModalProps> = ({
  isOpen,
  onClose,
  onAddUser
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<UserFormData>();
  
  const selectedRole = watch('role');

  const onSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      await onAddUser(data);
      toast.success(`${getRoleDisplayName(data.role)} added successfully!`);
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to add user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'FamilyMember': return 'Family Member';
      case 'patient': return 'Patient';
      case 'FamilyCareGiver': return 'Professional Caregiver';
      default: return 'User';
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-rezilia-purple" />
            Add Team Member
          </DialogTitle>
          <DialogDescription>
            Add a new family member, patient, or professional caregiver to your care network.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select onValueChange={(value: any) => setValue('role', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FamilyMember">Family Member</SelectItem>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="FamilyCareGiver">Professional Caregiver</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="name"
                type="text"
                placeholder="Enter full name"
                className="pl-10"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="pl-10"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address"
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                className="pl-10"
                {...register("phone", { required: "Phone number is required" })}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="city"
                type="text"
                placeholder="Enter city"
                className="pl-10"
                {...register("city", { required: "City is required" })}
              />
            </div>
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* Role Description */}
          {selectedRole && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>{getRoleDisplayName(selectedRole)}:</strong>{' '}
                {selectedRole === 'FamilyMember' && 'Family members can view and participate in care coordination.'}
                {selectedRole === 'patient' && 'Patients can track their health data and communicate with caregivers.'}
                {selectedRole === 'FamilyCareGiver' && 'Professional caregivers can manage patient care and communicate with family.'}
              </p>
            </div>
          )}
        </form>

        <DialogFooter className="gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="bg-rezilia-purple hover:bg-rezilia-purple/90"
          >
            {isLoading ? "Adding..." : "Add Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserManagementModal;
