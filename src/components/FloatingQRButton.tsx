import { useState } from 'react';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRScannerModal from './QRScannerModal';
import { motion } from 'framer-motion';

const FloatingQRButton = () => {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <Button
                    onClick={() => setIsQRModalOpen(true)}
                    size="lg"
                    className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    title="Scan Table QR Code"
                >
                    <QrCode className="h-6 w-6" />
                </Button>
            </motion.div>

            <QRScannerModal
                open={isQRModalOpen}
                onClose={() => setIsQRModalOpen(false)}
            />
        </>
    );
};

export default FloatingQRButton;
