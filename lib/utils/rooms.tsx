import { BedIcon, Car, Home, PackageOpen, TableIcon, TvIcon } from 'lucide-react'

import DiningIcon from '@/components/icons/dining'
import KitchenIcon from '@/components/icons/kitchen'
import ShowerIcon from '@/components/icons/shower'
import WcIcon from '@/components/icons/wc'
import { SpacesType } from '@/types/general'

export const rooms = [
  {
    icon: <TableIcon className="size-2 md:size-4 lg:size-6" />,
    label: SpacesType.Room,
  },
  {
    icon: <ShowerIcon className="size-2 md:size-4 lg:size-6" />,
    label: SpacesType.Bathroom,
  },
  {
    icon: <WcIcon className="size-2 md:size-4 lg:size-6" />,
    label: SpacesType.WC,
  },
  {
    icon: <BedIcon className="size-2 md:size-4 lg:size-6" />,
    label: SpacesType.Bedroom,
  },
  {
    icon: <KitchenIcon className="size-2 md:size-4 lg:size-6" />,
    label: SpacesType.Kitchen,
  },
  {
    icon: <DiningIcon className="size-2 md:size-4 lg:size-6" />,
    label: SpacesType.DinningRoom,
  },
  {
    icon: <TvIcon className="size-2 md:size-4 lg:size-6" />,
    label: SpacesType.LivingRoom,
  },
  {
    icon: <Home className="size-2 md:size-4 lg:size-6" />,
    label: SpacesType.Balcony,
  },
  {
    icon: <Home className="size-2 md:size-4 lg:size-6" />,
    label: SpacesType.Terrace,
  },
  {
    icon: <PackageOpen className="size-2 md:size-4 lg:size-6" />,
    label: SpacesType.Storage,
  },
  {
    icon: <Car className="size-2 md:size-4 lg:size-6" />,
    label: SpacesType.Parking,
  },
]
