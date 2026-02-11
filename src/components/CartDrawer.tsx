import { useCart } from "@/contexts/CartContext";
import { useOrder } from "@/contexts/OrderContext";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { items, updateQuantity, removeItem, totalPrice, totalItems, clearCart } = useCart();
    const { orderType } = useOrder();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full sm:w-[440px] bg-background z-50 flex flex-col shadow-2xl overflow-hidden"
                        style={{ height: '100vh' }}
                    >
                        {/* Header */}
                        <div className="flex-shrink-0 px-6 py-5 border-b border-border bg-secondary/30">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                                        <ShoppingBag className="h-6 w-6 text-primary" />
                                        Your Order
                                    </h2>
                                    {totalItems > 0 && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {totalItems} {totalItems === 1 ? 'item' : 'items'}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="h-10 w-10 rounded-full hover:bg-secondary"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Clear All Button */}
                            {items.length > 0 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={clearCart}
                                    className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Clear All Items
                                </Button>
                            )}
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                                    <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                                        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-sm text-muted-foreground max-w-[250px]">
                                        Start adding delicious Korean dishes to your order
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group relative bg-card rounded-xl p-4 border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-md"
                                        >
                                            <div className="flex gap-4">
                                                {item.image ? (
                                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                                                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                                                    </div>
                                                )}

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-1">
                                                        <h3 className="font-semibold text-foreground leading-tight line-clamp-2">
                                                            {item.name}
                                                        </h3>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeItem(item.id)}
                                                            className="h-8 w-8 -mt-1 -mr-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    {item.category && (
                                                        <p className="text-xs text-muted-foreground mb-2">
                                                            {item.category}
                                                        </p>
                                                    )}

                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="h-7 w-7 rounded-md hover:bg-background"
                                                            >
                                                                <Minus className="h-3.5 w-3.5" />
                                                            </Button>
                                                            <span className="font-semibold text-sm w-8 text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="h-7 w-7 rounded-md hover:bg-background"
                                                            >
                                                                <Plus className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </div>

                                                        <div className="text-right">
                                                            <p className="text-xs text-muted-foreground line-through">
                                                                ${item.price.toFixed(2)} each
                                                            </p>
                                                            <p className="font-bold text-primary text-lg">
                                                                ${(item.price * item.quantity).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer with Total and Checkout Button */}
                        {items.length > 0 && (
                            <div className="flex-shrink-0 border-t border-border bg-secondary/20 px-6 py-5">
                                <div className="space-y-3 mb-5">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-semibold text-foreground">
                                            ${totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Tax (estimated)</span>
                                        <span className="font-semibold text-foreground">
                                            ${(totalPrice * 0.1).toFixed(2)}
                                        </span>
                                    </div>

                                    <Separator className="my-3" />

                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-foreground text-lg">Total</span>
                                        <span className="font-bold text-primary text-2xl">
                                            ${(totalPrice * 1.1).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {orderType ? (
                                    <Link to="/orders" onClick={onClose}>
                                        <Button size="lg" className="w-full gap-2 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow">
                                            Proceed to Checkout
                                            <ArrowRight className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <div className="space-y-2">
                                        <Button
                                            disabled
                                            size="lg"
                                            className="w-full gap-2 h-12 text-base font-semibold opacity-50 cursor-not-allowed"
                                        >
                                            Proceed to Checkout
                                            <ArrowRight className="h-5 w-5" />
                                        </Button>
                                        <p className="text-xs text-center text-destructive font-medium">
                                            Please select a dining option (Store or Takeaway) to proceed
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={onClose}
                                    className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
