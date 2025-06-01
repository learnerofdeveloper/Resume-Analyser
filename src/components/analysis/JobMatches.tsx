import React from 'react';
import { CheckCircle, Zap, Award } from 'lucide-react';

interface Job {
  title: string;
  matchPercentage: number;
  requiredSkills: string[];
  description: string;
}

interface JobMatchesProps {
  jobs: Job[];
}

const JobMatches: React.FC<JobMatchesProps> = ({ jobs }) => {
  // Sort jobs by match percentage in descending order
  const sortedJobs = [...jobs].sort((a, b) => b.matchPercentage - a.matchPercentage);
  
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Recommended Job Matches</h3>
      
      {sortedJobs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No job matches found. Try uploading a more detailed resume.
        </div>
      ) : (
        <div className="space-y-6">
          {sortedJobs.map((job, index) => (
            <div 
              key={index}
              className={`border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md ${
                index === 0 ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    {index === 0 && (
                      <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center mr-3">
                        <Award className="h-3 w-3 mr-1" /> Top Match
                      </div>
                    )}
                    <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
                  </div>
                  <div className="flex items-center">
                    <Zap className={`h-4 w-4 ${
                      job.matchPercentage >= 80 ? 'text-green-500' :
                      job.matchPercentage >= 60 ? 'text-yellow-500' : 'text-gray-400'
                    } mr-1`} />
                    <span className={`text-sm font-semibold ${
                      job.matchPercentage >= 80 ? 'text-green-600' :
                      job.matchPercentage >= 60 ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {job.matchPercentage}% Match
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{job.description}</p>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span>Your profile matches {job.matchPercentage}% of requirements</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-2">Improving Your Matches</h4>
        <p className="text-gray-600 text-sm">
          These job matches are based on your current resume. To improve your match percentages, consider adding missing skills and more detailed experience descriptions to your resume.
        </p>
      </div>
    </div>
  );
};

export default JobMatches;