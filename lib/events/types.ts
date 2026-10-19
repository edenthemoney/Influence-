// One file per event in lib/events/. To add an event: copy an existing file,
// edit the fields, then add it to the list in lib/events/index.ts.
export type EventListing = {
  slug: string;
  name: string;
  tagline: string;
  dateLong: string;
  time: string;
  venue: string;
  location: string;
  host?: string;
  // ISO time the event starts. Used to sort and to split upcoming vs past.
  startsAt: string;
  // Page with full details and tickets.
  href: string;
  image: string;
  imageAlt: string;
  priceNote: string;
  ctaLabel: string;
};
