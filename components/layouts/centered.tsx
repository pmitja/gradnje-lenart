import { cn } from '@/lib/utils';
import type { FC, PropsWithChildren } from 'react';

const CenteredLayout: FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => (
  <main
    className={cn(
      'container mx-auto flex w-full min-w-0 justify-center lg:mt-[85px] mt-[80px] gap-16 md:gap-20 lg:gap-36 flex-col bg-body-75',
      className
    )}>
    {children}
  </main>
);

export default CenteredLayout;
