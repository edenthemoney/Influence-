export type UserRole = 'CLIENT' | 'INFLUENCER' | 'ADMIN';

export type BookingStatus = 
  | 'PENDING' 
  | 'ACCEPTED' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'CANCELLED' 
  | 'DISPUTED';

export type PackageTier = 
  | 'STARTER' 
  | 'GROWTH' 
  | 'PRO' 
  | 'PREMIUM' 
  | 'CLIP_FARMING';

export interface InfluencerProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  engagement: number;
  rating: number;
  reviews: number;
  categories: string[];
  hourlyRate: number;
  instagramHandle?: string;
  tiktokHandle?: string;
  youtubeHandle?: string;
}

export interface Package {
  tier: PackageTier;
  name: string;
  price: number;
  description: string;
  reelCount: number;
  reelDuration: number;
  deliveryDays: number;
  revisions: number;
  features: string[];
}

export interface Booking {
  id: string;
  clientId: string;
  influencerId: string;
  packageId: string;
  status: BookingStatus;
  totalAmount: number;
  agencyCommission: number;
  influencerPayout: number;
  briefDescription: string;
  createdAt: Date;
}

export interface CommissionSplit {
  total: number;
  agencyCommission: number;
  influencerPayout: number;
  agencyPercentage: number;
  influencerPercentage: number;
}
