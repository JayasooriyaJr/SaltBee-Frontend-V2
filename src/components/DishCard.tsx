import { motion } from "framer-motion";
import { Flame, Star, ShoppingBag, Check } from "lucide-react";
import { type MenuItem } from "@/services/api";
import { useCart } from "@/contexts/CartContext";
import { useOrder } from "@/contexts/OrderContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderTypeModal from "./OrderTypeModal";

interface DishCardProps {
  item: MenuItem;
  index: number;
}

const DishCard = ({ item, index }: DishCardProps) => {
  const { addItem } = useCart();
  const { tableNumber, orderType } = useOrder();
  const [isAdded, setIsAdded] = useState(false);
  const [showOrderTypeModal, setShowOrderTypeModal] = useState(false);

  const handleAddToCart = () => {
    // Check if table number or order type is set
    if (!tableNumber && orderType !== 'takeaway') {
      // Show order type selection modal
      setShowOrderTypeModal(true);
      return;
    }

    // Proceed with adding to cart
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleOrderTypeSelected = () => {
    // After order type is selected, add the item to cart
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)]"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.popular && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
              <Star className="h-3 w-3" /> Popular
            </span>
          )}
          {item.spicy && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/90 text-accent-foreground text-[10px] font-bold uppercase tracking-wider">
              <Flame className="h-3 w-3" /> Spicy
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display font-bold text-foreground text-lg group-hover:text-primary transition-colors">
            {item.name}
          </h3>
        </div>
        <p className="text-primary text-sm mt-0.5">{item.korean}</p>
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-primary font-bold text-lg">${item.price.toFixed(2)}</span>
          {item.vegetarian && (
            <span className="text-[10px] text-muted-foreground border border-border rounded-full px-2 py-0.5">🌿 Vegetarian</span>
          )}
        </div>

        {/* Add to Order Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full mt-4 gap-2 transition-all duration-300 ${isAdded
            ? 'bg-green-600 hover:bg-green-600'
            : ''
            }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              Added to Order
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Add to Order
            </>
          )}
        </Button>
      </div>

      {/* Order Type Selection Modal */}
      <OrderTypeModal
        open={showOrderTypeModal}
        onClose={() => setShowOrderTypeModal(false)}
        onOrderTypeSelected={handleOrderTypeSelected}
      />
    </motion.div>
  );
};

export default DishCard;
