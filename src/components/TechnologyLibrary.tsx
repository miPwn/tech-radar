import React, { useState } from 'react';
import { Technology, Quadrant } from '../types';
import { generateId } from '../utils/radarUtils';

interface TechnologyLibraryProps {
  onAddTechnology: (technology: Technology) => void;
}

const TechnologyLibrary: React.FC<TechnologyLibraryProps> = ({ onAddTechnology }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedQuadrant, setSelectedQuadrant] = useState<Quadrant>('tools');

  const handleAddTechnology = () => {
    if (!name.trim()) return;

    const newTechnology: Technology = {
      id: generateId(),
      name: name.trim(),
      description: description.trim() || undefined,
      icon: 'code',
      quadrant: selectedQuadrant,
      state: 'submitted'
    };

    onAddTechnology(newTechnology);
    
    setName('');
    setDescription('');
    setSelectedQuadrant('tools');
  };

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-md transition-colors duration-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Submit for Review</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="tech-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            id="tech-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            placeholder="e.g. React, Docker, AWS"
          />
        </div>
        
        <div>
          <label htmlFor="tech-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description (optional)
          </label>
          <textarea
            id="tech-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            placeholder="Short description of the technology"
            rows={2}
          />
        </div>
        
        <div>
          <label htmlFor="tech-quadrant" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quadrant
          </label>
          <select
            id="tech-quadrant"
            value={selectedQuadrant}
            onChange={(e) => setSelectedQuadrant(e.target.value as Quadrant)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="techniques">Techniques</option>
            <option value="tools">Tools</option>
            <option value="platforms">Platforms</option>
            <option value="languages">Languages</option>
          </select>
        </div>
        
        <button
          type="button"
          onClick={handleAddTechnology}
          disabled={!name.trim()}
          className={`w-full p-2 rounded-md text-white font-medium transition-colors duration-200 ${
            name.trim() 
              ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' 
              : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
          }`}
        >
          Submit Technology
        </button>
      </div>
    </div>
  );
};

export default TechnologyLibrary;