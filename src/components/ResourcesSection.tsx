
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

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

  // Updated partners with reliable fallback image URLs
  const partners = [
    {
      id: 'united',
      name: 'United Healthcare',
      logo: 'https://www.unitedhealthgroup.com/content/dam/UHG/Images/newsroom/logos/uh-logo-anniversary-2023.png',
      fallbackLogo: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 'bcbs',
      name: 'Blue Cross Blue Shield',
      logo: 'https://www.bluecrossmn.com/sites/default/files/svg/logo_bcbsmn.svg',
      fallbackLogo: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 'advent',
      name: 'Advent Health',
      logo: 'https://www.adventhealth.com/themes/default/img/AH_WHITE_LOGO.png',
      fallbackLogo: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=150&auto=format&fit=crop'
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
      
      <div className="flex flex-wrap items-center justify-center gap-8 my-6">
        {partners.map(partner => (
          <div key={partner.id} className="h-12 bg-white rounded-md px-6 py-2 flex items-center justify-center shadow-md">
            <img 
              src={partner.logo} 
              alt={`${partner.name} logo`}
              className="h-8 max-w-[120px] object-contain" 
              onError={(e) => handleImageError(e, partner.fallbackLogo, partner.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;
