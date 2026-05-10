import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { RevealText } from '@/components/common/reveal-text';
import { RevealBlock } from '@/components/common/reveal-block';
import { AccentDot } from '@/components/common/accent-dot';

export function AboutTeaser() {
  const t = useTranslations('AboutTeaser');

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
              {t('label')}
            </span>
            <RevealText>
              <h2 style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'var(--text-3xl)',
                fontWeight:    700,
                letterSpacing: 'var(--tracking-tight)',
                lineHeight:    'var(--leading-tight)',
              }}>
                {t('heading')} <AccentDot style={{ marginLeft: '0.1em' }} />
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
              {t('paragraph1')}
            </p>
            <p style={{
              fontSize:     'var(--text-base)',
              lineHeight:   'var(--leading-loose)',
              color:        'var(--text-muted-inv)',
              marginBottom: 'var(--space-8)',
            }}>
              {t('paragraph2')}
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
              {t('cta')}
            </Link>
          </RevealBlock>

        </div>

      </div>
    </section>
  );
}
