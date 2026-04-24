import { cn } from '@/lib/utils';

interface AccentDotProps {
  className?: string;
  style?: React.CSSProperties;
}

export function AccentDot({ className, style }: AccentDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block w-2 h-2 rounded-full bg-[--primary] align-middle', className)}
      style={style}
    />
  );
}
