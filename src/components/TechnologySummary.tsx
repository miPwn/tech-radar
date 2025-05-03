import React from 'react';
import clsx from 'clsx';
import { Technology, AdoptionState } from '../types';

interface TechnologySummaryProps {
  technologies: Technology[];
  onTechnologyClick: (id: string) => void;
}

const TechnologySummary: React.FC<TechnologySummaryProps> = ({
  technologies,
  onTechnologyClick,
}) => {
  const zones: AdoptionState[] = ['adopted', 'planned', 'evaluation', 'submitted', 'rejected'];

  return (
    <div className="mt-8 space-y-6">
      {zones.map((zone) => {
        const zoneTechnologies = technologies.filter((tech) => tech.state === zone);
        if (zoneTechnologies.length === 0) return null;

        return (
          <div
            key={zone}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200"
          >
            <div
              className={clsx(
                'px-4 py-2',
                {
                  'bg-[#58ab58] text-white': zone === 'adopted',
                  'bg-[#7ed87e] text-black': zone === 'planned',
                  'bg-[#f8a039] text-black': zone === 'evaluation',
                  'bg-[#95d2eb] text-black': zone === 'submitted',
                  'bg-[#ec8ea9] text-black': zone === 'rejected',
                }
              )}
            >
              <h3 className="text-lg font-semibold capitalize">{zone}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                      Quadrant
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                      Use Case
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                      Decision Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {zoneTechnologies.map((tech) => (
                    <tr
                      key={tech.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                      onClick={() => onTechnologyClick(tech.id)}
                    >
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{tech.name}</td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300 capitalize">{tech.quadrant}</td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{tech.useCase || '-'}</td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{tech.decisionDetails || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechnologySummary;
