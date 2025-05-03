import React, { useState, useRef } from 'react';
import * as Icons from 'lucide-react';
import { Technology, AdoptionState, Quadrant } from '../types';
import { quadrantColorMap } from '../data/initialData';

interface TechnologyDetailProps {
  technology: Technology;
  onClose: () => void;
  onUpdate: (technology: Technology) => void;
  onDelete: (id: string) => void;
}

const TechnologyDetail: React.FC<TechnologyDetailProps> = ({
  technology,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [editedTechnology, setEditedTechnology] = useState(technology);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const iconName = technology.icon as keyof typeof Icons;
  const IconComponent = Icons[iconName] || Icons.HelpCircle;
  const quadrantColor = quadrantColorMap[technology.quadrant];

  const handleStateChange = (newState: AdoptionState) => {
    const stateToRadius = {
      adopted: 0.2,
      planned: 0.45,
      evaluation: 0.65,
      submitted: 0.78,
      rejected: 0.92,
    };

    const updatedTechnology = {
      ...editedTechnology,
      state: newState,
      position: {
        ...editedTechnology.position,
        radius: stateToRadius[newState],
      },
    };
    
    setEditedTechnology(updatedTechnology);
    onUpdate(updatedTechnology);
  };

  const handleInputChange = (field: keyof Technology, value: string) => {
    const updatedTechnology = {
      ...editedTechnology,
      [field]: value,
    };
    setEditedTechnology(updatedTechnology);
    onUpdate(updatedTechnology);
  };

  const handleQuadrantChange = (newQuadrant: Quadrant) => {
    const updatedTechnology = {
      ...editedTechnology,
      quadrant: newQuadrant,
    };
    setEditedTechnology(updatedTechnology);
    onUpdate(updatedTechnology);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    try {
      const reader = new FileReader();
      
      const promise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
      });

      reader.readAsDataURL(file);
      const dataUrl = await promise;

      const updatedTechnology = {
        ...editedTechnology,
        logoUrl: dataUrl as string,
      };
      
      setEditedTechnology(updatedTechnology);
      onUpdate(updatedTechnology);
      setImageError(false);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image');
    }
  };

  const handleRemoveLogo = () => {
    const updatedTechnology = {
      ...editedTechnology,
      logoUrl: undefined,
    };
    setEditedTechnology(updatedTechnology);
    onUpdate(updatedTechnology);
    setImageError(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Technology Details</h2>
          <button
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            onClick={onClose}
          >
            <Icons.X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Icon and name */}
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${quadrantColor.light.replace('text-', 'bg-')}/10 border-2 ${quadrantColor.light.replace('text-', 'border-')}`}>
              {editedTechnology.logoUrl && !imageError ? (
                <img
                  src={editedTechnology.logoUrl}
                  alt={editedTechnology.name}
                  className="w-full h-full p-2"
                  style={{ objectFit: 'contain' }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <IconComponent className={`w-6 h-6 ${quadrantColor.light} ${quadrantColor.dark}`} />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{technology.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{technology.quadrant}</p>
            </div>
          </div>

          {/* Logo upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Upload Image
              </button>
              {editedTechnology.logoUrl && (
                <button
                  onClick={handleRemoveLogo}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                  Remove Logo
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
          </div>

          {/* Quadrant selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quadrant
            </label>
            <select
              value={editedTechnology.quadrant}
              onChange={(e) => handleQuadrantChange(e.target.value as Quadrant)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="techniques">Techniques</option>
              <option value="tools">Tools</option>
              <option value="platforms">Platforms</option>
              <option value="languages">Languages</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={editedTechnology.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>

          {/* Use Case */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Use Case
            </label>
            <textarea
              value={editedTechnology.useCase || ''}
              onChange={(e) => handleInputChange('useCase', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>

          {/* Decision Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Decision Details
            </label>
            <textarea
              value={editedTechnology.decisionDetails || ''}
              onChange={(e) => handleInputChange('decisionDetails', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>

          {/* Current state */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Adoption State</h4>
            <div className="flex flex-wrap gap-2">
              {(['adopted', 'planned', 'evaluation', 'submitted', 'rejected'] as AdoptionState[]).map((state) => (
                <button
                  key={state}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    technology.state === state
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handleStateChange(state)}
                >
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Delete button */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${technology.name}?`)) {
                  onDelete(technology.id);
                }
              }}
            >
              Delete Technology
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyDetail;