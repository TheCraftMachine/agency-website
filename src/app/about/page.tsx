import Image from 'next/image';
import Link from 'next/link';
import { AccentDot } from '@/components/common/accent-dot';
import { RevealText } from '@/components/common/reveal-text';
import { RevealBlock } from '@/components/common/reveal-block';
import { ColorMorphWatcher } from '@/components/common/color-morph-watcher';

export const metadata = {
  title: 'Our Journey — TheCraftMachine',
  description: 'Seven years of building digital things worth building.',
};

const values = [
  {
    title: 'Craft over output',
    body:  'We do fewer projects than most agencies. Intentionally. Every project gets our full attention — not a fraction of it.',
  },
  {
    title: 'Discipline first',
    body:  'We ask hard questions before we open design software. The strategy informs the aesthetic, not the other way around.',
  },
  {
    title: 'Long-term clients',
    body:  'We are not a transactional studio. Most of our clients have been with us for years — they trust us with the decisions that matter.',
  },
  {
    title: 'Transparent process',
    body:  'No black boxes. Clients are involved at every stage, every decision is explained, and nothing ships without shared understanding.',
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--surface-dark)', color: 'var(--text-inverse)', minHeight: '100vh' }}>

      {/* Hero */}
      <section
        data-bg="#18120D"
        data-text="#F4EDE6"
        style={{
          background:    'var(--surface-dark)',
          paddingTop:    'calc(var(--space-10) + var(--space-8))',
          paddingBottom: 'var(--section-gap)',
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
            Our journey
          </span>
          <RevealText>
            <h1 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'var(--text-4xl)',
              fontWeight:    700,
              letterSpacing: 'var(--tracking-tight)',
              lineHeight:    'var(--leading-tight)',
              maxWidth:      '18ch',
              marginBottom:  'var(--space-8)',
            }}>
              Seven years building things worth building <AccentDot style={{ marginLeft: '0.1em' }} />
            </h1>
          </RevealText>
          <RevealBlock>
            <p style={{
              fontSize:   'var(--text-lg)',
              lineHeight: 'var(--leading-loose)',
              color:      'var(--text-muted-inv)',
              maxWidth:   '58ch',
            }}>
              TheCraftMachine started as a two-person studio in a Paris arrondissement with good light and bad Wi-Fi. We had one principle: do fewer things, but do them properly. Seven years later, that principle still shapes every decision we make.
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* Story */}
      <section
        data-bg="#F4EDE6"
        data-text="#18120D"
        style={{
          background:    'var(--surface-light)',
          color:         'var(--text-primary)',
          paddingBlock:  'var(--section-gap)',
          paddingInline: 'var(--section-inset)',
        }}
      >
        <div style={{ maxWidth: 'var(--grid-max)', marginInline: 'auto' }}>
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap:                 'var(--space-10)',
            alignItems:          'start',
          }}>
            <RevealBlock>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-loose)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                We work across web design, brand identity, and film — because these disciplines inform each other. A brand built in isolation from its digital presence is half a brand. A website built without a clear brand foundation is just a collection of pages.
              </p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-loose)', color: 'var(--text-secondary)' }}>
                Our team is deliberately small. We are not a full-service agency with departments and account managers. We are a studio of specialists — each one the best we could find — who work closely together on every project. When you work with us, you work with the people doing the work.
              </p>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-loose)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                We choose our clients as carefully as they choose us. We are not a good fit for every project — and we will tell you that upfront. When we do take a project on, it is because we believe we can do something exceptional with it.
              </p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-loose)', color: 'var(--text-secondary)' }}>
                Most of our new work comes through existing clients and referrals. That is not something we engineer — it is the natural result of the work we do and how we do it.
              </p>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Values */}
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
          <RevealText>
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'var(--text-3xl)',
              fontWeight:    700,
              letterSpacing: 'var(--tracking-tight)',
              lineHeight:    'var(--leading-tight)',
              marginBottom:  'var(--space-9)',
            }}>
              How we work <AccentDot style={{ marginLeft: '0.1em' }} />
            </h2>
          </RevealText>

          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap:                 'var(--space-6)',
          }}>
            {values.map((v, i) => (
              <RevealBlock key={v.title} delay={i * 0.08}>
                <div style={{
                  padding:      'var(--space-7)',
                  background:   'var(--surface-dark-alt)',
                  borderRadius: 'var(--radius-md)',
                  height:       '100%',
                }}>
                  <p style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      'var(--text-xs)',
                    fontWeight:    500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'var(--primary)',
                    marginBottom:  'var(--space-4)',
                  }}>
                    0{i + 1}
                  </p>
                  <h3 style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'var(--text-xl)',
                    fontWeight:    600,
                    letterSpacing: 'var(--tracking-snug)',
                    marginBottom:  'var(--space-4)',
                  }}>
                    {v.title}
                  </h3>
                  <p style={{
                    fontSize:   'var(--text-base)',
                    lineHeight: 'var(--leading-normal)',
                    color:      'var(--text-muted-inv)',
                  }}>
                    {v.body}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        data-bg="#EDE5DC"
        data-text="#18120D"
        style={{
          background:    'var(--surface-light-alt)',
          color:         'var(--text-primary)',
          paddingBlock:  'var(--section-gap)',
          paddingInline: 'var(--section-inset)',
          textAlign:     'center',
        }}
      >
        <div style={{ maxWidth: 'var(--grid-max)', marginInline: 'auto' }}>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--text-3xl)',
            fontWeight:    700,
            letterSpacing: 'var(--tracking-tight)',
            lineHeight:    'var(--leading-tight)',
            marginBottom:  'var(--space-7)',
          }}>
            Ready to build something?
          </h2>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                color:          'var(--text-primary)',
                border:         '1px solid var(--border-strong)',
                borderRadius:   'var(--radius-pill)',
                textDecoration: 'none',
              }}
              className="hover:border-[--primary] hover:text-[--primary]"
            >
              See the work
            </Link>
          </div>
        </div>
      </section>

      <ColorMorphWatcher />
    </div>
  );
}
