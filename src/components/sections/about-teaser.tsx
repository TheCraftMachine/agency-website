import Link from 'next/link';
import { RevealText } from '@/components/common/reveal-text';
import { RevealBlock } from '@/components/common/reveal-block';
import { AccentDot } from '@/components/common/accent-dot';

export function AboutTeaser() {
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-9)' }} className="md:grid-cols-[1fr_1fr]">

          <div>
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
              Our journey
            </span>
            <RevealText>
              <h2 style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'var(--text-3xl)',
                fontWeight:    700,
                letterSpacing: 'var(--tracking-tight)',
                lineHeight:    'var(--leading-tight)',
              }}>
                Precision is not a style. It&apos;s a practice <AccentDot style={{ marginLeft: '0.1em' }} />
              </h2>
            </RevealText>
          </div>

          <RevealBlock>
            <p style={{
              fontSize:     'var(--text-lg)',
              lineHeight:   'var(--leading-loose)',
              color:        'var(--text-muted-inv)',
              marginBottom: 'var(--space-7)',
            }}>
              TheCraftMachine started as a two-person studio in a Paris arrondissement with good light and bad Wi-Fi. Seven years later we are still small by design — a tight team of specialists who share an obsession with the details most agencies cut to make margin.
            </p>
            <p style={{
              fontSize:     'var(--text-base)',
              lineHeight:   'var(--leading-loose)',
              color:        'var(--text-muted-inv)',
              marginBottom: 'var(--space-8)',
            }}>
              We work across web design, brand identity, and film — because these disciplines inform each other. A brand built in isolation from its digital presence is half a brand.
            </p>
            <Link
              href="/about"
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
              }}
              className="hover:border-[--primary-light] hover:text-[--primary-light]"
            >
              Read our story →
            </Link>
          </RevealBlock>

        </div>

      </div>
    </section>
  );
}
