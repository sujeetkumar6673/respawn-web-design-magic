
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

  const partners = [
    {
      id: 'united',
      logo: 'https://www.unitedhealthgroup.com/content/dam/UHG/Images/Global/Logos/UHC_Logo.svg'
    },
    {
      id: 'bcbs',
      logo: 'https://www.bcbs.com/themes/custom/bcbs/img/bcbs-logo-web.svg'
    },
    {
      id: 'advent',
      logo: 'https://www.adventhealth.com/sites/default/files/styles/bfc-header-logo/public/media/advent-health-logo.svg'
    }
  ];

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
      
      <div className="flex flex-wrap items-center justify-center gap-8 my-4">
        {partners.map(partner => (
          <div key={partner.id} className="h-8">
            <img 
              src={partner.logo} 
              alt="Partner logo" 
              className="h-full" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/150x50?text=Partner+Logo";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;
