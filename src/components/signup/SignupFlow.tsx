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
  // Phase 1 - Email & Password
  email: string;
  password: string;
  confirmPassword: string;
  
  // Phase 2 - Profile Details
  name: string;
  phone: string;
  agreeTerms: boolean;
  agreeDataUsage: boolean;
  userType: string;
  
  // Phase 3 - Assessment
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
      // Validate email and password
      const isValid = await trigger(['email', 'password', 'confirmPassword']);
      if (isValid && data.password === data.confirmPassword) {
        setCurrentStep(2);
      } else if (data.password !== data.confirmPassword) {
        toast.error("Passwords don't match");
      }
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      return;
    }

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

  const renderPhase1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
        <p className="text-gray-600">Enter your email and create a secure password</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="john@example.com"
            className="mt-1"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="password" className="text-sm font-medium">Password *</Label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            placeholder="••••••••"
            className="mt-1"
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
            className="mt-1"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          {watchedPassword && watchedConfirmPassword && watchedPassword !== watchedConfirmPassword && (
            <p className="text-red-500 text-sm mt-1">Passwords don't match</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderPhase2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Tell Us About Yourself</h2>
        <p className="text-gray-600">Complete your profile information</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="John Doe"
            className="mt-1"
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
            className="mt-1"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreeTerms"
              {...register("agreeTerms", { required: "You must agree to the terms" })}
              className="mt-1"
            />
            <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
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
            <Label htmlFor="agreeDataUsage" className="text-sm leading-relaxed">
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
              <div key={type.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <RadioGroupItem value={type.id} id={type.id} />
                <div className="flex-1">
                  <Label htmlFor={type.id} className="font-medium cursor-pointer text-base">
                    {type.title}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
          {errors.userType && <p className="text-red-500 text-sm mt-2">{errors.userType.message}</p>}
        </div>
      </div>
    </div>
  );

  const renderPhase3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Tell Us About Your Caregiving</h2>
        <p className="text-gray-600">Help us personalize your experience</p>
      </div>

      <div className="space-y-6">
        {/* Question 1 */}
        <div>
          <Label className="text-base font-medium mb-3 block">What's your primary caregiving situation?</Label>
          <RadioGroup
            value={watchedAssessment.caregivingSituation}
            onValueChange={(value) => setValue('caregivingSituation', value)}
            className="space-y-2"
          >
            {[
              'Caring for aging parent(s)',
              'Supporting spouse/partner with health needs',
              'Managing care for child with special needs',
              'Coordinating care for multiple family members',
              'Professional caregiver serving multiple clients',
              'Other'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase().replace(/\s+/g, '-')} id={option} />
                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Question 2 */}
        <div>
          <Label className="text-base font-medium mb-3 block">What's your biggest daily challenge in caregiving?</Label>
          <RadioGroup
            value={watchedAssessment.dailyChallenge}
            onValueChange={(value) => setValue('dailyChallenge', value)}
            className="space-y-2"
          >
            {[
              'Coordinating between multiple care providers',
              'Managing medications and appointments',
              'Finding reliable care resources and information',
              'Balancing caregiving with work/personal life',
              'Communicating effectively with family about care',
              'Tracking and organizing care documentation'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase().replace(/\s+/g, '-')} id={option} />
                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Question 3 */}
        <div>
          <Label className="text-base font-medium mb-3 block">How do you currently organize care information?</Label>
          <RadioGroup
            value={watchedAssessment.organizationMethod}
            onValueChange={(value) => setValue('organizationMethod', value)}
            className="space-y-2"
          >
            {[
              'Paper notebooks, calendars, and sticky notes',
              'Phone notes, reminders, and calendar apps',
              'Shared family group chats or messaging',
              'Spreadsheets or other digital tools',
              'Professional care management software',
              'Everything\'s stored mentally (no formal system)'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase().replace(/\s+/g, '-')} id={option} />
                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Question 4 */}
        <div>
          <Label className="text-base font-medium mb-3 block">Who else is involved in caregiving decisions?</Label>
          <RadioGroup
            value={watchedAssessment.careTeamStructure}
            onValueChange={(value) => setValue('careTeamStructure', value)}
            className="space-y-2"
          >
            {[
              'Just me - I handle everything alone',
              'Spouse/partner and I share responsibilities',
              'Multiple family members coordinate together',
              'Professional care team is heavily involved',
              'Mix of family and professional caregivers',
              'It varies depending on the situation'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase().replace(/\s+/g, '-')} id={option} />
                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Question 5 */}
        <div>
          <Label className="text-base font-medium mb-3 block">How often do you feel overwhelmed by caregiving responsibilities?</Label>
          <RadioGroup
            value={watchedAssessment.stressLevel}
            onValueChange={(value) => setValue('stressLevel', value)}
            className="space-y-2"
          >
            {[
              'Daily - almost every day feels overwhelming',
              'Several times per week',
              'Once or twice per week',
              'A few times per month',
              'Rarely - only during crisis situations',
              'Never - I feel in control of the situation'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase().replace(/\s+/g, '-')} id={option} />
                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Question 6 */}
        <div>
          <Label className="text-base font-medium mb-3 block">How supported do you feel in your caregiving role?</Label>
          <RadioGroup
            value={watchedAssessment.supportSystem}
            onValueChange={(value) => setValue('supportSystem', value)}
            className="space-y-2"
          >
            {[
              'Very supported - I have reliable help when needed',
              'Somewhat supported - help is available but limited',
              'Minimally supported - help exists but hard to access',
              'Barely supported - very little help available',
              'Not supported at all - I\'m completely on my own'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase().replace(/\s+/g, '-')} id={option} />
                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Question 7 */}
        <div>
          <Label className="text-base font-medium mb-3 block">How has caregiving affected other areas of your life?</Label>
          <RadioGroup
            value={watchedAssessment.workLifeBalance}
            onValueChange={(value) => setValue('workLifeBalance', value)}
            className="space-y-2"
          >
            {[
              'Significantly impacted work, relationships, and personal time',
              'Moderately affected some areas but manageable',
              'Minor adjustments needed but mostly balanced',
              'Minimal impact on other life areas',
              'Actually improved my life priorities and relationships'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase().replace(/\s+/g, '-')} id={option} />
                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Question 8 */}
        <div>
          <Label className="text-base font-medium mb-3 block">What would success look like for you in 3 months?</Label>
          <RadioGroup
            value={watchedAssessment.successVision}
            onValueChange={(value) => setValue('successVision', value)}
            className="space-y-2"
          >
            {[
              'Better organized care schedules and information',
              'Improved communication with family/care team',
              'Reduced daily stress and feeling of overwhelm',
              'More efficient care coordination and planning',
              'Enhanced tracking of care quality and outcomes',
              'More time for self-care and personal needs'
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase().replace(/\s+/g, '-')} id={option} />
                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );

  const renderPhase4 = () => {
    const recommendedPlan = getRecommendedPlan();
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-gray-600">Based on your assessment, we recommend the {subscriptionPlans.find(p => p.id === recommendedPlan)?.name}</p>
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
                    <span className="text-2xl">{plan.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <CardDescription>{plan.subtitle}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{plan.price}</p>
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
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
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

  return (
    <div className="w-full max-w-2xl mx-auto h-full flex flex-col">
      {/* Progress indicator */}
      <div className="mb-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`flex items-center ${step !== 4 ? 'flex-1' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step 
                  ? 'bg-rezilia-purple text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step !== 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep > step ? 'bg-rezilia-purple' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Email & Password</span>
          <span>Profile</span>
          <span>Assessment</span>
          <span>Plan</span>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
          <div className="flex-1">
            {getCurrentStepContent()}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t flex-shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 1 ? onBack : () => setCurrentStep(currentStep - 1)}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentStep === 1 ? 'Back to Sign In' : 'Previous'}
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-rezilia-purple hover:bg-rezilia-purple/90 flex items-center"
            >
              {isLoading ? 'Creating Account...' : currentStep === 4 ? 'Create Account' : 'Continue'}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupFlow;
