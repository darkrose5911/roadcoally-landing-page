"use client";

import { useRef, useEffect } from 'react';

const SmoothScrollWrapper = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollVelocity = useRef(0);
  const lastScrollTime = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    
    if (!container || !content) return;

    let targetScrollTop = 0;
    let currentScrollTop = 0;
    
    const smoothScroll = () => {
      const now = Date.now();
      const deltaTime = now - lastScrollTime.current;
      lastScrollTime.current = now;

      // Apply momentum and easing
      const ease = 0.1;
      const friction = 0.95;
      
      // Calculate smooth scroll position
      const diff = targetScrollTop - currentScrollTop;
      currentScrollTop += diff * ease;
      
      // Apply velocity with friction
      scrollVelocity.current *= friction;
      currentScrollTop += scrollVelocity.current;
      
      // Update the transform
      content.style.transform = `translateY(${-currentScrollTop}px)`;
      
      // Continue animation if there's still movement
      if (Math.abs(diff) > 0.1 || Math.abs(scrollVelocity.current) > 0.1) {
        rafId.current = requestAnimationFrame(smoothScroll);
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      
      const delta = e.deltaY;
      const maxScroll = content.scrollHeight - container.clientHeight;
      
      // Add momentum based on wheel delta
      scrollVelocity.current += delta * 0.3;
      
      // Update target scroll position
      targetScrollTop = Math.max(0, Math.min(maxScroll, targetScrollTop + delta));
      
      // Start smooth scrolling animation
      if (!rafId.current) {
        lastScrollTime.current = Date.now();
        rafId.current = requestAnimationFrame(smoothScroll);
      }
    };

    const handleScroll = (e) => {
      e.preventDefault();
      const scrollTop = container.scrollTop;
      targetScrollTop = scrollTop;
      currentScrollTop = scrollTop;
      
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(smoothScroll);
      }
    };

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll, { passive: false });

    // Set initial height
    const updateHeight = () => {
      container.style.height = '100vh';
      container.style.overflow = 'hidden';
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeight);
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ 
        height: '100vh', 
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div 
        ref={contentRef}
        className="w-full"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SmoothScrollWrapper;