import { cn } from "@/lib/utils";

interface SectionWithTitleInMiddleProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  children: React.ReactNode;
}

const SectionWithTitleOnLeft = ({ title, children, className, ...props }: SectionWithTitleInMiddleProps) => {
  return ( 
    <section className={cn('flex flex-col w-full gap-16 lg:gap-20', className)} {...props}>
      <h2 className="text-4xl leading-[120%] md:leading-[57px] font-bold md:text-[51px] lg:leading-[76.5px] text-secondary-200 self-center">{title}</h2>
      <div>{children}</div>
    </section>
   );
}
 
export default SectionWithTitleOnLeft;