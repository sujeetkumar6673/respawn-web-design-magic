
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { authService, RegisterData } from '@/services/authService';

interface SignupData {
  // Phase 1 - Email only
  email: string;
  
  // Phase 2 - Profile Details & Password
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  agreeDataUsage: boolean;
  userType: string;
  
  // Phase 3 - Assessment (one question at a time)
  caregivingSituation: string;
  dailyChallenge: string;
  organizationMethod: string;
  careTeamStructure: string;
  stressLevel: string;
  supportSystem: string;
  workLifeBalance: string;
  successVision: string;
  
  // Phase 4 - Plan Selection
  selectedPlan: string;
}

interface SignupFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

const SignupFlow: React.FC<SignupFlowProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm<SignupData>();
  const { login } = useAuth();
  
  const watchedUserType = watch('userType');
  const watchedAssessment = watch();
  const watchedPassword = watch('password');
  const watchedConfirmPassword = watch('confirmPassword');

  const userTypes = [
    {
      id: 'family-caregiver',
      title: '👨‍👩‍👧‍👦 Family Caregiver',
      description: 'Primary caregiver for family member'
    },
    {
      id: 'family-member',
      title: '👥 Family Member',
      description: 'Supporting/coordinating family care'
    },
    {
      id: 'professional-caregiver',
      title: '🩺 Professional Caregiver',
      description: 'Providing paid caregiving services'
    }
  ];

  const assessmentQuestions = [
    {
      id: 'caregivingSituation',
      title: "What's your primary caregiving situation?",
      options: [
        'Caring for aging parent(s)',
        'Supporting spouse/partner with health needs',
        'Managing care for child with special needs',
        'Coordinating care for multiple family members',
        'Professional caregiver serving multiple clients',
        'Other'
      ]
    },
    {
      id: 'dailyChallenge',
      title: "What's your biggest daily challenge in caregiving?",
      options: [
        'Coordinating between multiple care providers',
        'Managing medications and appointments',
        'Finding reliable care resources and information',
        'Balancing caregiving with work/personal life',
        'Communicating effectively with family about care',
        'Tracking and organizing care documentation'
      ]
    },
    {
      id: 'organizationMethod',
      title: "How do you currently organize care information?",
      options: [
        'Paper notebooks, calendars, and sticky notes',
        'Phone notes, reminders, and calendar apps',
        'Shared family group chats or messaging',
        'Spreadsheets or other digital tools',
        'Professional care management software',
        'Everything\'s stored mentally (no formal system)'
      ]
    },
    {
      id: 'careTeamStructure',
      title: "Who else is involved in caregiving decisions?",
      options: [
        'Just me - I handle everything alone',
        'Spouse/partner and I share responsibilities',
        'Multiple family members coordinate together',
        'Professional care team is heavily involved',
        'Mix of family and professional caregivers',
        'It varies depending on the situation'
      ]
    },
    {
      id: 'stressLevel',
      title: "How often do you feel overwhelmed by caregiving responsibilities?",
      options: [
        'Daily - almost every day feels overwhelming',
        'Several times per week',
        'Once or twice per week',
        'A few times per month',
        'Rarely - only during crisis situations',
        'Never - I feel in control of the situation'
      ]
    },
    {
      id: 'supportSystem',
      title: "How supported do you feel in your caregiving role?",
      options: [
        'Very supported - I have reliable help when needed',
        'Somewhat supported - help is available but limited',
        'Minimally supported - help exists but hard to access',
        'Barely supported - very little help available',
        'Not supported at all - I\'m completely on my own'
      ]
    },
    {
      id: 'workLifeBalance',
      title: "How has caregiving affected other areas of your life?",
      options: [
        'Significantly impacted work, relationships, and personal time',
        'Moderately affected some areas but manageable',
        'Minor adjustments needed but mostly balanced',
        'Minimal impact on other life areas',
        'Actually improved my life priorities and relationships'
      ]
    },
    {
      id: 'successVision',
      title: "What would success look like for you in 3 months?",
      options: [
        'Better organized care schedules and information',
        'Improved communication with family/care team',
        'Reduced daily stress and feeling of overwhelm',
        'More efficient care coordination and planning',
        'Enhanced tracking of care quality and outcomes',
        'More time for self-care and personal needs'
      ]
    }
  ];

  const getRecommendedPlan = () => {
    const { stressLevel, userType, careTeamStructure } = watchedAssessment;
    
    if (userType === 'professional-caregiver') return 'professional';
    if (stressLevel === 'daily' || stressLevel === 'several-times-week') return 'premium';
    if (careTeamStructure === 'multiple-family' || careTeamStructure === 'mix-family-professional') return 'standard';
    return 'free';
  };

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free Plan',
      subtitle: 'Basic Organization',
      price: 'Free forever',
      icon: '🆓',
      features: [
        'Single care profile management',
        'Basic calendar and task tracking',
        'Mobile app access',
        'Community forum access'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      subtitle: 'Family Coordination',
      price: '$9.99/month or $99/year',
      icon: '⭐',
      features: [
        'Up to 3 care profiles',
        'Family sharing and collaboration',
        'Advanced scheduling and reminders',
        'Document storage and sharing',
        'Care team communication tools',
        'Basic reporting and insights'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      subtitle: 'Complete Care Management',
      price: '$19.99/month or $199/year',
      icon: '🚀',
      features: [
        'Unlimited care profiles',
        'Professional caregiver network access',
        'Advanced health tracking and analytics',
        'Integration with healthcare providers',
        'Priority customer support',
        'Mental health resources and check-ins',
        'Emergency contact automation'
      ]
    },
    {
      id: 'professional',
      name: 'Professional Plan',
      subtitle: 'For Care Providers',
      price: '$39.99/month or $399/year',
      icon: '🏥',
      features: [
        'Multi-client management dashboard',
        'Professional scheduling and billing tools',
        'Client family communication portal',
        'Compliance and documentation tools',
        'Professional development resources',
        'White-label options available'
      ]
    }
  ];

  const onSubmit = async (data: SignupData) => {
    if (currentStep === 1) {
      // Validate email only
      const isValid = await trigger(['email']);
      if (isValid) {
        setCurrentStep(2);
      }
      return;
    }
    
    if (currentStep === 2) {
      // Validate profile details and password
      const isValid = await trigger(['name', 'phone', 'password', 'confirmPassword', 'agreeTerms', 'agreeDataUsage', 'userType']);
      if (isValid && data.password === data.confirmPassword) {
        setCurrentStep(3);
        setCurrentQuestionIndex(0);
      } else if (data.password !== data.confirmPassword) {
        toast.error("Passwords don't match");
      }
      return;
    }
    
    if (currentStep === 3) {
      // Assessment - move to next question or next step
      if (currentQuestionIndex < assessmentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentStep(4);
      }
      return;
    }

    // Final step - create account
    setIsLoading(true);
    try {
      const registerData: RegisterData = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        city: 'Not specified'
      };
      
      const userData = await authService.register(registerData);
      
      if (userData) {
        login(userData);
        toast.success("Account created successfully!");
        onComplete();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssessmentPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setCurrentStep(2);
    }
  };

  const renderPhase1 = () => (
    <div className="space-y-6 px-2">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Join Rezilia</h2>
        <p className="text-gray-600 text-sm md:text-base">Enter your email to get started</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="john@example.com"
            className="mt-1 h-11"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>
    </div>
  );

  const renderPhase2 = () => (
    <div className="space-y-6 px-2">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Complete Your Profile</h2>
        <p className="text-gray-600 text-sm md:text-base">Tell us about yourself and create your password</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="John Doe"
            className="mt-1 h-11"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            placeholder="(555) 123-4567"
            className="mt-1 h-11"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <Label htmlFor="password" className="text-sm font-medium">Password *</Label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            placeholder="••••••••"
            className="mt-1 h-11"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", { required: "Please confirm your password" })}
            placeholder="••••••••"
            className="mt-1 h-11"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          {watchedPassword && watchedConfirmPassword && watchedPassword !== watchedConfirmPassword && (
            <p className="text-red-500 text-sm mt-1">Passwords don't match</p>
          )}
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreeTerms"
              {...register("agreeTerms", { required: "You must agree to the terms" })}
              className="mt-1"
            />
            <Label htmlFor="agreeTerms" className="text-sm leading-relaxed cursor-pointer">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
            </Label>
          </div>
          {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms.message}</p>}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreeDataUsage"
              {...register("agreeDataUsage", { required: "You must agree to data usage" })}
              className="mt-1"
            />
            <Label htmlFor="agreeDataUsage" className="text-sm leading-relaxed cursor-pointer">
              I consent to data usage: "We use your responses to personalize your experience and improve our platform. You can modify these preferences anytime."
            </Label>
          </div>
          {errors.agreeDataUsage && <p className="text-red-500 text-sm">{errors.agreeDataUsage.message}</p>}
        </div>

        <div className="space-y-4 pt-2">
          <Label className="text-base font-medium">Which best describes your role? *</Label>
          <RadioGroup
            value={watchedUserType}
            onValueChange={(value) => setValue('userType', value)}
            className="space-y-3"
          >
            {userTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-3 p-3 md:p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <RadioGroupItem value={type.id} id={type.id} />
                <div className="flex-1">
                  <Label htmlFor={type.id} className="font-medium cursor-pointer text-sm md:text-base">
                    {type.title}
                  </Label>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">{type.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
          {errors.userType && <p className="text-red-500 text-sm mt-2">{errors.userType.message}</p>}
        </div>
      </div>
    </div>
  );

  const renderPhase3 = () => {
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const currentValue = watchedAssessment[currentQuestion.id as keyof SignupData];
    
    return (
      <div className="space-y-6 px-2">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Assessment</h2>
          <p className="text-gray-600 text-sm md:text-base">
            Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-rezilia-purple h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / assessmentQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-base md:text-lg font-medium mb-4 block">
              {currentQuestion.title}
            </Label>
            <RadioGroup
              value={currentValue}
              onValueChange={(value) => setValue(currentQuestion.id as keyof SignupData, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-3 md:p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <RadioGroupItem value={option.toLowerCase().replace(/\s+/g, '-')} id={option} />
                  <Label htmlFor={option} className="cursor-pointer text-sm md:text-base flex-1 leading-relaxed">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    );
  };

  const renderPhase4 = () => {
    const recommendedPlan = getRecommendedPlan();
    
    return (
      <div className="space-y-6 px-2">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-gray-600 text-sm md:text-base">
            Based on your assessment, we recommend the {subscriptionPlans.find(p => p.id === recommendedPlan)?.name}
          </p>
        </div>

        <div className="grid gap-4">
          {subscriptionPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`cursor-pointer transition-all ${
                watchedAssessment.selectedPlan === plan.id 
                  ? 'ring-2 ring-rezilia-purple border-rezilia-purple' 
                  : 'hover:shadow-md'
              } ${
                plan.id === recommendedPlan 
                  ? 'bg-purple-50 border-purple-200' 
                  : ''
              }`}
              onClick={() => setValue('selectedPlan', plan.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl md:text-2xl">{plan.icon}</span>
                    <div>
                      <CardTitle className="text-base md:text-lg">{plan.name}</CardTitle>
                      <CardDescription className="text-sm">{plan.subtitle}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm md:text-lg">{plan.price}</p>
                    {plan.id === recommendedPlan && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-xs md:text-sm">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPhase1();
      case 2:
        return renderPhase2();
      case 3:
        return renderPhase3();
      case 4:
        return renderPhase4();
      default:
        return renderPhase1();
    }
  };

  const getStepNames = () => {
    return ['Email', 'Profile', 'Assessment', 'Plan'];
  };

  const handlePrevious = () => {
    if (currentStep === 3 && currentQuestionIndex > 0) {
      handleAssessmentPrevious();
    } else if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep(currentStep - 1);
      if (currentStep === 4) {
        setCurrentQuestionIndex(assessmentQuestions.length - 1);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-full flex flex-col">
      {/* Progress indicator */}
      <div className="mb-4 md:mb-6 flex-shrink-0 px-2">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`flex items-center ${step !== 4 ? 'flex-1' : ''}`}>
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                currentStep >= step 
                  ? 'bg-rezilia-purple text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step !== 4 && (
                <div className={`flex-1 h-1 mx-1 md:mx-2 ${
                  currentStep > step ? 'bg-rezilia-purple' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-600">
          {getStepNames().map((name) => (
            <span key={name} className="text-center">{name}</span>
          ))}
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
          <div className="flex-1">
            {getCurrentStepContent()}
          </div>

          <div className="flex justify-between mt-6 md:mt-8 pt-4 md:pt-6 border-t flex-shrink-0 px-2">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              className="flex items-center text-sm md:text-base h-10 md:h-11"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentStep === 1 ? 'Back to Sign In' : 'Previous'}
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-rezilia-purple hover:bg-rezilia-purple/90 flex items-center text-sm md:text-base h-10 md:h-11"
            >
              {isLoading ? 'Creating Account...' : 
               currentStep === 4 ? 'Create Account' : 
               currentStep === 3 && currentQuestionIndex < assessmentQuestions.length - 1 ? 'Next Question' : 
               'Continue'}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupFlow;
