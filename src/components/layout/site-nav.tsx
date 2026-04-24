'use client';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Primary"
        style={{
          position:        'fixed',
          insetBlockStart: 0,
          insetInline:     0,
          zIndex:          100,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          padding:         'var(--space-4) var(--section-inset)',
          mixBlendMode:    'difference',
          pointerEvents:   'none',
        }}
      >
        <Link
          href="/"
          aria-label="TheCraftMachine home"
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--text-lg)',
            fontWeight:    700,
            letterSpacing: '-0.03em',
            color:         '#F4EDE6',
            textDecoration: 'none',
            pointerEvents: 'auto',
          }}
        >
          TCM
        </Link>

        {/* Desktop links */}
        <div
          className="hidden md:flex items-center"
          style={{ gap: 'var(--space-3)', pointerEvents: 'auto' }}
        >
          <NavLink href="/work">What We Do</NavLink>
          <NavLink href="/about">Our Journey</NavLink>
          <Link
            href="/contact"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            'var(--space-2)',
              fontFamily:     'var(--font-body)',
              fontSize:       'var(--text-xs)',
              fontWeight:     700,
              letterSpacing:  '0.08em',
              textTransform:  'uppercase',
              padding:        'var(--space-2) var(--space-3) var(--space-2) var(--space-4)',
              background:     'var(--primary)',
              color:          '#fff',
              borderRadius:   'var(--radius-sm)',
              textDecoration: 'none',
              mixBlendMode:   'normal',
              transition:     'background 200ms',
            }}
            className="hover:bg-[--primary-hover]"
          >
            Take the Next Step <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          style={{
            pointerEvents: 'auto',
            background:    'transparent',
            border:        'none',
            color:         '#F4EDE6',
            cursor:        'pointer',
            padding:       'var(--space-2)',
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '1.25rem' }}>
            {mobileOpen ? '✕' : '☰'}
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            position:   'fixed',
            inset:      0,
            zIndex:     200,
            background: 'var(--surface-dark)',
            display:    'flex',
            flexDirection: 'column',
            padding:    'var(--space-8) var(--section-inset)',
            gap:        'var(--space-7)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: '#F4EDE6' }}>TCM</span>
            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#F4EDE6', cursor: 'pointer', fontSize: '1.25rem' }}
            >
              ✕
            </button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {[
              { href: '/work',    label: 'What We Do' },
              { href: '/about',   label: 'Our Journey' },
              { href: '/contact', label: 'Take the Next Step' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'var(--text-2xl)',
                  fontWeight:    600,
                  color:         'var(--text-inverse)',
                  textDecoration: 'none',
                  letterSpacing: '-0.02em',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily:     'var(--font-body)',
        fontSize:       'var(--text-xs)',
        fontWeight:     500,
        letterSpacing:  '0.08em',
        textTransform:  'uppercase',
        padding:        'var(--space-2) var(--space-5)',
        border:         '1px solid rgba(244, 237, 230, 0.40)',
        borderRadius:   'var(--radius-pill)',
        color:          '#F4EDE6',
        textDecoration: 'none',
        transition:     'opacity 200ms',
      }}
      className="hover:opacity-70"
    >
      {children}
    </Link>
  );
}
