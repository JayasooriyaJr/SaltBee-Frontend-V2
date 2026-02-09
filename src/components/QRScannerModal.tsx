import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface QRScannerModalProps {
    open: boolean;
    onClose: () => void;
}

const QRScannerModal = ({ open, onClose }: QRScannerModalProps) => {
    const { setTableNumber, setOrderType } = useOrder();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isProcessingScan, setIsProcessingScan] = useState(false); // Prevent duplicate scans
    const lastScannedRef = useRef<string | null>(null); // Track last scanned code

    const handleScan = (decodedText: string) => {
        // Prevent duplicate scans
        if (isProcessingScan || lastScannedRef.current === decodedText) {
            return;
        }

        try {
            console.log('QR Code scanned:', decodedText); // Debug log

            // Mark as processing
            setIsProcessingScan(true);
            lastScannedRef.current = decodedText;

            // Extract table number from QR code
            // Support multiple formats:
            // - "TABLE-5", "TABLE5", "table-5", "table5"
            // - "5", "05", "10"
            // - "Table 5", "Table: 5"
            // - Any text containing a number

            // First, try to extract a number from the text
            const numberMatch = decodedText.match(/\d+/);

            if (numberMatch) {
                const table = numberMatch[0];
                setTableNumber(table);
                setOrderType('dine-in');
                toast.success(`Table ${table} selected!`);

                // Stop scanner before closing
                if (scannerRef.current && isScanning) {
                    scannerRef.current.stop().then(() => {
                        setIsScanning(false);
                        setIsProcessingScan(false);
                        lastScannedRef.current = null;
                        onClose();
                        navigate('/menu');
                    }).catch(err => {
                        console.error('Error stopping scanner:', err);
                        setIsProcessingScan(false);
                        lastScannedRef.current = null;
                        onClose();
                        navigate('/menu');
                    });
                } else {
                    setIsProcessingScan(false);
                    lastScannedRef.current = null;
                    onClose();
                    navigate('/menu');
                }
            } else {
                // If no number found, show what was scanned for debugging
                console.error('No number found in QR code:', decodedText);
                setError(`Invalid QR code. Scanned: "${decodedText.substring(0, 50)}"`);
                toast.error('No table number found in QR code');
                setIsProcessingScan(false);
                lastScannedRef.current = null;
            }
        } catch (err) {
            console.error('Error processing QR code:', err);
            setError('Error processing QR code');
            toast.error('Error processing QR code');
            setIsProcessingScan(false);
            lastScannedRef.current = null;
        }
    };

    useEffect(() => {
        if (open && !isScanning) {
            const qrCodeRegionId = "qr-reader";

            // Wait for DOM element to be ready
            const initScanner = setTimeout(() => {
                // Check if element exists
                const element = document.getElementById(qrCodeRegionId);
                if (!element) {
                    console.error('QR reader element not found');
                    setError('Scanner initialization failed');
                    return;
                }

                // Initialize scanner
                const html5QrCode = new Html5Qrcode(qrCodeRegionId);
                scannerRef.current = html5QrCode;

                const config = {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                };

                html5QrCode.start(
                    { facingMode: "environment" },
                    config,
                    handleScan,
                    (errorMessage) => {
                        // Ignore frequent scan errors
                        if (!errorMessage.includes('NotFoundException')) {
                            console.error('QR Scan Error:', errorMessage);
                        }
                    }
                ).then(() => {
                    setIsScanning(true);
                    setError(null);
                }).catch(err => {
                    console.error('Error starting scanner:', err);
                    setError('Camera access denied or unavailable');
                    toast.error('Unable to access camera');
                });
            }, 100); // Small delay to ensure DOM is ready

            return () => {
                clearTimeout(initScanner);
            };
        }

        // Cleanup on unmount or when modal closes
        return () => {
            if (scannerRef.current && isScanning) {
                scannerRef.current.stop().catch(err => {
                    console.error('Error stopping scanner on cleanup:', err);
                });
                setIsScanning(false);
            }
        };
    }, [open]);

    const handleClose = () => {
        if (scannerRef.current && isScanning) {
            scannerRef.current.stop().then(() => {
                setIsScanning(false);
                setIsProcessingScan(false);
                lastScannedRef.current = null;
                onClose();
            }).catch(err => {
                console.error('Error stopping scanner:', err);
                setIsProcessingScan(false);
                lastScannedRef.current = null;
                onClose();
            });
        } else {
            setIsProcessingScan(false);
            lastScannedRef.current = null;
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        Scan Table QR Code
                        <button
                            onClick={handleClose}
                            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </DialogTitle>
                    <DialogDescription>
                        Point your camera at the QR code on your table
                    </DialogDescription>
                </DialogHeader>

                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black">
                    <div id="qr-reader" className="w-full h-full"></div>
                </div>

                {error && (
                    <div className="text-sm text-destructive text-center mt-2">
                        {error}
                    </div>
                )}

                <div className="text-xs text-muted-foreground text-center">
                    Make sure the QR code is clearly visible and well-lit
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QRScannerModal;
