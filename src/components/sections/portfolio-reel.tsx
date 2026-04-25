'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { featuredProjects } from '@/data/projects';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function PortfolioReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;
    const slides = gsap.utils.toArray<HTMLElement>('.pr-slide', sectionRef.current);
    const n = slides.length;
    if (n < 2) return;

    const ctx = gsap.context(() => {
      gsap.set(slides.slice(1), { yPercent: 100 });

      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${(n - 1) * window.innerHeight}px`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          snap: {
            snapTo: 1 / (n - 1),
            duration: { min: 0.3, max: 0.6 },
            ease: 'power2.inOut',
          },
        },
      });

      slides.forEach((slide, i) => {
        if (i === 0) return;
        tl.to(slide, { yPercent: 0, duration: 1, ease: 'none' });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      data-bg="#F4EDE6"
      data-text="#18120D"
      style={{
        background: 'var(--surface-light)',
        padding: 'var(--space-6)',
      }}
    >
      {/* Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '90vh',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>

        {featuredProjects.map((project, i) => (
          <div
            key={project.slug}
            className="pr-slide"
            style={{ position: 'absolute', inset: 0 }}
          >
            {/* Cover image */}
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />

            {/* Gradient overlay */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(24,18,13,0.9) 0%, rgba(24,18,13,0.2) 50%, transparent 75%)',
              }}
            />

            {/* Text */}
            <div style={{
              position: 'absolute',
              bottom: 'var(--space-8)',
              left: 'var(--section-inset)',
              color: 'var(--text-inverse)',
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                display: 'block',
                marginBottom: 'var(--space-3)',
              }}>
                {project.category}
              </span>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-4xl)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 'var(--leading-tight)',
                marginBottom: 'var(--space-4)',
              }}>
                {project.title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'rgba(244,237,230,0.7)',
                lineHeight: 'var(--leading-normal)',
                marginBottom: 'var(--space-6)',
                maxWidth: '520px',
              }}>
                {project.summary}
              </p>

              <Link
                href={`/work/${project.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  padding: 'var(--space-4) var(--space-6)',
                  color: 'var(--text-inverse)',
                  border: '1px solid rgba(244,237,230,0.4)',
                  borderRadius: 'var(--radius-pill)',
                  textDecoration: 'none',
                  transition: 'border-color 200ms, color 200ms',
                }}
                className="hover:border-[--primary] hover:text-[--primary]"
              >
                Find out more →
              </Link>
            </div>

            {/* Slide counter */}
            <div style={{
              position: 'absolute',
              top: 'var(--space-6)',
              right: 'var(--space-6)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: 'rgba(244,237,230,0.5)',
            }}>
              {String(i + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
