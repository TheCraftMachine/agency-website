import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/common/project-card';
import { AccentDot } from '@/components/common/accent-dot';

export const metadata = {
  title: 'Work — TheCraftMachine',
  description: 'Web design, brand identity, and film projects by TheCraftMachine.',
};

export default function WorkPage() {
  return (
    <div style={{ background: 'var(--surface-dark)', color: 'var(--text-inverse)', minHeight: '100vh' }}>

      {/* Page header */}
      <header style={{
        paddingTop:    'calc(var(--space-10) + var(--space-8))',
        paddingBottom: 'var(--section-gap)',
        paddingInline: 'var(--section-inset)',
        maxWidth:      'var(--grid-max)',
        marginInline:  'auto',
      }}>
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
          Selected work
        </span>
        <h1 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'var(--text-4xl)',
          fontWeight:    700,
          letterSpacing: 'var(--tracking-tight)',
          lineHeight:    'var(--leading-tight)',
          maxWidth:      '16ch',
        }}>
          Projects we&apos;re proud of <AccentDot style={{ marginLeft: '0.1em' }} />
        </h1>
      </header>

      {/* Project grid */}
      <section style={{
        paddingBottom:  'var(--section-gap)',
        paddingInline:  'var(--section-inset)',
        maxWidth:       'var(--grid-max)',
        marginInline:   'auto',
      }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap:                 'var(--grid-gutter)',
        }}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

    </div>
  );
}
