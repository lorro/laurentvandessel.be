import { cva } from 'class-variance-authority';

export const skeletonVariants = cva('bg-secondary', {
  variants: {
    variant: {
      default: 'rounded-md',
      circular: 'rounded-full',
      text: 'rounded h-4',
    },
    animated: {
      true: 'animate-pulse',
    },
  },
  defaultVariants: {
    variant: 'default',
    animated: true,
  },
});

