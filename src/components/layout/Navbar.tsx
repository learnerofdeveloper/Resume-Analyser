import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileCheck, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <FileCheck className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">ResumeAI</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}>
              Home
            </Link>
            <Link to="/dashboard" className={`text-sm font-medium transition-colors ${
              location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}>
              Dashboard
            </Link>
            <Button 
              variant="primary"
              onClick={() => window.open('/', '_self')}
              className="ml-4"
            >
              Upload Resume
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in-down">
            <div className="flex flex-col space-y-4 px-2">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/dashboard' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/" 
                className="px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Upload Resume
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;