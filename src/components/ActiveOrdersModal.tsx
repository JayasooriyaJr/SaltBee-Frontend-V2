import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useOrder, ActiveOrder, PaymentStatus } from "@/contexts/OrderContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, Utensils, CheckCircle2, ChefHat, CreditCard, Wallet } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ActiveOrdersModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ActiveOrdersModal = ({ isOpen, onClose }: ActiveOrdersModalProps) => {
    const { activeOrders } = useOrder();

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



    const getStatusColor = (status: ActiveOrder['status']) => {
        switch (status) {
            case 'preparing':
                return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
            case 'ready':
                return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
            case 'served':
                return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
            default:
                return "bg-secondary text-muted-foreground";
        }
    };

    const getStatusIcon = (status: ActiveOrder['status']) => {
        switch (status) {
            case 'preparing':
                return <ChefHat className="w-4 h-4 mr-1" />;
            case 'ready':
                return <Utensils className="w-4 h-4 mr-1" />;
            case 'served':
                return <CheckCircle2 className="w-4 h-4 mr-1" />;
            default:
                return null;
        }
    };

    const getStatusText = (status: ActiveOrder['status']) => {
        switch (status) {
            case 'preparing':
                return "Preparing";
            case 'ready':
                return "Ready to Serve";
            case 'served':
                return "Served";
            default:
                return status;
        }
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
                    {activeOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                            <Clock className="h-12 w-12 mb-4 opacity-20" />
                            <p>No active orders found.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {activeOrders.map((order) => (
                                <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                                    <div className="bg-secondary/30 px-4 py-3 flex items-center justify-between border-b border-border">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="font-mono">
                                                #{order.id}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {format(order.timestamp, 'h:mm a')}
                                            </span>
                                            {order.orderType === 'dine-in' && order.tableNumber && (
                                                <Badge variant="secondary" className="text-xs">
                                                    Table {order.tableNumber}
                                                </Badge>
                                            )}
                                            {order.orderType === 'takeaway' && (
                                                <Badge variant="secondary" className="text-xs">
                                                    Takeaway
                                                </Badge>
                                            )}
                                        </div>
                                        <Badge className={`${getStatusColor(order.status)} border-0`}>
                                            {getStatusIcon(order.status)}
                                            {getStatusText(order.status)}
                                        </Badge>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex justify-end mb-4">
                                            <Badge variant="outline" className={`${getPaymentStatusColor(order.paymentStatus)} flex items-center gap-1`}>
                                                {order.paymentStatus === 'paid' ? <CreditCard className="w-3 h-3" /> : <Wallet className="w-3 h-3" />}
                                                {order.paymentStatus === 'paid' ? 'Paid' : 'Pay at Counter'}
                                            </Badge>
                                        </div>

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
                                                            {item.category && (
                                                                <p className="text-xs text-muted-foreground">
                                                                    {item.category}
                                                                </p>
                                                            )}
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
            </DialogContent>
        </Dialog>
    );
};

export default ActiveOrdersModal;
