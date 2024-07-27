import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const strengthIndicatorVariant = cva(
  'bg-primary/30 relative h-2 w-full rounded-full before:bg-primary before:absolute before:left-0 before:top-0 before:h-full before:content-normal before:rounded-full before:transition-all',
  {
    variants: {
      strength: {
        default: 'before:w-0',
        'very-weak': 'before:w-[5%]',
        weak: 'before:w-[20%]',
        medium: 'before:w-[45%]',
        strong: 'before:w-[75%]',
        'very-strong': 'before:w-full',
      },
    },
    defaultVariants: {
      strength: 'default',
    },
  },
);

export interface StrengthIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof strengthIndicatorVariant> {}

const StrengthIndicator = React.forwardRef<
  HTMLDivElement,
  StrengthIndicatorProps
>(({ className, strength, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(strengthIndicatorVariant({ strength }), className)}
    {...props}
  />
));

StrengthIndicator.displayName = 'StrengthIndicator';

export { StrengthIndicator };
