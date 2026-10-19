import type { EventListing } from './types';
import { INFLUENCE_CONNECT as E } from '@/lib/nov18/influence-connect';

const event: EventListing = {
  slug: E.slug,
  name: E.name,
  tagline: E.tagline,
  dateLong: E.dateLong,
  time: E.time,
  venue: E.venue,
  location: `${E.area}, ${E.cityLine}`,
  host: E.host,
  startsAt: E.startsAt,
  href: '/nov18',
  image: '/nov18-assets/patio-hero.webp',
  imageAlt: 'Serena Pastificio patio under string lights',
  priceNote: 'Ladies free RSVP · Gentlemen $25',
  ctaLabel: 'Get tickets',
};
export default event;
