'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap } from '@/lib/gsap';

export function EntranceCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();

  useEffect(() => {
    const curtain = curtainRef.current;
    const logo    = logoRef.current;

    if (reduced || !curtain || !logo) {
      curtain?.remove();
      return;
    }

    const heroReveals = document.querySelectorAll('.hero-reveal');
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(logo,
        { opacity: 0, scale: 0.85, yPercent: 12 },
        { opacity: 1, scale: 1,    yPercent: 0, duration: 0.45 }
      )
      .to({}, { duration: 0.2 })
      .to(curtain, {
        yPercent: -100,
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => curtain.remove(),
      })
      .fromTo(heroReveals,
        { opacity: 0, yPercent: 5 },
        { opacity: 1, yPercent: 0, duration: 0.45, stagger: 0.08 },
        '-=0.25'
      );
  }, [reduced]);

  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         9999,
        background:     '#18120D',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        pointerEvents:  'none',
        willChange:     'transform',
      }}
    >
      <div
        ref={logoRef}
        style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'var(--text-4xl)',
          fontWeight:    700,
          color:         '#F4EDE6',
          letterSpacing: '-0.03em',
        }}
      >
        TCM
      </div>
    </div>
  );
}
