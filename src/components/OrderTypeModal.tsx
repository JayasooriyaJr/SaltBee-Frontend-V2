import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { QrCode, ShoppingBag } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import QRScannerModal from './QRScannerModal';

interface OrderTypeModalProps {
    open: boolean;
    onClose: () => void;
    onOrderTypeSelected: () => void;
}

const OrderTypeModal = ({ open, onClose, onOrderTypeSelected }: OrderTypeModalProps) => {
    const { setOrderType } = useOrder();
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    const handleTakeawaySelect = () => {
        setOrderType('takeaway');
        onOrderTypeSelected();
        onClose();
    };

    const handleDineInSelect = () => {
        setIsQRModalOpen(true);
    };

    const handleQRModalClose = () => {
        setIsQRModalOpen(false);
        onClose();
    };

    return (
        <>
            <Dialog open={open && !isQRModalOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Select Order Type</DialogTitle>
                        <DialogDescription>
                            Choose how you'd like to enjoy your meal
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="dine-in" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="dine-in">Dine-in</TabsTrigger>
                            <TabsTrigger value="takeaway">Takeaway</TabsTrigger>
                        </TabsList>

                        <TabsContent value="dine-in" className="space-y-4 mt-4">
                            <div className="text-center space-y-4 py-6">
                                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <QrCode className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Scan Table QR Code</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Scan the QR code on your table to get started
                                    </p>
                                </div>
                                <Button
                                    onClick={handleDineInSelect}
                                    className="w-full"
                                    size="lg"
                                >
                                    <QrCode className="mr-2 h-5 w-5" />
                                    Scan QR to Select Table
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="takeaway" className="space-y-4 mt-4">
                            <div className="text-center space-y-4 py-6">
                                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <ShoppingBag className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Order Takeaway</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Place your order for pickup
                                    </p>
                                </div>
                                <Button
                                    onClick={handleTakeawaySelect}
                                    className="w-full"
                                    size="lg"
                                >
                                    <ShoppingBag className="mr-2 h-5 w-5" />
                                    Proceed as Takeaway
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>

            <QRScannerModal
                open={isQRModalOpen}
                onClose={handleQRModalClose}
            />
        </>
    );
};

export default OrderTypeModal;
