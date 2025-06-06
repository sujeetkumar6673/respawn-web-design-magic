
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, LogIn, UserPlus, Phone, MapPin } from 'lucide-react';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { authService, LoginCredentials } from '@/services/authService';
import SignupFlow from '@/components/signup/SignupFlow';

type FormData = {
  email: string;
  password: string;
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSignIn, setIsSignIn] = useState(true);
  const [showSignupFlow, setShowSignupFlow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const isMobile = useIsMobile();
  const { login, isAuthenticated } = useAuth();
  
  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    // Check URL parameters on component mount
    if (searchParams.get('form') === 'join') {
      setShowSignupFlow(true);
    }
  }, [searchParams]);
  
  const onSubmit = async (data: FormData) => {
    // Only handle sign in form submission
    if (!isSignIn) return;

    setIsLoading(true);
    
    try {
      const credentials: LoginCredentials = {
        email: data.email,
        password: data.password
      };
      const userData = await authService.login(credentials);
      
      if (userData) {
        login(userData);
        toast.success("Signed in successfully!");
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinNowClick = () => {
    setShowSignupFlow(true);
  };

  const handleSignupComplete = () => {
    setShowSignupFlow(false);
    navigate('/dashboard');
  };

  const handleBackToSignIn = () => {
    setShowSignupFlow(false);
    setIsSignIn(true);
  };

  // Toggle to sign in form
  const toggleToSignIn = () => {
    setIsSignIn(true);
    reset(); // Reset form fields
  };

  if (showSignupFlow) {
    if (isMobile) {
      return (
        <div className="min-h-screen w-full overflow-hidden">
          {/* Background image with overlay */}
          <div 
            className="fixed inset-0 z-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: 'url(/lovable-uploads/47b15075-bd0e-406a-ad46-426378162a9a.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
          </div>

          {/* Content */}
          <div className="container relative mx-auto px-4 py-8 z-10 min-h-screen overflow-y-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-lg p-6 min-h-[calc(100vh-4rem)]">
              <SignupFlow onComplete={handleSignupComplete} onBack={handleBackToSignIn} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen w-full flex overflow-hidden">
        {/* Left half - Family care image */}
        <div className="w-1/2 relative">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: 'url(/lovable-uploads/6fc2af35-6587-4e5e-872e-874ef4f857c4.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          {/* Overlay content */}
          <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
            <h1 className="text-5xl font-bold mb-6">Rezilia Health & Wellness</h1>
            <p className="text-2xl mb-8">Your AI-powered health and wellness companion</p>
            <p className="text-lg max-w-lg leading-relaxed">
              Personalized health monitoring, wellness tracking, and caregiver support all in one platform. 
              Transform your health journey with intelligent insights and comprehensive care.
            </p>
          </div>
        </div>

        {/* Right half - Signup Flow with dashboard background */}
        <div className="w-1/2 relative">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: 'url(/lovable-uploads/47b15075-bd0e-406a-ad46-426378162a9a.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-white/80"></div>
          </div>
          <div className="relative z-10 overflow-y-auto h-full">
            <div className="p-8">
              <SignupFlow onComplete={handleSignupComplete} onBack={handleBackToSignIn} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    // Mobile layout - full screen with background
    return (
      <div className="min-h-screen w-full overflow-hidden">
        {/* Background image with overlay */}
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(/lovable-uploads/6fc2af35-6587-4e5e-872e-874ef4f857c4.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        </div>

        {/* Content */}
        <div className="container relative mx-auto px-4 py-8 z-10 flex flex-col items-center justify-between min-h-screen overflow-y-auto">
          {/* Header */}
          <div className="text-white text-center mb-6">
            <h1 className="text-3xl font-bold mb-3">Rezilia Health & Wellness</h1>
            <p className="text-lg mb-4">Your AI-powered health and wellness companion</p>
          </div>

          {/* Form card */}
          <div className="w-full max-w-md">
            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-lg overflow-y-auto max-h-[80vh]">
              <CardHeader className="pt-4 pb-2 sticky top-0 bg-white/95 z-10">
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-3 py-2">
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
                
                <CardFooter className="flex flex-col pt-0 pb-4 sticky bottom-0 bg-white/95 z-10">
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-rezilia-purple hover:bg-rezilia-purple/90"
                  >
                    {isLoading ? "Loading..." : "Sign In"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                  
                  <p className="text-center text-sm mt-3">
                    Don't have an account?{" "}
                    <button 
                      type="button"
                      className="text-rezilia-purple font-semibold hover:underline"
                      onClick={handleJoinNowClick}
                    >
                      Join Now
                    </button>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div className="pb-4"></div>
        </div>
      </div>
    );
  }

  // Desktop layout - half image, half form
  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      {/* Left half - Family care image */}
      <div className="w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(/lovable-uploads/6fc2af35-6587-4e5e-872e-874ef4f857c4.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Overlay content */}
        <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
          <h1 className="text-5xl font-bold mb-6">Rezilia Health & Wellness</h1>
          <p className="text-2xl mb-8">Your AI-powered health and wellness companion</p>
          <p className="text-lg max-w-lg leading-relaxed">
            Personalized health monitoring, wellness tracking, and caregiver support all in one platform. 
            Transform your health journey with intelligent insights and comprehensive care.
          </p>
        </div>
      </div>

      {/* Right half - Form with dashboard background */}
      <div className="w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(/lovable-uploads/47b15075-bd0e-406a-ad46-426378162a9a.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-white/85"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center p-8 h-full">
          <div className="w-full max-w-md">
            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription className="text-base">
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="h-11"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-11"
                      {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col pt-4 pb-6">
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-rezilia-purple hover:bg-rezilia-purple/90 h-11"
                  >
                    {isLoading ? "Loading..." : "Sign In"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                  
                  <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <button 
                      type="button"
                      className="text-rezilia-purple font-semibold hover:underline"
                      onClick={handleJoinNowClick}
                    >
                      Join Now
                    </button>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
