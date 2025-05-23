import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Employee Management System</p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-400">Powered by Vite + React</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;