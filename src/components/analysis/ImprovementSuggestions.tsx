import React from 'react';
import { ArrowUpCircle, Lightbulb } from 'lucide-react';

interface ImprovementSuggestionsProps {
  improvements: string[];
}

const ImprovementSuggestions: React.FC<ImprovementSuggestionsProps> = ({ improvements }) => {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <ArrowUpCircle className="h-6 w-6 text-amber-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-800">Improvement Suggestions</h3>
      </div>
      
      <div className="bg-amber-50 p-5 rounded-lg border border-amber-100 mb-8">
        <p className="text-gray-700">
          Based on our analysis, here are some suggestions to strengthen your resume and increase your match rate with job opportunities:
        </p>
      </div>
      
      <div className="space-y-4">
        {improvements.map((improvement, index) => (
          <div 
            key={index}
            className="flex items-start p-4 border border-gray-100 rounded-lg bg-white hover:shadow-sm transition-shadow"
          >
            <div className="mr-4 p-2 bg-amber-100 rounded-full text-amber-600">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">{improvement}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {getImprovementDescription(improvement)}
              </p>
              {getResourcesForImprovement(improvement) && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Resources:</h5>
                  <ul className="text-xs text-blue-600 space-y-1">
                    {getResourcesForImprovement(improvement).map((resource, idx) => (
                      <li key={idx}>
                        <a href="#" className="hover:underline">{resource}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="text-lg font-medium text-gray-800 mb-2">Next Steps</h4>
        <p className="text-gray-700">
          Consider implementing these suggestions in your resume, then upload the updated version for a new analysis. You should see an improvement in your job match percentages and overall resume strength.
        </p>
      </div>
    </div>
  );
};

// Helper functions for generating improvement descriptions and resources
function getImprovementDescription(improvement: string): string {
  const descriptions: Record<string, string> = {
    'Add cloud platform experience (AWS, Azure, etc.)': 'Cloud skills are in high demand across the tech industry. Even basic familiarity could significantly improve your job prospects.',
    'Learn container technologies like Docker': 'Containerization is a key skill for modern development environments. It demonstrates your understanding of deployment processes.',
    'Gain experience with GraphQL for API development': 'GraphQL is becoming the preferred API solution for many companies, replacing traditional REST APIs in many use cases.',
    // Fallback for other improvements
    'default': 'Adding this skill or experience could significantly enhance your resume and make you more competitive in the job market.'
  };
  
  return descriptions[improvement] || descriptions['default'];
}

function getResourcesForImprovement(improvement: string): string[] {
  const resources: Record<string, string[]> = {
    'Add cloud platform experience (AWS, Azure, etc.)': [
      'AWS Free Tier - Hands-on practice',
      'Microsoft Learn - Azure Fundamentals',
      'Cloud Computing Certification Courses'
    ],
    'Learn container technologies like Docker': [
      'Docker\'s Official Getting Started Guide',
      'Docker for Developers Course',
      'Container Orchestration with Kubernetes'
    ],
    'Gain experience with GraphQL for API development': [
      'GraphQL Official Documentation',
      'Building APIs with GraphQL Tutorial',
      'GraphQL vs REST: Practical Comparison'
    ]
  };
  
  return resources[improvement] || [];
}

export default ImprovementSuggestions;