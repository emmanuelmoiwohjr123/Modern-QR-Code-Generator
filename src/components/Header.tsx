import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { QrCode, Sun, Moon } from 'lucide-react';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="flex items-center space-x-2">
        <QrCode className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">QR Code Generator</h1>
      </div>
      
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700" />
        )}
      </button>
    </header>
  );
};

export default Header;