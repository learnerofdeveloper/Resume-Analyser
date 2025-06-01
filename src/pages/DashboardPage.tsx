import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { FileText, Calendar, Trash2, PlusCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { resumeHistory, setResumeHistory, setCurrentResume } = useResume();

  // Function to format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Function to delete a resume
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResumeHistory(prevHistory => prevHistory.filter(resume => resume.id !== id));
  };

  // Function to view a resume analysis
  const handleViewAnalysis = (resume: any) => {
    setCurrentResume(resume);
    navigate(`/analysis/${resume.id}`);
  };

  // Mock data if no history is available yet
  const displayHistory = resumeHistory.length > 0 ? resumeHistory : [
    {
      id: 'mock-1',
      filename: 'my-resume.pdf',
      uploadDate: new Date('2025-01-15'),
      status: 'completed'
    },
    {
      id: 'mock-2',
      filename: 'resume-updated.pdf',
      uploadDate: new Date('2025-01-10'),
      status: 'completed'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Your Resume Dashboard</h1>
          <p className="text-gray-600 mt-1">
            View and manage your resume analysis history
          </p>
        </div>
        <Button 
          variant="primary"
          className="mt-4 md:mt-0 flex items-center"
          onClick={() => navigate('/')}
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Upload New Resume
        </Button>
      </div>

      {resumeHistory.length === 0 ? (
        <EmptyState 
          icon={<FileText className="h-16 w-16 text-gray-400" />}
          title="No resumes yet"
          description="Upload your first resume to get started with AI-powered analysis"
          action={
            <Button 
              variant="primary" 
              onClick={() => navigate('/')}
              className="mt-4"
            >
              Upload Resume
            </Button>
          }
        />
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resume
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayHistory.map((resume) => (
                  <tr 
                    key={resume.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={() => handleViewAnalysis(resume)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-blue-100 text-blue-600">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {resume.filename}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(resume.uploadDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        resume.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : resume.status === 'analyzing' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {resume.status === 'completed' 
                          ? 'Completed' 
                          : resume.status === 'analyzing' 
                          ? 'Analyzing'
                          : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={(e) => handleDelete(resume.id, e)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;