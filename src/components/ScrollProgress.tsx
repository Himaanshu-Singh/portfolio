"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 50 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1.5px] z-[100] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6)",
      }}
    />
  );
}
