import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
      <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;