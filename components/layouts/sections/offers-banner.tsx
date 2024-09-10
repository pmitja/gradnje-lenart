import ButtonWithIcon from '@/components/common/button-with-icon'
import ImageGallery from '@/components/common/image-gallery'

export interface OfferInfo {
  title: string
  description: string
  linkLabel?: string
  linkHref: string
}

interface OffersBannerProps {
  title: string
  description: string
  buttonLabel?: string
  images: string[]
  offerInfo: OfferInfo
}

const OffersBanner = ({
  title,
  description,
  buttonLabel,
  images,
  offerInfo,
}: OffersBannerProps) => (
    <section className='mb-16 flex flex-col gap-8'>
      <div className='flex w-full flex-row justify-between'>
        <h3 className='text-4xl font-bold text-secondary-400'>{title}</h3>
        <ButtonWithIcon
          variant={'secondary'}
          className='w-fit'
        >
          {buttonLabel || 'Več o nepremičnini'}
        </ButtonWithIcon>
      </div>
      <div className='max-w-lg'>
        <p className='text-secondary-100'>{description}</p>
      </div>
      <ImageGallery
        images={images}
        offerInfo={offerInfo}
      />
    </section>
)

export default OffersBanner
