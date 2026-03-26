"use client";

import { motion } from "motion/react";
import React from 'react';
import { cn } from "../../lib/utils";

interface BlurIntProps {
  word?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
  delay?: number;
}

const BlurIn = ({ word, children, className, variant, duration = 1, delay = 0 }: BlurIntProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration, delay }}
      variants={combinedVariants}
      className={cn(className)}
    >
      {children || word}
    </motion.div>
  );
};

export { BlurIn };
