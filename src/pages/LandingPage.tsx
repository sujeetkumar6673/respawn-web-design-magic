
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, LogIn, UserPlus, Phone, MapPin } from 'lucide-react';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useIsMobile } from '@/hooks/use-mobile';

type FormData = {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  city?: string;
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSignIn, setIsSignIn] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Check URL parameters on component mount
    if (searchParams.get('form') === 'join') {
      setIsSignIn(false);
    }
  }, [searchParams]);
  
  const onSubmit = (data: FormData) => {
    // This is just a demo auth flow
    console.log('Form submitted:', data);
    
    // Store user info in localStorage to simulate authentication
    localStorage.setItem('user', JSON.stringify({
      email: data.email,
      name: data.name || 'User',
      isAuthenticated: true
    }));
    
    // Show success toast
    toast.success(isSignIn ? "Signed in successfully!" : "Account created successfully!");
    
    // Redirect to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  // Toggle between sign in and join forms
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    reset(); // Reset form fields
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto">
      {/* Background image with overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(/lovable-uploads/011d175e-be13-4e78-9ce5-31cb1ca897cd.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 py-16 z-10 flex flex-col md:flex-row items-center justify-between min-h-screen">
        {/* Left side - headline */}
        <div className="mb-10 md:mb-0 md:w-1/2 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rezilia Health & Wellness</h1>
          <p className="text-xl md:text-2xl mb-6">Your AI-powered health and wellness companion</p>
          <p className="text-lg mb-4 max-w-lg">
            Personalized health monitoring, wellness tracking, and caregiver support all in one platform.
          </p>
          
          {/* Always show the buttons on mobile and desktop when not on form */}
          {(isSignIn || (!isSignIn && !document.URL.includes('form=join'))) && (
            <div className="flex flex-wrap gap-3 mt-8">
              <Button 
                onClick={() => setIsSignIn(true)}
                className="bg-rezilia-blue hover:bg-rezilia-blue/90 text-black font-bold py-2 px-6"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </Button>
              
              <Button 
                onClick={() => {
                  setIsSignIn(false);
                  navigate('?form=join');
                }}
                variant="outline"
                className="bg-white/10 text-white border-white hover:bg-white/20"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Join Now
              </Button>
            </div>
          )}
        </div>

        {/* Right side - form card */}
        <div className="w-full md:w-[400px] pb-16 md:pb-0">
          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle>{isSignIn ? "Sign In" : "Join Now"}</CardTitle>
              <CardDescription>
                {isSignIn 
                  ? "Enter your credentials to access your dashboard" 
                  : "Create your account to start your health journey"}
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                {/* Name field - only for Join Now form */}
                {!isSignIn && (
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...register("name", { required: !isSignIn ? "Name is required" : false })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                )}

                {/* Phone field - only for Join Now form */}
                {!isSignIn && (
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        className="pl-10"
                        {...register("phone", { required: !isSignIn ? "Phone number is required" : false })}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                )}

                {/* City field - only for Join Now form */}
                {!isSignIn && (
                  <div className="space-y-1">
                    <label htmlFor="city" className="text-sm font-medium">
                      City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="city"
                        type="text"
                        placeholder="New York"
                        className="pl-10"
                        {...register("city", { required: !isSignIn ? "City is required" : false })}
                      />
                    </div>
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                    )}
                  </div>
                )}
                
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", { required: "Password is required" })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit"
                  className="w-full bg-rezilia-purple hover:bg-rezilia-purple/90"
                >
                  {isSignIn ? "Sign In" : "Create Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <p className="text-center text-sm mt-4">
                  {isSignIn ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    type="button"
                    className="text-rezilia-purple font-semibold hover:underline"
                    onClick={toggleForm}
                  >
                    {isSignIn ? "Join Now" : "Sign In"}
                  </button>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
