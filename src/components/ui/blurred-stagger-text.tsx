"use client" 

import * as React from "react"
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
 
export const BlurredStagger = ({
  text = "",
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };
 
  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };
 
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className={cn("drop-shadow-sm", className)}
    >
      {text.split(" ").map((word, wordIndex, arr) => (
        <span 
          key={wordIndex} 
          className={cn(
            "inline-block",
            word.toLowerCase().includes("insights") ? "italic font-serif normal-case font-medium text-bison-brown" : ""
          )}
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={letterAnimation}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.h1>
  );
};
