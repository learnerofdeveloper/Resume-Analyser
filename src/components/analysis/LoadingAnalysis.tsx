import React, { useState, useEffect } from 'react';

interface LoadingAnalysisProps {
  resumeName: string;
}

const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({ resumeName }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    'Processing resume document...',
    'Extracting skills and experience...',
    'Analyzing career trajectory...',
    'Matching with job market data...',
    'Generating personalized recommendations...',
    'Finalizing your analysis...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 80); // Adjust timing for a total of ~8 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update current step based on progress
    if (progress < 20) setCurrentStep(0);
    else if (progress < 40) setCurrentStep(1);
    else if (progress < 60) setCurrentStep(2);
    else if (progress < 80) setCurrentStep(3);
    else if (progress < 95) setCurrentStep(4);
    else setCurrentStep(5);
  }, [progress]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-xl">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-blue-600 border-l-transparent animate-spin"
              style={{ animationDuration: '2s' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 8H17M7 12H17M7 16H13M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Analyzing Your Resume
          </h2>
          <p className="text-gray-600 mb-2">
            Our AI is reviewing <span className="font-medium">{resumeName}</span>
          </p>
          <p className="text-sm text-blue-600 font-medium animate-pulse">
            {steps[currentStep]}
          </p>
        </div>
        
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Processing</span>
            <span>{Math.round(progress)}%</span>
            <span>Complete</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 text-center">
          <p>This typically takes 30-45 seconds</p>
          <p className="mt-2 text-xs text-gray-400 italic">
            We're using AI to analyze your resume against thousands of job postings to provide personalized insights.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900">Did you know?</h4>
              <p className="mt-1 text-sm text-gray-500">
                73% of employers use ATS systems to screen resumes before a human ever sees them. Our AI analysis helps optimize your resume for these systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnalysis;