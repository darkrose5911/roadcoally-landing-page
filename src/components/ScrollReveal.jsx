"use client";

import { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 600, 
  distance = 50, 
  easing = 'ease-out', 
  threshold = 0.1, 
  rootMargin = '0px', 
  once = true, 
  cascade = false, 
  cascadeDelay = 100, 
  className = '', 
  style = {} 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      case 'scale':
        return 'scale(0.8)';
      case 'fade':
        return 'translateY(0px)';
      default:
        return `translateY(${distance}px)`;
    }
  };

  const getFinalTransform = () => {
    return direction === 'scale' ? 'scale(1)' : 'translateY(0px) translateX(0px)';
  };

  const baseStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? getFinalTransform() : getInitialTransform(),
    transition: `all ${duration}ms ${easing}`,
    transitionDelay: `${delay}ms`,
    ...style,
  };

  const renderChildren = () => {
    if (!cascade) {
      return children;
    }

    if (Array.isArray(children)) {
      return children.map((child, index) => (
        <div
          key={index}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? getFinalTransform() : getInitialTransform(),
            transition: `all ${duration}ms ${easing}`,
            transitionDelay: `${delay + (index * cascadeDelay)}ms`,
          }}
        >
          {child}
        </div>
      ));
    }

    return children;
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={cascade ? style : baseStyles}
    >
      {renderChildren()}
    </div>
  );
};

export default ScrollReveal;