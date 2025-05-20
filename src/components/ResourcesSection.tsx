
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const ResourcesSection: React.FC = () => {
  const { toast } = useToast();
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  
  const resources = [
    {
      id: 'hospital',
      title: 'After a Hospital Discharge',
      image: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?q=80&w=200&auto=format&fit=crop',
      category: 'Library & Resources'
    },
    {
      id: 'developmental',
      title: 'Caring for a Loved One',
      image: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=200&auto=format&fit=crop',
      category: 'Forums & Communities'
    },
    {
      id: 'congress',
      title: 'Virtual congress ecosystem',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=200&auto=format&fit=crop',
      category: 'Health Web Event (HWE)'
    }
  ];

  const partners = [
    {
      id: 'partner1',
      name: 'Partner A',
      color: '#4285F4' // Blue
    },
    {
      id: 'partner2',
      name: 'Partner B',
      color: '#34A853' // Green
    },
    {
      id: 'partner3',
      name: 'Partner C',
      color: '#EA4335' // Red
    }
  ];

  const handleImageError = (id: string) => {
    console.log(`Image load error for: ${id}`);
    setImageErrors(prev => ({...prev, [id]: true}));
    toast({
      title: "Image Load Error",
      description: `Could not load image for ${id}`,
      variant: "destructive",
    });
  };

  return (
    <div>
      {/* Resource cards with proper responsive sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
        {resources.map(resource => (
          <div key={resource.id}>
            <h3 className="text-xs font-medium mb-1">{resource.category}</h3>
            <Card className="overflow-hidden h-full">
              <div className="h-24 bg-gray-100">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <CardContent className="p-2">
                <p className="text-sm font-medium">{resource.title}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      {/* Compact Partner section */}
      <div className="mt-2 flex items-center justify-center">
        <div className="flex gap-2">
          {partners.map(partner => (
            <div 
              key={partner.id} 
              className="flex items-center justify-center rounded-sm shadow-sm" 
              style={{
                width: '70px', 
                height: '24px',
                backgroundColor: partner.color,
                color: 'white'
              }}
            >
              <span className="text-xs font-bold">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alert for image errors */}
      {Object.keys(imageErrors).length > 0 && (
        <Alert variant="destructive" className="mt-2 py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-sm">Image Loading Issue</AlertTitle>
          <AlertDescription className="text-xs">
            Some images couldn't be loaded.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ResourcesSection;
