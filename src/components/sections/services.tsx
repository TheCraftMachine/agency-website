import { RevealText } from '@/components/common/reveal-text';
import { RevealBlock } from '@/components/common/reveal-block';
import { AccentDot } from '@/components/common/accent-dot';
import { Separator } from '@/components/ui/separator';
import { services } from '@/data/services';

export function Services() {
  return (
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

        <div style={{ marginBottom: 'var(--space-9)' }}>
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
            What we do
          </span>
          <RevealText>
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'var(--text-4xl)',
              fontWeight:    600,
              letterSpacing: 'var(--tracking-tight)',
              lineHeight:    'var(--leading-tight)',
              maxWidth:      '14ch',
            }}>
              Every craft, under one roof <AccentDot style={{ marginLeft: '0.1em' }} />
            </h2>
          </RevealText>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-1)' }}>
          {services.map((service, i) => (
            <RevealBlock key={service.id} delay={i * 0.08}>
              <div style={{ padding: 'var(--space-7) 0' }}>
                <Separator className="mb-[--space-6]" />
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
                  lineHeight:    'var(--leading-snug)',
                  marginBottom:  'var(--space-4)',
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize:   'var(--text-base)',
                  lineHeight: 'var(--leading-normal)',
                  color:      'var(--text-secondary)',
                  maxWidth:   '36ch',
                }}>
                  {service.description}
                </p>
              </div>
            </RevealBlock>
          ))}
        </div>

      </div>
    </section>
  );
}
