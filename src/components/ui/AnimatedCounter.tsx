"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  target,
  duration = 1200,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const targetRef = useRef<number>(target);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(false);

  // Keep targetRef up to date
  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setDisplayValue(targetRef.current);
      return;
    }

    const runCountAnimation = (from: number, to: number) => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      const startTime = performance.now();
      // Ensure small numbers (e.g. 2, 6) have enough time to visibly step
      const effectiveDuration = Math.max(duration, 900);

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / effectiveDuration, 1);
        // Smooth easeOutCubic curve
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(from + (to - from) * ease);

        setDisplayValue(current);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(update);
        } else {
          setDisplayValue(to);
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisibleRef.current = true;
          // Count up from 0 to target when section/element comes into view
          runCountAnimation(0, targetRef.current);
        } else {
          isVisibleRef.current = false;
          // Reset to 0 when scrolled out of view so next time it scrolls into view,
          // the countable effect is clearly visible again
          if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
          }
          setDisplayValue(0);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [duration]);

  // If target changes while visible (e.g. user toggles between neighbourhoods)
  useEffect(() => {
    if (isVisibleRef.current) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      const startTime = performance.now();
      const from = displayValue;
      const to = target;
      const animDuration = 600;

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / animDuration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(from + (to - from) * ease);

        setDisplayValue(current);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(update);
        } else {
          setDisplayValue(to);
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(update);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <span
      ref={elementRef}
      className={`inline-block tabular-nums transition-transform ${className}`}
    >
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
