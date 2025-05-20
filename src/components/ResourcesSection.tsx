
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ResourcesSection: React.FC = () => {
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

  // Updated partners with reliable image URLs
  const partners = [
    {
      id: 'united',
      name: 'United Healthcare',
      logo: 'https://www.unitedhealthgroup.com/content/dam/UHG/Images/newsroom/logos/uh-logo-anniversary-2023.png',
      fallbackLogo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 'bcbs',
      name: 'Blue Cross Blue Shield',
      logo: 'https://www.bluecrossmn.com/sites/default/files/svg/logo_bcbsmn.svg',
      fallbackLogo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 'advent',
      name: 'Advent Health',
      logo: 'https://www.adventhealth.com/themes/default/img/AH_WHITE_LOGO.png',
      fallbackLogo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=150&auto=format&fit=crop'
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {resources.map(resource => (
          <div key={resource.id}>
            <h3 className="text-xs font-medium mb-1">{resource.category}</h3>
            <Card className="overflow-hidden">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-24 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=300&auto=format&fit=crop";
                }}
              />
              <CardContent className="p-2">
                <p className="text-xs font-medium line-clamp-2">{resource.title}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-4 my-3">
        {partners.map(partner => (
          <div key={partner.id} className="h-10 bg-rezilia-purple rounded-md px-4 py-1 flex items-center justify-center">
            <img 
              src={partner.logo} 
              alt={`${partner.name} logo`}
              className="h-6 max-w-[100px] object-contain" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = partner.fallbackLogo;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;
