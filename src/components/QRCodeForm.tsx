import React from 'react';
import { ErrorCorrectionLevel, QRCodeSize } from '../types';
import { useTheme } from '../context/ThemeContext';
import { AlertCircle } from 'lucide-react';

interface QRCodeFormProps {
  data: string;
  setData: (data: string) => void;
  size: QRCodeSize;
  setSize: (size: QRCodeSize) => void;
  errorCorrection: ErrorCorrectionLevel;
  setErrorCorrection: (level: ErrorCorrectionLevel) => void;
  onGenerate: () => void;
  isLoading: boolean;
  error: string | null;
}

const QRCodeForm: React.FC<QRCodeFormProps> = ({
  data,
  setData,
  size,
  setSize,
  errorCorrection,
  setErrorCorrection,
  onGenerate,
  isLoading,
  error
}) => {
  const { theme } = useTheme();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200"
    >
      <div className="mb-6">
        <label 
          htmlFor="qrInput" 
          className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2"
        >
          Enter Text or URL
        </label>
        <input
          id="qrInput"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="https://example.com or any text"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label 
            htmlFor="size" 
            className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2"
          >
            QR Code Size
          </label>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value as QRCodeSize)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="small">Small (200x200)</option>
            <option value="medium">Medium (300x300)</option>
            <option value="large">Large (400x400)</option>
          </select>
        </div>

        <div>
          <label 
            htmlFor="errorCorrection" 
            className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2"
          >
            Error Correction
          </label>
          <select
            id="errorCorrection"
            value={errorCorrection}
            onChange={(e) => setErrorCorrection(e.target.value as ErrorCorrectionLevel)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !data.trim()}
        className={`w-full py-2 px-4 rounded-md font-medium transition-all duration-200 
          ${isLoading ? 'bg-blue-400 dark:bg-blue-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'} 
          text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : 'Generate QR Code'}
      </button>
    </form>
  );
};

export default QRCodeForm;