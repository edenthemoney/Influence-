'use client';

import { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ value, duration = 2000, className = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    // Parse the value to extract number and suffix
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2] || '';
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentNum = targetNum * easeOutQuart;

      // Format the number
      let formatted: string;
      if (targetNum >= 1000000) {
        formatted = (currentNum / 1000000).toFixed(1);
      } else if (targetNum >= 1000) {
        formatted = Math.floor(currentNum / 1000).toString();
      } else {
        formatted = Math.floor(currentNum).toString();
      }

      setDisplayValue(formatted + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span className={className}>{displayValue}</span>;
}
