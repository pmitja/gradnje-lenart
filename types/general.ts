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
  size: string | null;
  priceWithTax: string | null;
  price: string | null;
  status: string | null;
  images: string[] | undefined;
  locationId: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
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