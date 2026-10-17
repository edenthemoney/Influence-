'use client';

import { useEffect } from 'react';

export default function TicketBodyColor() {
  useEffect(() => {
    const previousBackground = document.body.style.backgroundColor;
    const previousColor = document.body.style.color;
    document.body.style.backgroundColor = '#050505';
    document.body.style.color = '#f7f1e4';
    return () => {
      document.body.style.backgroundColor = previousBackground;
      document.body.style.color = previousColor;
    };
  }, []);

  return null;
}
