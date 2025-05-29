export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type QRCodeSize = 'small' | 'medium' | 'large';

export type Theme = 'light' | 'dark';

export interface QRCodeOptions {
  data: string;
  size: QRCodeSize;
  errorCorrection: ErrorCorrectionLevel;
}

export interface QRCodeGeneratorState {
  data: string;
  size: QRCodeSize;
  errorCorrection: ErrorCorrectionLevel;
  qrCodeUrl: string | null;
  isLoading: boolean;
  error: string | null;
}