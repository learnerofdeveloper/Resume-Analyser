import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon, 
  title, 
  description, 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="text-gray-400 mb-4">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-6">
        {description}
      </p>
      {action}
    </div>
  );
};

export default EmptyState;