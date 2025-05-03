import React, { useRef, useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { Technology, AdoptionState, Quadrant } from '../types';
import { stateToRadiusMap, stateToColorMap, quadrantColorMap } from '../data/initialData';
import { polarToCartesian, findValidPosition, constrainAngleToQuadrant, calculateTechnologyPosition } from '../utils/radarUtils';
import TechnologyItem from './TechnologyItem';
import TechnologySummary from './TechnologySummary';

interface RadarViewProps {
  technologies: Technology[];
  setTechnologies: (techs: Technology[]) => void;
  onTechnologyClick: (id: string) => void;
}

const RadarView: React.FC<RadarViewProps> = ({
  technologies,
  onTechnologyClick,
  onTechnologyDrag,
}) => {
  const radarRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });
  const [maxRadius, setMaxRadius] = useState(0);
  const [validPositions, setValidPositions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const updateDimensions = () => {
      if (radarRef.current) {
        const { width, height } = radarRef.current.getBoundingClientRect();
        const minDimension = Math.min(width, height);
        const newMaxRadius = Math.max(minDimension * 0.45, 400);
        
        setDimensions({ width, height });
        setCenterPoint({ x: width / 2, y: height / 2 });
        setMaxRadius(newMaxRadius);
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (radarRef.current) {
      resizeObserver.observe(radarRef.current);
    }

    return () => {
      if (radarRef.current) {
        resizeObserver.unobserve(radarRef.current);
      }
    };
  }, []);


  
  // Validate positions whenever technologies change
  useEffect(() => {
    const newValidPositions: Record<string, boolean> = {};
    
    technologies.forEach(tech => {
      const validPosition = findValidPosition(
        tech,
        technologies.filter(t => t.id !== tech.id),
        centerPoint.x,
        centerPoint.y,
        maxRadius
      );
      
      const angle = constrainAngleToQuadrant(validPosition.angle, tech.quadrant);
      newValidPositions[tech.id] = angle === validPosition.angle;
    });
    
    setValidPositions(newValidPositions);
  }, [technologies, centerPoint, maxRadius]);

  const handleExport = async () => {
    if (radarRef.current) {
      try {
        const dataUrl = await toPng(radarRef.current, {
          quality: 0.95,
          backgroundColor: document.documentElement.classList.contains('dark') ? '#1a1a1a' : 'white'
        });
        
        const link = document.createElement('a');
        link.download = `tech-radar-${new Date().toISOString().split('T')[0]}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Error exporting radar:', err);
      }
    }
  };

const renderStateCircles = () => {
  const states = Object.keys(stateToRadiusMap) as AdoptionState[];

  return states.map((state, index) => {
    const outerRadius = stateToRadiusMap[state].outer * maxRadius;
    const color = stateToColorMap[state] ?? {
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(200, 200, 200, 0.2)',
      border: '#999999'
    };

    return (
      <div
        key={state}
        className="absolute rounded-full border-2 transition-all duration-300"
        style={{
          width: outerRadius * 2,
          height: outerRadius * 2,
          left: centerPoint.x - outerRadius,
          top: centerPoint.y - outerRadius,
          zIndex: 10 + index,
          borderColor: color.border,
          background: `radial-gradient(circle, ${color.light} 0%, ${color.dark} 100%)`,
          boxShadow: `0 0 6px ${color.dark}` // <- This is where it goes
        }}
      />
    );
  });
};




  const renderQuadrantLines = () => {
    return (
      <>
        <div 
          className="absolute bg-gray-300/50 dark:bg-gray-600/50 transition-all duration-300"
          style={{
            width: '2px',
            height: maxRadius * 2,
            left: centerPoint.x - 1,
            top: centerPoint.y - maxRadius,
          }}
        />
        <div 
          className="absolute bg-gray-300/50 dark:bg-gray-600/50 transition-all duration-300"
          style={{
            width: maxRadius * 2,
            height: '2px',
            left: centerPoint.x - maxRadius,
            top: centerPoint.y - 1,
          }}
        />
      </>
    );
  };

  const renderQuadrantTitles = () => {
    const quadrants: { name: Quadrant; angle: number }[] = [
      { name: 'techniques', angle: 45 },
      { name: 'tools', angle: 135 },
      { name: 'platforms', angle: 225 },
      { name: 'languages', angle: 315 },
    ];

    return quadrants.map(({ name, angle }) => {
      const radians = (angle * Math.PI) / 180;
      const radius = maxRadius * 1.2;
      const x = centerPoint.x + (radius * Math.cos(radians - Math.PI / 2));
      const y = centerPoint.y + (radius * Math.sin(radians - Math.PI / 2));
      
      const quadrantColor = quadrantColorMap[name];
      
      return (
        <div
          key={name}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold ${quadrantColor.light} ${quadrantColor.dark} transition-colors duration-200`}
          style={{
            left: x,
            top: y,
            textAlign: 'center',
          }}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
          {name === 'languages' && <br />}
          {name === 'languages' && '& Frameworks'}
        </div>
      );
    });
  };

const renderTechnologies = () => {
  const usedPositions: { x: number; y: number }[] = [];

  return technologies.map((tech) => {
    const position = calculateTechnologyPosition(
      tech,
      usedPositions,
      centerPoint.x,
      centerPoint.y,
      maxRadius
    );

    usedPositions.push(position);

    return (
      <TechnologyItem
        key={tech.id}
        technology={tech}
        position={position}
        onClick={() => onTechnologyClick(tech.id)}
        isValidPosition={true}
      />
    );
  });
};



  const renderStateLabels = () => {
    const states = Object.keys(stateToRadiusMap) as AdoptionState[];
    
    return states.map((state) => {
      const radius = (stateToRadiusMap[state].inner + stateToRadiusMap[state].outer) / 2;
      const angle = -45;
      const radians = (angle * Math.PI) / 180;
      
      const x = centerPoint.x + (radius * maxRadius * Math.cos(radians));
      const y = centerPoint.y + (radius * maxRadius * Math.sin(radians));
      
      return (
        <div
          key={state}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full shadow-sm transition-colors duration-200"
          style={{
            left: x,
            top: y,
            zIndex: 30,
          }}
        >
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </div>
      );
    });
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <button
          onClick={handleExport}
          className="absolute top-4 right-4 z-50 bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          <span>Export as PNG</span>
        </button>
        
        <div 
          ref={radarRef}
          className="relative w-full h-full min-h-[800px] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white/90 dark:bg-gray-900/90 shadow-md transition-colors duration-200"
          style={{
            minWidth: '800px',
            padding: '80px',
          }}
        >
          {renderStateCircles()}
          {renderQuadrantLines()}
          {renderStateLabels()}
          {renderQuadrantTitles()}
          {renderTechnologies()}
        </div>
      </div>

      <TechnologySummary
        technologies={technologies}
        onTechnologyClick={onTechnologyClick}
      />
    </div>
  );
};

export default RadarView;