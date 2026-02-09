import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const Checkout = () => {
    const navigate = useNavigate();
    const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
    const { tableNumber, orderType, setIsCheckoutLocked } = useOrder();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirmCheckout = async () => {
        setIsProcessing(true);

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Lock the checkout
        setIsCheckoutLocked(true);

        // Show success message
        toast.success('Order confirmed! Your order has been sent to the kitchen.', {
            duration: 5000,
        });

        // Clear cart
        clearCart();

        setIsProcessing(false);

        // Navigate to orders page
        navigate('/orders');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container py-24">
                    <div className="max-w-2xl mx-auto text-center">
                        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                        <p className="text-muted-foreground mb-6">
                            Add some delicious items from our menu to get started!
                        </p>
                        <Button onClick={() => navigate('/menu')}>
                            Browse Menu
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">Checkout</h1>
                    <p className="text-muted-foreground mb-8">
                        Review your order before confirming
                    </p>

                    {/* Order Info */}
                    <div className="bg-card border border-border rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Order Type</p>
                                <p className="font-semibold">
                                    {tableNumber ? `Dine-in - Table ${tableNumber}` : orderType === 'takeaway' ? 'Takeaway' : 'Not specified'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
                        <div className="p-4 border-b border-border">
                            <h2 className="font-semibold">Order Items ({items.length})</h2>
                        </div>

                        <div className="divide-y divide-border">
                            {items.map((item) => (
                                <div key={item.id} className="p-4 flex gap-4">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => removeItem(item.id)}
                                                className="ml-auto text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-card border border-border rounded-lg p-6">
                        <h2 className="font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tax (10%)</span>
                                <span>${(totalPrice * 0.1).toFixed(2)}</span>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex justify-between text-lg font-bold mb-6">
                            <span>Total</span>
                            <span>${(totalPrice * 1.1).toFixed(2)}</span>
                        </div>

                        <Button
                            onClick={handleConfirmCheckout}
                            disabled={isProcessing}
                            className="w-full"
                            size="lg"
                        >
                            {isProcessing ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    <CheckCircle className="mr-2 h-5 w-5" />
                                    Confirm Checkout
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Checkout;
