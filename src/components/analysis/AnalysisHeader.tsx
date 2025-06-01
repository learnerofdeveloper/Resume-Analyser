import React from 'react';
import { FileText, Calendar } from 'lucide-react';

interface AnalysisHeaderProps {
  resumeName: string;
  analysisDate: Date;
}

const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({ resumeName, analysisDate }) => {
  const formattedDate = new Date(analysisDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <FileText className="h-6 w-6 text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">{resumeName}</h1>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Calendar className="h-4 w-4 mr-1" />
        <span>Analyzed on {formattedDate}</span>
      </div>
    </div>
  );
};

export default AnalysisHeader;