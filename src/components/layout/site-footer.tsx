import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';

export function SiteFooter() {
  const t = useTranslations('Footer');

  return (
    <footer
      data-bg="#18120D"
      data-text="#F4EDE6"
      style={{
        background: 'var(--surface-dark)',
        color:      'var(--text-inverse)',
        padding:    'var(--space-9) var(--section-inset) var(--space-8)',
      }}
    >
      <div style={{ maxWidth: 'var(--grid-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-8)', marginBottom: 'var(--space-9)' }}>
          <div>
            <p
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'var(--text-2xl)',
                fontWeight:    700,
                letterSpacing: '-0.03em',
                marginBottom:  'var(--space-4)',
              }}
            >
              TCM
            </p>
            <p style={{ color: 'var(--text-muted-inv)', maxWidth: '28ch', lineHeight: 'var(--leading-normal)', fontSize: 'var(--text-sm)' }}>
              {t('tagline')}
            </p>
          </div>

          <nav aria-label="Footer" style={{ display: 'flex', gap: 'var(--space-9)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted-inv)', marginBottom: 'var(--space-2)' }}>
                {t('nav.workHeading')}
              </p>
              <FooterLink href="/work">{t('nav.allProjects')}</FooterLink>
              <FooterLink href="/work?filter=web">{t('nav.webDesign')}</FooterLink>
              <FooterLink href="/work?filter=branding">{t('nav.branding')}</FooterLink>
              <FooterLink href="/work?filter=video">{t('nav.film')}</FooterLink>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted-inv)', marginBottom: 'var(--space-2)' }}>
                {t('nav.agencyHeading')}
              </p>
              <FooterLink href="/about">{t('nav.ourJourney')}</FooterLink>
              <FooterLink href="/#testimonials">{t('nav.clients')}</FooterLink>
              <FooterLink href="/contact">{t('nav.contact')}</FooterLink>
            </div>
          </nav>
        </div>

        <Separator className="bg-[--border-dark] mb-[--space-6]" />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted-inv)', letterSpacing: '0.04em' }}>
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted-inv)' }}>
            {t('location')}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontSize:      'var(--text-sm)',
        color:         'var(--text-inverse)',
        opacity:       0.8,
        textDecoration: 'none',
        transition:    'opacity 200ms',
      }}
      className="hover:opacity-100"
    >
      {children}
    </Link>
  );
}
