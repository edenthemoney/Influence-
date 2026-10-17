export type VenueId = 'prime-time' | 'dessertz' | 'oia';

export type SkitClip = {
  id: string;
  src: string;
  poster: string;
  venueId: VenueId;
  venue: string;
  place: string;
  caption: string;
};

export const CLIPS: SkitClip[] = [
  {
    id: 'prime-time-01',
    src: '/skits/prime-time-01.mp4',
    poster: '/skits/prime-time-01.jpg',
    venueId: 'prime-time',
    venue: 'Prime Time',
    place: 'Prime Time',
    caption: 'A night-out skit inside Prime Time.',
  },
  {
    id: 'dessertz-01',
    src: '/skits/dessertz-01.mp4',
    poster: '/skits/dessertz-01.jpg',
    venueId: 'dessertz',
    venue: 'DessertZ Food Truck',
    place: 'DessertZ Food Truck',
    caption: 'At the window of the DessertZ Food Truck.',
  },
  {
    id: 'dessertz-02',
    src: '/skits/dessertz-02.mp4',
    poster: '/skits/dessertz-02.jpg',
    venueId: 'dessertz',
    venue: 'DessertZ Food Truck',
    place: 'DessertZ Food Truck',
    caption: 'Ordering at the DessertZ Food Truck.',
  },
  {
    id: 'prime-time-02',
    src: '/skits/prime-time-02.mp4',
    poster: '/skits/prime-time-02.jpg',
    venueId: 'prime-time',
    venue: 'Prime Time',
    place: 'Prime Time',
    caption: 'Back inside Prime Time.',
  },
  {
    id: 'oia',
    src: '/skits/oia-fort-lauderdale.mp4',
    poster: '/skits/oia-fort-lauderdale.jpg',
    venueId: 'oia',
    venue: 'Oia',
    place: 'Oia · Fort Lauderdale',
    caption: 'A table skit at Oia, a Greek restaurant in Fort Lauderdale.',
  },
];

export const VENUES: {
  id: VenueId;
  name: string;
  detail: string;
  summary: string;
  poster: string;
  clips: number[];
}[] = [
  {
    id: 'prime-time',
    name: 'Prime Time',
    detail: 'Two skits in the room',
    summary: 'Night-out scenes under the red light. The booth, the bottle, the dress the room already understands.',
    poster: '/skits/prime-time-01.jpg',
    clips: [0, 3],
  },
  {
    id: 'dessertz',
    name: 'DessertZ Food Truck',
    detail: 'Two skits at the window',
    summary: 'The menu, the order, the bit. Shot at the service window, the way a guest actually stands there.',
    poster: '/skits/dessertz-02.jpg',
    clips: [1, 2],
  },
  {
    id: 'oia',
    name: 'Oia',
    detail: 'Greek restaurant · Fort Lauderdale',
    summary: 'A table skit. Water, the room, then the Greek salad. The meal is the scene.',
    poster: '/skits/oia-fort-lauderdale.jpg',
    clips: [4],
  },
];

export const ROOMS: {
  id: string;
  name: string;
  lede: string;
  clip: number | null;
  screen: string;
  concepts: { title: string; text: string }[];
}[] = [
  {
    id: 'restaurants',
    name: 'Restaurants',
    lede: 'The table is the set. The dish is the turn.',
    clip: 4,
    screen: 'On screen: Oia, a Greek restaurant in Fort Lauderdale.',
    concepts: [
      { title: 'The order', text: 'She tells the camera what to skip, then the plate arrives and ends the argument.' },
      { title: 'Table for one', text: 'A reservation played straight. The room, the pour, the first bite, one line to the people watching.' },
      { title: 'Already a regular', text: 'Shot like the staff know her. The guest on the other side of the phone wants that table.' },
    ],
  },
  {
    id: 'nightclubs',
    name: 'Nightclubs',
    lede: 'The door, the booth, the song. A night with a point of view.',
    clip: 0,
    screen: 'On screen: Prime Time. A night-out skit under the red light.',
    concepts: [
      { title: 'The door', text: 'Arrival and the look back. The room opens. It does not look like a flyer.' },
      { title: 'The booth', text: 'Bottle service as a scene. The night is the thing being sold, and she is already in it.' },
      { title: 'One song', text: 'She stays for the drop. The clip ends when the room does.' },
    ],
  },
  {
    id: 'hotels',
    name: 'Hotels',
    lede: 'A stay filmed as a night, from the desk to the reservation downstairs.',
    clip: null,
    screen: 'No hotel footage yet. The card is the pitch, not a stand-in clip.',
    concepts: [
      { title: 'Check-in', text: 'The lobby, the key, the line she says before the elevator doors close.' },
      { title: 'The mirror', text: 'Dressed for dinner, caught in the elevator or the suite. The hotel is the wardrobe.' },
      { title: 'Room service', text: 'The tray, the robe, the city in the glass. Amenities never get a tour. They get a scene.' },
    ],
  },
  {
    id: 'resorts',
    name: 'Resorts',
    lede: 'Daytime opens. Dinner is why they came.',
    clip: null,
    screen: 'No resort footage yet. The card is the pitch, not a stand-in clip.',
    concepts: [
      { title: 'The walk down', text: 'From the room to the water in one feeling. No list of features. Just the path.' },
      { title: 'Golden hour', text: 'Pool or terrace. A single aside to camera while the light is doing the selling.' },
      { title: 'The second act', text: 'The day is the opening. The reservation at dusk is the plot.' },
    ],
  },
  {
    id: 'lounges',
    name: 'Lounges',
    lede: 'Low light, one seat, a story told at the volume of the room.',
    clip: null,
    screen: 'No lounge footage yet. The card is the pitch, not a stand-in clip.',
    concepts: [
      { title: 'One cocktail', text: 'The corner, the glass, a story that fits the lighting. Quiet rooms can photograph loud.' },
      { title: 'The dress code', text: 'She treats the seating and the light as the set. The lounge looks like a place with rules.' },
      { title: 'Stay for one', text: 'Said at the start. The clip knows she will still be there.' },
    ],
  },
];

export const STEPS = [
  {
    n: '01',
    title: 'Tell us your venue and niche',
    text: 'The room, the guest, and the night you want on camera. A dining room, a door policy, a pool, a lobby.',
  },
  {
    n: '02',
    title: 'We match influencers',
    text: 'From the network, for that niche. The person who can hold a booth is not the person who holds a tasting menu.',
  },
  {
    n: '03',
    title: 'They create',
    text: 'On site. A skit with a point of view, shot the way people actually watch — vertical, in the room, in the moment.',
  },
  {
    n: '04',
    title: 'You get content and reach',
    text: 'The files to post, and the audience that came with the person who filmed them.',
  },
];
