'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MobileNav from '../components/MobileNav';
import posthog from 'posthog-js';
import { Camera, Sparkles, CalendarDays, RefreshCcw, Users, ChevronRight, ChevronLeft, Check, MapPin, TrendingUp, Zap, Play, ArrowUpRight, Headphones, Music, Phone, Lock, ShieldCheck, Film, Wine } from 'lucide-react';

// ── Package Data ─────────────────────────────────────────────────────────────

// ── Music Videos (dedicated service for artists) ──
const MUSIC_VIDEO_OT = [
  { id: 'mv-solo',      name: 'Solo Feature',     tagline: '1 model · 4hr · featured scenes',        models: 1,  price: 500,   popular: false, perks: ['1 model · featured role in your video', '4 hours on set', 'Multiple scenes & looks', 'Styled & camera-ready', 'South Florida location'] },
  { id: 'mv-duo',       name: 'Duo Feature',      tagline: '2 models · 4hr · coordinated',            models: 2,  price: 900,   popular: false, perks: ['2 models · coordinated feature roles', '4 hours on set', 'Multiple scenes together', 'Styled ensemble looks', 'South Florida location'] },
  { id: 'mv-trio',      name: 'Trio Feature',     tagline: '3 models · 4hr · full production',      models: 3,  price: 1200,  popular: true,  perks: ['3 models · full video feature cast', '4 hours on set', 'Multiple scenes & interactions', 'Styled production looks', 'On-set model coordinator'] },
  { id: 'mv-squad',     name: 'Squad (5)',        tagline: '5 models · 4hr · crew scenes',          models: 5,  price: 1800,  popular: false, perks: ['5 models · full squad energy', '4 hours on set', 'Multiple group scenes', 'Coordinated styling', 'On-set coordinator included'] },
  { id: 'mv-fullday',   name: 'Full Day Solo',    tagline: '1 model · 6-8hr · full video',        models: 1,  price: 800,   popular: false, perks: ['1 model · full video lead', '6-8 hours on set', 'All scenes & wardrobe changes', 'Dedicated styling time', 'Full day production support'] },
  { id: 'mv-fullday-duo', name: 'Full Day Duo',   tagline: '2 models · 6-8hr · all scenes',        models: 2,  price: 1400,  popular: false, perks: ['2 models · full video leads', '6-8 hours on set', 'All scenes together & separate', 'Multiple wardrobe changes', 'Dedicated model coordinator'] },
  { id: 'mv-fullday-trio', name: 'Full Day Trio', tagline: '3 models · 6-8hr · complete video',  models: 3,  price: 2000,  popular: true,  perks: ['3 models · complete video cast', '6-8 hours on set', 'Full video coverage', 'Multiple looks each', 'On-site production manager'] },
  { id: 'mv-ten',       name: '10 Models',        tagline: '10 models · 4hr · big production',      models: 10, price: 3500,  popular: false, perks: ['10 models · full video cast', '4 hours on set', 'Multiple scenes running', 'Styled & coordinated', 'Music video specialist crew'] },
  { id: 'mv-ten-fd',    name: '10 Models Full Day', tagline: '10 models · 6-8hr · major video',   models: 10, price: 5500,  popular: false, perks: ['10 models · major production', '6-8 hour full day', 'Maximum scene coverage', 'Coordinated wardrobe', 'Dedicated MV production manager'] },
  { id: 'mv-fifteen',   name: '15 Models',        tagline: '15 models · 4hr · large production',   models: 15, price: 6500,  popular: false, perks: ['15 models · large video production', '4 hours on set', 'Full cast coverage', 'On-set coordinator + lead', 'Label-ready production'] },
  { id: 'mv-fifteen-fd', name: '15 Models Full Day', tagline: '15 models · 6-8hr · epic video',  models: 15, price: 9500,  popular: false, perks: ['15 models · epic production', '6-8 hour full day', 'Maximum visual impact', 'Full coordination team', 'Major label video ready'] },
  { id: 'mv-twenty',    name: '20 Models',        tagline: '20+ models · full day · blockbuster',  models: 20, price: 12000, popular: false, perks: ['20+ models · blockbuster production', 'Full day 6-8 hours', 'Maximum video impact', 'Production manager + leads', 'Industry-level video shoot'] },
  { id: 'mv-thirty',    name: '30 Models',        tagline: '30+ models · multi-scene · premium',  models: 30, price: 18000, popular: false, perks: ['30+ models · premium production', 'Full day + multiple setups', 'Studio/label quality', 'Full production team', 'Multi-location capable'] },
  { id: 'mv-fifty',     name: '50 Models',        tagline: '50+ models · full production · major', models: 50, price: 30000, popular: false, perks: ['50+ models · major production', 'Multi-day if needed', 'Maximum scale & visuals', 'Enterprise coordination', 'A-list artist video ready'] },
];

const SHOOT_OT = [
  { id: 'solo',        name: 'Solo',           tagline: '1 model · 4-hour shoot',       models: 1,  price: 300,   popular: false, perks: ['1 professional model', '4 hours on set', 'Camera-ready & styled', 'South Florida location'] },
  { id: 'duo',         name: 'Duo',            tagline: '2 models · 4-hour shoot',      models: 2,  price: 550,   popular: false, perks: ['2 professional models', '4 hours on set', 'Coordinated looks', 'South Florida location'] },
  { id: 'fullday',     name: 'Full Day',       tagline: '1 model · 6–8 hour shoot',     models: 1,  price: 600,   popular: false, perks: ['1 professional model', '6–8 hours on set', 'Multiple looks & scenes', 'South Florida location'] },
  { id: 'trio',        name: 'Trio',           tagline: '3 models · 4-hour shoot',      models: 3,  price: 650,   popular: true,  perks: ['3 professional models', '4 hours on set', 'Styled ensemble look', 'South Florida location'] },
  { id: 'squad',       name: 'Squad',          tagline: '5 models · 4-hour shoot',      models: 5,  price: 950,   popular: false, perks: ['5 professional models', '4 hours on set', 'Full squad production', 'South Florida location'] },
  { id: 'fullday-duo', name: 'Full Day Duo',   tagline: '2 models · 6–8 hour shoot',    models: 2,  price: 1050,  popular: false, perks: ['2 professional models', '6–8 hours on set', 'Multiple looks & scenes', 'South Florida location'] },
  { id: 'fullday-trio',name: 'Full Day Trio',  tagline: '3 models · 6–8 hour shoot',    models: 3,  price: 1400,  popular: false, perks: ['3 professional models', '6–8 hours on set', 'Multiple looks & wardrobe changes', 'Dedicated shoot coordinator'] },
  { id: 'crew',        name: 'Crew',           tagline: '6–8 models · 4-hour shoot',    models: 8,  price: 2000,  popular: false, perks: ['6–8 professional models', '4 hours on set', 'Large-scale production ready', 'On-set coordinator included'] },
  { id: 'fullday-sqd', name: 'Full Day Squad', tagline: '5 models · 6–8 hour shoot',    models: 5,  price: 2500,  popular: false, perks: ['5 professional models', '6–8 hours on set', 'Multiple setups & scenes', 'Full production coordination'] },
  { id: 'ten',         name: '10 Girls',       tagline: '10 models · 4-hour shoot',     models: 10, price: 3500,  popular: false, perks: ['10 professional models', '4 hours on set', 'Full crew coordination', 'Perfect for music videos & campaigns'] },
  { id: 'ten-fullday', name: '10 Girls Full Day', tagline: '10 models · full day shoot', models: 10, price: 5500,  popular: false, perks: ['10 professional models', 'Full day (6–8 hours)', 'Multiple scenes & locations', 'Dedicated production manager'] },
  { id: 'fifteen',     name: '15 Girls',       tagline: '15 models · 4-hour shoot',     models: 15, price: 6500,  popular: false, perks: ['15 professional models', '4 hours on set', 'Full music video production ready', 'On-set coordinator + model lead'] },
  { id: 'fifteen-fd',  name: '15 Girls Full Day', tagline: '15 models · full day shoot', models: 15, price: 9500,  popular: false, perks: ['15 professional models', 'Full day (6–8 hours)', 'Multi-scene production', 'Dedicated production manager + model lead'] },
  { id: 'vip',         name: 'VIP 20+',        tagline: '20+ models · full day shoot',   models: 20, price: 15000, popular: false, perks: ['20+ professional models', 'Full day production (8+ hours)', 'On-site production manager + model leads', 'Premium hand-picked talent'] },
  { id: 'mega-shoot', name: 'Mega 30+',      tagline: '30+ models · multi-day shoot',  models: 30, price: 25000, popular: false, perks: ['30+ professional models', 'Multi-day production', 'Full crew + wardrobe + makeup', 'Enterprise-level coordination'] },
  { id: 'blockbuster', name: 'Blockbuster',  tagline: '50+ models · full production',  models: 50, price: 50000, popular: false, perks: ['50+ hand-picked models', 'Multi-day multi-location', 'Full production team + directors', 'Label / studio grade'] },
];

// Pricing model: $100/girl/hr · Girl earns $50/hr (50%) · Dez 15% · Agency 35%
// Standard booking = 4 hours → $400/girl base
const EVENT_OT = [
  { id: '1-girl',    name: '1 Girl',    tagline: '1 model · 4hr appearance · $50/hr per girl',    models: 1,  price: 400,   popular: false, perks: ['1 professional model', '4-hour appearance', 'Event-ready & styled', 'South Florida', 'Girl earns $200'] },
  { id: '2-girls',   name: '2 Girls',   tagline: '2 models · 4hr appearance',                      models: 2,  price: 800,   popular: false, perks: ['2 professional models', '4-hour appearance', 'Coordinated looks', 'South Florida', 'Each girl earns $200'] },
  { id: '3-girls',   name: '3 Girls',   tagline: '3 models · 4hr appearance',                      models: 3,  price: 1200,  popular: true,  perks: ['3 professional models', '4-hour appearance', 'VIP event presence', 'South Florida', 'Each girl earns $200'] },
  { id: '5-girls',   name: '5 Girls',   tagline: '5 models · 4hr appearance',                      models: 5,  price: 2000,  popular: false, perks: ['5 professional models', '4-hour appearance', 'Full squad energy', 'South Florida', 'Each girl earns $200'] },
  { id: '8-girls',   name: '8 Girls',   tagline: '8 models · 4hr appearance',                      models: 8,  price: 3200,  popular: false, perks: ['8 professional models', '4-hour appearance', 'Maximum event impact', 'South Florida', 'Each girl earns $200'] },
  { id: '10-girls',  name: '10 Girls',  tagline: '10 models · 4hr appearance',                     models: 10, price: 4000,  popular: false, perks: ['10 professional models', '4-hour appearance', 'Dedicated event coordinator', 'South Florida', 'Each girl earns $200'] },
  { id: '15-girls',  name: '15 Girls',  tagline: '15 models · 4hr appearance',                     models: 15, price: 6000,  popular: false, perks: ['15 professional models', '4-hour appearance', 'Full event takeover', 'Dedicated on-site lead', 'Each girl earns $200'] },
  { id: '25-girls',  name: '25 Girls',  tagline: '25 models · 4hr appearance',                     models: 25, price: 10000, popular: false, perks: ['25 professional models', '4-hour appearance', 'Maximum event domination', 'Full coordinator team', 'Each girl earns $200'] },
  { id: '40-girls',  name: '40 Girls',  tagline: '40 models · 4hr appearance',                     models: 40, price: 16000, popular: false, perks: ['40 professional models', '4-hour appearance', 'Full venue takeover', 'Production team + on-site leads', 'Each girl earns $200'] },
  { id: '50-girls',  name: 'VIP 50+',   tagline: '50+ models · 4hr+ · premium',                   models: 50, price: 20000, popular: false, perks: ['50+ premium models', '4+ hour coverage', 'Hand-picked talent', 'White-glove management', 'Each girl earns $200+'] },
  { id: 'mega-evt',  name: 'Mega Event',tagline: '75+ models · multi-day · full production',       models: 75, price: 30000, popular: false, perks: ['75+ models', 'Multi-day availability', 'Full production team', 'Enterprise coordination'] },
  { id: 'festival',  name: 'Festival',  tagline: '100+ models · multi-day · premium talent',       models: 100, price: 40000, popular: false, perks: ['100+ premium models', 'Multi-day event coverage', 'Full logistics + coordination', 'White-glove VIP experience'] },
  { id: 'enterprise-evt', name: 'Enterprise', tagline: '150+ models · full event production',     models: 150, price: 60000, popular: false, perks: ['150+ hand-picked models', 'Multi-day multi-venue', 'Full production + management team', 'Fortune 500 grade'] },
];

const SHOOT_MO = [
  { id: 'starter-s', name: 'Starter', tagline: '1–2 models · 4 shoot days/mo',    models: 2,  days: 4,   price: 1500,  popular: false, perks: ['Up to 2 models', '4 shoot days / month', 'Booking coordination', 'Priority scheduling'] },
  { id: 'studio-s',  name: 'Studio',  tagline: '3–5 models · 8 days/mo',          models: 5,  days: 8,   price: 3500,  popular: true,  perks: ['Up to 5 models', '8 shoot days / month', 'Dedicated coordinator', 'Priority scheduling'] },
  { id: 'pro-s',     name: 'Pro',     tagline: '6–10 models · 15 days/mo',        models: 10, days: 15,  price: 6500,  popular: false, perks: ['Up to 10 models', '15 shoot days / month', 'Account manager', 'Same-day availability'] },
  { id: 'agency-s',  name: 'Agency',  tagline: '11–25 models · 25 days/mo',       models: 25, days: 25,  price: 12000, popular: false, perks: ['Up to 25 models', '25 shoot days / month', 'Dedicated rep', 'Priority + on-call booking'] },
  { id: 'elite-s',   name: 'Elite',   tagline: '26–50 models · 40 days/mo',       models: 50, days: 40,  price: 20000, popular: false, perks: ['Up to 50 models', '40 shoot days / month', 'White-glove service', 'Unlimited priority access'] },
];

// Monthly event pricing: $100/girl/hr × 4hrs × models × events/mo
const EVENT_MO = [
  { id: 'venue-starter',  name: 'Venue Starter',  tagline: '2 girls × 4 events/mo · $400/girl/event',    models: 2,  events: 4,  price: 3200,   popular: false, perks: ['2 models per event', '4 events / month', 'Event coordination', '$400/girl/event · girl earns $200'] },
  { id: 'venue-growth',   name: 'Venue Growth',   tagline: '3 girls × 8 events/mo · $400/girl/event',    models: 3,  events: 8,  price: 9600,   popular: true,  perks: ['3 models per event', '8 events / month', 'Dedicated coordinator', '$400/girl/event · girl earns $200'] },
  { id: 'venue-pro',      name: 'Venue Pro',      tagline: '5 girls × 12 events/mo · $400/girl/event',   models: 5,  events: 12, price: 24000,  popular: false, perks: ['5 models per event', '12 events / month', 'Account manager', '$400/girl/event · girl earns $200'] },
  { id: 'venue-elite',    name: 'Venue Elite',    tagline: '8 girls × 12 events/mo · $400/girl/event',   models: 8,  events: 12, price: 38400,  popular: false, perks: ['8 models per event', '12 events / month', 'White-glove service', '$400/girl/event · girl earns $200'] },
  { id: 'venue-mega',     name: 'Venue Mega',     tagline: '10 girls × 16 events/mo · $400/girl/event',  models: 10, events: 16, price: 64000,  popular: false, perks: ['10 models per event', '16 events / month', 'Full production team', '$400/girl/event · girl earns $200'] },
  { id: 'venue-takeover', name: 'Venue Takeover', tagline: '15 girls × 16 events/mo · $400/girl/event',  models: 15, events: 16, price: 96000,  popular: false, perks: ['15 models per event', '16 events / month', 'Complete event takeover', '$400/girl/event · girl earns $200'] },
];

// ── Bottle Girls / VIP Hostess Service ──
// Same rate: $100/girl/hr · Girl earns $50/hr (50%) · Dez 15% · Agency 35%
// Standard shift = 4 hours
const BOTTLE_OT = [
  { id: 'bottle-1',   name: '1 Bottle Girl',   tagline: '1 VIP hostess · 4hr shift · $50/hr per girl',  models: 1,  price: 400,   popular: false, perks: ['1 VIP bottle girl / hostess', '4-hour shift', 'Bottle service & VIP table experience', 'South Florida', 'Girl earns $200'] },
  { id: 'bottle-2',   name: '2 Bottle Girls',  tagline: '2 VIP hostesses · 4hr shift',                  models: 2,  price: 800,   popular: false, perks: ['2 VIP bottle girls / hostesses', '4-hour shift', 'Coordinated table service', 'South Florida', 'Each girl earns $200'] },
  { id: 'bottle-3',   name: '3 Bottle Girls',  tagline: '3 VIP hostesses · 4hr shift',                  models: 3,  price: 1200,  popular: true,  perks: ['3 VIP bottle girls / hostesses', '4-hour shift', 'Full VIP section coverage', 'South Florida', 'Each girl earns $200'] },
  { id: 'bottle-5',   name: '5 Bottle Girls',  tagline: '5 VIP hostesses · 4hr shift',                  models: 5,  price: 2000,  popular: false, perks: ['5 VIP bottle girls / hostesses', '4-hour shift', 'Multiple VIP tables covered', 'South Florida', 'Each girl earns $200'] },
  { id: 'bottle-8',   name: '8 Bottle Girls',  tagline: '8 VIP hostesses · 4hr shift',                  models: 8,  price: 3200,  popular: false, perks: ['8 VIP bottle girls / hostesses', '4-hour shift', 'Full venue bottle service team', 'South Florida', 'Each girl earns $200'] },
  { id: 'bottle-10',  name: '10 Bottle Girls', tagline: '10 VIP hostesses · 4hr shift',                 models: 10, price: 4000,  popular: false, perks: ['10 VIP bottle girls / hostesses', '4-hour shift', 'Large venue full coverage', 'On-site coordinator', 'Each girl earns $200'] },
  { id: 'bottle-15',  name: '15 Bottle Girls', tagline: '15 VIP hostesses · 4hr shift',                 models: 15, price: 6000,  popular: false, perks: ['15 VIP bottle girls / hostesses', '4-hour shift', 'Premium club / venue takeover', 'Dedicated coordinator + lead', 'Each girl earns $200'] },
  { id: 'bottle-20',  name: '20 Bottle Girls', tagline: '20 VIP hostesses · 4hr shift',                 models: 20, price: 8000,  popular: false, perks: ['20 VIP bottle girls / hostesses', '4-hour shift', 'Full nightclub coverage', 'Production team on-site', 'Each girl earns $200'] },
];

const BOTTLE_MO = [
  { id: 'bottle-mo-starter',  name: 'Venue Starter',   tagline: '2 hostesses × 4 nights/mo',   models: 2,  events: 4,  price: 3200,  popular: false, perks: ['2 bottle girls per night', '4 nights / month', 'Scheduling coordination', 'Each girl earns $200/shift'] },
  { id: 'bottle-mo-growth',   name: 'Venue Growth',    tagline: '3 hostesses × 8 nights/mo',   models: 3,  events: 8,  price: 9600,  popular: true,  perks: ['3 bottle girls per night', '8 nights / month', 'Dedicated coordinator', 'Each girl earns $200/shift'] },
  { id: 'bottle-mo-pro',      name: 'Venue Pro',       tagline: '5 hostesses × 12 nights/mo',  models: 5,  events: 12, price: 24000, popular: false, perks: ['5 bottle girls per night', '12 nights / month', 'Account manager', 'Each girl earns $200/shift'] },
  { id: 'bottle-mo-elite',    name: 'Venue Elite',     tagline: '8 hostesses × 16 nights/mo',  models: 8,  events: 16, price: 51200, popular: false, perks: ['8 bottle girls per night', '16 nights / month', 'White-glove service', 'Each girl earns $200/shift'] },
  { id: 'bottle-mo-takeover', name: 'Venue Takeover',  tagline: '10 hostesses × 20 nights/mo', models: 10, events: 20, price: 80000, popular: false, perks: ['10 bottle girls per night', '20 nights / month', 'Full nightlife partnership', 'Dedicated team + on-site leads', 'Each girl earns $200/shift'] },
];

const REACTION_OT = [
  { id: 'single',       name: 'Single',        tagline: '1 song · 1 model reaction video',          models: 1, price: 300,   popular: false, perks: ['1 model reaction video', 'Genuine first-listen reaction', 'HD vertical video delivered', 'Ready for IG / TikTok / YouTube'] },
  { id: 'double',       name: 'Double',         tagline: '2 songs · 1 model reaction videos',        models: 1, price: 550,   popular: false, perks: ['2 song reactions', 'Save $50 vs individual', 'HD vertical videos', 'Ready for all platforms'] },
  { id: 'triple',       name: 'Triple',         tagline: '3 songs · 1 model reaction videos',        models: 1, price: 625,   popular: true,  perks: ['3 song reactions', 'Save $125 vs individual', 'HD vertical videos', 'Bulk discount applied'] },
  { id: 'five-pack',    name: '5 Pack',         tagline: '5 songs · 1 model reaction videos',        models: 1, price: 1000,  popular: false, perks: ['5 song reactions', '$200/ea — best per-song rate', 'HD vertical videos', 'Priority turnaround'] },
  { id: 'livestream',   name: 'Livestream',     tagline: 'Full album · 10+ tracks · live reaction',  models: 1, price: 1500,  popular: false, perks: ['Full album live reaction', '10+ tracks in one session', 'Live broadcast + recording', 'Edited highlights included'] },
  { id: 'premium-live', name: 'Premium Live',   tagline: 'Full album · livestream + edited shorts',   models: 1, price: 2500,  popular: false, perks: ['Full album livestream', 'Edited short-form clips per track', 'Full VOD recording', 'Social media ready assets'] },
  { id: 'multi-model',  name: 'Multi-Model',    tagline: '3 models · 3 songs each · 9 total videos', models: 3, price: 3500,  popular: false, perks: ['3 different models react', '3 songs each — 9 total videos', 'Wider audience reach', 'Bulk production discount'] },
  { id: 'viral-push',   name: 'Viral Push',     tagline: '5 models · full album · livestreams',       models: 5, price: 6000,  popular: false, perks: ['5 models react to your album', 'Individual livestream per model', 'Edited highlights + shorts', 'Maximum exposure campaign'] },
  { id: 'label-blast',  name: 'Label Blast',    tagline: '10 models · full album · coordinated rollout', models: 10, price: 10000, popular: false, perks: ['10 models react to your album', 'Coordinated release-day push', 'Livestreams + edited shorts', 'Full campaign management'] },
  { id: 'viral-takeover', name: 'Viral Takeover', tagline: '20 models · multi-album · full campaign', models: 20, price: 20000, popular: false, perks: ['20 models across platforms', 'Multi-week rollout', 'Livestreams + shorts + stories', 'Dedicated campaign manager'] },
  { id: 'label-domination', name: 'Label Domination', tagline: '50 models · full catalog · ongoing', models: 50, price: 50000, popular: false, perks: ['50+ models across all platforms', 'Full artist catalog promotion', 'Multi-month campaign', 'Enterprise label partnership'] },
];

const REACTION_MO = [
  { id: 'starter-r',  name: 'Starter',    tagline: '4 reactions/mo · 1 model',             models: 1,  price: 800,   popular: false, perks: ['4 reaction videos / month', '1 dedicated model', 'Consistent content flow', 'Priority scheduling'] },
  { id: 'growth-r',   name: 'Growth',     tagline: '8 reactions/mo · 2 models',             models: 2,  price: 1500,  popular: true,  perks: ['8 reaction videos / month', '2 rotating models', 'Wider audience reach', 'Dedicated coordinator'] },
  { id: 'pro-r',      name: 'Pro',        tagline: '15 reactions/mo · 3 models + 1 live',   models: 3,  price: 2800,  popular: false, perks: ['15 reactions + 1 livestream/mo', '3 rotating models', 'Album release support', 'Account manager'] },
  { id: 'label-r',    name: 'Label',      tagline: '30 reactions/mo · 5 models + 2 lives',  models: 5,  price: 5000,  popular: false, perks: ['30 reactions + 2 livestreams/mo', '5 rotating models', 'Full release campaigns', 'White-glove service'] },
];

const UGC_OT = [
  { id: 'single-ugc',   name: 'Single Reel',     tagline: '1 model · 1 branded reel or skit',          models: 1, price: 300,   popular: false, perks: ['1 custom promotional reel', 'Model creates content to your brief', 'HD vertical video delivered', 'Ready for IG / TikTok / YouTube'] },
  { id: 'double-ugc',   name: '2-Reel Pack',     tagline: '1 model · 2 branded reels',                 models: 1, price: 500,   popular: false, perks: ['2 custom promotional reels', 'Different hooks or angles', 'HD vertical videos', 'Ready for all platforms'] },
  { id: 'triple-ugc',   name: '3-Reel Pack',     tagline: '1 model · 3 branded reels or skits',        models: 1, price: 750,   popular: true,  perks: ['3 custom reels or skits', 'Variety of creative angles', 'Best for A/B testing content', 'Priority turnaround'] },
  { id: 'five-ugc',     name: '5-Reel Pack',     tagline: '1 model · 5 branded reels',                 models: 1, price: 1200,  popular: false, perks: ['5 custom reels', '$240/ea — best per-reel rate', 'Full content series', 'Priority turnaround'] },
  { id: 'multi-ugc',    name: 'Multi-Model',     tagline: '3 models · 2 reels each · 6 total',         models: 3, price: 1500,  popular: false, perks: ['3 different creators', '2 reels each — 6 total videos', 'Wider audience appeal', 'Diverse content styles'] },
  { id: 'campaign-ugc', name: 'Full Campaign',   tagline: '5 models · 2 reels each · 10 total',        models: 5, price: 2500,  popular: false, perks: ['5 different creators', '2 reels each — 10 total videos', 'Full brand campaign rollout', 'Account manager included'] },
  { id: 'mega-ugc',     name: 'Mega Campaign',   tagline: '10 models · 2 reels each · 20 total',       models: 10, price: 5000,  popular: false, perks: ['10 different creators', '2 reels each — 20 total videos', 'Full content calendar', 'Dedicated account manager'] },
  { id: 'enterprise-ugc', name: 'Enterprise',    tagline: '20 models · 2 reels each · 40 total',       models: 20, price: 10000, popular: false, perks: ['20 different creators', '2 reels each — 40 total videos', 'Multi-platform rollout', 'White-glove service + strategy'] },
  { id: 'takeover-ugc', name: 'Brand Takeover',   tagline: '50 models · 2 reels each · 100 total',     models: 50, price: 25000, popular: false, perks: ['50+ creators', '2 reels each — 100 total videos', 'Full social media management', 'Enterprise campaign team'] },
  { id: 'domination-ugc', name: 'Total Domination', tagline: '100+ models · 2 reels each · 200 total', models: 100, price: 50000, popular: false, perks: ['100+ creators network-wide', '2 reels each — 200 total videos', 'Full creative direction + strategy', 'Enterprise partnership'] },
];

const UGC_MO = [
  { id: 'starter-u',  name: 'Starter',   tagline: '4 reels/mo · 1 model',             models: 1, price: 800,   popular: false, perks: ['4 branded reels / month', '1 dedicated creator', 'Consistent content flow', 'Priority scheduling'] },
  { id: 'growth-u',   name: 'Growth',    tagline: '6 reels/mo · 2 models',             models: 2, price: 1500,  popular: true,  perks: ['6 branded reels / month', '2 rotating creators', 'Wider content variety', 'Dedicated coordinator'] },
  { id: 'pro-u',      name: 'Pro',       tagline: '10 reels/mo · 3 models',            models: 3, price: 2500,  popular: false, perks: ['10 branded reels / month', '3 rotating creators', 'Full content calendar', 'Account manager'] },
  { id: 'agency-u',   name: 'Agency',    tagline: '18 reels/mo · 5 models',            models: 5, price: 4500,  popular: false, perks: ['18 branded reels / month', '5 rotating creators', 'Brand campaign management', 'White-glove service'] },
];

// ── Brand Ambassadors (model comes to your business, creates reels/promos on-site) ──
const BIZ_OT = [
  { id: 'biz-solo',      name: 'Solo',            tagline: '1 model · 2hr · on-site content',            models: 1,  price: 300,   popular: false, perks: ['1 model at your location', '2-hour content session', '3–5 reels & stories created', 'South Florida'] },
  { id: 'biz-duo',       name: 'Duo',             tagline: '2 models · 2hr · on-site content',            models: 2,  price: 450,   popular: false, perks: ['2 models at your location', '2-hour content session', '5–8 reels & stories', 'Coordinated content'] },
  { id: 'biz-content',   name: 'Content Day',     tagline: '1 model · 4hr · multiple looks & scenes',     models: 1,  price: 400,   popular: true,  perks: ['1 model · full half-day', '4-hour session · multiple setups', '8–12 reels, posts & stories', 'Wardrobe changes included'] },
  { id: 'biz-full',      name: 'Full Production', tagline: '2 models · 4hr · full content package',        models: 2,  price: 700,   popular: false, perks: ['2 models · full half-day', '4-hour session · multiple setups', '12–20 content pieces', 'Full brand content library'] },
  { id: 'biz-premium',   name: 'Premium',         tagline: '3 models · 4hr · high-volume content',        models: 3,  price: 950,   popular: false, perks: ['3 models · full half-day', '4-hour session', '20+ content pieces', 'Dedicated content coordinator'] },
  { id: 'biz-elite',     name: 'Elite',           tagline: '5 models · full day · brand takeover',         models: 5,  price: 1800,  popular: false, perks: ['5 models at your location', 'Full day (6–8 hours)', '40+ content pieces', 'Full brand content blitz'] },
  { id: 'biz-mega',      name: 'Mega',            tagline: '8 models · full day · max content',            models: 8,  price: 3500,  popular: false, perks: ['8 models at your location', 'Full day (6–8 hours)', '75+ content pieces', 'On-site coordinator + content manager'] },
  { id: 'biz-vip',       name: 'VIP Takeover',    tagline: '10+ models · full day · total brand takeover', models: 10, price: 5500,  popular: false, perks: ['10+ brand ambassadors', 'Full day production', '100+ content pieces', 'Dedicated production team'] },
  { id: 'biz-grand',     name: 'Grand Takeover',  tagline: '15+ models · full day · ultimate brand event', models: 15, price: 8500,  popular: false, perks: ['15+ brand ambassadors', 'Full day production (8+ hours)', '150+ content pieces', 'Full production team + model leads'] },
  { id: 'biz-franchise', name: 'Franchise',      tagline: '20+ models · multi-location · week-long',    models: 20, price: 12000, popular: false, perks: ['20+ brand ambassadors', 'Multi-location coverage', '200+ content pieces', 'Dedicated production manager'] },
  { id: 'biz-enterprise', name: 'Enterprise',    tagline: '30+ models · ongoing · full brand rollout',   models: 30, price: 18000, popular: false, perks: ['30+ brand ambassadors', 'Multi-week campaign', '500+ content pieces', 'Full creative + production team'] },
  { id: 'biz-national', name: 'National',       tagline: '50+ models · multi-city · full activation',  models: 50, price: 35000, popular: false, perks: ['50+ brand ambassadors', 'Multi-city activation', '1000+ content pieces', 'National campaign management'] },
  { id: 'biz-domination', name: 'Total Domination', tagline: '100+ models · nationwide · ongoing',     models: 100, price: 50000, popular: false, perks: ['100+ brand ambassadors', 'Nationwide coverage', 'Unlimited content production', 'Enterprise partnership team'] },
];

const BIZ_MO = [
  { id: 'biz-starter-m',  name: 'Starter',   tagline: '2 content visits/mo · 1 model',        models: 1, price: 700,   popular: false, perks: ['2 on-site visits / month', '1 dedicated model', '6–10 reels & stories / month', 'Consistent brand content'] },
  { id: 'biz-growth-m',   name: 'Growth',    tagline: '4 visits/mo · 1–2 models',             models: 2, price: 1400,  popular: true,  perks: ['4 on-site visits / month', '1–2 rotating models', '12–20 reels & stories / month', 'Content calendar planning'] },
  { id: 'biz-pro-m',      name: 'Pro',       tagline: '8 visits/mo · 2–3 models',             models: 3, price: 2500,  popular: false, perks: ['8 on-site visits / month', '2–3 rotating models', '25–40 content pieces / month', 'Dedicated account manager'] },
  { id: 'biz-agency-m',   name: 'Agency',    tagline: '12 visits/mo · 3+ models',             models: 5, price: 4000,  popular: false, perks: ['12 on-site visits / month', '3+ rotating models', '50+ content pieces / month', 'Full social media content team'] },
];

// ── Commercial Productions (script reading, spoken roles, acting) ──
const COMMERCIAL_OT = [
  { id: 'comm-solo',        name: 'Solo',            tagline: '1 model · half-day · script & spoken role',         models: 1,  price: 699,   popular: false, perks: ['1 professional model / actress', 'Half-day (4 hours) on set', 'Script reading & spoken delivery', 'Commercial-ready performance'] },
  { id: 'comm-duo',         name: 'Duo',             tagline: '2 models · half-day · scripted commercial',         models: 2,  price: 1250,  popular: false, perks: ['2 professional models / actresses', 'Half-day (4 hours) on set', 'Scripted dialogue & interaction', 'Coordinated commercial performance'] },
  { id: 'comm-trio',        name: 'Trio',            tagline: '3 models · half-day · full scripted production',    models: 3,  price: 1800,  popular: true,  perks: ['3 professional models / actresses', 'Half-day (4 hours) on set', 'Multi-person scripted scenes', 'Directed commercial performance'] },
  { id: 'comm-full-solo',   name: 'Full Day Solo',   tagline: '1 model · full day · multi-scene commercial',       models: 1,  price: 1200,   popular: false, perks: ['1 professional model / actress', 'Full day (6–8 hours) on set', 'Multiple scenes & wardrobe changes', 'Professional script delivery'] },
  { id: 'comm-full-duo',    name: 'Full Day Duo',    tagline: '2 models · full day · multi-scene commercial',      models: 2,  price: 2200,  popular: false, perks: ['2 professional models / actresses', 'Full day (6–8 hours) on set', 'Multi-scene scripted commercial', 'Wardrobe changes included'] },
  { id: 'comm-squad',       name: 'Squad',           tagline: '5 models · half-day · large-cast commercial',       models: 5,  price: 2750,  popular: false, perks: ['5 professional models / actresses', 'Half-day (4 hours) on set', 'Large cast scripted scenes', 'On-set coordinator included'] },
  { id: 'comm-full-squad',  name: 'Full Day Squad',  tagline: '5 models · full day · multi-scene production',      models: 5,  price: 4500,  popular: false, perks: ['5 professional models / actresses', 'Full day (6–8 hours)', 'Multi-scene commercial production', 'On-set coordinator + model lead'] },
  { id: 'comm-ensemble',    name: 'Ensemble',        tagline: '8 models · full day · big-budget commercial',       models: 8,  price: 6500,  popular: false, perks: ['8 professional models / actresses', 'Full day production', 'Large-scale scripted commercial', 'Full production coordination'] },
  { id: 'comm-mega',        name: 'Mega Production', tagline: '10+ models · full day · premium commercial',        models: 10, price: 9000,  popular: false, perks: ['10+ models / actresses', 'Full day production (8+ hours)', 'Multi-scene premium commercial', 'Dedicated production manager'] },
  { id: 'comm-blockbuster', name: 'Blockbuster',     tagline: '15+ models · multi-day · national commercial',      models: 15, price: 15000, popular: false, perks: ['15+ professional talent', 'Multi-day production', 'National-quality commercial', 'Full production team + casting director'] },
  { id: 'comm-enterprise',  name: 'Enterprise',      tagline: '25+ models · multi-day · broadcast-ready',          models: 25, price: 25000, popular: false, perks: ['25+ professional talent', 'Multi-day multi-location', 'Broadcast-quality commercial', 'Full creative + production team'] },
  { id: 'comm-national',    name: 'National',        tagline: '50+ models · full production · TV/streaming ready', models: 50, price: 50000, popular: false, perks: ['50+ hand-picked talent', 'Multi-day full production', 'TV/streaming broadcast quality', 'Enterprise production partnership'] },
];

const COMMERCIAL_MO = [
  { id: 'comm-starter-m',  name: 'Starter',   tagline: '2 commercial days/mo · 1 model',        models: 1, price: 1299,   popular: false, perks: ['2 commercial shoot days / month', '1 dedicated model / actress', 'Script reading & spoken roles', 'Priority scheduling'] },
  { id: 'comm-growth-m',   name: 'Growth',    tagline: '4 commercial days/mo · 1–2 models',     models: 2, price: 2400,  popular: true,  perks: ['4 commercial shoot days / month', '1–2 rotating models / actresses', 'Script delivery & dialogue', 'Dedicated coordinator'] },
  { id: 'comm-pro-m',      name: 'Pro',       tagline: '8 commercial days/mo · 2–3 models',     models: 3, price: 3500,  popular: false, perks: ['8 commercial shoot days / month', '2–3 rotating models / actresses', 'Full commercial production support', 'Account manager'] },
  { id: 'comm-agency-m',   name: 'Agency',    tagline: '12 commercial days/mo · 5+ models',     models: 5, price: 6000,  popular: false, perks: ['12 commercial shoot days / month', '5+ rotating talent', 'Ongoing commercial campaign support', 'White-glove service'] },
  { id: 'comm-enterprise-m', name: 'Enterprise', tagline: '20+ days/mo · 10+ models · dedicated team', models: 10, price: 12000, popular: false, perks: ['20+ commercial days / month', '10+ models on roster', 'Dedicated casting + production', 'Enterprise partnership'] },
];

// ── Videographer / Photographer Add-ons ──
const CREW_ADDONS = [
  { id: 'photo-2hr',      name: 'Photographer',         tagline: '2hr session · professional photos',       price: 250,  perks: ['Professional photographer', '2-hour session', '50+ edited photos delivered', 'South Florida'] },
  { id: 'video-2hr',      name: 'Videographer',         tagline: '2hr session · professional video',        price: 300,  perks: ['Professional videographer', '2-hour session', 'Edited reels & raw footage', 'South Florida'] },
  { id: 'combo-2hr',      name: 'Photo + Video',        tagline: '2hr session · photo & video combo',       price: 450,  popular: true, perks: ['Photographer + videographer', '2-hour session', 'Photos + edited video', 'Best value combo'] },
  { id: 'combo-4hr',      name: 'Half Day Combo',       tagline: '4hr session · photo & video',             price: 850,  perks: ['Photographer + videographer', '4-hour session', 'Full content production', 'Multiple setups & locations'] },
];

const PACKAGES: Record<string, any[]> = {
  'shoot-one-time':    SHOOT_OT,
  'musicvideo-one-time': MUSIC_VIDEO_OT,
  'event-one-time':    EVENT_OT,
  'reaction-one-time': REACTION_OT,
  'ugc-one-time':      UGC_OT,
  'business-one-time': BIZ_OT,
  'commercial-one-time': COMMERCIAL_OT,
  'bottle-one-time':   BOTTLE_OT,
  'shoot-monthly':     SHOOT_MO,
  'event-monthly':     EVENT_MO,
  'reaction-monthly':  REACTION_MO,
  'ugc-monthly':       UGC_MO,
  'business-monthly':  BIZ_MO,
  'commercial-monthly': COMMERCIAL_MO,
  'bottle-monthly':    BOTTLE_MO,
};

const STEPS = ['What You Need', 'Service', 'Frequency', 'Details', 'Package'];
type ServiceType = 'shoot' | 'musicvideo' | 'event' | 'reaction' | 'ugc' | 'business' | 'commercial' | 'bottle';
type ScenarioType = 'business' | 'music' | 'event';

// ── 3 Scenarios for better UX ───────────────────────────────────────────────
const SCENARIOS: { id: ScenarioType; Icon: React.ElementType; title: string; desc: string; services: ServiceType[] }[] = [
  { id: 'business', Icon: TrendingUp, title: 'Promote My Business, Brand or Product', desc: 'Content that grows your brand — from on-site visits to professional campaigns', services: ['business', 'ugc', 'commercial'] },
  { id: 'music',    Icon: Music,     title: 'Promote My Music',                      desc: 'Music videos, reactions, and promotional content for artists', services: ['musicvideo', 'reaction', 'shoot'] },
  { id: 'event',    Icon: Sparkles,  title: 'Host an Event / VIP / Bottle Service',  desc: 'Models for your club, party, brand activation or private event', services: ['event', 'bottle'] },
];

// ── Page ─────────────────────────────────────────────────────────────────────

function ModelBookingContent() {
  const searchParams = useSearchParams();
  const [step,        setStep]        = useState(0);
  const [clientType,  setClientType]  = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [scenario,    setScenario]    = useState<ScenarioType | null>(null);
  const [addCrew, setAddCrew] = useState<string | null>(null);

  // Test mode disabled
  const isTestMode = false;

  // Pre-selected model from profile page
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // Booking state
  const [bookingType, setBookingType] = useState<'one-time' | 'monthly' | null>(null);
  const [sliderIdx,   setSliderIdx]   = useState(0);
  const [budget,      setBudget]      = useState(250);

  // Auto-skip to Service step if service was pre-selected from homepage
  useEffect(() => {
    const svc = searchParams.get('service') as ServiceType | null;
    const pkgParam = searchParams.get('package');
    if (svc && ['shoot', 'musicvideo', 'event', 'reaction', 'ugc', 'business', 'commercial', 'bottle'].includes(svc)) {
      setServiceType(svc);
      setClientType(['shoot', 'musicvideo', 'event', 'business', 'commercial', 'bottle'].includes(svc) ? 'in-person' : 'social');
      // Auto-detect scenario from service
      const detectedScenario = SCENARIOS.find(s => s.services.includes(svc));
      if (detectedScenario) setScenario(detectedScenario.id);
      // Default to one-time unless monthly was explicitly requested
      const requestedType = searchParams.get('billing') as 'one-time' | 'monthly' | null;
      const bookingType = requestedType || 'one-time';
      setBookingType(bookingType);
      if (pkgParam) {
        const key = `${svc}-${bookingType}`;
        const pkgs = PACKAGES[key] || [];
        const idx = pkgs.findIndex((p: any) => p.id === pkgParam);
        if (idx !== -1) {
          setSliderIdx(idx);
          setBudget(pkgs[idx].price);
        }
        setStep(3); // Package is preselected, but collect contact details before showing price
      } else {
        setStep(2); // Skip scenario & service selection
      }
    }
    const modelParam = searchParams.get('model');
    if (modelParam) setSelectedModel(modelParam);
  }, [searchParams]);
  const [showAll,     setShowAll]     = useState(false); // kept for compatibility
  const stepRef = useRef<HTMLDivElement>(null);
  const [date,        setDate]        = useState('');
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [phone,       setPhone]       = useState('');
  const [notes,       setNotes]       = useState('');
  const [location,    setLocation]    = useState('');
  const [time,        setTime]        = useState('');
  const [songLink,    setSongLink]    = useState('');
  const [submitted,   setSubmitted]   = useState(false);
  const [sending,     setSending]     = useState(false);
  const [sendError,   setSendError]   = useState('');

  // Pre-fill from lead capture popup
  useEffect(() => {
    const leadName = sessionStorage.getItem('lead_name');
    const leadPhone = sessionStorage.getItem('lead_phone');
    const leadEmail = sessionStorage.getItem('lead_email');
    if (leadName) setName(leadName);
    if (leadPhone) setPhone(leadPhone);
    if (leadEmail) setEmail(leadEmail);
  }, []);

  const pkgKey  = serviceType && bookingType ? `${serviceType}-${bookingType}` : '';
  const rawPackages = PACKAGES[pkgKey] || [];
  const packages = isTestMode ? rawPackages.map(p => ({ ...p, price: 1 })) : rawPackages;
  // Auto-select best package that fits the budget (always use real prices for selection)
  const autoIdx = rawPackages.length > 0
    ? Math.max(0, [...rawPackages].reverse().findIndex(p => p.price <= budget) !== -1
        ? rawPackages.length - 1 - [...rawPackages].reverse().findIndex(p => p.price <= budget)
        : 0)
    : 0;
  const activeIdx = sliderIdx >= 0 ? sliderIdx : autoIdx;
  const pkg = packages[activeIdx] || null;
  const upgradeIdx = activeIdx + 1;
  const upgradePkg = packages[upgradeIdx] || null;

  // Abandoned checkout tracking — fire when user leaves after reaching step 2+
  useEffect(() => {
    const handleUnload = () => {
      if (step >= 2 && (phone || email) && !submitted) {
        const payload = JSON.stringify({
          name, email, phone,
          source: 'abandoned_checkout',
          serviceType,
          packageName: pkg?.name,
          packagePrice: pkg?.price,
          step,
        });
        navigator.sendBeacon('/api/save-lead', new Blob([payload], { type: 'application/json' }));
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [step, phone, email, name, serviceType, pkg, submitted]);

  const canNext = () => {
    if (step === 0) return serviceType !== null;
    if (step === 1) return bookingType !== null;
    if (step === 2) return bookingType !== null;
    if (step === 3) return name.trim() !== '' && phone.trim() !== '' && email.trim() !== '';
    if (step === 4) return pkg !== null;
    return false;
  };

  const goNext = async () => {
    if (step < 4) {
      posthog.capture('booking_step_completed', { step, serviceType, bookingType, packageName: pkg?.name });
      // Save lead as soon as contact details are provided
      if (step === 3 && name.trim() && phone.trim() && email.trim()) {
        try {
          await fetch('/api/save-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name, email, phone,
              source: 'booking_flow_details',
              serviceType,
              bookingType,
              notes: selectedModel ? `Requested Model: ${selectedModel}` : '',
            }),
          });
        } catch {
          // Non-fatal — continue to package selection
        }
      }
      setStep(s => s + 1);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
      return;
    }
    setSending(true);
    setSendError('');
    try {
      // Redirect to Stripe Checkout
      const res = await fetch('/api/create-booking-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType, bookingType, packageName: pkg?.name,
                  packageTagline: pkg?.tagline, packagePrice: pkg?.price,
                  crewAddon: addCrew ? CREW_ADDONS.find(a => a.id === addCrew) : null,
                  date, name, email, phone, notes: selectedModel ? `[Requested Model: ${selectedModel}] ${notes}` : notes, location, time, songLink,
                  selectedModel,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
      posthog.capture('checkout_redirect', { serviceType, bookingType, packageName: pkg?.name, packagePrice: pkg?.price });
      window.location.href = data.url;
    } catch {
      setSendError('Something went wrong. Please email us directly at influencemodelsagency@gmail.com');
      setSending(false);
    }
  };

  const chooseService = (t: ServiceType) => {
    posthog.capture('service_selected', { service: t });
    setServiceType(t);
    setSliderIdx(0);
    setShowAll(false);
    setAddCrew(null);
    // Auto-advance to frequency step after selecting sub-service
    setTimeout(() => { setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 350);
  };
  const chooseBooking = (t: 'one-time' | 'monthly') => {
    posthog.capture('booking_type_selected', { bookingType: t, serviceType });
    setBookingType(t);
    setSliderIdx(0);
    setShowAll(false);
    // Auto-advance to contact/details step after selecting frequency
    setTimeout(() => { setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 350);
  };

  const gold  = '#c9a96e';
  const input = 'w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none transition-colors';

  // ── Confirmation Screen ───────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-8 border-2" style={{ borderColor: gold }}>
            <Check className="h-8 w-8" style={{ color: gold }} />
          </div>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Booking Requested</p>
          <h2 className="font-display font-light italic text-white text-4xl mb-4">
            We'll be in touch, {name.split(' ')[0]}.
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-2">
            Your <strong className="text-white/70">{pkg?.name}</strong> {serviceType === 'shoot' ? 'shoot booking' : serviceType === 'reaction' ? 'music reaction' : serviceType === 'ugc' ? 'UGC content' : serviceType === 'business' ? 'brand ambassador' : serviceType === 'commercial' ? 'commercial production' : serviceType === 'bottle' ? 'bottle girl / VIP hostess' : 'event hosting'} request has been received.
            {bookingType === 'one-time' && date && (
              <> Requested date: <strong className="text-white/60">{new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>.</>
            )}
          </p>
          <p className="text-white/25 text-sm mb-10">Our team will confirm model availability and reach out within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="px-8 py-4 border border-white/10 text-sm font-bold tracking-widest uppercase text-white/50 hover:text-white hover:border-white/30 transition-all">
              Browse Models
            </Link>
            <Link href="/" className="px-8 py-4 text-sm font-bold tracking-widest uppercase text-black" style={{ backgroundColor: gold }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Layout ───────────────────────────────────────────────────────────
  return (
    <div className="h-screen bg-[#080808] flex flex-col overflow-hidden">
      {/* Test Mode Banner */}
      {isTestMode && (
        <div className="bg-red-500/10 border-b border-red-500/20 py-2 px-4 text-center z-[999] relative">
          <p className="text-red-400 text-xs font-bold tracking-widest uppercase">⚠ Test Mode — All prices are $1 — Not a real booking</p>
        </div>
      )}
      {/* Nav */}
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Talent</Link>
              <Link href="/services" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Services</Link>
              <Link href="/pricing" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Pricing</Link>
            </div>
          </div>
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: '#c9a96e' }}>Influence</Link>
          <div className="flex items-center gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/marketplace" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: '#c9a96e', color: '#000' }}>View Talent</Link>
          </div>
        </div>
      </nav>

      {/* Header + Progress */}
      <div className="pt-16 px-6 md:px-14 py-3 border-b border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-2 flex items-center gap-2" style={{ color: gold }}>
          {serviceType === 'reaction' ? (
            <><Headphones className="h-3 w-3" /> Music Reactions</>
          ) : serviceType === 'ugc' ? (
            <><Play className="h-3 w-3" /> UGC & Reels</>
          ) : serviceType === 'business' ? (
            <><TrendingUp className="h-3 w-3" /> Brand Ambassadors · Business Content</>
          ) : serviceType === 'commercial' ? (
            <><Film className="h-3 w-3" /> Commercials & Speaking Roles</>
          ) : serviceType === 'event' ? (
            <><Sparkles className="h-3 w-3" /> Events & Hosting</>
          ) : serviceType === 'bottle' ? (
            <><Wine className="h-3 w-3" /> Bottle Girls / VIP Hostesses</>
          ) : serviceType === 'shoot' ? (
            <><Camera className="h-3 w-3" /> Shoots & Videos</>
          ) : (
            <><MapPin className="h-3 w-3" /> Influence Agency</>
          )}
        </p>
        <h1 className="font-display font-light italic text-white mb-2" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
          {selectedModel ? `Book ${selectedModel}` : serviceType === 'reaction' ? 'Get Your Music Heard' : serviceType === 'ugc' ? 'Get Content Created' : serviceType === 'business' ? 'Models at Your Business' : serviceType === 'commercial' ? 'Book Your Commercial' : serviceType === 'event' ? 'Book Event Models' : serviceType === 'bottle' ? 'Book Bottle Girls / VIP Hostesses' : serviceType === 'shoot' ? 'Book Your Shoot' : 'What Do You Need?'}
        </h1>
        {selectedModel && (
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-[#c9a96e]/30 bg-[#c9a96e]/5">
              <Check className="h-3 w-3" style={{ color: gold }} />
              <span className="text-[11px] font-bold tracking-wide" style={{ color: gold }}>Booking: {selectedModel}</span>
            </div>
            <button onClick={() => setSelectedModel(null)} className="text-white/30 hover:text-white/60 text-[10px] tracking-widest uppercase transition-colors">Change</button>
          </div>
        )}
        {/* Progress steps */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => i < step && setStep(i)}
              >
                <div
                  className="w-7 h-7 flex items-center justify-center text-[10px] font-bold transition-all duration-300 border"
                  style={{
                    backgroundColor: i < step ? gold : 'transparent',
                    borderColor: i < step ? gold : i === step ? gold : 'rgba(255,255,255,0.1)',
                    color: i < step ? '#000' : i === step ? gold : 'rgba(255,255,255,0.2)',
                  }}
                >
                  {i < step ? <Check className="h-3 w-3" /> : i + 1}
                </div>
                <span
                  className="text-[10px] tracking-widest uppercase hidden sm:block"
                  style={{ color: i === step ? 'white' : i < step ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)' }}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-6 md:w-10 h-px mx-1 transition-all duration-300" style={{ backgroundColor: i < step ? gold : 'rgba(255,255,255,0.07)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected service banner — always visible after step 0 */}
      {step >= 1 && serviceType && (
        <div className="px-6 md:px-14 py-3 border-b border-white/[0.04] bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: gold }} />
            <p className="text-white/60 text-sm font-semibold">
              {serviceType === 'business' ? 'Models at Your Business' : serviceType === 'shoot' ? 'Shoots & Music Videos' : serviceType === 'commercial' ? 'Commercials & Speaking Roles' : serviceType === 'event' ? 'Events & Hosting' : serviceType === 'bottle' ? 'Bottle Girls / VIP Hostesses' : serviceType === 'reaction' ? 'Music Reactions' : 'UGC & Branded Reels'}
            </p>
            <span className="text-white/20 text-xs">
              {clientType === 'in-person' ? '· In-Person' : '· Remote'}
            </span>
          </div>
          <button onClick={() => { setStep(0); setServiceType(null); setBookingType(null); }} className="text-[10px] tracking-widest uppercase text-white/25 hover:text-white/50 transition-colors">
            Change
          </button>
        </div>
      )}

      {/* Step Content */}
      <div ref={stepRef} className="flex-1 px-6 md:px-14 py-4 overflow-y-auto" key={step} style={{ animation: 'fadeIn 0.3s ease-out' }}>

        {/* ── STEP 0: Pick Your Scenario (3 options) ── */}
        {step === 0 && (
          <div className="max-w-3xl">
            <h2 className="font-display font-light italic text-white text-xl md:text-2xl mb-1">What are you looking for?</h2>
            <p className="text-white/35 text-xs mb-4">Pick the option that best describes you — then choose your specific service.</p>

            <div className="flex flex-col gap-2.5">
              {SCENARIOS.map(({ id, Icon, title, desc, services }) => (
                <button
                  key={id}
                  onClick={() => { setScenario(id); setStep(1); }}
                  className="w-full text-left p-4 border transition-all duration-200 group rounded-sm"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.01)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                      <Icon className="h-5 w-5 text-white/40 group-hover:text-[#c9a96e] transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 font-bold text-sm group-hover:text-[#c9a96e] transition-colors">{title}</p>
                      <p className="text-white/35 text-xs mt-1 leading-relaxed">{desc}</p>
                      <p className="text-white/20 text-[10px] mt-2 tracking-wider uppercase">{services.length} services · From {Math.min(...services.map(s => {
                        const prices: Record<ServiceType, number> = { business: 300, ugc: 300, commercial: 599, musicvideo: 500, reaction: 300, shoot: 300, event: 400, bottle: 400 };
                        return prices[s];
                      })) === 300 ? '$300' : '$400'}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-[#c9a96e] transition-colors mt-1" />
                  </div>
                </button>
              ))}
            </div>

            {/* Not sure? */}
            <div className="mt-6 p-4 border border-white/[0.04] bg-white/[0.01] flex items-center justify-between gap-4">
              <p className="text-white/40 text-sm">Not sure? <span className="text-white/25">We'll help you pick in 2 min</span></p>
              <a
                href="tel:+15615520392"
                className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all hover:opacity-80 shrink-0"
                style={{ backgroundColor: gold, color: '#000' }}
              >
                <Phone className="h-3 w-3" /> Call
              </a>
            </div>
          </div>
        )}

        {/* ── STEP 1: Pick Service within Scenario ── */}
        {step === 1 && scenario && (
          <div className="max-w-3xl">
            <button 
              onClick={() => setStep(0)} 
              className="text-white/30 hover:text-white/60 text-[11px] tracking-widest uppercase flex items-center gap-1 mb-3"
            >
              <ChevronLeft className="h-3 w-3" /> Back
            </button>
            <h2 className="font-display font-light italic text-white text-xl md:text-2xl mb-1">
              {SCENARIOS.find(s => s.id === scenario)?.title}
            </h2>
            <p className="text-white/35 text-xs mb-4">Select the specific service you need:</p>

            <div className="grid gap-1.5">
              {SCENARIOS.find(s => s.id === scenario)?.services.map(svcId => {
                const serviceInfo: Record<ServiceType, { title: string; desc: string; client: 'in-person' | 'social'; from: string; tag: string }> = {
                  business:   { title: 'Models at Your Business', desc: 'A model visits your location and creates reels, stories & promo content on-site.', client: 'in-person', from: '$300', tag: 'In-Person · South Florida' },
                  ugc:        { title: 'UGC & Branded Reels', desc: 'Models create branded skits, promos & short-form content to your brief.', client: 'social', from: '$300', tag: 'Remote · Nationwide' },
                  commercial: { title: 'Commercials & Speaking Roles', desc: 'Models with script reading, dialogue, voiceover & acting for TV, web & brand commercials.', client: 'in-person', from: '$599', tag: 'In-Person · South Florida' },
                  musicvideo: { title: 'Music Videos', desc: 'Book models specifically for your music video — featured roles, lead talent, or full video cast.', client: 'in-person', from: '$500', tag: 'In-Person · South Florida' },
                  reaction:   { title: 'Music Reactions', desc: 'Models listen & react to your songs on camera. First-listen reactions & livestreams.', client: 'social', from: '$300', tag: 'Remote · Nationwide' },
                  shoot:      { title: 'Photo Shoots', desc: 'Book models for brand shoots, fashion editorials, lookbooks, or non-speaking productions.', client: 'in-person', from: '$300', tag: 'In-Person · South Florida' },
                  event:      { title: 'Events & Hosting', desc: 'Models for brand activations, parties, trade shows & promotional appearances.', client: 'in-person', from: '$400/girl', tag: 'In-Person · South Florida' },
                  bottle:     { title: 'Bottle Girls / VIP Hostesses', desc: 'Dedicated bottle service girls for nightclubs, lounges & VIP sections.', client: 'in-person', from: '$400/girl', tag: 'In-Person · South Florida' },
                };
                const info = serviceInfo[svcId];
                const active = serviceType === svcId;
                const Icon = [TrendingUp, Play, Film, Music, Headphones, Camera, Sparkles, Wine][['business', 'ugc', 'commercial', 'musicvideo', 'reaction', 'shoot', 'event', 'bottle'].indexOf(svcId)];
                return (
                  <button
                    key={svcId}
                    onClick={() => { setClientType(info.client); chooseService(svcId); }}
                    className="w-full text-left p-3 md:p-4 border transition-all duration-300 flex items-center gap-4"
                    style={{
                      borderColor: active ? gold : 'rgba(255,255,255,0.08)',
                      backgroundColor: active ? 'rgba(201,169,110,0.04)' : 'rgba(255,255,255,0.01)',
                    }}
                  >
                    <div className="w-10 h-10 border flex items-center justify-center flex-shrink-0" style={{ borderColor: active ? gold : 'rgba(255,255,255,0.1)' }}>
                      <Icon className="h-5 w-5" style={{ color: active ? gold : 'rgba(255,255,255,0.35)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm md:text-base">{info.title}</h3>
                      <p className="text-white/40 text-xs leading-relaxed mt-0.5 hidden lg:block">{info.desc}</p>
                      <p className="text-[10px] tracking-[0.2em] uppercase mt-1 font-bold" style={{ color: active ? gold : 'rgba(255,255,255,0.25)' }}>{info.tag}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-display font-bold italic text-lg" style={{ color: gold }}>{info.from}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 2: Booking Type ── */}
        {step === 2 && scenario && (
          <div>
            <button 
              onClick={() => setStep(1)} 
              className="text-white/30 hover:text-white/60 text-[11px] tracking-widest uppercase flex items-center gap-1 mb-3"
            >
              <ChevronLeft className="h-3 w-3" /> Back to Services
            </button>
            <h2 className="font-display font-light italic text-white text-3xl md:text-4xl mb-2">How would you like to book?</h2>
            <p className="text-white/35 text-sm mb-10">One-time booking or monthly recurring access</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              {[
                {
                  type: 'one-time' as const,
                  Icon: CalendarDays,
                  title: 'One-Time Booking',
                  desc: serviceType === 'reaction'
                    ? 'Order a batch of reaction videos or one livestream session for a specific release.'
                    : serviceType === 'ugc'
                    ? 'Order a set of branded reels or skits for a specific campaign or product launch.'
                    : serviceType === 'business'
                    ? 'Book a model to visit your business on a specific date and create content on-site.'
                    : serviceType === 'commercial'
                    ? 'Book models/actresses for a specific commercial production with script, dialogue & spoken roles.'
                    : serviceType === 'event'
                    ? 'Book models for a specific event, party, or activation. Pay once — no commitment.'
                    : serviceType === 'bottle'
                    ? 'Book bottle girls / VIP hostesses for a specific night. Pay once — no commitment.'
                    : 'Book models for a specific shoot date. Perfect for a single production.',
                  detail: 'Pay once · No commitment · Flexible scheduling',
                  badge: '',
                },
                {
                  type: 'monthly' as const,
                  Icon: RefreshCcw,
                  title: 'Monthly Subscription',
                  desc: serviceType === 'reaction'
                    ? 'Get recurring reaction content each month — consistent promo for every release. Best for artists dropping regularly.'
                    : serviceType === 'ugc'
                    ? 'Fresh branded reels delivered every month — keep your feed active & algorithm-friendly. Best for brands needing ongoing content.'
                    : serviceType === 'business'
                    ? 'A model visits your business on a recurring schedule — like having your own brand ambassador on retainer.'
                    : serviceType === 'commercial'
                    ? 'Ongoing commercial production access — dedicated talent for recurring ad campaigns & brand spots every month.'
                    : serviceType === 'event'
                    ? 'Lock in girls for your venue every month — same rate, priority scheduling, no hassle. Best for clubs, lounges & recurring events.'
                    : serviceType === 'bottle'
                    ? 'Lock in your bottle girl team every month — guaranteed availability, same rate, priority scheduling. Best for nightclubs & venues.'
                    : 'Monthly access to our model roster for ongoing shoots. Priority scheduling + locked-in rates.',
                  detail: 'Monthly billing · Priority booking · Cancel anytime',
                  badge: 'Save up to 40%',
                },
              ].map(({ type, Icon, title, desc, detail, badge }) => {
                const active = bookingType === type;
                return (
                  <button
                    key={type}
                    onClick={() => chooseBooking(type)}
                    className="text-left p-8 border transition-all duration-300"
                    style={{
                      borderColor: active ? gold : 'rgba(255,255,255,0.08)',
                      backgroundColor: active ? 'rgba(201,169,110,0.04)' : 'rgba(255,255,255,0.01)',
                    }}
                  >
                    {badge && (
                      <div className="mb-4">
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 bg-green-500/15 text-green-400 border border-green-500/20">
                          {badge}
                        </span>
                      </div>
                    )}
                    <div className="w-12 h-12 border flex items-center justify-center mb-6" style={{ borderColor: active ? gold : 'rgba(255,255,255,0.1)' }}>
                      <Icon className="h-5 w-5" style={{ color: active ? gold : 'rgba(255,255,255,0.35)' }} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                    <p className="text-white/35 text-sm leading-relaxed mb-4">{desc}</p>
                    <p className="text-[11px] tracking-wide" style={{ color: active ? gold : 'rgba(255,255,255,0.2)' }}>{detail}</p>
                    {active && (
                      <div className="mt-5 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase" style={{ color: gold }}>
                        <Check className="h-3 w-3" /> Selected
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 4: Budget-First Auto-Select ── */}
        {step === 4 && pkg && (
          <div className="max-w-2xl">
            {/* Promo banner */}
            <div className="mb-6 border border-amber-500/20 bg-amber-500/[0.04] px-4 py-3 flex items-center gap-3">
              <Zap className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <p className="text-amber-200/80 text-xs">
                <span className="font-bold">Summer 2026 Special</span> — all packages at promotional pricing. Lock in these rates before they go up.
              </p>
            </div>

            <h2 className="font-display font-light italic text-white text-3xl md:text-4xl mb-2">
              Choose your package.
            </h2>
            <p className="text-white/35 text-sm mb-2">We picked the best match for your budget — drag the slider or tap below to explore more.</p>
            <div className="flex items-center gap-2 mb-10 px-3 py-2 border border-white/[0.06] bg-white/[0.02] w-fit">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: gold }} />
              <p className="text-white/60 text-xs font-semibold">
                {serviceType === 'reaction' ? 'Music Reactions' : serviceType === 'ugc' ? 'UGC & Branded Reels' : serviceType === 'business' ? 'Models at Your Business' : serviceType === 'event' ? 'Events & Hosting' : serviceType === 'bottle' ? 'Bottle Girls / VIP Hostesses' : serviceType === 'commercial' ? 'Commercials & Speaking Roles' : 'Shoots & Music Videos'}
              </p>
              <span className="text-white/25 text-xs">·</span>
              <p className="text-white/40 text-xs">{bookingType === 'monthly' ? 'Monthly Subscription' : 'One-Time Booking'}</p>
            </div>

            {/* Package tier slider — each notch = a different package */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase">
                  {bookingType === 'monthly' ? 'Monthly Package' : 'Choose Your Package'}
                </p>
                <div className="text-right">
                  <p className="font-display font-bold italic text-white" style={{ fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1, color: gold }}>
                    ${(packages[sliderIdx >= 0 ? sliderIdx : autoIdx]?.price || 250).toLocaleString()}{bookingType === 'monthly' ? '/mo' : ''}
                  </p>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={packages.length - 1}
                step={1}
                value={sliderIdx >= 0 ? sliderIdx : autoIdx}
                onChange={e => { const idx = Number(e.target.value); setSliderIdx(idx); setBudget(packages[idx]?.price || 250); }}
                className="booking-slider w-full h-2 appearance-none cursor-pointer rounded-full"
                style={{
                  background: `linear-gradient(to right, ${gold} ${(((sliderIdx >= 0 ? sliderIdx : autoIdx)) / Math.max(packages.length - 1, 1)) * 100}%, rgba(255,255,255,0.08) ${(((sliderIdx >= 0 ? sliderIdx : autoIdx)) / Math.max(packages.length - 1, 1)) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-[10px] text-white/20 uppercase tracking-widest mt-2">
                <span>{packages[0]?.name || ''} · ${(packages[0]?.price || 250).toLocaleString()}</span>
                <span>{packages[packages.length - 1]?.name || ''} · ${(packages[packages.length - 1]?.price || 6000).toLocaleString()}{bookingType === 'monthly' ? '/mo' : ''}</span>
              </div>
            </div>

            {/* Auto-selected package card */}
            {pkg && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Check className="h-4 w-4" style={{ color: gold }} />
                  <p className="text-white/50 text-[11px] tracking-[0.2em] uppercase font-bold">Best Match for Your Budget</p>
                </div>

                <div className="border p-7" style={{ borderColor: gold, backgroundColor: 'rgba(201,169,110,0.03)' }}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        {pkg.popular && (
                          <span className="text-[9px] font-bold tracking-[0.3em] uppercase px-2 py-1 inline-block" style={{ backgroundColor: gold, color: '#000' }}>
                            Most Popular
                          </span>
                        )}
                        {pkg.models > 1 && bookingType === 'monthly' && (
                          <span className="text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-1 inline-block bg-green-500/10 text-green-400 border border-green-500/20">
                            Best monthly rate
                          </span>
                        )}
                      </div>
                      <h3 className="font-display italic text-white text-3xl">{pkg.name}</h3>
                      <p className="text-white/40 text-sm mt-1">{pkg.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                          <p className="font-display italic text-2xl" style={{ color: gold }}>
                        ${pkg.price.toLocaleString()}{bookingType === 'monthly' ? '/mo' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {pkg.perks.map((perk: string) => (
                      <div key={perk} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: gold }} />
                        <span className="text-white/55 text-sm">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upgrade nudge */}
                {upgradePkg && (
                  <button
                    onClick={() => setBudget(upgradePkg.price)}
                    className="w-full mt-4 p-4 border border-dashed border-white/10 hover:border-[#c9a96e]/40 bg-white/[0.01] hover:bg-[#c9a96e]/[0.03] transition-all duration-300 flex items-center gap-4 group text-left"
                  >
                    <div className="w-10 h-10 border border-white/10 group-hover:border-[#c9a96e]/40 flex items-center justify-center flex-shrink-0 transition-colors">
                      <TrendingUp className="h-4 w-4 text-white/25 group-hover:text-[#c9a96e] transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-sm font-semibold group-hover:text-white transition-colors">
                        Upgrade to {upgradePkg.name} — {upgradePkg.models > pkg.models ? `+${upgradePkg.models - pkg.models} model${upgradePkg.models - pkg.models > 1 ? 's' : ''}` : 'more perks'}
                      </p>
                      <p className="text-white/25 text-xs">
                        Just ${(upgradePkg.price - pkg.price).toLocaleString()} more · <span className="text-green-400/60">most clients upgrade</span>
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/15 group-hover:text-[#c9a96e] transition-colors" />
                  </button>
                )}

              </>
            )}

            {/* Limited availability nudge */}
            <div className="mt-5 flex items-center gap-2 px-1">
              <Zap className="h-3 w-3 text-amber-400/60" />
              <p className="text-white/25 text-[11px]">
                <span className="text-amber-400/60 font-semibold">Limited availability</span> — {bookingType === 'monthly' ? 'only 3 monthly slots left this quarter · lock in this rate before pricing update' : 'promotional pricing ends soon · weekends fill up fast'}
              </p>
            </div>
          </div>
        )}

        {/* ── STEP 3: Details ── */}
        {step === 3 && (
          <div className="max-w-xl">
            <h2 className="font-display font-light italic text-white text-3xl md:text-4xl mb-2">Your Details</h2>
            <p className="text-white/35 text-sm mb-3">Enter your contact info so we can confirm your booking.</p>
            <div className="flex items-center gap-2 mb-8 px-3 py-2 border border-green-500/15 bg-green-500/[0.03]">
              <Check className="h-3.5 w-3.5 text-green-400/70 flex-shrink-0" />
              <p className="text-green-300/60 text-[11px]">Next step: choose your package and secure your date</p>
            </div>

            {/* Contact capture before showing packages */}
            <div className="mb-8 space-y-3">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/35">Your Contact Info</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
              />
            </div>

            <div className="space-y-5">
              

              {/* ── Videographer / Photographer Add-on — DISABLED until we partner with one ── */}

              {(serviceType === 'shoot' || serviceType === 'event' || serviceType === 'business') && (
                <div className="flex items-start gap-3 pt-3 border-t border-white/[0.06]">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                  <p className="text-white/25 text-xs leading-relaxed">
                    All in-person bookings are for the <span className="text-white/45">South Florida / Greater Miami</span> area. Travel outside the region may incur additional fees discussed during confirmation.
                  </p>
                </div>
              )}
              {serviceType === 'reaction' && (
                <div className="flex items-start gap-3 pt-3 border-t border-white/[0.06]">
                  <Headphones className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                  <p className="text-white/25 text-xs leading-relaxed">
                    Reaction videos are recorded <span className="text-white/45">remotely</span> and delivered as HD vertical video files ready to post. Typical turnaround is 3–5 business days.
                  </p>
                </div>
              )}
              {serviceType === 'ugc' && (
                <div className="flex items-start gap-3 pt-3 border-t border-white/[0.06]">
                  <Play className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                  <p className="text-white/25 text-xs leading-relaxed">
                    UGC content is created <span className="text-white/45">remotely</span> to your brief and delivered as HD vertical video files. Typical turnaround is 5–7 business days.
                  </p>
                </div>
              )}

              {/* Subscription nudge for one-time bookers */}
              {bookingType === 'one-time' && (
                <button
                  onClick={() => { setBookingType('monthly'); setStep(4); }}
                  className="w-full p-4 border border-dashed border-green-500/20 bg-green-500/[0.02] hover:bg-green-500/[0.05] transition-all duration-300 flex items-center gap-4 group text-left"
                >
                  <div className="w-10 h-10 border border-green-500/20 group-hover:border-green-400/40 flex items-center justify-center flex-shrink-0 transition-colors">
                    <RefreshCcw className="h-4 w-4 text-green-400/50 group-hover:text-green-400 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-green-300/70 text-sm font-semibold group-hover:text-green-300 transition-colors">
                      {serviceType === 'bottle' ? 'Lock in your bottle team monthly — save up to 40%' : serviceType === 'event' ? 'Subscribe for recurring event girls — save up to 40%' : serviceType === 'reaction' ? 'Get monthly reactions for every release — save up to 40%' : serviceType === 'ugc' ? 'Get fresh content every month — save up to 40%' : serviceType === 'business' ? 'Book your ambassador on retainer — save up to 40%' : 'Subscribe for recurring shoots — save up to 40%'}
                    </p>
                    <p className="text-white/25 text-xs">
                      Monthly billing · Priority scheduling · Cancel anytime
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-green-400/30 group-hover:text-green-400 transition-colors" />
                </button>
              )}

              {/* Cross-sell: contextual */}
              {serviceType === 'reaction' && (
                <Link
                  href="/model-booking"
                  onClick={() => { chooseService('ugc'); setStep(1); }}
                  className="w-full p-4 border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 flex items-center gap-4 group text-left"
                >
                  <div className="w-10 h-10 border border-white/10 group-hover:border-[#c9a96e]/40 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Play className="h-4 w-4 text-white/25 group-hover:text-[#c9a96e] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/50 text-sm font-semibold group-hover:text-white transition-colors">
                      Want promo skits & reels too? Add UGC content
                    </p>
                    <p className="text-white/25 text-xs">
                      Models create branded content to your brief — <span style={{ color: gold }}>from $300</span>
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/15 group-hover:text-[#c9a96e] transition-colors" />
                </Link>
              )}
              {serviceType === 'ugc' && (
                <Link
                  href="/model-booking"
                  onClick={() => { chooseService('reaction'); setStep(1); }}
                  className="w-full p-4 border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 flex items-center gap-4 group text-left"
                >
                  <div className="w-10 h-10 border border-white/10 group-hover:border-[#c9a96e]/40 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Headphones className="h-4 w-4 text-white/25 group-hover:text-[#c9a96e] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/50 text-sm font-semibold group-hover:text-white transition-colors">
                      Promoting a song? Add music reactions
                    </p>
                    <p className="text-white/25 text-xs">
                      Models listen & react to your music — <span style={{ color: gold }}>from $300</span>
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/15 group-hover:text-[#c9a96e] transition-colors" />
                </Link>
              )}
              {(serviceType === 'shoot' || serviceType === 'event' || serviceType === 'business') && (
                <Link
                  href="/model-booking"
                  onClick={() => { chooseService('ugc'); setStep(1); }}
                  className="w-full p-4 border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 flex items-center gap-4 group text-left"
                >
                  <div className="w-10 h-10 border border-white/10 group-hover:border-[#c9a96e]/40 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Play className="h-4 w-4 text-white/25 group-hover:text-[#c9a96e] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/50 text-sm font-semibold group-hover:text-white transition-colors">
                      Need social media content too? Add UGC reels
                    </p>
                    <p className="text-white/25 text-xs">
                      Branded skits & promos delivered to you — <span style={{ color: gold }}>from $300</span>
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/15 group-hover:text-[#c9a96e] transition-colors" />
                </Link>
              )}
              {serviceType === 'bottle' && (
                <Link
                  href="/model-booking"
                  onClick={() => { chooseService('event'); setStep(1); }}
                  className="w-full p-4 border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 flex items-center gap-4 group text-left"
                >
                  <div className="w-10 h-10 border border-white/10 group-hover:border-[#c9a96e]/40 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Sparkles className="h-4 w-4 text-white/25 group-hover:text-[#c9a96e] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/50 text-sm font-semibold group-hover:text-white transition-colors">
                      Need event models too? Add promo hosting
                    </p>
                    <p className="text-white/25 text-xs">
                      Promo models for appearances & activations — <span style={{ color: gold }}>from $400</span>
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/15 group-hover:text-[#c9a96e] transition-colors" />
                </Link>
              )}
              {serviceType === 'commercial' && (
                <Link
                  href="/model-booking"
                  onClick={() => { chooseService('shoot'); setStep(1); }}
                  className="w-full p-4 border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 flex items-center gap-4 group text-left"
                >
                  <div className="w-10 h-10 border border-white/10 group-hover:border-[#c9a96e]/40 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Camera className="h-4 w-4 text-white/25 group-hover:text-[#c9a96e] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/50 text-sm font-semibold group-hover:text-white transition-colors">
                      Need non-speaking models too? Add a shoot
                    </p>
                    <p className="text-white/25 text-xs">
                      Music videos, brand shoots & editorials — <span style={{ color: gold }}>from $300</span>
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/15 group-hover:text-[#c9a96e] transition-colors" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="px-6 md:px-14 py-6 border-t border-white/[0.06] flex items-center justify-between sticky bottom-0 bg-[#080808]">
        <button
          onClick={() => { setStep(s => s - 1); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50); }}
          disabled={step === 0}
          className="flex items-center gap-2 text-sm tracking-widest uppercase text-white/30 hover:text-white transition-colors disabled:opacity-0"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <div className="flex items-center gap-6">
          {pkg && step === 4 && (
            <p className="text-white/25 text-sm hidden sm:block">
              <span className="text-white/60 font-semibold">{pkg.name}</span>
              {' · '}
              <span style={{ color: gold }}>${pkg.price.toLocaleString()}{bookingType === 'monthly' ? '/mo' : ''}</span>
            </p>
          )}
          {step === 4 && canNext() && (
            <div className="items-center gap-1.5 text-white/20 text-[10px] hidden md:flex">
              <ShieldCheck className="h-3 w-3" /> Powered by Stripe · 256-bit SSL
            </div>
          )}

          <button
            onClick={goNext}
            disabled={!canNext() || sending}
            className="flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ backgroundColor: gold, color: '#000' }}
          >
{sending ? 'Redirecting to Payment...' : step === 4 ? (<><Lock className="h-3.5 w-3.5" /> Secure Checkout →</>) : step === 3 ? 'Choose Package →' : step === 2 && pkg ? `Continue with ${pkg.name} →` : 'Next →'}
          </button>
        </div>
      </div>
      {sendError && (
        <div className="px-6 md:px-14 py-3 bg-red-500/10 border-t border-red-500/20">
          <p className="text-red-400 text-sm text-center">{sendError}</p>
        </div>
      )}
    </div>
  );
}

export default function ModelBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <ModelBookingContent />
    </Suspense>
  );
}
