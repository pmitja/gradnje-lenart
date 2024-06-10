import { cn } from '@/lib/utils';
import Image from 'next/image';
import ButtonWithIcon from '../common/button-with-icon';

interface ImageLeftTextRightProps extends React.HTMLAttributes<HTMLElement> {
  image: {
    src: string;
    alt: string;
  };
  mobileImage?: {
    src: string;
    alt: string;
  };
  heading: string;
  text: string;
}

const ImageLeftTextRight = ({
  image,
  mobileImage,
  heading,
  text,
  className,
}: ImageLeftTextRightProps) => {
  return (
    <section
      className={cn(
        'grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center',
        className
      )}>
        <div className='flex items-center w-full justify-center'>
        <Image src={image.src} alt={image.alt} width={670} height={350} className='hidden md:block' />
        {mobileImage && <Image
          src={mobileImage.src}
          alt={mobileImage.alt}
          width={215}
          height={265}
          className="md:hidden"
        />}
        </div>
      <div className="flex flex-col gap-6 md:gap-5 row-start-1 lg:row-start-auto">
        <h3 className="text-4xl leading-[57px] font-bold text-secondary-400">
          {heading}
        </h3>
        <p className="text-xl leading-6">{text}</p>
        <ButtonWithIcon
          variant="primary"
          className="text-xl px-6 py-4 w-fit lg:mt-10 self-center md:self-start">
          Akutalni projekti
        </ButtonWithIcon>
      </div>
    </section>
  );
};

export default ImageLeftTextRight;
