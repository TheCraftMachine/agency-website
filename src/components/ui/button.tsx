import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-3 font-[--font-body] text-[length:--text-sm] font-bold uppercase tracking-[0.08em] cursor-pointer transition-colors duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--primary] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary:   'bg-[--primary] text-white rounded-[--radius-sm] hover:bg-[--primary-hover] active:bg-[--primary-active]',
        ghost:     'bg-transparent text-[--text-primary] border border-[--border-strong] rounded-[--radius-pill] hover:border-[--primary] hover:text-[--primary]',
        'ghost-inv': 'bg-transparent text-[--text-inverse] border border-[--border-dark-strong] rounded-[--radius-pill] hover:border-[--primary-light] hover:text-[--primary-light]',
      },
      size: {
        default: 'px-[--space-6] py-[--space-4]',
        sm:      'px-[--space-4] py-[--space-3] text-[length:--text-xs]',
        icon:    'w-10 h-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size:    'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };
