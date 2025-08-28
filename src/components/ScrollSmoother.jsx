"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollSmootherWrapper({ children }) {
  const smoother = useRef(null);

  useEffect(() => {
    // Create ScrollSmoother instance only if it doesn't exist
    if (!smoother.current) {
      smoother.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });
    }

    // Cleanup function
    return () => {
      if (smoother.current) {
        smoother.current.kill();
        smoother.current = null;
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}