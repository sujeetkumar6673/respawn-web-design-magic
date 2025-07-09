import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, User, Phone, Calendar, Pill, FileText, AlertTriangle, Activity, Clock, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/useIsMobile';

const FamilyHeartsPage = () => {
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState('family-hearts');
  
  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  // Mock patient data
  const patientData = {
    mom: {
      name: "Mom, Jane D.",
      age: 75,
      height: "5'4\"",
      weight: "120lbs",
      bloodPressure: "450",
      profileImage: "/lovable-uploads/a646d88e-98ef-4a9c-ba4b-8aab16a2ba9f.png",
      messages: 3,
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", time: "Morning" },
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", time: "With meals" },
        { name: "Aspirin", dosage: "81mg", frequency: "Once daily", time: "Evening" }
      ],
      nextAppointment: {
        type: "General Doctor",
        date: "March 15, 2024",
        time: "2:30 PM",
        location: "City Medical Center"
      },
      healthHistory: [
        { condition: "Hypertension", diagnosed: "2018", status: "Controlled" },
        { condition: "Type 2 Diabetes", diagnosed: "2020", status: "Managed" },
        { condition: "Osteoarthritis", diagnosed: "2021", status: "Ongoing" }
      ],
      allergies: ["Penicillin", "Shellfish", "Latex"],
      emergencyContacts: [
        { name: "John D. (Son)", phone: "(555) 123-4567", relation: "Son" },
        { name: "Sarah M. (Daughter)", phone: "(555) 987-6543", relation: "Daughter" }
      ],
      vitalSigns: {
        heartRate: "72 bpm",
        temperature: "98.6°F",
        oxygenSat: "98%",
        lastUpdated: "2 hours ago"
      }
    }
  };

  const currentPatient = patientData[selectedPatient];

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
            <div className="bg-white rounded-b-xl p-3 sm:p-6 flex-1 overflow-y-auto">
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{currentPatient.messages}</span>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        <Heart className="w-8 h-8 text-red-500 mr-2" />
                        {currentPatient.name}
                      </h1>
                      <p className="text-gray-600">Patient Profile & Health Management</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Contact</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </Button>
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-white"></div>
                      <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                </div>
                
                {/* Patient Quick Info Bar */}
                <div className="mt-4 bg-white rounded-xl p-4 shadow-md border border-purple-100">
                  <p className="text-gray-600 mb-2">You have {currentPatient.messages} messages</p>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Current Medications & Next Appointment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-purple-200 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
                        <CardTitle className="flex items-center space-x-2">
                          <Pill className="w-5 h-5" />
                          <span>Current Medications</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {currentPatient.medications.map((med, index) => (
                            <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                              <h4 className="font-semibold text-purple-800">{med.name}</h4>
                              <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                              <p className="text-xs text-purple-600">{med.time}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                        <CardTitle className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span>Next Appointment</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <h4 className="font-semibold text-blue-800">{currentPatient.nextAppointment.type}</h4>
                            <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{currentPatient.nextAppointment.date}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{currentPatient.nextAppointment.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{currentPatient.nextAppointment.location}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Health History */}
                  <Card className="border-green-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>Health History</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {currentPatient.healthHistory.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                            <div>
                              <h4 className="font-semibold text-green-800">{item.condition}</h4>
                              <p className="text-sm text-gray-600">Diagnosed: {item.diagnosed}</p>
                            </div>
                            <Badge 
                              variant={item.status === 'Controlled' ? 'default' : item.status === 'Managed' ? 'secondary' : 'outline'}
                              className={
                                item.status === 'Controlled' ? 'bg-green-500' : 
                                item.status === 'Managed' ? 'bg-blue-500' : 'bg-orange-500'
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* My Paid Claim */}
                  <Card className="border-orange-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                      <CardTitle>My Paid Claim</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="h-32 bg-orange-50 rounded-lg border border-orange-100 flex items-center justify-center">
                        <p className="text-orange-600">No recent claims</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Patient Info */}
                <div className="space-y-6">
                  {/* Patient Profile Card */}
                  <Card className="border-pink-200 shadow-lg">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <Heart className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center">
                          <Heart className="w-5 h-5 text-red-500 mr-2" />
                          {currentPatient.name}
                        </h3>
                        <p className="text-gray-600">{currentPatient.age} years</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Age</p>
                          <p className="font-semibold">{currentPatient.age}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Height</p>
                          <p className="font-semibold">{currentPatient.height}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Weight</p>
                          <p className="font-semibold">{currentPatient.weight}</p>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600">
                        <Badge className="bg-red-500 text-white mr-2">{currentPatient.bloodPressure}</Badge>
                        View Full Profile
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Vital Signs */}
                  <Card className="border-blue-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5" />
                        <span>Vital Signs</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Heart Rate</span>
                          <span className="font-semibold text-red-600">{currentPatient.vitalSigns.heartRate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Temperature</span>
                          <span className="font-semibold text-blue-600">{currentPatient.vitalSigns.temperature}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Oxygen Sat</span>
                          <span className="font-semibold text-green-600">{currentPatient.vitalSigns.oxygenSat}</span>
                        </div>
                        <Separator />
                        <p className="text-xs text-gray-500">Last updated: {currentPatient.vitalSigns.lastUpdated}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Allergies */}
                  <Card className="border-red-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Allergies</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        {currentPatient.allergies.map((allergy, index) => (
                          <Badge key={index} variant="destructive" className="mr-2 mb-2">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Emergency Contacts */}
                  <Card className="border-yellow-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>Emergency Contacts</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        {currentPatient.emergencyContacts.map((contact, index) => (
                          <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                            <h4 className="font-semibold text-yellow-800">{contact.name}</h4>
                            <p className="text-sm text-gray-600">{contact.phone}</p>
                            <p className="text-xs text-yellow-600">{contact.relation}</p>
                          </div>
                        ))}
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
      {isMobile && <MobileNav activePage={activePage} onNavigate={handleNavigate} />}
    </div>
  );
};

export default FamilyHeartsPage;
