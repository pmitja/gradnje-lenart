import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ImageType } from '@/types/general'
import { MoveUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type BlogTeaserProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  text: string
  image: ImageType
  link: string
  isHighlighted?: boolean
}

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
        'overflow-hidden rounded-xl bg-primary-75',
        className,
        isHighlighted && 'bg-body-400'
      )}
      {...props}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={750}
        height={isHighlighted ? 300 : 200}
        className={cn('max-h-[200px] min-w-full object-cover', isHighlighted && 'max-h-[300px]')}
      />
      <div className='flex flex-col gap-5 p-3'>
        <h3
          className={cn(
            'text-xl font-bold leading-6 text-secondary-300',
            isHighlighted && 'text-[28px] leading-8 text-secondary-400'
          )}
        >
          {title}
        </h3>
        <div className='flex flex-col gap-4'>
          <p
            className={cn(
              'text-base leading-5 text-secondary-300',
              isHighlighted && 'text-secondary-400'
            )}
          >
            {text}
          </p>
          <Link
            href={link}
            className='self-end'
          >
            <Button
              variant={'rounded'}
              size={'rounded'}
              className={cn(
                'h-6 w-6 bg-secondary-200 text-primary-75',
                isHighlighted && 'h-12 w-12 bg-primary-200 text-body-200'
              )}
            >
              <MoveUpRight
                className={cn('h-6 w-6 min-w-6', isHighlighted && 'h-12 w-12 min-w-8')}
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogTeaser
