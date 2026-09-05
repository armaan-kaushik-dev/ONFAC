import { IMAGES } from '@/data/images';

export const SITE = {
  name: 'ONFACMEN',
  tagline: 'Where You Can Find Affordable Stuff & Trendy Articles ⚡️',
  city: 'Kharar, Punjab',
  address:
    '3, Jandpur Rd, opposite Jalvayu Tower, Sector 125, Sunny Enclave, Kharar, Sahibzada Ajit Singh Nagar, Punjab 140301',
  addressShort: '3, Jandpur Rd, Sector 125, Sunny Enclave',
  phoneDisplay: '093998 22397',
  phoneE164: '919399822397',
  hours: 'Open daily · 11:00 AM — 10:00 PM',
  instagram: 'https://instagram.com/',
  mapsQuery:
    'ONFACMEN, 3, Jandpur Rd, opposite Jalvayu Tower, Sector 125, Sunny Enclave, Kharar, Punjab 140301',
} as const;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  SITE.mapsQuery,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  SITE.mapsQuery,
)}&output=embed`;

export const whatsappUrl = `https://wa.me/${SITE.phoneE164}?text=${encodeURIComponent(
  "Hi ONFACMEN! I saw your site — what's in the latest drop?",
)}`;

export type Product = {
  name: string;
  price: number;
  was?: number;
  tag: string;
  img: (typeof IMAGES)[keyof typeof IMAGES];
};

export const PRODUCTS: Product[] = [
  { name: 'Faded Black Hoodie', price: 799, was: 2499, tag: 'Oversized', img: IMAGES.hoodie },
  { name: 'Vintage Denim Jacket', price: 1199, was: 3999, tag: 'Unisex', img: IMAGES.denim },
  { name: 'Retro Graphic Tee', price: 449, was: 1299, tag: 'Single piece', img: IMAGES.tee },
  { name: 'Leather Biker Jacket', price: 1899, was: 6499, tag: 'Rare find', img: IMAGES.leather },
  { name: 'Utility Cargo Pants', price: 899, was: 2799, tag: 'Baggy fit', img: IMAGES.cargo },
  { name: 'Court Sneakers', price: 1499, was: 4999, tag: 'Deadstock', img: IMAGES.kicks },
  { name: 'Checked Flannel Shirt', price: 599, was: 1799, tag: 'Y2K', img: IMAGES.flannel },
  { name: 'Straight-Fit Jeans', price: 749, was: 2299, tag: 'Unisex', img: IMAGES.jeans },
];

export const VALUES = [
  {
    n: '01',
    title: 'Affordable Prices',
    body: 'Fits under ₹1000 that look like they cost five times more. No markup on hype — just honest thrift pricing.',
    icon: 'tag',
  },
  {
    n: '02',
    title: 'Trendy Drops',
    body: 'New racks land every week. Follow the drop, because once a piece walks out, it is gone for good.',
    icon: 'bolt',
  },
  {
    n: '03',
    title: 'Unisex Friendly',
    body: 'No aisles, no labels, no rules. Everything on the floor is styled for whoever it fits best.',
    icon: 'users',
  },
  {
    n: '04',
    title: 'Local Kharar Store',
    body: 'Walk in, try it on, take it home the same day. Right opposite Jalvayu Tower in Sunny Enclave.',
    icon: 'pin',
  },
] as const;

export const LIFESTYLE = [
  IMAGES.life1, IMAGES.life2, IMAGES.life3, IMAGES.life4,
  IMAGES.life5, IMAGES.life6, IMAGES.life7, IMAGES.life8,
];
