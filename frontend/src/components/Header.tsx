import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Building2, UserCog, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-white bg-indigo-700' : 'text-indigo-100 hover:text-white hover:bg-indigo-700';
  };

  return (
    <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Users size={28} className="text-white" />
            <span className="text-xl font-bold">EmpManage</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/')}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/employees" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/employees')}`}
            >
              Employees
            </Link>
            <Link 
              to="/departments" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/departments')}`}
            >
              Departments
            </Link>
            <Link 
              to="/managers" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/managers')}`}
            >
              Managers
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:text-white hover:bg-indigo-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-600 shadow-lg">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/employees" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/employees')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Employees
            </Link>
            <Link 
              to="/departments" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/departments')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Departments
            </Link>
            <Link 
              to="/managers" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/managers')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Managers
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;