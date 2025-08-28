"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export const ShinyText = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const shimmerAnimation = textElement.animate(
      [
        {
          backgroundPosition: `-${shimmerWidth}px 0`,
        },
        {
          backgroundPosition: `calc(100% + ${shimmerWidth}px) 0`,
        },
      ],
      {
        duration: 3000,
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    );

    return () => {
      shimmerAnimation.cancel();
    };
  }, [shimmerWidth]);

  return (
    <span
      ref={textRef}
      className={cn(
        'inline-block bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text text-transparent bg-[length:200px_100%] animate-shimmer',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)`,
        backgroundSize: `${shimmerWidth}px 100%`,
        backgroundRepeat: 'no-repeat',
      }}
      {...props}
    >
      {children}
    </span>
  );
};