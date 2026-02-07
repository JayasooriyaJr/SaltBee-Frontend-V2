import { motion } from "framer-motion";

/**
 * A sleek section divider with a thin line, a centered hexagon accent,
 * and subtle fade-in animation.
 */
const HoneycombDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center py-8 px-8 ${className}`}>
    {/* Left line */}
    <motion.div
      className="h-px flex-1 max-w-[120px]"
      style={{
        background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25))`,
      }}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />

    {/* Center hex cluster — 3 overlapping hexagons */}
    <motion.div
      className="mx-4 flex items-center gap-0.5"
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <svg className="w-3 h-3 text-primary/20" viewBox="0 0 100 100">
        <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
      </svg>
      <svg className="w-4 h-4 text-primary/50" viewBox="0 0 100 100">
        <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
      </svg>
      <svg className="w-3 h-3 text-primary/20" viewBox="0 0 100 100">
        <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="currentColor" />
      </svg>
    </motion.div>

    {/* Right line */}
    <motion.div
      className="h-px flex-1 max-w-[120px]"
      style={{
        background: `linear-gradient(90deg, hsl(var(--primary) / 0.25), transparent)`,
      }}
      initial={{ scaleX: 0, originX: 1 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  </div>
);

export default HoneycombDivider;
