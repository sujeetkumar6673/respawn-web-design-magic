
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const ResourcesSection: React.FC = () => {
  const { toast } = useToast();
  
  const resources = [
    {
      id: 'hospital',
      title: 'After a Hospital Discharge, Food is a Valuable Medicine',
      image: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?q=80&w=300&auto=format&fit=crop',
      category: 'Library & Resources'
    },
    {
      id: 'developmental',
      title: 'Caring for a Loved One with Developmental Disabilities',
      image: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=300&auto=format&fit=crop',
      category: 'Forums & Communities'
    },
    {
      id: 'congress',
      title: 'Unique virtual congress + daily support ecosystem',
      image: 'https://images.unsplash.com/photo-1594026112324-096acbfrkj38?q=80&w=300&auto=format&fit=crop',
      category: 'Health Web Event (HWE)'
    }
  ];

  // Updated partners with more reliable image URLs
  const partners = [
    {
      id: 'microsoft',
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/800px-Microsoft_logo.svg.png',
      fallbackLogo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 'amazon',
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
      fallbackLogo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 'google',
      name: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png',
      fallbackLogo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=150&auto=format&fit=crop'
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string, partnerName: string) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackUrl;
    toast({
      title: "Image Load Error",
      description: `Switched to fallback image for ${partnerName}`,
      variant: "default",
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {resources.map(resource => (
          <div key={resource.id}>
            <h3 className="text-sm font-medium mb-2">{resource.category}</h3>
            <Card className="overflow-hidden">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-32 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=300&auto=format&fit=crop";
                }}
              />
              <CardContent className="p-3">
                <p className="text-sm font-medium">{resource.title}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="mt-8 mb-4 border-t pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {partners.map(partner => (
            <div 
              key={partner.id} 
              className="flex items-center justify-center p-2 bg-white"
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`}
                className="h-8 max-w-[120px] object-contain" 
                style={{ filter: "brightness(1)" }}
                onError={(e) => {
                  handleImageError(e, partner.fallbackLogo, partner.name);
                  // Display an alert when fallback is used
                  const errorAlert = document.createElement('div');
                  errorAlert.className = 'absolute bottom-0 left-0 right-0';
                  errorAlert.innerHTML = `<div class="text-xs text-red-500">Using fallback</div>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Error display for debugging */}
      <div className="mt-2 text-xs text-gray-500">
        <p>If you're seeing image load errors, try refreshing the page or check your internet connection.</p>
      </div>
    </div>
  );
};

export default ResourcesSection;
