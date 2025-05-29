import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import QRCodeForm from './components/QRCodeForm';
import QRCodeDisplay from './components/QRCodeDisplay';
import { ErrorCorrectionLevel, QRCodeSize } from './types';
import { generateQRCode } from './services/qrCodeService';

function App() {
  const [data, setData] = useState<string>('');
  const [size, setSize] = useState<QRCodeSize>('medium');
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('M');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setQrCodeUrl(null);
      
      if (!data.trim()) {
        setError('Please enter some text or a URL');
        return;
      }
      
      const url = await generateQRCode({
        data,
        size,
        errorCorrection
      });
      
      setQrCodeUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Generate QR Codes Instantly
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Enter any text or URL, customize your QR code, and download it with a click.
                Perfect for sharing links, contact information, or any text.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <QRCodeForm
                  data={data}
                  setData={setData}
                  size={size}
                  setSize={setSize}
                  errorCorrection={errorCorrection}
                  setErrorCorrection={setErrorCorrection}
                  onGenerate={handleGenerate}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
              
              <div className="flex items-center justify-center">
                {qrCodeUrl ? (
                  <QRCodeDisplay qrCodeUrl={qrCodeUrl} data={data} />
                ) : (
                  <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col items-center justify-center text-center transition-colors duration-200">
                    <div className="text-gray-500 dark:text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2m0 0v5m0-5h6m-6 0H4" />
                        <rect x="4" y="4" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
                        <rect x="14" y="4" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
                        <rect x="4" y="14" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
                      </svg>
                      <p className="text-lg font-medium">Your QR code will appear here</p>
                      <p className="mt-2 text-sm">Fill out the form and click "Generate QR Code"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About QR Codes</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">What are QR codes?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    QR codes are 2D barcodes that can store various types of information and can be scanned using smartphone cameras.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Error Correction</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Higher error correction levels make QR codes more resistant to damage, but increase code density.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Usage Tips</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    For better scanning, use higher error correction for printed QR codes that might get damaged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;