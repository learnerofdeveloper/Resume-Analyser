import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUp, CheckCircle, AlertTriangle } from 'lucide-react';
import FileUpload from '../components/upload/FileUpload';
import { useResume } from '../context/ResumeContext';
import { uploadResume } from '../services/api';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentResume, setResumeHistory } = useResume();
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleResumeUpload = async (file: File) => {
    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      // In a real app, this would call your actual API
      const result = await uploadResume(file);
      
      const newResume: any = {
        id: result.id || 'mock-id-' + Date.now(),
        filename: file.name,
        uploadDate: new Date(),
        status: 'pending',
      };

      setCurrentResume(newResume);
      setResumeHistory(prev => [newResume, ...prev]);
      setUploadStatus('success');
      
      // Wait a moment to show success state before redirecting
      setTimeout(() => {
        navigate(`/analysis/${newResume.id}`);
      }, 1500);
      
    } catch (error) {
      console.error('Error uploading resume:', error);
      setUploadStatus('error');
      setErrorMessage('Failed to upload resume. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          AI-Powered Resume Analysis
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Upload your resume and get intelligent insights on job matches, missing skills, and personalized recommendations.
        </p>
        <div className="flex justify-center space-x-4">
          <Button 
            variant="primary"
            className="flex items-center"
            onClick={() => document.getElementById('resume-upload')?.click()}
          >
            <FileUp className="w-5 h-5 mr-2" /> Upload Resume
          </Button>
          <Button 
            variant="secondary"
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </Button>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Upload Your Resume</h2>
        
        {uploadStatus === 'idle' && (
          <FileUpload 
            id="resume-upload"
            onFileSelect={handleResumeUpload} 
            acceptedFileTypes=".pdf,.docx,.doc"
          />
        )}

        {uploadStatus === 'uploading' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Uploading your resume...</p>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="text-center py-8 text-green-600">
            <CheckCircle className="h-12 w-12 mx-auto mb-4" />
            <p>Resume uploaded successfully! Redirecting to analysis...</p>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="text-center py-8 text-red-600">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
            <p>{errorMessage || 'An error occurred'}</p>
            <Button 
              variant="secondary"
              className="mt-4"
              onClick={() => setUploadStatus('idle')}
            >
              Try Again
            </Button>
          </div>
        )}
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Upload Resume",
              description: "Upload your resume in PDF, Word, or plain text format.",
              icon: <FileUp className="h-8 w-8 text-blue-500" />
            },
            {
              title: "AI Analysis",
              description: "Our AI analyzes your resume to extract skills, experience, and qualifications.",
              icon: <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            },
            {
              title: "Get Insights",
              description: "Receive personalized job matches, skill gap analysis, and improvement recommendations.",
              icon: <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69752 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00204 12 2.00204C11.6489 2.00204 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69752 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{item.title}</h3>
              <p className="text-gray-600 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;