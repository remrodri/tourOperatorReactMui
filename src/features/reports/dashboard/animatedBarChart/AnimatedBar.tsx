// AnimatedBar.tsx
import { motion } from "framer-motion"; // no "motion/react"

export function AnimatedBar({
  index = 0,
  children,
  style = {},
}: {
  index?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ transform: "translateX(-100%)" }}
      animate={{ transform: "translateX(0)" }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.075,
      }}
      style={style}
      className="absolute"
    >
      {children}
    </motion.div>
  );
}
