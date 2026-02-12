import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useOrder, ActiveOrder, PaymentStatus } from "@/contexts/OrderContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Clock, Utensils, CheckCircle2, ChefHat, CreditCard, Wallet } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ActiveOrdersModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ActiveOrdersModal = ({ isOpen, onClose }: ActiveOrdersModalProps) => {
    const { activeOrders, serverOrder, requestBill, refreshOrder, isLoading } = useOrder();

    // Effect to refresh order when modal opens
    // useEffect(() => {
    //     if (isOpen) {
    //         refreshOrder();
    //     }
    // }, [isOpen, refreshOrder]); 
    // Commented out to avoid infinite loops if refreshOrder changes reference too often without useCallback
    // But OrderContext should handle refreshing when needed.

    const getPaymentStatusColor = (status: PaymentStatus) => {
        switch (status) {
            case 'paid':
                return "bg-green-100 text-green-700 border-green-200";
            case 'pending':
                return "bg-orange-100 text-orange-700 border-orange-200";
            default:
                return "bg-secondary text-muted-foreground";
        }
    };

    const getStatusColor = (status: string) => {
        const s = status.toLowerCase();
        if (s === 'preparing' || s === 'confirmed') return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
        if (s === 'ready') return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
        if (s === 'served' || s === 'completed') return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
        return "bg-secondary text-muted-foreground";
    };

    const getStatusIcon = (status: string) => {
        const s = status.toLowerCase();
        if (s === 'preparing' || s === 'confirmed') return <ChefHat className="w-4 h-4 mr-1" />;
        if (s === 'ready') return <Utensils className="w-4 h-4 mr-1" />;
        if (s === 'served' || s === 'completed') return <CheckCircle2 className="w-4 h-4 mr-1" />;
        return null;
    };

    const getStatusText = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace('_', ' ');
    };

    const handleRequestBill = async () => {
        await requestBill();
        // optionally close modal or show success state
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Utensils className="h-5 w-5 text-primary" />
                        Active Orders
                    </DialogTitle>
                    <DialogDescription>
                        Track the status of your current orders in real-time.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 pr-4 -mr-4">
                    {!serverOrder && activeOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                            <Clock className="h-12 w-12 mb-4 opacity-20" />
                            <p>No active orders found.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Server Order Section */}
                            {serverOrder && (
                                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                                    <div className="bg-primary/5 px-4 py-3 flex items-center justify-between border-b border-border">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="font-mono bg-background">
                                                Current Order #{serverOrder.orderId}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center">
                                                <Utensils className="w-3 h-3 mr-1" />
                                                Dine-in
                                            </span>
                                        </div>
                                        <Badge className={`${getStatusColor(serverOrder.status)} border-0`}>
                                            {getStatusIcon(serverOrder.status)}
                                            {getStatusText(serverOrder.status)}
                                        </Badge>
                                    </div>

                                    <div className="p-4">
                                        <div className="space-y-3">
                                            {serverOrder.items && serverOrder.items.map((item: any, idx: number) => (
                                                <div key={`server-${idx}`} className="flex justify-between items-start">
                                                    <div className="flex items-start gap-3">
                                                        <div className="bg-secondary/50 rounded-md w-6 h-6 flex items-center justify-center text-xs font-medium text-muted-foreground mt-0.5">
                                                            {item.quantity}x
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium leading-none mb-1">
                                                                {item.menuItemName || item.name}
                                                            </p>
                                                            {/* Add logic/display for modifiers if available in future */}
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-medium text-muted-foreground">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <Separator className="my-4" />

                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Total Amount</span>
                                            <span className="text-lg font-bold text-primary">
                                                ${serverOrder.totalAmount?.toFixed(2) || '0.00'}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                onClick={() => refreshOrder()}
                                                disabled={isLoading}
                                            >
                                                Refresh Status
                                            </Button>
                                            <Button
                                                className="w-full"
                                                onClick={handleRequestBill}
                                                disabled={isLoading}
                                            >
                                                Request Bill
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Local Active Orders (Legacy/Fallback) */}
                            {activeOrders.map((order) => (
                                <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm opacity-80">
                                    <div className="bg-secondary/30 px-4 py-3 flex items-center justify-between border-b border-border">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="font-mono">
                                                Local #{order.id}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {format(order.timestamp, 'h:mm a')}
                                            </span>
                                        </div>
                                        <Badge className={`${getStatusColor(order.status)} border-0`}>
                                            {getStatusIcon(order.status)}
                                            {getStatusText(order.status)}
                                        </Badge>
                                    </div>

                                    <div className="p-4">
                                        <div className="space-y-3">
                                            {order.items.map((item, idx) => (
                                                <div key={`${order.id}-${idx}`} className="flex justify-between items-start">
                                                    <div className="flex items-start gap-3">
                                                        <div className="bg-secondary/50 rounded-md w-6 h-6 flex items-center justify-center text-xs font-medium text-muted-foreground mt-0.5">
                                                            {item.quantity}x
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium leading-none mb-1">
                                                                {item.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-medium text-muted-foreground">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Total Amount</span>
                                            <span className="text-lg font-bold text-primary">
                                                ${order.totalAmount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
                <div className="p-4 border-t border-border bg-background">
                    <Button variant="ghost" className="w-full" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ActiveOrdersModal;
