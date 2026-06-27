'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const valueStr = String(value);
    const numericPart = parseInt(valueStr.replace(/[^0-9]/g, ''), 10) || 0;
    const nonNumericPart = valueStr.replace(/[0-9]/g, '');

    if (numericPart === 0) {
      setCount(valueStr);
      return;
    }

    let start = 0;
    const end = numericPart;
    const stepTime = 20; // 20ms intervals
    const totalSteps = (duration * 1000) / stepTime;
    const increment = Math.ceil(end / totalSteps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(`${end.toLocaleString()}${nonNumericPart}`);
      } else {
        setCount(`${start.toLocaleString()}${nonNumericPart}`);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, isInView, duration]);

  return <span ref={ref}>{count || String(value)}</span>;
}
