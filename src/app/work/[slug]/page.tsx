import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { AccentDot } from '@/components/common/accent-dot';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return { title: 'Not found' };
  return {
    title: `${project.title} — TheCraftMachine`,
    description: project.summary,
  };
}

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <div style={{ background: 'var(--surface-dark)', color: 'var(--text-inverse)', minHeight: '100vh' }}>

      {/* Hero */}
      <header style={{
        position:      'relative',
        height:        '85vh',
        overflow:      'hidden',
        display:       'flex',
        alignItems:    'flex-end',
        paddingBottom: 'var(--space-10)',
        paddingInline: 'var(--section-inset)',
      }}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div
          aria-hidden="true"
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to top, rgba(24,18,13,0.85) 0%, transparent 60%)',
          }}
        />
        <div style={{ position: 'relative', maxWidth: 'var(--grid-max)', width: '100%', marginInline: 'auto' }}>
          <span style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--text-xs)',
            fontWeight:    500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--primary)',
            display:       'block',
            marginBottom:  'var(--space-4)',
          }}>
            {project.category} — {project.year}
          </span>
          <h1 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--text-4xl)',
            fontWeight:    700,
            letterSpacing: 'var(--tracking-tight)',
            lineHeight:    'var(--leading-tight)',
          }}>
            {project.title}
          </h1>
        </div>
      </header>

      {/* Case study body */}
      <article style={{
        maxWidth:      'var(--grid-max)',
        marginInline:  'auto',
        paddingInline: 'var(--section-inset)',
        paddingBlock:  'var(--section-gap)',
      }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap:                 'var(--space-10)',
          marginBottom:        'var(--section-gap)',
        }}>
          {/* Meta */}
          <div>
            <dl style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {[
                { label: 'Client',   value: project.client },
                { label: 'Category', value: project.category },
                { label: 'Year',     value: String(project.year) },
                { label: 'Tags',     value: project.tags.join(', ') },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt style={{ fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted-inv)', marginBottom: 'var(--space-2)' }}>
                    {label}
                  </dt>
                  <dd style={{ fontSize: 'var(--text-base)', color: 'var(--text-inverse)' }}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Body */}
          <div>
            <p style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'var(--text-xl)',
              fontWeight:    500,
              letterSpacing: 'var(--tracking-snug)',
              lineHeight:    'var(--leading-snug)',
              marginBottom:  'var(--space-7)',
              color:         'var(--text-inverse)',
            }}>
              {project.summary}
            </p>
            <p style={{
              fontSize:   'var(--text-base)',
              lineHeight: 'var(--leading-loose)',
              color:      'var(--text-muted-inv)',
            }}>
              {project.description}
            </p>
          </div>
        </div>

        {/* Cover image full-width */}
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 'var(--section-gap)', aspectRatio: '16/9', position: 'relative' }}>
          <Image
            src={project.cover}
            alt={`${project.title} — full view`}
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Next project */}
        <div style={{ borderTop: '1px solid var(--border-dark)', paddingTop: 'var(--space-9)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted-inv)', marginBottom: 'var(--space-5)' }}>
            Next project
          </p>
          <Link
            href={`/work/${nextProject.slug}`}
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        'var(--space-5)',
              textDecoration: 'none',
            }}
            className="group"
          >
            <h3 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'var(--text-3xl)',
              fontWeight:    700,
              letterSpacing: 'var(--tracking-tight)',
              color:         'var(--text-inverse)',
              transition:    'color 200ms',
            }}
            className="group-hover:text-[--primary]"
            >
              {nextProject.title} <AccentDot />
            </h3>
          </Link>
        </div>
      </article>

    </div>
  );
}
