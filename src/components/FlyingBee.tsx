import { motion } from "framer-motion";

/**
 * A small animated bee that flies across the screen along a curved path.
 * Used as a fun easter-egg / delight element.
 */
const FlyingBee = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`absolute pointer-events-none z-20 ${className}`}
    initial={{ x: "-10vw", y: "0vh" }}
    animate={{
      x: ["−10vw", "30vw", "60vw", "110vw"],
      y: ["0vh", "-8vh", "4vh", "-2vh"],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      repeatDelay: 8,
      ease: "easeInOut",
    }}
  >
    <motion.span
      className="text-2xl block"
      animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 0.4, repeat: Infinity }}
    >
      🐝
    </motion.span>
  </motion.div>
);

export default FlyingBee;
