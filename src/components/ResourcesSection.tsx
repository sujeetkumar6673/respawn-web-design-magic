
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const ResourcesSection: React.FC = () => {
  const { toast } = useToast();
  const [logoErrors, setLogoErrors] = useState<{[key: string]: boolean}>({});
  
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

  // Updated partners with simpler, more reliable logos
  const partners = [
    {
      id: 'partner1',
      name: 'Partner 1',
      logo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 'partner2',
      name: 'Partner 2',
      logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 'partner3',
      name: 'Partner 3',
      logo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=150&auto=format&fit=crop'
    }
  ];

  const handleImageError = (partnerId: string) => {
    setLogoErrors(prev => ({...prev, [partnerId]: true}));
    toast({
      title: "Image Load Error",
      description: `Could not load image for ${partnerId}`,
      variant: "destructive",
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
      
      <div className="mt-8 border-t pt-4">
        <h3 className="text-sm font-medium mb-4">Our Partners</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          {partners.map(partner => (
            <div 
              key={partner.id} 
              className="flex items-center justify-center bg-white p-4 rounded"
              style={{
                width: '120px',
                height: '80px',
                overflow: 'hidden'
              }}
            >
              {logoErrors[partner.id] ? (
                <div className="text-gray-400 text-center text-sm font-medium">
                  {partner.name}
                </div>
              ) : (
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`}
                  className="max-h-full max-w-full object-contain" 
                  onError={() => handleImageError(partner.id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {logoErrors && Object.keys(logoErrors).length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Image Loading Issue</AlertTitle>
          <AlertDescription>
            Some partner logos couldn't be loaded. Please check your network connection.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ResourcesSection;
