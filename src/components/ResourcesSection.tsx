
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const ResourcesSection: React.FC = () => {
  const { toast } = useToast();
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  
  // Reduced the size of resources for better loading
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

  // Using very simple SVG colored backgrounds instead of images
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
      {/* Further reduced size of resource cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 mb-2">
        {resources.map(resource => (
          <div key={resource.id}>
            <h3 className="text-[10px] font-medium mb-0.5">{resource.category}</h3>
            <Card className="overflow-hidden">
              <div className="h-16 bg-gray-100">
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
              <CardContent className="p-1">
                <p className="text-[10px] font-medium">{resource.title}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      {/* Partner section - even more compact layout */}
      <div className="mt-2 border-t pt-2">
        <div className="flex flex-wrap justify-center gap-2">
          {partners.map(partner => (
            <div 
              key={partner.id} 
              className="flex items-center justify-center rounded-md shadow-sm" 
              style={{
                width: '60px', 
                height: '30px', 
                backgroundColor: partner.color,
                color: 'white'
              }}
            >
              <span className="text-[9px] font-bold">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Only show alert if we have actual image errors */}
      {Object.keys(imageErrors).length > 0 && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-3 w-3" />
          <AlertTitle className="text-xs">Image Loading Issue</AlertTitle>
          <AlertDescription className="text-[10px]">
            Some images couldn't be loaded.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ResourcesSection;
