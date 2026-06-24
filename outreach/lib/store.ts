import fs from 'fs';
import path from 'path';

export interface Lead {
  id: string;
  name: string;
  type: 'artist' | 'manager' | 'label' | 'business';
  email: string;
  phone?: string;
  instagram?: string;
  spotify?: string;
  website?: string;
  followers?: number;
  genre?: string;
  // Business-specific (Google Places)
  niche?: string;
  city?: string;
  address?: string;
  rating?: number;
  placeId?: string;
  source: string;
  status: 'new' | 'emailed' | 'replied' | 'booked' | 'declined' | 'follow-up';
  notes: string;
  emailsSent: { date: string; template: string; subject: string }[];
  dmsSent?: { date: string; platform: string; text: string }[];
  createdAt: string;
  updatedAt: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'leads.json');

function ensureDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, '[]');
}

export function getLeads(): Lead[] {
  ensureDir();
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

export function saveLead(lead: Lead) {
  const leads = getLeads();
  const idx = leads.findIndex(l => l.id === lead.id);
  if (idx >= 0) leads[idx] = lead;
  else leads.push(lead);
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
  return lead;
}

export function saveLeads(newLeads: Lead[]) {
  const existing = getLeads();
  const emailSet = new Set(existing.filter(l => l.email).map(l => l.email.toLowerCase()));
  const placeSet = new Set(existing.filter(l => l.placeId).map(l => l.placeId as string));
  let added = 0;
  for (const lead of newLeads) {
    const hasEmail = !!lead.email;
    const dupEmail = hasEmail && emailSet.has(lead.email.toLowerCase());
    const dupPlace = lead.placeId && placeSet.has(lead.placeId);
    // Accept leads that have at least one contact channel (email, phone, IG, or website)
    const hasContact = hasEmail || !!lead.phone || !!lead.instagram || !!lead.website;
    if (hasContact && !dupEmail && !dupPlace) {
      existing.push(lead);
      if (hasEmail) emailSet.add(lead.email.toLowerCase());
      if (lead.placeId) placeSet.add(lead.placeId);
      added++;
    }
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(existing, null, 2));
  return added;
}

export function deleteLead(id: string) {
  const leads = getLeads().filter(l => l.id !== id);
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
}

export function getStats() {
  const leads = getLeads();
  return {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    emailed: leads.filter(l => l.status === 'emailed').length,
    replied: leads.filter(l => l.status === 'replied').length,
    booked: leads.filter(l => l.status === 'booked').length,
    declined: leads.filter(l => l.status === 'declined').length,
  };
}
