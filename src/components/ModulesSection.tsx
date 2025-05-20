
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

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
      <div className="grid grid-cols-3 gap-1.5">
        {modules.map((module) => (
          <Card 
            key={module.id} 
            className={`module-card ${module.className} cursor-pointer h-[70px] flex items-center`}
          >
            <CardContent className="p-1.5 flex flex-col justify-center w-full">
              <h3 className="text-xs font-bold">{module.name}</h3>
              <p className="text-[10px] opacity-75 line-clamp-2">{module.description}</p>
              {module.secondLine && <p className="text-[10px] opacity-75">{module.secondLine}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
      {modules.map((module) => (
        <Card 
          key={module.id} 
          className={`module-card ${module.className} cursor-pointer h-[70px]`}
        >
          <CardContent className="p-1.5">
            <h3 className="text-sm font-bold">{module.name}</h3>
            <p className="text-xs opacity-75">{module.description}</p>
            {module.secondLine && <p className="text-xs opacity-75">{module.secondLine}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModulesSection;
