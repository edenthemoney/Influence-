import type { EventListing } from './types';
import influenceConnectDec16 from './influence-connect-dec16';

export type { EventListing };

// Add each new event file here.
export const EVENTS: EventListing[] = [influenceConnectDec16].sort(
  (a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt),
);
