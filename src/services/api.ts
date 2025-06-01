import axios from 'axios';
import { Analysis } from '../context/ResumeContext';

// Base URL for API calls - in a real app, this would point to your backend
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.resumeanalyzer.app'  // Production API URL
  : 'http://localhost:5000';          // Development API URL

// Mock data for demo purposes - in a real app, this would come from the backend
const mockAnalysis: Analysis = {
  id: 'mock-analysis-id',
  resumeId: 'mock-resume-id',
  skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Node.js'],
  missingSkills: ['AWS', 'Docker', 'GraphQL'],
  recommendedJobs: [
    {
      title: 'Frontend Developer',
      matchPercentage: 85,
      requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML'],
      description: 'Develop user interfaces for web applications using React and modern JavaScript.',
    },
    {
      title: 'Full Stack Developer',
      matchPercentage: 70,
      requiredSkills: ['React', 'JavaScript', 'Node.js', 'MongoDB'],
      description: 'Build both frontend and backend components of web applications using JavaScript frameworks.',
    },
    {
      title: 'UI Developer',
      matchPercentage: 65,
      requiredSkills: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
      description: 'Create visually appealing and functional user interfaces for websites and applications.',
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

// Function to upload a resume file
export const uploadResume = async (file: File) => {
  // In a real app, this would use FormData to upload the file
  try {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be:
    // const formData = new FormData();
    // formData.append('resume', file);
    // const response = await axios.post(`${API_URL}/api/resumes/upload`, formData);
    // return response.data;
    
    // For demo, return mock data
    return {
      id: 'mock-resume-id-' + Date.now(),
      filename: file.name,
      uploadDate: new Date(),
      status: 'pending',
    };
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
};

// Function to get the analysis for a resume
export const getResumeAnalysis = async (resumeId: string): Promise<Analysis> => {
  try {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would be:
    // const response = await axios.get(`${API_URL}/api/analyses/${resumeId}`);
    // return response.data;
    
    // For demo, return mock data with the provided resumeId
    return {
      ...mockAnalysis,
      resumeId,
      id: `analysis-${resumeId}`,
      date: new Date(),
    };
  } catch (error) {
    console.error('Error getting resume analysis:', error);
    throw error;
  }
};

// Function to get user's resume history
export const getResumeHistory = async () => {
  try {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would be:
    // const response = await axios.get(`${API_URL}/api/resumes`);
    // return response.data;
    
    // For demo, return mock data
    return [
      {
        id: 'mock-resume-1',
        filename: 'my_professional_resume.pdf',
        uploadDate: new Date('2025-01-15'),
        status: 'completed',
      },
      {
        id: 'mock-resume-2',
        filename: 'resume_updated.pdf',
        uploadDate: new Date('2025-01-10'),
        status: 'completed',
      }
    ];
  } catch (error) {
    console.error('Error getting resume history:', error);
    throw error;
  }
};