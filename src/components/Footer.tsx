import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full py-4 mt-auto">
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {year} QR Code Generator. All rights reserved.</p>
        <p className="mt-1">
          Built with React, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;