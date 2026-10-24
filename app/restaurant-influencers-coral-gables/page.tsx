import HouseCreatorsLanding, { houseMetadata } from '../components/HouseCreatorsLanding';
import { HOUSE_CITIES } from '@/lib/houseCreators';

const city = HOUSE_CITIES.find((c) => c.slug === 'coral-gables')!;

export const metadata = houseMetadata(city);

export default function Page() {
  return <HouseCreatorsLanding city={city} />;
}
