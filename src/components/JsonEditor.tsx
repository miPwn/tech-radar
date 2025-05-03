import React, { useState, useEffect } from 'react';
import { RadarData } from '../types';

interface JsonEditorProps {
  data: RadarData;
  onUpdate: (data: RadarData) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ data, onUpdate }) => {
  const [jsonString, setJsonString] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Update the JSON string when the data changes
  useEffect(() => {
    setJsonString(JSON.stringify(data, null, 2));
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setJsonString(newValue);
    
    try {
      JSON.parse(newValue);
      setIsValid(true);
      setErrorMessage('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage('Invalid JSON format');
    }
  };

  const handleApply = () => {
    if (!isValid) return;
    
    try {
      const parsedData = JSON.parse(jsonString) as RadarData;
      onUpdate(parsedData);
    } catch (error) {
      setIsValid(false);
      setErrorMessage('Invalid radar data format');
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white/90 shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">JSON Editor</h2>
        <button
          className={`px-3 py-1 rounded-md text-white text-sm font-medium transition-colors ${
            isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleApply}
          disabled={!isValid}
        >
          Apply Changes
        </button>
      </div>
      
      <div className="relative flex-grow">
        <textarea
          value={jsonString}
          onChange={handleChange}
          className={`w-full h-full p-3 font-mono text-sm border rounded-md focus:outline-none focus:ring-2 ${
            isValid ? 'border-gray-300 focus:ring-blue-500' : 'border-red-300 focus:ring-red-500'
          }`}
          spellCheck="false"
        />
        
        {!isValid && (
          <div className="absolute bottom-2 left-2 right-2 bg-red-100 text-red-700 p-2 rounded-md text-sm">
            {errorMessage || 'Invalid JSON'}
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonEditor;