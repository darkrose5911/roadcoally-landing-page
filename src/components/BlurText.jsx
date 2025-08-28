"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";

const getTransformValues = (dir) => {
  switch (dir) {
    case "up":
      return { y: [-20, 0], opacity: [0, 1] };
    case "down":
      return { y: [20, 0], opacity: [0, 1] };
    case "left":
      return { x: [-20, 0], opacity: [0, 1] };
    case "right":
      return { x: [20, 0], opacity: [0, 1] };
    default:
      return { opacity: [0, 1] };
  }
};

export const BlurText = ({
  text,
  direction = "up",
  className = "",
  delay = 0,
  animateBy = "words",
  ...props
}) => {
  const segments = useMemo(() => {
    if (animateBy === "words") {
      return text.split(/(\s+)/);
    }
    return text.split("");
  }, [text, animateBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animateBy === "words" ? 0.12 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const segmentVariants = {
    hidden: {
      ...getTransformValues(direction),
      filter: "blur(10px)",
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: animateBy === "words" ? 0.6 : 0.4,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          variants={segmentVariants}
          style={{ display: "inline-block" }}
        >
          {animateBy === "words" && /\s+/.test(segment) ? (
            <span style={{ whiteSpace: "pre" }}>{segment}</span>
          ) : (
            segment
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};