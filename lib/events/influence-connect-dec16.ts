import type { EventListing } from './types';
import { INFLUENCE_CONNECT as E } from '@/lib/dec16/influence-connect';

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
  href: '/dec16',
  image: '/dec16-assets/patio-hero.webp',
  imageAlt: 'Serena Pastificio patio under string lights',
  priceNote: 'Business Owner Entry $75 · Ladies free RSVP',
  ctaLabel: 'Get tickets',
};
export default event;
