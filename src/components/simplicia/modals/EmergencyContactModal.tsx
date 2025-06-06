
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Phone, User, Ambulance, HeartPulse } from 'lucide-react';
import { toast } from 'sonner';

interface EmergencyContactModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmergencyContactModal: React.FC<EmergencyContactModalProps> = ({ isOpen, onOpenChange }) => {
  const [emergencyDialogOpen, setEmergencyDialogOpen] = React.useState(false);
  
  const handleEmergencyCall = () => {
    console.log('Emergency services called');
    toast.success("Emergency call initiated", {
      description: "We're connecting you with emergency services",
    });
    setEmergencyDialogOpen(false);
    onOpenChange(false);
  };
  
  const contacts = [
    {
      name: "Dr. Sarah Johnson",
      title: "Primary Care Physician",
      phone: "(555) 123-4567",
      color: "bg-blue-100"
    },
    {
      name: "Memorial Hospital",
      title: "Emergency Room",
      phone: "(555) 867-5309",
      color: "bg-purple-100"
    },
    {
      name: "Robert Smith",
      title: "Family Contact",
      phone: "(555) 234-5678",
      color: "bg-green-100"
    },
    {
      name: "Care Pharmacy",
      title: "Medication Provider",
      phone: "(555) 345-6789",
      color: "bg-amber-100"
    }
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-red-600 font-bold flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Emergency Contacts
            </DialogTitle>
            <DialogDescription>
              Quick access to emergency services and key contacts
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white h-16"
              onClick={() => setEmergencyDialogOpen(true)}
            >
              <Ambulance className="mr-2 h-6 w-6" />
              Call Emergency Services (911)
            </Button>

            <h3 className="font-medium text-sm mt-4 mb-2">Important Contacts:</h3>
            
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div 
                  key={contact.name} 
                  className={`rounded-lg ${contact.color} p-3 flex justify-between items-center`}
                >
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-gray-600">{contact.title}</div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white"
                    onClick={() => {
                      toast.success(`Calling ${contact.name}`, {
                        description: `Dialing ${contact.phone}...`,
                      });
                      onOpenChange(false);
                    }}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={emergencyDialogOpen} onOpenChange={setEmergencyDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Confirm Emergency Call</AlertDialogTitle>
            <AlertDialogDescription>
              This will initiate a call to emergency services (911). 
              Only proceed if this is a genuine emergency requiring immediate assistance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEmergencyCall} className="bg-red-600 hover:bg-red-700">
              Confirm Emergency Call
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EmergencyContactModal;
