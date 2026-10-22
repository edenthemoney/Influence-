// Roster shown big on the preview homepages and in the booking talent step. Real photos, no stats.
const F = '/images/feed';

export type RosterPerson = { id: string; name: string; role: string; image: string; thumb: string };

export const previewRoster: RosterPerson[] = [
  { id: 'des-001', name: 'Deseray Marie', role: 'Host', image: `${F}/des-skyline-lg.webp`, thumb: `${F}/des-skyline.webp` },
  { id: 'genesis-003', name: 'Genesis Bravo', role: 'Brand Ambassador', image: `${F}/genesis-lg.webp`, thumb: `${F}/genesis.webp` },
  { id: 'seahra-026', name: 'Seahra Raquel', role: 'Fashion', image: `${F}/seahra-gold-lg.webp`, thumb: `${F}/seahra-gold.webp` },
  { id: 'kat-051', name: 'Kat', role: 'Brand Ambassador', image: `${F}/kat-lg.webp`, thumb: `${F}/kat.webp` },
  { id: 'ferrari-004', name: 'Ferrari', role: 'Lifestyle', image: `${F}/ferrari-lg.webp`, thumb: `${F}/ferrari.webp` },
  { id: 'alisha-023', name: 'Alisha', role: 'Brand Ambassador', image: `${F}/alisha-lg.webp`, thumb: `${F}/alisha.webp` },
  { id: 'leila-009', name: 'Leila', role: 'Lifestyle', image: `${F}/leila-lg.webp`, thumb: `${F}/leila.webp` },
  { id: 'bianca-055', name: 'Bianca Bonnie', role: 'TV & on-camera', image: `${F}/bianca-lg.webp`, thumb: `${F}/bianca.webp` },
  { id: 'celeste-024', name: 'Celeste Gomez', role: 'Creator', image: `${F}/celeste-lg.webp`, thumb: `${F}/celeste.webp` },
  { id: 'maria-002', name: 'Maria', role: 'Lifestyle', image: `${F}/maria-lg.webp`, thumb: `${F}/maria.webp` },
];
