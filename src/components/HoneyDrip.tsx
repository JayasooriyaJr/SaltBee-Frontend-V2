import { motion } from "framer-motion";

/**
 * Sleek honey-drip section divider — a golden shimmer line with
 * elegant drip accents that animate on scroll.
 */
const drips = [
  { left: "12%", height: 16, delay: 0.1, width: 3 },
  { left: "28%", height: 24, delay: 0.4, width: 2 },
  { left: "50%", height: 30, delay: 0.2, width: 3 },
  { left: "72%", height: 20, delay: 0.5, width: 2 },
  { left: "88%", height: 14, delay: 0.3, width: 3 },
];

const HoneyDrip = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-full h-10 overflow-hidden ${className}`}>
    {/* Shimmer line */}
    <motion.div
      className="absolute top-0 left-0 right-0 h-px"
      style={{
        background: `linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.1) 15%, hsl(var(--primary) / 0.5) 50%, hsl(var(--primary) / 0.1) 85%, transparent 100%)`,
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
    />

    {drips.map((drip, i) => (
      <motion.div
        key={i}
        className="absolute top-0 rounded-b-full"
        style={{
          left: drip.left,
          width: drip.width,
          background: `linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--primary) / 0.15), transparent)`,
        }}
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: drip.height, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: drip.delay,
          ease: [0.33, 1, 0.68, 1],
        }}
      />
    ))}
  </div>
);

export default HoneyDrip;
