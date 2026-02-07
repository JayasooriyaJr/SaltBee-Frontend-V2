import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";
import type { MenuItem } from "@/data/menuData";

interface DishCardProps {
  item: MenuItem;
  index: number;
}

const DishCard = ({ item, index }: DishCardProps) => {
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

        {/* Price hex */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <svg className="w-14 h-14 text-primary" viewBox="0 0 100 100">
              <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold text-sm">
              ${item.price.toFixed(0)}
            </span>
          </div>
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
      </div>
    </motion.div>
  );
};

export default DishCard;
