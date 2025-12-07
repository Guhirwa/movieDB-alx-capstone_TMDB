import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🎬</span>
            <span className="text-2xl font-bold text-primary">MovieDB</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition"
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition"
            >
              Discover
            </Link>
            <Link 
              to="/watchlist" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition"
            >
              Watchlist
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              aria-label="Toggle theme"
            >
              <span className="text-xl">{isDark ? '☀️' : '🌙'}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200"
              aria-label="Toggle menu"
            >
              <span className="text-2xl">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Discover
            </Link>
            <Link 
              to="/watchlist" 
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Watchlist
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
