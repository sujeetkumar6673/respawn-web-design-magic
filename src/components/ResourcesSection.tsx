
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Link } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const ResourcesSection: React.FC = () => {
  const { toast } = useToast();
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  
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
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=300&auto=format&fit=crop',
      category: 'Health Web Event (HWE)'
    }
  ];

  // Simpler, more reliable partner logos using Unsplash tech/computer images
  const partners = [
    {
      id: 'partner1',
      name: 'Microsoft',
      logo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 'partner2',
      name: 'Amazon',
      logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 'partner3',
      name: 'Google',
      logo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=150&auto=format&fit=crop'
    }
  ];

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({...prev, [id]: true}));
    toast({
      title: "Image Load Error",
      description: `Could not load image for ${id}`,
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
      
      {/* Completely rebuilt partners section */}
      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-semibold mb-4">Our Partners</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map(partner => (
            <div key={partner.id} className="bg-white p-2 flex items-center justify-center" style={{width: '150px', height: '80px'}}>
              {imageErrors[partner.id] ? (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <Link className="h-6 w-6 mb-1 text-gray-400" />
                  <span className="text-xs text-gray-500">{partner.name}</span>
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

      {Object.keys(imageErrors).length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Image Loading Issue</AlertTitle>
          <AlertDescription>
            Some partner logos couldn't be loaded.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ResourcesSection;
