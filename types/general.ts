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

export type Apartment = {
  'stevilka-stanovanja': string;
  naziv: string;
  etaza: string;
  kvadratura: string;
  'cena-brez-ddv': string;
  cena: string;
  status: StatusType;
};