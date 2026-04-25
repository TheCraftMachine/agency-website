import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section
      data-bg="#F4EDE6"
      data-text="#18120D"
      style={{
        minHeight:   '100svh',
        display:     'flex',
        alignItems:  'flex-end',
        paddingBottom: 'var(--space-10)',
        background:  'var(--surface-light)',
        color:       'var(--text-primary)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 'var(--grid-max)', marginInline: 'auto', paddingInline: 'var(--section-inset)' }}>

        <span
          className="hero-reveal"
          style={{
            display:       'block',
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--text-xs)',
            fontWeight:    500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--primary)',
            marginBottom:  'var(--space-5)',
          }}
        >
          Web Agency — Paris
        </span>

        <h1
          className="hero-reveal"
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--text-display)',
            fontWeight:    700,
            lineHeight:    'var(--leading-tight)',
            letterSpacing: 'var(--tracking-tight)',
            marginBottom:  'var(--space-7)',
            overflowWrap:  'break-word',
          }}
        >
          We build{' '}
          <span
            aria-hidden="true"
            style={{
              display:      'inline-block',
              width:        'clamp(80px, 11vw, 156px)',
              height:       'clamp(48px, 6.5vw, 96px)',
              borderRadius: 'var(--radius-md)',
              overflow:     'hidden',
              verticalAlign: 'middle',
              marginInline:  '0.15em',
              transform:     'translateY(-0.08em)',
              position:      'relative',
            }}
          >
            <Image
              src="/images/hero-thumb-1.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 80px, 156px"
              className="object-cover"
            />
          </span>
          {' '}digital machines
          <br />
          that move{' '}
          <span
            aria-hidden="true"
            style={{
              display:      'inline-block',
              width:        'clamp(80px, 11vw, 156px)',
              height:       'clamp(48px, 6.5vw, 96px)',
              borderRadius: 'var(--radius-md)',
              overflow:     'hidden',
              verticalAlign: 'middle',
              marginInline:  '0.15em',
              transform:     'translateY(-0.08em)',
              position:      'relative',
            }}
          >
            <Image
              src="/images/hero-thumb-2.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 80px, 156px"
              className="object-cover"
            />
          </span>
          {' '}people.
        </h1>

        <p
          className="hero-reveal"
          style={{
            fontSize:     'var(--text-lg)',
            lineHeight:   'var(--leading-normal)',
            color:        'var(--text-secondary)',
            maxWidth:     '44ch',
            marginBottom: 'var(--space-7)',
          }}
        >
          From strategy to screen — every decision made with the precision of a craftsman.
        </p>

        <div
          className="hero-reveal"
          style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}
        >
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
              background:     'var(--primary)',
              color:          '#fff',
              borderRadius:   'var(--radius-sm)',
              textDecoration: 'none',
              transition:     'background 200ms',
            }}
            className="hover:bg-[--primary-hover]"
          >
            See the work →
          </Link>
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
              background:     'transparent',
              color:          'var(--text-primary)',
              border:         '1px solid var(--border-strong)',
              borderRadius:   'var(--radius-pill)',
              textDecoration: 'none',
              transition:     'border-color 200ms, color 200ms',
            }}
            className="hover:border-[--primary] hover:text-[--primary]"
          >
            Start a project
          </Link>
        </div>

      </div>
    </section>
  );
}
