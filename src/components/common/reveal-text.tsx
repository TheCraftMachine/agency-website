'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
}

export function RevealText({ children, className }: RevealTextProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity:  1,
          duration: 0.9,
          ease:     'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      {children}
    </div>
  );
}
