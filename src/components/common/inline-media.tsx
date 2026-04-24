import Image from 'next/image';
import { cn } from '@/lib/utils';

interface InlineMediaProps {
  src: string;
  alt?: string;
  className?: string;
}

export function InlineMedia({ src, alt = '', className }: InlineMediaProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block overflow-hidden rounded-[--radius-md] align-middle',
        className
      )}
      style={{
        width:           'clamp(80px, 11vw, 156px)',
        height:          'clamp(48px, 6.5vw, 96px)',
        marginInline:    '0.15em',
        transform:       'translateY(-0.08em)',
        verticalAlign:   'middle',
        position:        'relative',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 80px, 156px"
        className="object-cover"
      />
    </span>
  );
}
