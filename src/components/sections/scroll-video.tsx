'use client';
import { useRef, useEffect } from 'react';
import { useScrollVideo } from '@/hooks/use-scroll-video';
import { RevealText } from '@/components/common/reveal-text';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap } from '@/lib/gsap';

export function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();

  useScrollVideo(videoRef, sectionRef);

  useEffect(() => {
    if (reduced || !sectionRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stickyRef.current,
        { opacity: 0, scale: 1.04 },
        {
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      data-bg="#18120D"
      data-text="#F4EDE6"
      style={{ height: '400vh', background: 'var(--surface-dark)' }}
    >
      <div ref={stickyRef} style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          preload="auto"
          muted
          playsInline
          aria-hidden="true"
          poster="/video/scroll-hero-poster.jpg"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        >
          <source src="/video/scroll-hero.webm" type="video/webm" />
          <source src="/video/scroll-hero.mp4" type="video/mp4" />
        </video>

        <div
          aria-hidden="true"
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to top, rgba(24,18,13,0.7) 0%, transparent 60%)',
          }}
        />

        <div style={{
          position: 'absolute',
          bottom:   'var(--space-10)',
          left:     'var(--section-inset)',
          color:    'var(--text-inverse)',
          maxWidth: '480px',
        }}>
          <RevealText>
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'var(--text-4xl)',
              fontWeight:    700,
              letterSpacing: 'var(--tracking-tight)',
              lineHeight:    'var(--leading-tight)',
              marginBottom:  'var(--space-4)',
            }}>
              Built frame by frame.
            </h2>
          </RevealText>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted-inv)', lineHeight: 'var(--leading-normal)' }}>
            Every project delivered with the same obsession as the first.
          </p>
        </div>
      </div>
    </section>
  );
}
