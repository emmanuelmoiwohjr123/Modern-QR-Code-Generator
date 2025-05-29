import React from 'react';
import { downloadQRCode } from '../services/qrCodeService';
import { Download } from 'lucide-react';

interface QRCodeDisplayProps {
  qrCodeUrl: string;
  data: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCodeUrl, data }) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloadError, setDownloadError] = React.useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadError(null);
      
      // Create filename from data (limited to first 20 chars)
      const filename = `qrcode-${data.substring(0, 20).replace(/[^a-z0-9]/gi, '_')}.png`;
      
      await downloadQRCode(qrCodeUrl, filename);
    } catch (error) {
      setDownloadError('Failed to download QR code. Please try again.');
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6 transition-colors duration-200">
      <div className="flex flex-col items-center">
        <div className="relative mb-4 bg-white p-4 rounded-lg shadow-sm">
          <img 
            src={qrCodeUrl} 
            alt="Generated QR Code" 
            className="mx-auto max-w-full"
          />
        </div>
        
        {downloadError && (
          <p className="text-red-600 dark:text-red-400 text-sm mb-3">{downloadError}</p>
        )}
        
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`flex items-center justify-center py-2 px-4 rounded-md font-medium transition-all duration-200 w-full
            ${isDownloading ? 'bg-teal-400 dark:bg-teal-700 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600'} 
            text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50`}
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Download QR Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;