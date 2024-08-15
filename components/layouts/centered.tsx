import { cn } from '@/lib/utils'
import type { FC, PropsWithChildren } from 'react'

const CenteredLayout: FC<PropsWithChildren & { className?: string }> = ({
  children,
  className
}) => (
  <main
    className={cn(
      'container mx-auto mt-[80px] flex w-full min-w-0 flex-col justify-center gap-16 bg-body-75 md:gap-20 lg:mt-[85px] lg:gap-36',
      className
    )}
  >
    {children}
  </main>
)

export default CenteredLayout
