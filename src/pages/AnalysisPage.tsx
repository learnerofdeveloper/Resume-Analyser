import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { getResumeAnalysis } from '../services/api';
import SkillsAnalysis from '../components/analysis/SkillsAnalysis';
import JobMatches from '../components/analysis/JobMatches';
import ResumeStrengths from '../components/analysis/ResumeStrengths';
import ImprovementSuggestions from '../components/analysis/ImprovementSuggestions';
import AnalysisHeader from '../components/analysis/AnalysisHeader';
import LoadingAnalysis from '../components/analysis/LoadingAnalysis';
import Button from '../components/ui/Button';
import { Download, Share2 } from 'lucide-react';

const AnalysisPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentResume, currentAnalysis, setCurrentAnalysis } = useResume();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'skills' | 'jobs' | 'strengths' | 'improvements'>('skills');

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, this would fetch from your API
        const analysis = await getResumeAnalysis(id);
        setCurrentAnalysis(analysis);
        
      } catch (err) {
        console.error('Error fetching analysis:', err);
        setError('Failed to load analysis. Please try again.');
      } finally {
        // Simulate AI analysis time
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchAnalysis();
  }, [id, setCurrentAnalysis]);

  if (loading) {
    return <LoadingAnalysis resumeName={currentResume?.filename || 'your resume'} />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="mb-4 text-gray-700">{error}</p>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Mock data if no analysis is available yet
  const analysis = currentAnalysis || {
    id: id || 'mock-id',
    resumeId: id || 'mock-resume-id',
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Node.js'],
    missingSkills: ['AWS', 'Docker', 'GraphQL'],
    recommendedJobs: [
      {
        title: 'Frontend Developer',
        matchPercentage: 85,
        requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML'],
        description: 'Develop user interfaces for web applications',
      },
      {
        title: 'Full Stack Developer',
        matchPercentage: 70,
        requiredSkills: ['React', 'JavaScript', 'Node.js', 'MongoDB'],
        description: 'Build both frontend and backend of web applications',
      },
    ],
    strengths: [
      'Strong frontend development skills',
      'Experience with modern JavaScript frameworks',
      'Good understanding of UI/UX principles',
    ],
    improvements: [
      'Add cloud platform experience (AWS, Azure, etc.)',
      'Learn container technologies like Docker',
      'Gain experience with GraphQL for API development',
    ],
    date: new Date(),
  };

  const tabs = [
    { id: 'skills', label: 'Skills Analysis' },
    { id: 'jobs', label: 'Job Matches' },
    { id: 'strengths', label: 'Strengths' },
    { id: 'improvements', label: 'Improvements' },
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8">
      <AnalysisHeader 
        resumeName={currentResume?.filename || 'Resume'} 
        analysisDate={analysis.date} 
      />

      <div className="flex justify-end space-x-2 mb-6">
        <Button variant="outline" className="flex items-center">
          <Download className="w-4 h-4 mr-2" /> Export PDF
        </Button>
        <Button variant="outline" className="flex items-center">
          <Share2 className="w-4 h-4 mr-2" /> Share
        </Button>
      </div>
      
      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        {activeTab === 'skills' && <SkillsAnalysis skills={analysis.skills} missingSkills={analysis.missingSkills} />}
        {activeTab === 'jobs' && <JobMatches jobs={analysis.recommendedJobs} />}
        {activeTab === 'strengths' && <ResumeStrengths strengths={analysis.strengths} />}
        {activeTab === 'improvements' && <ImprovementSuggestions improvements={analysis.improvements} />}
      </div>
    </div>
  );
};

export default AnalysisPage;