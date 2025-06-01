import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Resume {
  id: string;
  filename: string;
  uploadDate: Date;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
}

export interface Analysis {
  id: string;
  resumeId: string;
  skills: string[];
  missingSkills: string[];
  recommendedJobs: {
    title: string;
    matchPercentage: number;
    requiredSkills: string[];
    description: string;
  }[];
  strengths: string[];
  improvements: string[];
  date: Date;
}

interface ResumeContextType {
  currentResume: Resume | null;
  setCurrentResume: React.Dispatch<React.SetStateAction<Resume | null>>;
  resumeHistory: Resume[];
  setResumeHistory: React.Dispatch<React.SetStateAction<Resume[]>>;
  currentAnalysis: Analysis | null;
  setCurrentAnalysis: React.Dispatch<React.SetStateAction<Analysis | null>>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [resumeHistory, setResumeHistory] = useState<Resume[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);

  return (
    <ResumeContext.Provider
      value={{
        currentResume,
        setCurrentResume,
        resumeHistory,
        setResumeHistory,
        currentAnalysis,
        setCurrentAnalysis,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};