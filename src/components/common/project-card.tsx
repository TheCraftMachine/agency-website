import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[--radius-md] bg-[--surface-dark-alt] cursor-pointer">
      <Link href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            width={800}
            height={600}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-[--ease-out-quart] group-hover:scale-[1.04]"
          />
        </div>
        <footer className="p-[--space-5] pt-[--space-5] px-[--space-6]">
          <span
            className="font-[--font-body] text-[length:--text-xs] font-medium uppercase tracking-[0.12em] text-[--primary]"
          >
            {project.category}
          </span>
          <h3
            className="font-[--font-display] text-[length:--text-xl] font-semibold tracking-[--tracking-tight] text-[--text-inverse] mt-[--space-2]"
            style={{ lineHeight: 'var(--leading-snug)' }}
          >
            {project.title}
          </h3>
          <p className="text-[--text-muted-inv] text-[length:--text-sm] mt-[--space-3] line-clamp-2">
            {project.summary}
          </p>
        </footer>
      </Link>
    </article>
  );
}
