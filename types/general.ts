export type NavbarProps = {
  navItems: NavbarItem[];
};

export type NavbarItem = {
  text: string;
  link: string;
};

export type ImageType = {
  src: string;
  alt: string;
};

export enum StatusType {
  Prodaja = 'Na prodaj',
  Rezervirano = 'Rezervirano',
  Prodano = 'Prodano',
}

export interface RealEstate {
  id?: string;
  name: string;
  description?: string | null;
  number: string | null;
  floor: string | null;
  size: number | null;
  priceWithTax: number | null;
  price: number | null;
  status?: string | null;
  images?: string[] | undefined;
  locationId?: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
  statusType?: StatusType;
}

export interface Location {
  id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  slug: string;
  realEstates: RealEstate[];
  createdAt: Date;
  updatedAt: Date;
}

export type Apartment = {
  number: string;
  name: string;
  floor: string;
  size: number;
  price: number;
  priceWithTax: number;
  status: StatusType;
  images?: string[];
};
