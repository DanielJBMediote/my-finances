import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      title: 'text-3xl font-bold',
      subtitle: 'text-2xl font-semibold',
      paragraph: 'text-base',
      label: 'text-sm font-light',
    },
  },
  defaultVariants: {
    variant: 'paragraph',
  },
})

interface TextProps
  extends React.ComponentProps<'p'>,
    VariantProps<typeof textVariants> {
  asChild?: boolean
}

function Text({ className, variant, asChild = false, ...props }: TextProps) {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp className={cn(textVariants({ variant, className }))} {...props} />
  )
}

export { Text, textVariants }
