import { motion } from "framer-motion";

/**
 * A row of small hexagons used as a decorative section divider.
 */
const HoneycombDivider = ({ count = 5, className = "" }: { count?: number; className?: string }) => (
  <div className={`flex items-center justify-center gap-3 py-6 ${className}`}>
    <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/30" />
    {Array.from({ length: count }).map((_, i) => (
      <motion.svg
        key={i}
        className="w-4 h-4 text-primary"
        viewBox="0 0 100 100"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.4 + (i === Math.floor(count / 2) ? 0.4 : 0), scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1, duration: 0.3 }}
      >
        <polygon
          points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
          fill="currentColor"
        />
      </motion.svg>
    ))}
    <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/30" />
  </div>
);

export default HoneycombDivider;
