'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { featuredProjects } from '@/data/projects';
import type { Project } from '@/types';

export function PortfolioReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced    = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const items = gsap.utils.toArray<HTMLElement>('.portfolio-item', section);
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin:     true,
          scrub:   1.2,
          start:   'top top',
          end:     () => `+=${(items.length - 1) * window.innerHeight}`,
          anticipatePin: 1,
        },
      });

      items.forEach((item, i) => {
        if (i === 0) return;
        tl.to(items[i - 1], { opacity: 0, yPercent: -6, duration: 1 }, i - 0.5);
        tl.fromTo(item, { opacity: 0, yPercent: 6 }, { opacity: 1, yPercent: 0, duration: 1 }, i - 0.5);
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      data-bg="#18120D"
      data-text="#F4EDE6"
      style={{
        position:   'relative',
        height:     '100vh',
        background: 'var(--surface-dark)',
        overflow:   'hidden',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {featuredProjects.map((project, i) => (
          <PortfolioItem
            key={project.slug}
            project={project}
            isFirst={i === 0}
          />
        ))}
      </div>
    </section>
  );
}

function PortfolioItem({ project, isFirst }: { project: Project; isFirst: boolean }) {
  return (
    <div
      className="portfolio-item"
      aria-hidden={!isFirst}
      style={{
        position: 'absolute',
        inset:    0,
        opacity:  isFirst ? 1 : 0,
      }}
    >
      {project.video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.cover}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={project.video} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority={isFirst}
        />
      )}

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(24,18,13,0.8) 0%, transparent 55%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom:   'var(--space-9)',
          left:     'var(--section-inset)',
          color:    'var(--text-inverse)',
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--text-xs)',
            fontWeight:    500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--primary)',
            display:       'block',
            marginBottom:  'var(--space-3)',
          }}
        >
          {project.category}
        </span>
        <h3
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--text-3xl)',
            fontWeight:    700,
            letterSpacing: 'var(--tracking-tight)',
            lineHeight:    'var(--leading-tight)',
            marginBottom:  'var(--space-6)',
          }}
        >
          {project.title}
        </h3>
        <Link
          href={`/work/${project.slug}`}
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            'var(--space-3)',
            fontFamily:     'var(--font-body)',
            fontSize:       'var(--text-sm)',
            fontWeight:     700,
            letterSpacing:  '0.08em',
            textTransform:  'uppercase',
            padding:        'var(--space-4) var(--space-6)',
            background:     'transparent',
            color:          'var(--text-inverse)',
            border:         '1px solid var(--border-dark-strong)',
            borderRadius:   'var(--radius-pill)',
            textDecoration: 'none',
            transition:     'border-color 200ms, color 200ms',
          }}
          className="hover:border-[--primary-light] hover:text-[--primary-light]"
        >
          Find out more →
        </Link>
      </div>
    </div>
  );
}
