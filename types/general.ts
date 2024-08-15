export type NavbarProps = {
  navItems: NavbarItem[]
}

export type NavbarItem = {
  text: string
  link: string
}

export type ImageType = {
  src: string
  alt: string
}

export enum StatusType {
  Prodaja = 'Na prodaj',
  Rezervirano = 'Rezervirano',
  Prodano = 'Prodano'
}

export enum LocationType {
  House = 'Hiša',
  Apartments = 'Več stanovanjski objekt'
}

export enum SpacesType {
  Kitchen = 'Kuhinja',
  Bathroom = 'Kopalnica',
  WC = 'WC',
  DinningRoom = 'Jedilnica',
  LivingRoom = 'Dnevna soba',
  Bedroom = 'Spalnica',
  Balcony = 'Balkon',
  Terrace = 'Terasa',
  Storage = 'Shramba',
  Room = 'Soba',
  Parking = 'Parkirišče'
}

export enum EnergyClass {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G'
}

export interface RealEstate {
  id?: string
  name: string
  description?: string | null
  number: string | null
  floor: string | null
  size: number | null
  priceWithTax: number | null
  price: number | null
  status?: string | null
  images?: string[] | undefined
  locationId?: string
  slug?: string
  createdAt?: Date
  updatedAt?: Date
  statusType?: StatusType
}

export interface Location {
  id: string
  name: string
  description: string | null
  address: string
  city: string
  slug: string
  realEstates: RealEstate[]
  createdAt: Date
  updatedAt: Date
}

export type Apartment = {
  number: string
  name: string
  floor: string
  size: number
  price: number
  priceWithTax: number
  status: StatusType
  images?: string[]
  description: string
  shortDescription: string
  spaces?: string[]
  energyLevel?: string
  parkingSpaces?: number
  technicalData?: {
    id: string
    text: string
  }[]
  files?: string[]
}
