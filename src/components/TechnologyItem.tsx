import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Technology } from '../types';
import { quadrantColorMap } from '../data/initialData';

interface TechnologyItemProps {
  technology: Technology;
  position: { x: number; y: number };
  onClick: () => void;
  isValidPosition: boolean;
}

const TechnologyItem: React.FC<TechnologyItemProps> = ({
  technology,
  position,
  onClick,
  isValidPosition,
}) => {
  const [imageError, setImageError] = useState(false);
  const iconName = technology.icon as keyof typeof Icons;
  const IconComponent = Icons[iconName] || Icons.HelpCircle;
  const quadrantColor = quadrantColorMap[technology.quadrant];

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-40 transition-all duration-200 ease-out group ${
        isValidPosition ? 'hover:scale-110' : 'opacity-50'
      }`}
      style={{
        left: position.x,
        top: position.y,
      }}
      onClick={onClick}
    >
      <div 
        className={`w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-md border-2 ${
          quadrantColor.light.replace('text-', 'border-')
        } ${
          quadrantColor.dark.replace('text-', 'border-')
        } overflow-hidden hover:shadow-lg transition-all duration-200 ${
          !isValidPosition ? 'border-red-500 dark:border-red-400' : ''
        }`}
      >
        {technology.logoUrl && !imageError ? (
          <div className="w-full h-full flex items-center justify-center p-1">
            <img
              src={technology.logoUrl}
              alt={technology.name}
              className="w-full h-full"
              style={{ objectFit: 'contain' }}
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <IconComponent className={`w-5 h-5 ${quadrantColor.light} ${quadrantColor.dark}`} />
        )}
      </div>
      <div className="opacity-0 group-hover:opacity-100 absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap transition-opacity duration-200">
        {technology.name}
        {!isValidPosition && (
          <span className="block text-red-400">
            Invalid position
          </span>
        )}
      </div>
    </div>
  );
};

export default TechnologyItem;