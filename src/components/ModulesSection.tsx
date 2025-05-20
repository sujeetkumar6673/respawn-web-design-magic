
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { SimpliciaBadge, AdmiliaIcon, ReziliaAIIcon } from '@/components/Icons';

const ModulesSection: React.FC = () => {
  const isMobile = useIsMobile();

  const modules = [
    {
      id: 'simplicia',
      name: 'Simplicia',
      description: 'Simplifying daily tasks',
      className: 'module-card-simplicia',
      icon: <SimpliciaBadge />
    },
    {
      id: 'admilia',
      name: 'Admilia',
      description: 'Automating admin tasks',
      secondLine: 'Library forms',
      className: 'module-card-admilia',
      icon: <AdmiliaIcon />
    },
    {
      id: 'rezilia-ai',
      name: 'Rezilia AI',
      description: 'Your AI Resilience Coach',
      className: 'module-card-rezilia',
      icon: <ReziliaAIIcon />
    }
  ];

  if (isMobile) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {modules.map((module) => (
          <Card 
            key={module.id} 
            className={`module-card ${module.className} cursor-pointer h-[70px] flex items-center`}
          >
            <CardContent className="p-2 flex flex-col justify-center w-full">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-4 h-4">{module.icon}</div>
                <h3 className="text-xs font-bold">{module.name}</h3>
              </div>
              <p className="text-[10px] opacity-75 line-clamp-2">{module.description}</p>
              {module.secondLine && <p className="text-[10px] opacity-75">{module.secondLine}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {modules.map((module) => (
        <Card 
          key={module.id} 
          className={`module-card ${module.className} cursor-pointer h-[85px]`}
        >
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5">{module.icon}</div>
              <h3 className="text-sm font-bold">{module.name}</h3>
            </div>
            <p className="text-xs opacity-75">{module.description}</p>
            {module.secondLine && <p className="text-xs opacity-75">{module.secondLine}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModulesSection;
