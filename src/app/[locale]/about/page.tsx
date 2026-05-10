import Link from 'next/link';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { AccentDot } from '@/components/common/accent-dot';
import { RevealText } from '@/components/common/reveal-text';
import { RevealBlock } from '@/components/common/reveal-block';
import { ColorMorphWatcher } from '@/components/common/color-morph-watcher';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return {
    title: t('about.title'),
    description: t('about.description'),
  };
}

type Value = { title: string; body: string };

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  const values = t.raw('values') as Value[];

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
            {t('label')}
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
              {t('heading')} <AccentDot style={{ marginLeft: '0.1em' }} />
            </h1>
          </RevealText>
          <RevealBlock>
            <p style={{
              fontSize:   'var(--text-lg)',
              lineHeight: 'var(--leading-loose)',
              color:      'var(--text-muted-inv)',
              maxWidth:   '58ch',
            }}>
              {t('intro')}
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
                {t('story1')}
              </p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-loose)', color: 'var(--text-secondary)' }}>
                {t('story2')}
              </p>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-loose)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                {t('story3')}
              </p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-loose)', color: 'var(--text-secondary)' }}>
                {t('story4')}
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
              {t('valuesHeading')} <AccentDot style={{ marginLeft: '0.1em' }} />
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
            {t('ctaHeading')}
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
              {t('ctaPrimary')}
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
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>

      <ColorMorphWatcher />
    </div>
  );
}
