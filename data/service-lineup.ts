export type ServiceItem = {
  title: string;
  line: string;
  href: string;
};

export type ServiceGroup = {
  id: string;
  label: string;
  line: string;
  image: string;
  imagePosition?: string;
  items: ServiceItem[];
};

/** Every current service plus the venue, campaign, and networking offers. One lineup, two pages. */
export const serviceLineup: ServiceGroup[] = [
  {
    id: 'venues',
    label: 'For Venues & Brands',
    line: 'Ambassadors and creators for venues, brands, and launches.',
    image: '/images/Des/des-21.jpg',
    imagePosition: 'center 20%',
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
    line: 'Models, shoots, commercials, casting, and voiceover.',
    image: '/images/GenesisBravo/genesis-1.jpg',
    imagePosition: 'center 18%',
    items: [
      {
        title: 'Model booking',
        line: 'Book a model for the job and the date.',
        href: '/model-booking',
      },
      {
        title: 'Photo & brand shoots',
        line: 'Editorials, lookbooks, e-commerce, brand shoots, and on-set creators.',
        href: '/services/shoots',
      },
      {
        title: 'Commercials',
        line: 'Speaking roles for TV spots, web ads, and brand films.',
        href: '/services/commercials',
      },
      {
        title: 'Actress creators',
        line: 'Actresses and models for film, television, commercials, and on-camera roles.',
        href: '/actress-creators-miami',
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
    line: 'Reels, remote posts, stories, and collabs you can publish.',
    image: '/images/Seahra/seahra-2.jpg',
    imagePosition: 'center 42%',
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
    line: 'Music video talent and promotion for a release.',
    image: '/images/Ferrari/ferrari-2.jpg',
    imagePosition: 'center 10%',
    items: [
      {
        title: 'Music video talent',
        line: 'On-camera talent for a music video, from a featured role to a full cast.',
        href: '/music-video-creators',
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
    line: 'Hosts, VIP bottle service, and creator meetups.',
    image: '/images/Kat/kat-6.jpg',
    imagePosition: 'center 35%',
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
