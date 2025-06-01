import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, X, Check, AlertTriangle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes: string;
  id?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect, 
  acceptedFileTypes,
  id
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }
    
    setSelectedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  const handleUpload = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors text-center ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : error 
              ? 'border-red-300 bg-red-50' 
              : selectedFile 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} id={id} />
        
        {selectedFile ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">{selectedFile.name}</span> ({(selectedFile.size / 1024).toFixed(1)} KB)
            </p>
            <div className="flex space-x-3 mt-3">
              <button
                type="button"
                className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                onClick={removeFile}
              >
                <X className="h-4 w-4 mr-1" /> Remove
              </button>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                onClick={handleUpload}
              >
                <Check className="h-4 w-4 mr-1" /> Use This File
              </button>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-sm text-red-600 font-medium mb-2">{error}</p>
            <p className="text-sm text-gray-500">Please select a different file</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
              <FileUp className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Drag and drop</span> your resume here
            </p>
            <p className="text-sm text-gray-500 mb-3">- or -</p>
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse Files
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Supports PDF, DOC, DOCX formats (max 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;