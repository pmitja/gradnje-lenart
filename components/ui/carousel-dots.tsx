/* eslint-disable no-unused-vars */
import React from 'react'

import { Button } from './button'
import { useCarousel } from './carousel'

export const CarouselDots = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { api } = useCarousel()

    const [ updateState, setUpdateState ] = React.useState(false)

    const toggleUpdateState = React.useCallback(() => setUpdateState((prevState) => !prevState), [])

    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
      if (api) {
        api.on('select', toggleUpdateState)
        api.on('reInit', toggleUpdateState)

        return () => {
          api.off('select', toggleUpdateState)
          api.off('reInit', toggleUpdateState)
        }
      }
    }, [ api, toggleUpdateState ])

    const numberOfSlides = api?.scrollSnapList().length || 0

    const currentSlide = api?.selectedScrollSnap() || 0

    if (numberOfSlides > 1) {
      return (
        <div
          ref={ref}
          className={`flex justify-center ${props.className}`}
        >
          {Array.from({
            length: numberOfSlides,
          }, (_, i) => (
            <Button
              key={i}
              className={`mx-1 size-3 rounded-full p-0 ${
                i === currentSlide
                  ? 'scale-125 bg-primary-200 hover:bg-primary-200'
                  : 'bg-[#D9D9D9] hover:bg-gray-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      )
    }
    return <></>
  },
)

CarouselDots.displayName = 'CarouselDots'
