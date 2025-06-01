import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface SkillsAnalysisProps {
  skills: string[];
  missingSkills: string[];
}

const SkillsAnalysis: React.FC<SkillsAnalysisProps> = ({ skills, missingSkills }) => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills Analysis</h3>
      
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full"
              style={{
                width: `${Math.round((skills.length / (skills.length + missingSkills.length)) * 100)}%`
              }}
            />
          </div>
          <span className="ml-3 text-sm font-medium">
            {Math.round((skills.length / (skills.length + missingSkills.length)) * 100)}% Match
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Your resume matches {Math.round((skills.length / (skills.length + missingSkills.length)) * 100)}% of commonly requested skills for your target positions.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-5 rounded-lg border border-green-100">
          <div className="flex items-center mb-3">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <h4 className="text-lg font-medium text-gray-800">Identified Skills</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
          <div className="flex items-center mb-3">
            <XCircle className="h-5 w-5 text-amber-600 mr-2" />
            <h4 className="text-lg font-medium text-gray-800">Missing Skills</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Consider adding these skills to your resume to improve job match percentages.
          </p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="text-lg font-medium text-gray-800 mb-2">AI Recommendation</h4>
        <p className="text-gray-700">
          Based on your current skills, consider focusing on learning {missingSkills[0]} and {missingSkills[1]} to significantly improve your job match percentage. These skills are frequently requested in job listings for your target positions.
        </p>
      </div>
    </div>
  );
};

export default SkillsAnalysis;