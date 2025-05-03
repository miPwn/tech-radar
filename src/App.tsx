import React, { useState, useEffect } from 'react';
import { Technology, RadarData } from './types';
import { initialRadarData } from './data/initialData';
import { updateTechnologyPosition, findTechnologyById, findValidPosition } from './utils/radarUtils';
import { saveRadarDataToFile, loadRadarDataFromFile } from './utils/fileUtils';
import RadarView from './components/RadarView';
import TechnologyLibrary from './components/TechnologyLibrary';
import JsonEditor from './components/JsonEditor';
import TechnologyDetail from './components/TechnologyDetail';
import { Radar, Save, FileUp, FileJson, Github, Moon, Sun } from 'lucide-react';

function App() {
  const [radarData, setRadarData] = useState<RadarData>(initialRadarData);
  const [activeView, setActiveView] = useState<'radar' | 'json'>('radar');
  const [selectedTechnologyId, setSelectedTechnologyId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [technologies, setTechnologies] = useState<Technology[]>(initialRadarData.technologies);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const selectedTechnology = selectedTechnologyId
    ? findTechnologyById(technologies, selectedTechnologyId)
    : undefined;

  const handleAddTechnology = (technology: Technology) => {
    const newTechs = [...technologies, technology];
    setTechnologies(newTechs);
    setRadarData(prev => ({
      ...prev,
      technologies: newTechs,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleUpdateTechnology = (technology: Technology) => {
    const updatedTechs = technologies.map(t => (t.id === technology.id ? technology : t));
    setTechnologies(updatedTechs);
    setRadarData(prev => ({
      ...prev,
      technologies: updatedTechs,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleDeleteTechnology = (id: string) => {
    const newTechs = technologies.filter(t => t.id !== id);
    setTechnologies(newTechs);
    setRadarData(prev => ({
      ...prev,
      technologies: newTechs,
      lastUpdated: new Date().toISOString(),
    }));

    if (selectedTechnologyId === id) {
      setSelectedTechnologyId(null);
    }
  };

  const handleUpdateRadarData = (data: RadarData) => {
    setRadarData(data);
    setTechnologies(data.technologies);
  };

  const handleSaveRadarData = () => {
    saveRadarDataToFile({ ...radarData, technologies });
  };

  const handleLoadRadarData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadRadarDataFromFile(e.target.files[0])
        .then((data) => {
          setRadarData(data);
          setTechnologies(data.technologies);
          e.target.value = '';
        })
        .catch((error) => {
          alert(`Error loading file: ${error.message}`);
          e.target.value = '';
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-blue-600 text-white p-2 rounded-md mr-3">
              <Radar className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{radarData.companyName} Tech Radar</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date(radarData.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-md flex">
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'radar'
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
                onClick={() => setActiveView('radar')}
              >
                Radar View
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'json'
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
                onClick={() => setActiveView('json')}
              >
                JSON Editor
              </button>
            </div>

            <button
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              onClick={handleSaveRadarData}
            >
              <Save className="w-4 h-4 mr-1" />
              <span>Save</span>
            </button>

            <label className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center cursor-pointer">
              <FileUp className="w-4 h-4 mr-1" />
              <span>Load</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleLoadRadarData}
              />
            </label>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {activeView === 'radar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <TechnologyLibrary onAddTechnology={handleAddTechnology} />
            </div>
            <div className="lg:col-span-3 overflow-auto">
              <RadarView
                technologies={technologies}
                setTechnologies={setTechnologies}
                onTechnologyClick={setSelectedTechnologyId}
              />
            </div>
          </div>
        ) : (
          <div className="h-[600px]">
            <JsonEditor data={radarData} onUpdate={handleUpdateRadarData} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 mt-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-gray-500 dark:text-gray-400 text-sm">
          <div>
            © {new Date().getFullYear()} {radarData.companyName}. All rights reserved.
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <a href="#" className="flex items-center hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <Github className="w-4 h-4 mr-1" />
              <span>View on GitHub</span>
            </a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Documentation</a>
          </div>
        </div>
      </footer>

      {selectedTechnology && (
        <TechnologyDetail
          technology={selectedTechnology}
          onClose={() => setSelectedTechnologyId(null)}
          onUpdate={handleUpdateTechnology}
          onDelete={handleDeleteTechnology}
        />
      )}
    </div>
  );
}

export default App;
