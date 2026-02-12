import Navbar from "@/components/Navbar";
import { api, type OrderPayload } from "@/services/api";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, Wallet, MapPin, Clock, User } from "lucide-react";

const Orders = () => {
    const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
    const { tableNumber, orderType, addActiveOrder } = useOrder();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isTakeawayModalOpen, setIsTakeawayModalOpen] = useState(false);
    const [isOnlinePaymentModalOpen, setIsOnlinePaymentModalOpen] = useState(false);
    const [isPaymentSuccessModalOpen, setIsPaymentSuccessModalOpen] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const navigate = useNavigate();

    const [takeawayDetails, setTakeawayDetails] = useState({
        name: "",
        address: "",
        pickupTime: "",
    });

    // Payment Form state
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        expiry: "",
        cvc: "",
        name: ""
    });

    const handleProceedToCheckout = () => {
        if (!orderType) {
            toast.error("Please select a dining option first");
            return;
        }
        if (tableNumber) {
            setIsPaymentModalOpen(true);
        } else {
            setIsTakeawayModalOpen(true);
        }
    };

    const handlePayNow = () => {
        // Close other modals and open online payment modal
        setIsPaymentModalOpen(false);
        setIsTakeawayModalOpen(false);
        setIsOnlinePaymentModalOpen(true);
    };



    // ... existing imports

    const handlePayLater = async () => {
        try {
            const payload: OrderPayload = {
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalPrice,
                tableNumber: tableNumber ? String(tableNumber) : null,
                orderType: orderType || 'dine-in', // Fallback, though check ensures it's set
                paymentMethod: 'cash', // Assuming pay later means cash/card at counter
                paymentStatus: 'pending'
            };

            await api.createOrder(payload);

            addActiveOrder(items, totalPrice, 'pending');
            toast.success("Order submitted! Please pay at the counter.");
            setIsPaymentModalOpen(false);
            clearCart();
            navigate('/menu');
        } catch (error) {
            console.error("Order submission failed", error);
            toast.error("Failed to submit order. Please try again.");
        }
    };

    const handleTakeawaySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!takeawayDetails.name || !takeawayDetails.address || !takeawayDetails.pickupTime) {
            toast.error("Please fill in all fields");
            return;
        }
        // Proceed to payment flow with details
        handlePayNow();
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvc || !paymentDetails.name) {
            toast.error("Please fill in all payment details");
            return;
        }

        setIsProcessingPayment(true);

        try {
            const payload: OrderPayload = {
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalPrice,
                tableNumber: tableNumber ? String(tableNumber) : null,
                orderType: orderType || 'dine-in',
                paymentMethod: 'online',
                paymentStatus: 'paid',
                customerDetails: orderType === 'takeaway' ? takeawayDetails : { name: paymentDetails.name }
            };

            await api.createOrder(payload);

            // Add to active orders
            addActiveOrder(items, totalPrice, 'paid');

            setIsOnlinePaymentModalOpen(false);
            setIsPaymentSuccessModalOpen(true);
        } catch (error) {
            console.error("Payment failed", error);
            toast.error("Payment processing failed. Please try again.");
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const handlePaymentSuccessClose = () => {
        setIsPaymentSuccessModalOpen(false);
        clearCart();
        navigate("/menu");
        toast.success("Thank you for your order!");
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 container py-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
                        <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                            Your Order is Empty
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            Add some delicious Korean dishes to get started!
                        </p>
                        <Link to="/menu">
                            <Button size="lg" className="gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Browse Menu
                            </Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="font-display text-4xl font-bold text-foreground">
                            Checkout
                        </h1>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearCart}
                            className="gap-2 text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                            Clear All
                        </Button>
                    </div>

                    <div className="space-y-4 mb-8">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-secondary/50 rounded-lg p-4 border border-border"
                            >
                                <div className="flex gap-4">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground truncate">
                                                    {item.name}
                                                </h3>
                                                {item.category && (
                                                    <p className="text-xs text-muted-foreground">{item.category}</p>
                                                )}
                                                <p className="text-primary font-semibold mt-1 text-sm sm:text-base">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <p className="font-bold text-foreground text-sm sm:text-base flex-shrink-0">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between gap-2 mt-3">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="h-8 w-8"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="font-semibold text-foreground w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="h-8 w-8"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeItem(item.id)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-secondary rounded-lg p-6 border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-semibold text-foreground">Subtotal</span>
                            <span className="text-lg font-semibold text-foreground">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                            <span>Tax (estimated)</span>
                            <span>${(totalPrice * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="border-t border-border pt-4 mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-foreground">Total</span>
                                <span className="text-xl font-bold text-primary">
                                    ${(totalPrice * 1.1).toFixed(2)}
                                </span>
                            </div>
                        </div>
                        {orderType ? (
                            <Button size="lg" className="w-full gap-2" onClick={handleProceedToCheckout}>
                                Proceed to Checkout
                            </Button>
                        ) : (
                            <div className="space-y-2">
                                <Button disabled size="lg" className="w-full gap-2 opacity-50 cursor-not-allowed">
                                    Proceed to Checkout
                                </Button>
                                <p className="text-xs text-center text-destructive font-medium">
                                    Please select a dining option (Store or Takeaway) to proceed
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Dine-in Payment Modal */}
                <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Payment Options</DialogTitle>
                            <DialogDescription>
                                Choose how you would like to pay for your order.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <Button
                                variant="outline"
                                className="h-24 flex flex-col gap-2 hover:border-primary hover:text-primary transition-colors"
                                onClick={handlePayNow}
                            >
                                <CreditCard className="h-8 w-8" />
                                <span className="font-semibold">Pay Now</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-24 flex flex-col gap-2 hover:border-primary hover:text-primary transition-colors"
                                onClick={handlePayLater}
                            >
                                <Wallet className="h-8 w-8" />
                                <span className="font-semibold">Pay Later</span>
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Takeaway Form Modal */}
                <Dialog open={isTakeawayModalOpen} onOpenChange={setIsTakeawayModalOpen}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Takeaway Details</DialogTitle>
                            <DialogDescription>
                                Please provide your details for pickup.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleTakeawaySubmit} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        placeholder="Your Name"
                                        className="pl-9"
                                        value={takeawayDetails.name}
                                        onChange={(e) => setTakeawayDetails({ ...takeawayDetails, name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Full Address</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="address"
                                        placeholder="Your Address"
                                        className="pl-9"
                                        value={takeawayDetails.address}
                                        onChange={(e) => setTakeawayDetails({ ...takeawayDetails, address: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pickupTime">Pickup Time</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="pickupTime"
                                        type="time"
                                        className="pl-9"
                                        value={takeawayDetails.pickupTime}
                                        onChange={(e) => setTakeawayDetails({ ...takeawayDetails, pickupTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="pt-4">
                                <Button type="submit" size="lg" className="w-full gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Place Order & Pay Now
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Online Payment Modal */}
                <Dialog open={isOnlinePaymentModalOpen} onOpenChange={setIsOnlinePaymentModalOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Secure Online Payment</DialogTitle>
                            <DialogDescription>
                                Enter your card details to complete the payment.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handlePaymentSubmit} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="cardName">Cardholder Name</Label>
                                <Input
                                    id="cardName"
                                    placeholder="John Doe"
                                    value={paymentDetails.name}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="cardNumber"
                                        placeholder="0000 0000 0000 0000"
                                        className="pl-9"
                                        value={paymentDetails.cardNumber}
                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                                        required
                                        maxLength={19}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input
                                        id="expiry"
                                        placeholder="MM/YY"
                                        value={paymentDetails.expiry}
                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                                        required
                                        maxLength={5}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input
                                        id="cvc"
                                        placeholder="123"
                                        value={paymentDetails.cvc}
                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                                        required
                                        maxLength={3}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full gap-2"
                                    disabled={isProcessingPayment}
                                >
                                    {isProcessingPayment ? (
                                        <>Processing...</>
                                    ) : (
                                        <>Make Payment ${(totalPrice * 1.1).toFixed(2)}</>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Payment Success Modal */}
                <Dialog open={isPaymentSuccessModalOpen} onOpenChange={() => { }}>
                    <DialogContent className="sm:max-w-sm text-center">
                        <div className="py-6 flex flex-col items-center justify-center space-y-4">
                            <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                                <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                            </div>
                            <DialogTitle className="text-2xl font-bold">Payment Successful!</DialogTitle>
                            <DialogDescription className="text-center">
                                Your order has been placed successfully. A receipt has been sent to your email.
                            </DialogDescription>
                            <Button
                                className="w-full mt-4"
                                size="lg"
                                onClick={handlePaymentSuccessClose}
                            >
                                Okay
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </main>
            <Footer />
        </div>
    );
};

export default Orders;
