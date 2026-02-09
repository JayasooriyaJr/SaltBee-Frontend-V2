import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Orders = () => {
    const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

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
                        <Button size="lg" className="w-full gap-2">
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Orders;
