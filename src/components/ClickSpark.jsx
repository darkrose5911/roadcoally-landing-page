"use client";

import { useRef, useEffect, useCallback, useLayoutEffect } from 'react';

export const ClickSpark = ({ 
  className = "", 
  children, 
  sparkCount = 15, 
  sparkDuration = 1200, 
  sparkSize = 4, 
  sparkColors = ["#ff6b35", "#f7931e", "#ffd23f", "#06ffa5", "#1fb3d3", "#c74dff"], 
  easing = "easeOutCubic" 
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const sparksRef = useRef([]);

  const easingFunction = useCallback((t) => {
    switch (easing) {
      case 'linear':
        return t;
      case 'easeInQuad':
        return t * t;
      case 'easeOutQuad':
        return t * (2 - t);
      case 'easeInOutQuad':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      case 'easeInCubic':
        return t * t * t;
      case 'easeOutCubic':
        return (--t) * t * t + 1;
      case 'easeInOutCubic':
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      case 'easeInQuart':
        return t * t * t * t;
      case 'easeOutQuart':
        return 1 - (--t) * t * t * t;
      case 'easeInOutQuart':
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      case 'easeInQuint':
        return t * t * t * t * t;
      case 'easeOutQuint':
        return 1 + (--t) * t * t * t * t;
      case 'easeInOutQuint':
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      case 'easeInSine':
        return 1 - Math.cos(t * Math.PI / 2);
      case 'easeOutSine':
        return Math.sin(t * Math.PI / 2);
      case 'easeInOutSine':
        return -(Math.cos(Math.PI * t) - 1) / 2;
      case 'easeInExpo':
        return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
      case 'easeOutExpo':
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      case 'easeInOutExpo':
        if (t === 0) return 0;
        if (t === 1) return 1;
        if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2;
        return (2 - Math.pow(2, -20 * t + 10)) / 2;
      case 'easeInCirc':
        return 1 - Math.sqrt(1 - t * t);
      case 'easeOutCirc':
        return Math.sqrt(1 - (--t) * t);
      case 'easeInOutCirc':
        return t < 0.5
          ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
          : (Math.sqrt(1 - (-2 * t + 2) * (-2 * t + 2)) + 1) / 2;
      case 'easeInBack':
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * t * t * t - c1 * t * t;
      case 'easeOutBack':
        const c1_out = 1.70158;
        const c3_out = c1_out + 1;
        return 1 + c3_out * Math.pow(t - 1, 3) + c1_out * Math.pow(t - 1, 2);
      case 'easeInOutBack':
        const c1_inout = 1.70158;
        const c2 = c1_inout * 1.525;
        return t < 0.5
          ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
          : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
      default:
        return t;
    }
  }, [easing]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentTime = Date.now();
    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = currentTime - spark.startTime;
      const progress = Math.min(elapsed / sparkDuration, 1);
      
      if (progress >= 1) return false;

      const easedProgress = easingFunction(progress);
      
      const currentX = spark.x + spark.vx * easedProgress;
      const currentY = spark.y + spark.vy * easedProgress;
      const currentSize = sparkSize * (1 - easedProgress);
      const alpha = 1 - easedProgress;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = spark.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = spark.color;
      ctx.beginPath();
      ctx.arc(currentX, currentY, Math.max(0.5, currentSize), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      return true;
    });

    if (sparksRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [easingFunction, sparkDuration, sparkSize]);

  const createSparks = useCallback((x, y) => {
    const newSparks = [];
    const currentTime = Date.now();

    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
      const velocity = 50 + Math.random() * 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      newSparks.push({
        x,
        y,
        vx,
        vy,
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        startTime: currentTime,
      });
    }

    sparksRef.current.push(...newSparks);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animate();
  }, [sparkCount, sparkColors, animate]);

  const handleClick = useCallback((event) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    createSparks(x, y);
  }, [createSparks]);

  useLayoutEffect(() => {
    resizeCanvas();
  }, [resizeCanvas]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(container);
    container.addEventListener('click', handleClick);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resizeCanvas, handleClick]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1000 }}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
};