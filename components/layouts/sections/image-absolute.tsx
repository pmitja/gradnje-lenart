import ButtonWithIcon from '@/components/common/button-with-icon';
import { cn } from '@/lib/utils';
import { HomeIcon } from 'lucide-react';
import Image from 'next/image';

interface SectionWithImageAbsoluteProps
  extends React.HTMLAttributes<HTMLElement> {
  title: string;
  image: {
    src: string;
    alt: string;
  };
  text: string;
}

const SectionWithImageAbsolute = ({
  title,
  text,
  image,
  className,
  ...props
}: SectionWithImageAbsoluteProps) => {
  return (
    <section className={cn('relative flex flex-col-reverse gap-5', className)} {...props}>
      <Image
        src={image.src}
        alt={image.alt}
        width={1440}
        height={550}
        className="rounded-2xl max-h-[250px] md:max-h-[550px] lg:max-h-[630px] object-cover relative"
      />
      <div className="flex flex-col gap-6 bg-body-75 md:absolute top-0 left-0 md:max-w-[60%] rounded-2xl rounded-bl-none rounded-tr-none md:pr-2 md:pb-2 lg:pr-6 lg:pb-[50px]">
        <h2 className="text-4xl leading-[120%] md:leading-[57px] font-bold md:text-[51px] lg:leading-[76.5px] text-secondary-200 self-center">
          {title}
        </h2>
        <p className="text-xl leading-6 text-secondary-200">{text}</p>
        <ButtonWithIcon variant={'secondary'} className="w-fit">
          Vstopite v stik
        </ButtonWithIcon>
      </div>
      <div className='absolute w-full flex justify-center flex-row bg-body-75 bottom-0 md:right-0 md:flex gap-4 items-center grow-0 md:p-2 lg:p-3 rounded-tl-2xl md:max-w-[330px] rounded-tr-2xl md:rounded-tr-none'>
        <HomeIcon size={64} className='max-h-8 max-w-8 md:min-h-12 md:min-w-12 lg:min-h-16 lg:min-w-16' />
        <p className="font-archivo text-xl leading-6 text-secondary-200 italic break-words">
          Več kot 1000 nepremični zgrajenih in prodanih
        </p>
      </div>
    </section>
  );
};

export default SectionWithImageAbsolute;
