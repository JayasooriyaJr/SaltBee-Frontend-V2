import Navbar from "@/components/Navbar";
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
    const { tableNumber } = useOrder();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isTakeawayModalOpen, setIsTakeawayModalOpen] = useState(false);
    const [takeawayDetails, setTakeawayDetails] = useState({
        name: "",
        address: "",
        pickupTime: "",
    });

    const handleProceedToCheckout = () => {
        if (tableNumber) {
            setIsPaymentModalOpen(true);
        } else {
            setIsTakeawayModalOpen(true);
        }
    };

    const handlePayNow = () => {
        // Trigger card payment flow
        console.log("Triggering card payment flow...");
        toast.info("Proceeding to card payment...");
        setIsPaymentModalOpen(false);
        setIsTakeawayModalOpen(false);
        // logic for card payment flow would go here
    };

    const handlePayLater = () => {
        // Submit order to backend
        console.log("Submitting order as Pay Later...");
        // API call to submit order would go here

        toast.success("Order submitted! Please pay at the counter.");
        setIsPaymentModalOpen(false);
        clearCart();
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
                        <Button size="lg" className="w-full gap-2" onClick={handleProceedToCheckout}>
                            Proceed to Checkout
                        </Button>
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
            </main>
            <Footer />
        </div>
    );
};

export default Orders;
