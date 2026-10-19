export type ServiceItem = {
  title: string;
  line: string;
  href: string;
};

export type ServiceGroup = {
  id: string;
  label: string;
  items: ServiceItem[];
};

/** Every current service plus the venue, campaign, and networking offers. One lineup, two pages. */
export const serviceLineup: ServiceGroup[] = [
  {
    id: 'venues',
    label: 'For Venues & Brands',
    items: [
      {
        title: 'Brand Ambassadors',
        line: 'On-site ambassadors for venues, restaurants, nightclubs, hotels, and stores.',
        href: '/services/business',
      },
      {
        title: 'Influencer campaigns',
        line: 'Several creators booked around one launch.',
        href: '/influencer-campaigns',
      },
      {
        title: 'Venue activations',
        line: 'Creators at a restaurant, nightclub, hotel, or brand event.',
        href: '/services/events',
      },
      {
        title: 'Fashion brands',
        line: 'Creators for clothing drops, lookbooks, and product seeding.',
        href: '/for-fashion-brands',
      },
      {
        title: 'Label campaigns',
        line: 'A coordinated creator rollout for a label or release.',
        href: '/label-campaigns',
      },
    ],
  },
  {
    id: 'talent',
    label: 'Talent & Production',
    items: [
      {
        title: 'Model booking',
        line: 'Book a model for the job and the date.',
        href: '/model-booking',
      },
      {
        title: 'Photo and brand shoots',
        line: 'Editorials, lookbooks, e-commerce, and brand shoots.',
        href: '/services/shoots',
      },
      {
        title: 'Creators for a photoshoot',
        line: 'Hire creators to be on set for a photoshoot.',
        href: '/creators-for-photoshoot',
      },
      {
        title: 'Shoot bookings',
        line: 'Book creators by headcount for a photo or brand shoot.',
        href: '/creators-for-shoots',
      },
      {
        title: 'Commercials',
        line: 'Speaking roles for TV spots, web ads, and brand films.',
        href: '/services/commercials',
      },
      {
        title: 'Actress creators',
        line: 'Actresses for film, television, commercials, and campaigns.',
        href: '/actress-creators-miami',
      },
      {
        title: 'Actress models',
        line: 'Models for acting jobs and on-camera roles.',
        href: '/actress-models-miami',
      },
      {
        title: 'Casting',
        line: 'Casting for a production, commercial, or campaign.',
        href: '/casting-network-miami',
      },
      {
        title: 'Voiceover',
        line: 'Voiceover, commercial reads, and audiobooks.',
        href: '/voiceover-creators-miami',
      },
    ],
  },
  {
    id: 'content',
    label: 'Content & Social',
    items: [
      {
        title: 'UGC and content',
        line: 'Reels, photos, and posts filmed and delivered for you to publish.',
        href: '/services/content',
      },
      {
        title: 'Remote content',
        line: 'Creators film off site and send the files.',
        href: '/ugc-content',
      },
      {
        title: 'Story reposts',
        line: 'Creators share your post on their Instagram Stories.',
        href: '/start?service=storyreposts',
      },
      {
        title: 'Collab posts',
        line: 'A post that can run on your feed and theirs.',
        href: '/start?service=collabreposts',
      },
      {
        title: 'Instagram creators',
        line: 'Creators who post for a brand on Instagram.',
        href: '/instagram-creators-for-hire',
      },
    ],
  },
  {
    id: 'music',
    label: 'Music & Entertainment',
    items: [
      {
        title: 'Music video creators',
        line: 'On-camera creators for a music video.',
        href: '/music-video-creators',
      },
      {
        title: 'Music video models',
        line: 'Models booked onto a music video shoot.',
        href: '/music-video-models',
      },
      {
        title: 'Music video booking',
        line: 'Tell us the headcount and the shoot date.',
        href: '/music-video-booking',
      },
      {
        title: 'Song and music promotion',
        line: 'Creators react to your song or post it on TikTok and Instagram.',
        href: '/start?service=reaction',
      },
    ],
  },
  {
    id: 'events',
    label: 'Events',
    items: [
      {
        title: 'Event staffing',
        line: 'Creators who work a party, club night, or activation.',
        href: '/event-creators',
      },
      {
        title: 'VIP hosts and bottle service',
        line: 'Hosts for bottle service, VIP tables, and lounges.',
        href: '/start?service=bottle',
      },
      {
        title: 'Creator networking events',
        line: 'Meet the roster in person.',
        href: '/tickets',
      },
    ],
  },
];
