import React, { FC, PropsWithChildren } from 'react'

import BrickWallIcon from '@/components/icons/brick-wall'
import CarIcon from '@/components/icons/car'
import EnergySavingIcon from '@/components/icons/energy-saving'
import MainBuildingIcon from '@/components/icons/main-building'
import MarkHouseIcon from '@/components/icons/mark-house'
import ShieldIcon from '@/components/icons/shield'
import { cn } from '@/lib/utils'
import { Icons } from '@/types/icons'

const icons = {
  car: CarIcon,
  shield: ShieldIcon,
  markHouse: MarkHouseIcon,
  mainBuilding: MainBuildingIcon,
  energySaving: EnergySavingIcon,
  brickWall: BrickWallIcon,
} satisfies Record<Icons, FC>

type CardWithIconProps<L = Icons> = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    icon: L
    iconSize?: string
    title: string
    text: string
  }
>

const CardWithIcon: FC<CardWithIconProps<Icons>> = ({
  icon,
  iconSize,
  title,
  text,
  className,
  ...props
}) => {
  const IconComponent = icons[icon] ?? CarIcon

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <IconComponent
        width={iconSize}
        height={iconSize}
        className='text-primary-300'
      />
      <h3 className=' text-lg font-bold leading-tight text-primary-300 sm:text-lg sm:leading-tight md:text-xl md:leading-tight lg:text-2xl lg:leading-tight'>
        {title}
      </h3>
      <p className='font-archivo text-sm leading-normal text-secondary-200 sm:text-base sm:leading-relaxed md:text-lg'>{text}</p>
    </div>
  )
}

export default CardWithIcon
