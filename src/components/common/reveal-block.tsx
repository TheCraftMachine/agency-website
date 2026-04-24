'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface RevealBlockProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealBlock({ children, className, delay = 0 }: RevealBlockProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 48 },
        {
          opacity:  1,
          y:        0,
          duration: 0.7,
          delay,
          ease:     'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced, delay]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
