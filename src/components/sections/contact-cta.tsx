import Link from 'next/link';
import { RevealText } from '@/components/common/reveal-text';
import { RevealBlock } from '@/components/common/reveal-block';
import { AccentDot } from '@/components/common/accent-dot';

export function ContactCTA() {
  return (
    <section
      data-bg="#18120D"
      data-text="#F4EDE6"
      style={{
        background:    'var(--surface-dark)',
        color:         'var(--text-inverse)',
        paddingBlock:  'var(--section-gap)',
        paddingInline: 'var(--section-inset)',
      }}
    >
      <div style={{ maxWidth: 'var(--grid-max)', marginInline: 'auto' }}>

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
          Start a project
        </span>

        <RevealText>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--text-4xl)',
            fontWeight:    700,
            letterSpacing: 'var(--tracking-tight)',
            lineHeight:    'var(--leading-tight)',
            marginBottom:  'var(--space-8)',
            maxWidth:      '16ch',
          }}>
            Something worth building? Let&apos;s talk <AccentDot style={{ marginLeft: '0.1em' }} />
          </h2>
        </RevealText>

        <RevealBlock delay={0.1}>
          <p style={{
            fontSize:     'var(--text-lg)',
            lineHeight:   'var(--leading-normal)',
            color:        'var(--text-muted-inv)',
            maxWidth:     '44ch',
            marginBottom: 'var(--space-8)',
          }}>
            Tell us what you&apos;re working on. We respond to every enquiry within one working day.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
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
                background:     'var(--primary)',
                color:          '#fff',
                borderRadius:   'var(--radius-sm)',
                textDecoration: 'none',
                transition:     'background 200ms',
              }}
              className="hover:bg-[--primary-hover]"
            >
              Start a project →
            </Link>
            <Link
              href="/work"
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
              See the work
            </Link>
          </div>
        </RevealBlock>

      </div>
    </section>
  );
}
