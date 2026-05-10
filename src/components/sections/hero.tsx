'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap } from '@/lib/gsap';

const GEAR_SIZE = 200;

export function Hero() {
  const t = useTranslations('Hero');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gearRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !headingRef.current || !gearRef.current) return;

    const heading = headingRef.current;
    const gear = gearRef.current;

    const ctx = gsap.context(() => {
      const headingW = heading.offsetWidth;
      const gearW = gear.offsetWidth || GEAR_SIZE;

      // Place gear at the left boundary, vertically centred, before the reveal starts
      gsap.set(gear, { x: -gearW / 2, yPercent: -50, rotation: 0, opacity: 1 });

      const tl = gsap.timeline({ delay: 1.2 });

      // Clip-path sweeps right → reveals text left-to-right
      tl.fromTo(
        heading,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.8, ease: 'power2.inOut' }
      );

      // Gear rolls across at the exact same pace, then fades out
      tl.to(
        gear,
        { x: headingW + gearW / 2, rotation: 720, duration: 1.8, ease: 'power2.inOut' },
        0
      );
      tl.to(gear, { opacity: 0, duration: 0.3, ease: 'power1.out' });
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      data-bg="#F4EDE6"
      data-text="#18120D"
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: 'var(--space-10)',
        background: 'var(--surface-light)',
        color: 'var(--text-primary)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 'var(--grid-max)', marginInline: 'auto', paddingInline: 'var(--section-inset)' }}>

        <span
          className="hero-reveal"
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--primary)',
            marginBottom: 'var(--space-5)',
          }}
        >
          {t('label')}
        </span>

        {/* Wrapper needed so the absolutely-positioned gear is scoped to the heading bounds */}
        <div style={{ position: 'relative', marginBottom: 'var(--space-7)' }}>
          <h1
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-display)',
              fontWeight: 700,
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tight)',
              overflowWrap: 'break-word',
            }}
          >
            {t('heading')}
          </h1>

          <span
            ref={gearRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: GEAR_SIZE,
              height: GEAR_SIZE,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <Image
              src="/images/logo.png"
              alt=""
              fill
              sizes={`${GEAR_SIZE}px`}
              className="object-contain"
            />
          </span>
        </div>

        <p
          className="hero-reveal"
          style={{
            fontSize: 'var(--text-lg)',
            lineHeight: 'var(--leading-normal)',
            color: 'var(--text-secondary)',
            maxWidth: '44ch',
            marginBottom: 'var(--space-7)',
          }}
        >
          {t('description')}
        </p>

        <div
          className="hero-reveal"
          style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}
        >
          <Link
            href="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: 'var(--space-4) var(--space-6)',
              background: 'var(--primary)',
              color: '#fff',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              transition: 'background 200ms',
            }}
            className="hover:bg-[--primary-hover]"
          >
            {t('ctaPrimary')}
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: 'var(--space-4) var(--space-6)',
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-pill)',
              textDecoration: 'none',
              transition: 'border-color 200ms, color 200ms',
            }}
            className="hover:border-[--primary] hover:text-[--primary]"
          >
            {t('ctaSecondary')}
          </Link>
        </div>

      </div>
    </section>
  );
}
