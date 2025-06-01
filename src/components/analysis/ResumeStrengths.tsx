import React from 'react';
import { ThumbsUp, Star } from 'lucide-react';

interface ResumeStrengthsProps {
  strengths: string[];
}

const ResumeStrengths: React.FC<ResumeStrengthsProps> = ({ strengths }) => {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <ThumbsUp className="h-6 w-6 text-green-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-800">Resume Strengths</h3>
      </div>
      
      <div className="bg-green-50 p-5 rounded-lg border border-green-100 mb-8">
        <p className="text-gray-700">
          Your resume demonstrates several notable strengths that employers value. Here's what stands out:
        </p>
      </div>
      
      <div className="space-y-4">
        {strengths.map((strength, index) => (
          <div 
            key={index}
            className="flex items-start p-4 border border-gray-100 rounded-lg bg-white hover:shadow-sm transition-shadow"
          >
            <div className="mr-4 p-2 bg-green-100 rounded-full text-green-600">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">{strength}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {getStrengthDescription(strength)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="text-lg font-medium text-gray-800 mb-2">How to Highlight Your Strengths</h4>
        <p className="text-gray-700">
          To make your strengths more impactful, consider adding specific examples or metrics that demonstrate these skills in action. Quantifying your achievements with numbers and results will make your resume more compelling to potential employers.
        </p>
      </div>
    </div>
  );
};

// Helper function to generate descriptions for strengths
function getStrengthDescription(strength: string): string {
  const descriptions: Record<string, string> = {
    'Strong frontend development skills': 'Your expertise in frontend technologies is clearly demonstrated and valuable in the current job market.',
    'Experience with modern JavaScript frameworks': 'Your knowledge of current frameworks shows you stay updated with industry standards.',
    'Good understanding of UI/UX principles': 'This skill is increasingly important as companies focus on user experience.',
    // Fallback for any other strengths
    'default': 'This is a valuable skill that employers are actively seeking in candidates.'
  };
  
  return descriptions[strength] || descriptions['default'];
}

export default ResumeStrengths;