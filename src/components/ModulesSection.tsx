
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ModulesSection: React.FC = () => {
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
