import type { EventListing } from './types';
import influenceConnectNov18 from './influence-connect-nov18';

export type { EventListing };

// Add each new event file here.
export const EVENTS: EventListing[] = [influenceConnectNov18].sort(
  (a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt),
);
