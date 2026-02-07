import { motion } from "framer-motion";

/**
 * A refined animated bee that drifts smoothly across the viewport
 * with a subtle golden trail glow, used as a delightful easter egg.
 */
const FlyingBee = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`absolute pointer-events-none z-20 ${className}`}
    initial={{ x: "-5vw", y: "0vh", opacity: 0 }}
    animate={{
      x: ["-5vw", "25vw", "55vw", "85vw", "105vw"],
      y: ["0vh", "-4vh", "2vh", "-3vh", "1vh"],
      opacity: [0, 1, 1, 1, 0],
    }}
    transition={{
      duration: 16,
      repeat: Infinity,
      repeatDelay: 12,
      ease: "easeInOut",
    }}
  >
    {/* Golden trail glow */}
    <motion.div
      className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-3 rounded-full opacity-30 blur-md"
      style={{ background: "hsl(var(--primary) / 0.4)" }}
      animate={{ opacity: [0.15, 0.35, 0.15], scaleX: [0.8, 1.2, 0.8] }}
      transition={{ duration: 0.6, repeat: Infinity }}
    />
    {/* Bee with gentle bobbing */}
    <motion.span
      className="text-lg block"
      animate={{ y: [0, -2, 0, 2, 0], rotate: [0, -5, 0, 5, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
      🐝
    </motion.span>
  </motion.div>
);

export default FlyingBee;
