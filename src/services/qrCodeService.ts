import { ErrorCorrectionLevel, QRCodeOptions, QRCodeSize } from '../types';

// Map our app's size options to pixel dimensions for the API
const sizeToDimension = {
  small: 200,
  medium: 300,
  large: 400,
};

export const generateQRCode = async (options: QRCodeOptions): Promise<string> => {
  const { data, size, errorCorrection } = options;
  
  if (!data.trim()) {
    throw new Error('Please enter some text or URL to generate a QR code');
  }
  
  try {
    // Using QRCode Monkey API
    const dimension = sizeToDimension[size];
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=${dimension}x${dimension}&ecc=${errorCorrection}`;
    
    // Test the URL with a fetch to make sure it works
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to generate QR code');
    }
    
    return url;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code. Please try again.');
  }
};

export const downloadQRCode = async (url: string, filename = 'qrcode.png'): Promise<void> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading QR code:', error);
    throw new Error('Failed to download QR code. Please try again.');
  }
};