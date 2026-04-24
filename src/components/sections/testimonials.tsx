'use client';
import { useState } from 'react';
import { testimonials } from '@/data/services';
import { AccentDot } from '@/components/common/accent-dot';
import { RevealBlock } from '@/components/common/reveal-block';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section
      id="testimonials"
      data-bg="#EDE5DC"
      data-text="#18120D"
      style={{
        background:    'var(--surface-light-alt)',
        color:         'var(--text-primary)',
        paddingBlock:  'var(--section-gap)',
        paddingInline: 'var(--section-inset)',
      }}
    >
      <div style={{ maxWidth: 'var(--grid-max)', marginInline: 'auto' }}>

        <div style={{ marginBottom: 'var(--space-8)' }}>
          <span style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--text-xs)',
            fontWeight:    500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--primary)',
            display:       'block',
            marginBottom:  'var(--space-5)',
          }}>
            Client reviews
          </span>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--text-4xl)',
            fontWeight:    600,
            letterSpacing: 'var(--tracking-tight)',
            lineHeight:    'var(--leading-tight)',
          }}>
            From the people who matter <AccentDot style={{ marginLeft: '0.1em' }} />
          </h2>
        </div>

        <RevealBlock>
          <blockquote
            style={{
              maxWidth:     '72ch',
              marginBottom: 'var(--space-8)',
            }}
          >
            <p style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'var(--text-2xl)',
              fontWeight:    500,
              letterSpacing: 'var(--tracking-snug)',
              lineHeight:    'var(--leading-snug)',
              marginBottom:  'var(--space-6)',
            }}>
              &ldquo;{current.quote}&rdquo;
            </p>
            <footer style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <AccentDot />
              <div>
                <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{current.author}</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  {current.role}, {current.company}
                </p>
              </div>
            </footer>
          </blockquote>
        </RevealBlock>

        {/* Navigation dots */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`View testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              style={{
                width:        i === active ? '32px' : '8px',
                height:       '8px',
                borderRadius: 'var(--radius-full)',
                background:   i === active ? 'var(--primary)' : 'var(--border-strong)',
                border:       'none',
                cursor:       'pointer',
                padding:      0,
                transition:   'width 300ms, background 300ms',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
