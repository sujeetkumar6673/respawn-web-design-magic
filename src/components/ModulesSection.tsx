
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

const ModulesSection: React.FC = () => {
  const isMobile = useIsMobile();

  const modules = [
    {
      id: 'simplicia',
      name: 'Simplicia',
      description: 'Simplifying daily tasks',
      className: 'module-card-simplicia'
    },
    {
      id: 'admilia',
      name: 'Admilia',
      description: 'Automating admin tasks',
      secondLine: 'Library forms',
      className: 'module-card-admilia'
    },
    {
      id: 'rezilia-ai',
      name: 'Rezilia AI',
      description: 'Your AI Resilience Coach',
      className: 'module-card-rezilia'
    }
  ];

  if (isMobile) {
    return (
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-3 w-max">
          {modules.map((module) => (
            <Card 
              key={module.id} 
              className={`module-card ${module.className} cursor-pointer min-w-[160px] h-[80px] flex items-center`}
            >
              <CardContent className="p-3">
                <h3 className="text-base font-bold">{module.name}</h3>
                <p className="text-xs opacity-75 line-clamp-1">{module.description}</p>
                {module.secondLine && <p className="text-xs opacity-75 line-clamp-1">{module.secondLine}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {modules.map((module) => (
        <Card key={module.id} className={`module-card ${module.className} cursor-pointer`}>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold">{module.name}</h3>
            <p className="text-sm opacity-75">{module.description}</p>
            {module.secondLine && <p className="text-sm opacity-75">{module.secondLine}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModulesSection;
