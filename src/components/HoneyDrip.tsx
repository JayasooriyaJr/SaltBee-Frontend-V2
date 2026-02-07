import { motion } from "framer-motion";

/**
 * A decorative honey-drip section divider — golden drips hanging from the top edge.
 */
const drips = [
  { left: "8%", height: 28, delay: 0 },
  { left: "15%", height: 18, delay: 0.6 },
  { left: "25%", height: 35, delay: 0.2 },
  { left: "38%", height: 20, delay: 1.0 },
  { left: "50%", height: 42, delay: 0.4 },
  { left: "62%", height: 24, delay: 0.8 },
  { left: "75%", height: 32, delay: 0.3 },
  { left: "85%", height: 16, delay: 1.2 },
  { left: "92%", height: 22, delay: 0.7 },
];

const HoneyDrip = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-full h-12 overflow-hidden ${className}`}>
    {/* Top bar */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

    {drips.map((drip, i) => (
      <motion.div
        key={i}
        className="absolute top-0 w-2 rounded-b-full"
        style={{
          left: drip.left,
          background: `linear-gradient(to bottom, hsl(var(--primary) / 0.6), hsl(var(--honey-glow) / 0.3))`,
        }}
        initial={{ height: 0 }}
        whileInView={{ height: drip.height }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          delay: drip.delay,
          ease: "easeOut",
        }}
      >
        {/* Drop at the bottom */}
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary/40"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: drip.delay + 1, duration: 0.3 }}
        />
      </motion.div>
    ))}
  </div>
);

export default HoneyDrip;
