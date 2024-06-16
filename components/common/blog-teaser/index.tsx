import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ImageType } from '@/types/general';
import { MoveUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type BlogTeaserProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  text: string;
  image: ImageType;
  link: string;
  isHighlighted?: boolean;
};

const BlogTeaser = ({
  title,
  text,
  image,
  link,
  isHighlighted,
  className,
  ...props
}: BlogTeaserProps) => {
  return (
    <div
      className={cn(
        'rounded-xl bg-primary-75 overflow-hidden',
        className,
        isHighlighted && 'bg-body-400'
      )}
      {...props}>
      <Image
        src={image.src}
        alt={image.alt}
        width={750}
        height={isHighlighted ? 300 : 200}
        className={cn(
          'min-w-full max-h-[200px] object-cover',
          isHighlighted && 'max-h-[300px]'
        )}
      />
      <div className="flex flex-col gap-5 p-3">
        <h3
          className={cn(
            'text-xl leading-6 text-secondary-300 font-bold',
            isHighlighted && 'text-secondary-400 text-[28px] leading-8'
          )}>
          {title}
        </h3>
        <div className="flex flex-col gap-4">
          <p
            className={cn(
              'text-base text-secondary-300 leading-5',
              isHighlighted && 'text-secondary-400'
            )}>
            {text}
          </p>
          <Link href={link} className="self-end">
            <Button
              variant={'rounded'}
              size={'rounded'}
              className={cn("text-primary-75 w-6 h-6 bg-secondary-200", isHighlighted && 'w-12 h-12 text-body-200 bg-primary-200')}>
              <MoveUpRight
                className={cn('w-6 h-6 min-w-6', isHighlighted && 'h-12 w-12 min-w-8')}
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogTeaser;
