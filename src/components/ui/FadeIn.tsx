import { motion } from "motion/react";
import React from "react";

export function FadeIn({ children, delay = 0, className, isHero = false }: React.PropsWithChildren<{ delay?: number; className?: string; isHero?: boolean }>) {
  if (!isHero) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
