// Single source of truth for booking packages + prices (client UI and server checkout).
// ── Music Videos (dedicated service for artists) ──
export const MUSIC_VIDEO_OT = [
  {"id": "mv-cameo", "name": "Cameo · 1 Hour", "tagline": "1 model · up to 1 hr on set", "models": 1, "price": 199, "popular": false, "perks": ["1 model", "Up to 1 hour on set", "Styled & camera-ready", "South Florida location"]},
  {"id": "mv-cameo-2", "name": "Cameo · 2 Hours", "tagline": "1 model · up to 2 hrs on set", "models": 1, "price": 249, "popular": false, "perks": ["1 model", "Up to 2 hours on set", "Styled & camera-ready", "South Florida location"]},
  {"id": "mv-featured", "name": "Featured", "tagline": "1 model · half day (up to 5 hrs)", "models": 1, "price": 450, "popular": true, "perks": ["1 model", "Half day, up to 5 hours on set", "Styled & camera-ready", "South Florida location"]},
  {"id": "mv-lead", "name": "Lead", "tagline": "1 lead model · full day (up to 10 hrs)", "models": 1, "price": 950, "popular": false, "perks": ["1 lead model", "Full day, up to 10 hours on set", "Styled & camera-ready", "South Florida location"]},
  {"id": "mv-ensemble", "name": "Ensemble", "tagline": "3 models · full day", "models": 3, "price": 1950, "popular": false, "perks": ["3 models", "Full day, up to 10 hours on set", "+$550 per extra model", "South Florida location"]},
  {"id": "mv-ensemble-4", "name": "Ensemble 4", "tagline": "4 models · full day", "models": 4, "price": 2500, "popular": false, "perks": ["4 models", "Full day, up to 10 hours on set", "+$550 per extra model", "South Florida location"]},
  {"id": "mv-ensemble-5", "name": "Ensemble 5", "tagline": "5 models · full day", "models": 5, "price": 3050, "popular": false, "perks": ["5 models", "Full day, up to 10 hours on set", "+$550 per extra model", "South Florida location"]},
];

export const SHOOT_OT = [
  {"id": "shoot-1-half", "name": "Half Day", "tagline": "1 model · half day (up to 5 hrs)", "models": 1, "price": 600, "popular": false, "perks": ["1 professional model", "Half day (up to 5 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%"]},
  {"id": "shoot-1-full", "name": "Full Day", "tagline": "1 model · full day (up to 10 hrs)", "models": 1, "price": 1200, "popular": true, "perks": ["1 professional model", "Full day (up to 10 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%"]},
  {"id": "shoot-2-half", "name": "Half Day · 2 Models", "tagline": "2 models · half day (up to 5 hrs)", "models": 2, "price": 1150, "popular": false, "perks": ["2 professional models", "Half day (up to 5 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%"]},
  {"id": "shoot-2-full", "name": "Full Day · 2 Models", "tagline": "2 models · full day (up to 10 hrs)", "models": 2, "price": 2300, "popular": false, "perks": ["2 professional models", "Full day (up to 10 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%"]},
  {"id": "shoot-3-half", "name": "Half Day · 3 Models", "tagline": "3 models · half day (up to 5 hrs)", "models": 3, "price": 1700, "popular": false, "perks": ["3 professional models", "Half day (up to 5 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%"]},
  {"id": "shoot-3-full", "name": "Full Day · 3 Models", "tagline": "3 models · full day (up to 10 hrs)", "models": 3, "price": 3400, "popular": false, "perks": ["3 professional models", "Full day (up to 10 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%"]},
  {"id": "shoot-5-half", "name": "Half Day · 5 Models", "tagline": "5 models · half day (up to 5 hrs)", "models": 5, "price": 2750, "popular": false, "perks": ["5 professional models", "Half day (up to 5 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%"]},
  {"id": "shoot-5-full", "name": "Full Day · 5 Models", "tagline": "5 models · full day (up to 10 hrs)", "models": 5, "price": 5500, "popular": false, "perks": ["5 professional models", "Full day (up to 10 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%", "On-set coordinator"]},
  {"id": "shoot-10-half", "name": "Half Day · 10 Models", "tagline": "10 models · half day (up to 5 hrs)", "models": 10, "price": 5500, "popular": false, "perks": ["10 professional models", "Half day (up to 5 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%", "On-set coordinator"]},
  {"id": "shoot-10-full", "name": "Full Day · 10 Models", "tagline": "10 models · full day (up to 10 hrs)", "models": 10, "price": 11000, "popular": false, "perks": ["10 professional models", "Full day (up to 10 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%", "Production coordinator"]},
  {"id": "shoot-15-full", "name": "Full Day · 15 Models", "tagline": "15 models · full day (up to 10 hrs)", "models": 15, "price": 16000, "popular": false, "perks": ["15 professional models", "Full day (up to 10 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%", "Production coordinator"]},
  {"id": "shoot-20-full", "name": "Full Day · 20 Models", "tagline": "20 models · full day (up to 10 hrs)", "models": 20, "price": 21000, "popular": false, "perks": ["20 professional models", "Full day (up to 10 hrs)", "Web & social usage included", "Paid ads / broadcast usage +50%", "Production coordinator"]},
];

// Events: $95/hr per person, 4-hour minimum
export const EVENT_OT = [
  {"id": "1-girl", "name": "1 Model", "tagline": "1 model · 4hr appearance · $95/hr each", "models": 1, "price": 380, "popular": false, "perks": ["1 model", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida"]},
  {"id": "2-girls", "name": "2 Models", "tagline": "2 models · 4hr appearance · $95/hr each", "models": 2, "price": 760, "popular": false, "perks": ["2 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida"]},
  {"id": "3-girls", "name": "3 Models", "tagline": "3 models · 4hr appearance · $95/hr each", "models": 3, "price": 1140, "popular": true, "perks": ["3 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida"]},
  {"id": "5-girls", "name": "5 Models", "tagline": "5 models · 4hr appearance · $95/hr each", "models": 5, "price": 1900, "popular": false, "perks": ["5 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida"]},
  {"id": "8-girls", "name": "8 Models", "tagline": "8 models · 4hr appearance · $95/hr each", "models": 8, "price": 3040, "popular": false, "perks": ["8 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida"]},
  {"id": "10-girls", "name": "10 Models", "tagline": "10 models · 4hr appearance · $95/hr each", "models": 10, "price": 3800, "popular": false, "perks": ["10 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida", "Dedicated on-site lead"]},
  {"id": "15-girls", "name": "15 Models", "tagline": "15 models · 4hr appearance · $95/hr each", "models": 15, "price": 5700, "popular": false, "perks": ["15 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida", "Dedicated on-site lead"]},
  {"id": "25-girls", "name": "25 Models", "tagline": "25 models · 4hr appearance · $95/hr each", "models": 25, "price": 9500, "popular": false, "perks": ["25 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida", "Dedicated on-site lead"]},
  {"id": "40-girls", "name": "40 Models", "tagline": "40 models · 4hr appearance · $95/hr each", "models": 40, "price": 15200, "popular": false, "perks": ["40 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida", "Dedicated on-site lead"]},
  {"id": "50-girls", "name": "50 Models", "tagline": "50 models · 4hr appearance · $95/hr each", "models": 50, "price": 19000, "popular": false, "perks": ["50 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida", "Dedicated on-site lead"]},
  {"id": "75-girls", "name": "75 Models", "tagline": "75 models · 4hr appearance · $95/hr each", "models": 75, "price": 28500, "popular": false, "perks": ["75 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida", "Dedicated on-site lead"]},
  {"id": "100-girls", "name": "100 Models", "tagline": "100 models · 4hr appearance · $95/hr each", "models": 100, "price": 38000, "popular": false, "perks": ["100 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida", "Dedicated on-site lead"]},
  {"id": "150-girls", "name": "150 Models", "tagline": "150 models · 4hr appearance · $95/hr each", "models": 150, "price": 57000, "popular": false, "perks": ["150 models", "4-hour minimum ($95/hr per person)", "Event-ready & styled", "South Florida", "Dedicated on-site lead"]},
];

export const SHOOT_MO = [
  {"id": "starter-s", "name": "Starter", "tagline": "1 model × 4 half days/mo · 30% off one-time rate", "models": 1, "days": 4, "price": 1680, "popular": false, "perks": ["1 model per shoot", "4 half-day shoots / month", "Priority scheduling", "30% off one-time rate"]},
  {"id": "studio-s", "name": "Studio", "tagline": "2 models × 4 half days/mo · 30% off one-time rate", "models": 2, "days": 4, "price": 3360, "popular": true, "perks": ["2 models per shoot", "4 half-day shoots / month", "Priority scheduling", "30% off one-time rate"]},
  {"id": "pro-s", "name": "Pro", "tagline": "3 models × 8 half days/mo · 30% off one-time rate", "models": 3, "days": 8, "price": 10080, "popular": false, "perks": ["3 models per shoot", "8 half-day shoots / month", "Priority scheduling", "30% off one-time rate"]},
  {"id": "agency-s", "name": "Agency", "tagline": "5 models × 8 half days/mo · 30% off one-time rate", "models": 5, "days": 8, "price": 16800, "popular": false, "perks": ["5 models per shoot", "8 half-day shoots / month", "Priority scheduling", "30% off one-time rate"]},
  {"id": "elite-s", "name": "Elite", "tagline": "10 models × 8 half days/mo · 30% off one-time rate", "models": 10, "days": 8, "price": 33600, "popular": false, "perks": ["10 models per shoot", "8 half-day shoots / month", "Priority scheduling", "30% off one-time rate"]},
];

// Monthly: 30% off the one-time rate
export const EVENT_MO = [
  {"id": "venue-starter", "name": "Venue Starter", "tagline": "2 models × 4 events/mo · 30% off one-time rate", "models": 2, "events": 4, "price": 2130, "popular": false, "perks": ["2 per event", "4 events / month", "Dedicated coordinator", "30% off one-time rate"]},
  {"id": "venue-growth", "name": "Venue Growth", "tagline": "3 models × 8 events/mo · 30% off one-time rate", "models": 3, "events": 8, "price": 6380, "popular": true, "perks": ["3 per event", "8 events / month", "Dedicated coordinator", "30% off one-time rate"]},
  {"id": "venue-pro", "name": "Venue Pro", "tagline": "5 models × 12 events/mo · 30% off one-time rate", "models": 5, "events": 12, "price": 15960, "popular": false, "perks": ["5 per event", "12 events / month", "Dedicated coordinator", "30% off one-time rate"]},
  {"id": "venue-elite", "name": "Venue Elite", "tagline": "8 models × 12 events/mo · 30% off one-time rate", "models": 8, "events": 12, "price": 25540, "popular": false, "perks": ["8 per event", "12 events / month", "Dedicated coordinator", "30% off one-time rate"]},
  {"id": "venue-mega", "name": "Venue Mega", "tagline": "10 models × 16 events/mo · 30% off one-time rate", "models": 10, "events": 16, "price": 42560, "popular": false, "perks": ["10 per event", "16 events / month", "Dedicated coordinator", "30% off one-time rate"]},
  {"id": "venue-takeover", "name": "Venue Takeover", "tagline": "15 models × 16 events/mo · 30% off one-time rate", "models": 15, "events": 16, "price": 63840, "popular": false, "perks": ["15 per event", "16 events / month", "Dedicated coordinator", "30% off one-time rate"]},
];

// ── Bottle Girls / VIP Hostess Service ──
// $95/hr per hostess, 4-hour minimum
export const BOTTLE_OT = [
  {"id": "bottle-1", "name": "1 Bottle Girl", "tagline": "1 VIP hostess · 4hr shift · $95/hr each", "models": 1, "price": 380, "popular": false, "perks": ["1 VIP hostess", "4-hour minimum ($95/hr per person)", "Bottle service & VIP table experience", "South Florida"]},
  {"id": "bottle-2", "name": "2 Bottle Girls", "tagline": "2 VIP hostesses · 4hr shift · $95/hr each", "models": 2, "price": 760, "popular": false, "perks": ["2 VIP hostesses", "4-hour minimum ($95/hr per person)", "Bottle service & VIP table experience", "South Florida"]},
  {"id": "bottle-3", "name": "3 Bottle Girls", "tagline": "3 VIP hostesses · 4hr shift · $95/hr each", "models": 3, "price": 1140, "popular": true, "perks": ["3 VIP hostesses", "4-hour minimum ($95/hr per person)", "Bottle service & VIP table experience", "South Florida"]},
  {"id": "bottle-5", "name": "5 Bottle Girls", "tagline": "5 VIP hostesses · 4hr shift · $95/hr each", "models": 5, "price": 1900, "popular": false, "perks": ["5 VIP hostesses", "4-hour minimum ($95/hr per person)", "Bottle service & VIP table experience", "South Florida"]},
  {"id": "bottle-8", "name": "8 Bottle Girls", "tagline": "8 VIP hostesses · 4hr shift · $95/hr each", "models": 8, "price": 3040, "popular": false, "perks": ["8 VIP hostesses", "4-hour minimum ($95/hr per person)", "Bottle service & VIP table experience", "South Florida"]},
  {"id": "bottle-10", "name": "10 Bottle Girls", "tagline": "10 VIP hostesses · 4hr shift · $95/hr each", "models": 10, "price": 3800, "popular": false, "perks": ["10 VIP hostesses", "4-hour minimum ($95/hr per person)", "Bottle service & VIP table experience", "South Florida", "On-site coordinator"]},
  {"id": "bottle-15", "name": "15 Bottle Girls", "tagline": "15 VIP hostesses · 4hr shift · $95/hr each", "models": 15, "price": 5700, "popular": false, "perks": ["15 VIP hostesses", "4-hour minimum ($95/hr per person)", "Bottle service & VIP table experience", "South Florida", "On-site coordinator"]},
  {"id": "bottle-20", "name": "20 Bottle Girls", "tagline": "20 VIP hostesses · 4hr shift · $95/hr each", "models": 20, "price": 7600, "popular": false, "perks": ["20 VIP hostesses", "4-hour minimum ($95/hr per person)", "Bottle service & VIP table experience", "South Florida", "On-site coordinator"]},
];

export const BOTTLE_MO = [
  {"id": "bottle-mo-starter", "name": "Venue Starter", "tagline": "2 hostesses × 4 nights/mo · 30% off one-time rate", "models": 2, "events": 4, "price": 2130, "popular": false, "perks": ["2 per night", "4 nights / month", "Dedicated coordinator", "30% off one-time rate"]},
  {"id": "bottle-mo-growth", "name": "Venue Growth", "tagline": "3 hostesses × 8 nights/mo · 30% off one-time rate", "models": 3, "events": 8, "price": 6380, "popular": true, "perks": ["3 per night", "8 nights / month", "Dedicated coordinator", "30% off one-time rate"]},
  {"id": "bottle-mo-pro", "name": "Venue Pro", "tagline": "5 hostesses × 12 nights/mo · 30% off one-time rate", "models": 5, "events": 12, "price": 15960, "popular": false, "perks": ["5 per night", "12 nights / month", "Dedicated coordinator", "30% off one-time rate"]},
  {"id": "bottle-mo-elite", "name": "Venue Elite", "tagline": "8 hostesses × 16 nights/mo · 30% off one-time rate", "models": 8, "events": 16, "price": 34050, "popular": false, "perks": ["8 per night", "16 nights / month", "Dedicated coordinator", "30% off one-time rate"]},
  {"id": "bottle-mo-takeover", "name": "Venue Takeover", "tagline": "10 hostesses × 20 nights/mo · 30% off one-time rate", "models": 10, "events": 20, "price": 53200, "popular": false, "perks": ["10 per night", "20 nights / month", "Dedicated coordinator", "30% off one-time rate"]},
];

export const REACTION_OT = [
  {"id": "essential-r", "name": "Reaction", "tagline": "1 song · 1 creator reaction · posted", "models": 1, "price": 300, "popular": false, "perks": ["1 creator reacts to your song on camera", "Genuine first-listen reaction", "Posted to the creator's account", "HD vertical video delivered"]},
  {"id": "highreach-r", "name": "High-Reach Reaction", "tagline": "1 song · higher-reach creator · posted", "models": 1, "price": 500, "popular": true, "perks": ["1 higher-reach creator reaction", "Posted to the creator's account", "HD vertical video delivered", "Ready for all platforms"]},
  {"id": "launch-bundle", "name": "Launch Bundle", "tagline": "1 reaction + 3 story reposts", "models": 1, "price": 750, "popular": false, "perks": ["1 posted reaction video", "3 Instagram Story reposts", "Swipe-up / link sticker to your song", "Real creators, no bots"]},
  {"id": "premium-r", "name": "3 Reactions", "tagline": "3 songs or 3 creators · posted", "models": 3, "price": 800, "popular": false, "perks": ["3 posted reaction videos", "HD vertical videos", "Bundle discount applied"]},
  {"id": "elite-r", "name": "5 Reactions", "tagline": "5 songs or 5 creators · posted", "models": 5, "price": 1250, "popular": false, "perks": ["5 posted reaction videos", "$250 each", "Priority turnaround"]},
  {"id": "push-bundle", "name": "Push Bundle", "tagline": "3 reactions + 1 collab post + 5 story reposts", "models": 3, "price": 1750, "popular": false, "perks": ["3 posted reaction videos", "1 co-authored collab post", "5 Instagram Story reposts", "Real creators, no bots"]},
  {"id": "multi-model", "name": "9 Reactions", "tagline": "3 creators · 3 songs each", "models": 3, "price": 2250, "popular": false, "perks": ["3 creators react to 3 songs each", "9 posted reaction videos", "$250 each"]},
  {"id": "livestream", "name": "Livestream", "tagline": "Full album · 10+ tracks · live reaction", "models": 1, "price": 2500, "popular": false, "perks": ["Full album live reaction", "10+ tracks in one session", "Live broadcast + recording", "Edited highlights included"]},
  {"id": "premium-live", "name": "Premium Live", "tagline": "Full album · livestream + edited shorts", "models": 1, "price": 4000, "popular": false, "perks": ["Full album livestream", "Edited short-form clips per track", "Full VOD recording", "Social media ready assets"]},
  {"id": "viral-push", "name": "Album Push", "tagline": "5 creators · full album · livestreams", "models": 5, "price": 7500, "popular": false, "perks": ["5 creators react to your album", "Individual livestream per creator", "Edited highlights + shorts"]},
  {"id": "label-blast", "name": "Label Rollout", "tagline": "10 creators · full album · coordinated rollout", "models": 10, "price": 15000, "popular": false, "perks": ["10 creators react to your album", "Coordinated release-day push", "Livestreams + edited shorts", "Full campaign management"]},
];

export const REACTION_MO = [
  {"id": "essential-r-m", "name": "Essential", "tagline": "4 reactions/mo · 1 creator", "models": 1, "price": 840, "popular": false, "perks": ["4 posted reaction videos / month", "1 rotating creator", "30% off one-time rate"]},
  {"id": "professional-r-m", "name": "Professional", "tagline": "8 reactions/mo · 2 creators", "models": 2, "price": 1680, "popular": true, "perks": ["8 posted reaction videos / month", "2 rotating creators", "30% off one-time rate"]},
  {"id": "premium-r-m", "name": "Premium", "tagline": "15 reactions/mo + 1 live · 3 creators", "models": 3, "price": 4900, "popular": false, "perks": ["15 posted reaction videos / month", "1 livestream / month", "3 rotating creators", "30% off one-time rate"]},
  {"id": "elite-r-m", "name": "Elite", "tagline": "30 reactions/mo + 2 live · 5 creators", "models": 5, "price": 9800, "popular": false, "perks": ["30 posted reaction videos / month", "2 livestreams / month", "5 rotating creators", "30% off one-time rate"]},
];

export const UGC_OT = [
  {"id": "ugc-single", "name": "Single Video", "tagline": "1 creator · 1 UGC video", "models": 1, "price": 300, "popular": false, "perks": ["1 short-form UGC video (15–60s)", "Shot to your brief", "2 revisions", "Usage on your own site & organic social", "Paid-ad usage rights +30% (90 days)", "Raw footage +$75 · extra hook +$75"]},
  {"id": "ugc-3pack", "name": "3-Pack", "tagline": "3 UGC videos · different hooks", "models": 1, "price": 750, "popular": true, "perks": ["3 UGC videos ($250 each)", "Different hooks & angles", "2 revisions each", "Usage on your own site & organic social", "Paid-ad usage rights +30% (90 days)", "Raw footage +$75 · extra hook +$75"]},
  {"id": "ugc-10pack", "name": "10-Pack", "tagline": "10 UGC videos · up to 3 creators", "models": 3, "price": 2250, "popular": false, "perks": ["10 UGC videos ($225 each)", "Up to 3 creators", "Built for ad testing", "Usage on your own site & organic social", "Paid-ad usage rights +30% (90 days)", "Raw footage +$75 · extra hook +$75"]},
  {"id": "ugc-20", "name": "20 Videos", "tagline": "20 UGC videos · up to 5 creators", "models": 5, "price": 4500, "popular": false, "perks": ["20 UGC videos ($225 each)", "Up to 5 creators", "Content calendar", "Usage on your own site & organic social", "Paid-ad usage rights +30% (90 days)", "Raw footage +$75 · extra hook +$75"]},
  {"id": "ugc-40", "name": "40 Videos", "tagline": "40 UGC videos · up to 10 creators", "models": 10, "price": 9000, "popular": false, "perks": ["40 UGC videos ($225 each)", "Up to 10 creators", "Dedicated account manager", "Usage on your own site & organic social", "Paid-ad usage rights +30% (90 days)", "Raw footage +$75 · extra hook +$75"]},
];

export const UGC_MO = [
  {"id": "essential-u", "name": "Essential", "tagline": "4 UGC videos/mo · 1 creator", "models": 1, "price": 840, "popular": false, "perks": ["4 UGC videos / month", "1 rotating creator", "30% off one-time rate", "Paid-ad usage rights +30%"]},
  {"id": "professional-u", "name": "Professional", "tagline": "8 UGC videos/mo · 2 creators", "models": 2, "price": 1680, "popular": true, "perks": ["8 UGC videos / month", "2 rotating creators", "30% off one-time rate", "Paid-ad usage rights +30%"]},
  {"id": "premium-u", "name": "Premium", "tagline": "15 UGC videos/mo · 3 creators", "models": 3, "price": 3150, "popular": false, "perks": ["15 UGC videos / month", "3 rotating creators", "30% off one-time rate", "Paid-ad usage rights +30%"]},
  {"id": "elite-u", "name": "Elite", "tagline": "30 UGC videos/mo · 5 creators", "models": 5, "price": 6300, "popular": false, "perks": ["30 UGC videos / month", "5 rotating creators", "30% off one-time rate", "Paid-ad usage rights +30%"]},
];

// ── Brand Ambassadors (model comes to your business, creates reels/promos on-site) ──
export const BIZ_OT = [
  {"id": "biz-visit", "name": "Content Visit", "tagline": "1 creator · 2hr on-site · 1 Reel + 3 Stories posted", "models": 1, "price": 350, "popular": false, "perks": ["1 creator at your location", "2-hour content session", "1 Reel + 3 Stories posted", "Restaurants, hotels, venues & shops"]},
  {"id": "biz-halfday", "name": "Half-Day Visit", "tagline": "1 creator · 4hr · multiple looks & scenes", "models": 1, "price": 600, "popular": false, "perks": ["1 creator · 4-hour session", "Multiple setups", "1 Reel + 3 Stories posted + raw clips"]},
  {"id": "biz-visit-2", "name": "Duo Visit", "tagline": "2 creators · 2hr on-site", "models": 2, "price": 650, "popular": false, "perks": ["2 creators at your location", "2-hour content session", "2 Reels + 6 Stories posted"]},
  {"id": "biz-opening", "name": "Opening Night", "tagline": "3 creators · up to 4hr · launch or event night", "models": 3, "price": 1500, "popular": true, "perks": ["3 creators at your opening or event", "Up to 4 hours", "Each posts 1 Reel + 3 Stories", "Restaurant, hotel & nightlife launches"]},
  {"id": "biz-5", "name": "Takeover", "tagline": "5 creators · full day", "models": 5, "price": 4500, "popular": false, "perks": ["5 creators at your location", "Full day (up to 8 hours)", "5 Reels + 15 Stories posted"]},
  {"id": "biz-8", "name": "Grand Takeover", "tagline": "8 creators · full day", "models": 8, "price": 7000, "popular": false, "perks": ["8 creators at your location", "Full day (up to 8 hours)", "On-site coordinator"]},
  {"id": "biz-15", "name": "Multi-Location", "tagline": "15+ creators · multi-location", "models": 15, "price": 13000, "popular": false, "perks": ["15+ creators", "Multi-location coverage", "Dedicated production manager"]},
];

export const BIZ_MO = [
  {"id": "biz-essential-m", "name": "Essential", "tagline": "1 creator × 4 visits/mo", "models": 1, "price": 1100, "popular": false, "perks": ["4 content visits / month", "1 dedicated creator", "4 Reels + 12 Stories / month", "About 20% off one-time rate"]},
  {"id": "biz-professional-m", "name": "Monthly Campaign", "tagline": "2 creators × 5 visits/mo", "models": 2, "price": 2500, "popular": true, "perks": ["5 visits / month with 2 creators", "10 Reels + 30 Stories / month", "Content calendar planning", "About 20% off one-time rate"]},
  {"id": "biz-premium-m", "name": "Premium", "tagline": "3 creators × 8 visits/mo", "models": 3, "price": 6500, "popular": false, "perks": ["8 visits / month with 3 creators", "24 Reels / month", "Dedicated account manager", "About 20% off one-time rate"]},
];

// ── Commercial Productions (script reading, spoken roles, acting) ──
export const COMMERCIAL_OT = [
  {"id": "vo-web", "name": "Voiceover · Web & Social", "tagline": "1 voice · up to 60s spot · web/social usage", "models": 1, "price": 250, "popular": false, "perks": ["1 professional voice", "Up to 60-second spot", "Web & organic social usage", "2 revisions"]},
  {"id": "vo-broadcast", "name": "Voiceover · Broadcast", "tagline": "1 voice · local radio/TV · 13 weeks", "models": 1, "price": 450, "popular": false, "perks": ["1 professional voice", "Local radio or TV spot", "13-week usage (longer usage quoted)", "2 revisions"]},
  {"id": "comm-essential", "name": "Actor · Half Day", "tagline": "1 actor · half day · script & spoken role", "models": 1, "price": 750, "popular": true, "perks": ["1 on-camera actor", "Half day (up to 5 hours)", "Script reading & spoken delivery", "Web & social usage included", "Paid ads / broadcast usage quoted"]},
  {"id": "comm-elite", "name": "Actor · Full Day", "tagline": "1 actor · full day · multi-scene", "models": 1, "price": 1250, "popular": false, "perks": ["1 on-camera actor", "Full day (up to 10 hours)", "Multiple scenes & wardrobe changes", "Web & social usage included", "Paid ads / broadcast usage quoted"]},
  {"id": "comm-professional", "name": "2 Actors · Half Day", "tagline": "2 actors · half day · scripted commercial", "models": 2, "price": 1450, "popular": false, "perks": ["2 on-camera actors", "Half day (up to 5 hours)", "Scripted dialogue & interaction", "Paid ads / broadcast usage quoted"]},
  {"id": "comm-premium", "name": "3 Actors · Half Day", "tagline": "3 actors · half day", "models": 3, "price": 2100, "popular": false, "perks": ["3 on-camera actors", "Half day (up to 5 hours)", "Multi-person scripted scenes", "Paid ads / broadcast usage quoted"]},
  {"id": "comm-executive", "name": "2 Actors · Full Day", "tagline": "2 actors · full day", "models": 2, "price": 2400, "popular": false, "perks": ["2 on-camera actors", "Full day (up to 10 hours)", "Multi-scene scripted commercial", "Paid ads / broadcast usage quoted"]},
  {"id": "comm-vip", "name": "5 Actors · Half Day", "tagline": "5 actors · half day · large cast", "models": 5, "price": 3500, "popular": false, "perks": ["5 on-camera actors", "Half day (up to 5 hours)", "On-set coordinator included", "Paid ads / broadcast usage quoted"]},
  {"id": "comm-royal", "name": "5 Actors · Full Day", "tagline": "5 actors · full day", "models": 5, "price": 6000, "popular": false, "perks": ["5 on-camera actors", "Full day (up to 10 hours)", "On-set coordinator", "Paid ads / broadcast usage quoted"]},
  {"id": "comm-majestic", "name": "8 Actors · Full Day", "tagline": "8 actors · full day", "models": 8, "price": 9500, "popular": false, "perks": ["8 on-camera actors", "Full day production", "Production coordination", "Paid ads / broadcast usage quoted"]},
  {"id": "comm-blockbuster", "name": "15 Actors · Full Day", "tagline": "15 actors · full day", "models": 15, "price": 18000, "popular": false, "perks": ["15 on-camera actors", "Full day production", "Production team + casting", "Paid ads / broadcast usage quoted"]},
];

export const COMMERCIAL_MO = [
  {"id": "comm-essential-m", "name": "Essential", "tagline": "2 actor days/mo · 1 actor", "models": 1, "price": 1750, "popular": false, "perks": ["2 full actor days / month", "1 rotating actor", "30% off one-time rate"]},
  {"id": "comm-professional-m", "name": "Professional", "tagline": "4 actor days/mo · 2 actors", "models": 2, "price": 3500, "popular": true, "perks": ["4 full actor days / month", "2 rotating actors", "30% off one-time rate"]},
  {"id": "comm-premium-m", "name": "Premium", "tagline": "8 actor days/mo · 3 actors", "models": 3, "price": 7000, "popular": false, "perks": ["8 full actor days / month", "3 rotating actors", "30% off one-time rate"]},
  {"id": "comm-elite-m", "name": "Elite", "tagline": "12 actor days/mo · 5 actors", "models": 5, "price": 10500, "popular": false, "perks": ["12 full actor days / month", "5 rotating actors", "30% off one-time rate"]},
  {"id": "comm-royal-m", "name": "Royal", "tagline": "20 actor days/mo · 10 actors", "models": 10, "price": 17500, "popular": false, "perks": ["20 full actor days / month", "10 rotating actors", "30% off one-time rate"]},
];

// ── Videographer / Photographer Add-ons ──
export const CREW_ADDONS = [
  { id: 'photo-2hr',      name: 'Photographer',         tagline: '2hr session · professional photos',       price: 250,  perks: ['Professional photographer', '2-hour session', '50+ edited photos delivered', 'South Florida'] },
  { id: 'video-2hr',      name: 'Videographer',         tagline: '2hr session · professional video',        price: 300,  perks: ['Professional videographer', '2-hour session', 'Edited reels & raw footage', 'South Florida'] },
  { id: 'combo-2hr',      name: 'Photo + Video',        tagline: '2hr session · photo & video combo',       price: 450,  popular: true, perks: ['Photographer + videographer', '2-hour session', 'Photos + edited video', 'Best value combo'] },
  { id: 'combo-4hr',      name: 'Half Day Combo',       tagline: '4hr session · photo & video',             price: 850,  perks: ['Photographer + videographer', '4-hour session', 'Full content production', 'Multiple setups & locations'] },
];

// ── Story Reposts (influencer posts brand content to their Stories) ──
export const STORY_REPOSTS_OT = [
  { id: 'story-essential',   name: 'Essential',     tagline: '1 celebrity-connected model · 1 story frame · 24hr visibility',     models: 1, price: 150,   popular: false, perks: ['1 celebrity-connected model posts your content to their Story', 'Single frame (15s)', '24-hour visibility', 'Swipe-up link available', 'Major label quality at indie budget'] },
  { id: 'story-professional',      name: 'Professional',        tagline: '1 celebrity-connected model · 3-5 story frames · full narrative',  models: 1, price: 350,  popular: true,  perks: ['1 celebrity-connected model posts 3-5 Story frames', 'Full narrative arc (hook → showcase → CTA)', '24-hour visibility', 'Swipe-up link included', 'Best for conversions'] },
  { id: 'story-premium',      name: 'Premium',    tagline: '2 celebrity-connected creators · 3-5 frames each · dual reach',       models: 2, price: 600,  popular: false, perks: ['2 celebrity-connected creators post Story sets', 'Dual audience reach', 'Coordinated messaging', 'Swipe-up links included'] },
  { id: 'story-elite',     name: 'Elite',   tagline: '3 celebrity-connected creators · 3-5 frames each · wide reach',       models: 3, price: 900,  popular: false, perks: ['3 celebrity-connected creators post Story sets', 'Maximum Story reach', 'Coordinated campaign', 'Swipe-up links included'] },
  { id: 'story-vip',    name: 'VIP',      tagline: '5 celebrity-connected creators · 3-5 frames each · viral push',      models: 5, price: 1500,  popular: false, perks: ['5 celebrity-connected creators post Story sets', 'Viral Story campaign', 'Coordinated rollout', 'Swipe-up links included'] },
  { id: 'story-royal', name: 'Royal',   tagline: '10 celebrity-connected creators · 3-5 frames each · full takeover',    models: 10, price: 2800, popular: false, perks: ['10 celebrity-connected creators post Story sets', 'Full Story takeover', 'Dedicated coordinator', 'Swipe-up links included'] },
];

export const STORY_REPOSTS_MO = [
  { id: 'story-essential-m',  name: 'Essential',   tagline: '4 story sets/mo · 1 celebrity-connected model',             models: 1, price: 1200,   popular: false, perks: ['4 Story sets / month', '1 dedicated celebrity-connected model', 'Consistent Story presence', 'Compounding growth strategy'] },
  { id: 'story-professional-m',   name: 'Professional',    tagline: '8 story sets/mo · 2 celebrity-connected creators',            models: 2, price: 2200,  popular: true,  perks: ['8 Story sets / month', '2 rotating celebrity-connected creators', 'Wider Story reach', 'Dedicated coordinator'] },
  { id: 'story-premium-m',      name: 'Premium',       tagline: '15 story sets/mo · 3 celebrity-connected creators',           models: 3, price: 3500,  popular: false, perks: ['15 Story sets / month', '3 rotating celebrity-connected creators', 'Full Story calendar', 'Account manager'] },
  { id: 'story-elite-m',   name: 'Elite',    tagline: '30 story sets/mo · 5 celebrity-connected creators',           models: 5, price: 6000,  popular: false, perks: ['30 Story sets / month', '5 rotating celebrity-connected creators', 'Full Story campaign management', 'White-glove service'] },
];

// ── Collab Reposts (influencer co-authors post with brand - appears on both feeds) ──
export const COLLAB_REPOSTS_OT = [
  { id: 'collab-essential',   name: 'Essential',     tagline: '1 celebrity-connected model · 1 collab post · dual feed',         models: 1, price: 500,   popular: false, perks: ['1 celebrity-connected model co-authors post with your brand', 'Appears on both model\'s and brand\'s feeds', 'Dual audience reach', 'Shared engagement metrics', 'Major label quality at indie budget'] },
  { id: 'collab-professional',      name: 'Professional',       tagline: '1 celebrity-connected model · 1 collab reel · dual feed',        models: 1, price: 700,   popular: true,  perks: ['1 celebrity-connected model co-authors Reel with your brand', 'Appears on both feeds', 'Reel algorithm boost', 'Dual audience reach'] },
  { id: 'collab-premium',      name: 'Premium',        tagline: '2 celebrity-connected creators · 2 collab posts · coordinated',      models: 2, price: 1000,  popular: false, perks: ['2 celebrity-connected creators co-author posts with your brand', 'Coordinated dual-feed campaign', 'Maximum reach', 'Shared engagement'] },
  { id: 'collab-elite',     name: 'Elite',       tagline: '3 celebrity-connected creators · 3 collab posts · wide reach',      models: 3, price: 1500,  popular: false, perks: ['3 celebrity-connected creators co-author posts with your brand', 'Wide dual-feed reach', 'Coordinated rollout', 'Full campaign coverage'] },
  { id: 'collab-vip',    name: 'VIP',     tagline: '5 celebrity-connected creators · 5 collab posts · viral push',      models: 5, price: 2500,  popular: false, perks: ['5 celebrity-connected creators co-author posts with your brand', 'Viral dual-feed campaign', 'Coordinated messaging', 'Maximum exposure'] },
  { id: 'collab-royal', name: 'Royal',  tagline: '10 celebrity-connected creators · 10 collab posts · full takeover',   models: 10, price: 4500, popular: false, perks: ['10 celebrity-connected creators co-author posts with your brand', 'Full dual-feed takeover', 'Dedicated coordinator', 'Enterprise campaign'] },
];

export const COLLAB_REPOSTS_MO = [
  { id: 'collab-essential-m',  name: 'Essential',   tagline: '4 collab posts/mo · 1 celebrity-connected model',          models: 1, price: 2000,  popular: false, perks: ['4 collab posts / month', '1 dedicated celebrity-connected model', 'Consistent dual-feed presence', 'Compounding growth strategy'] },
  { id: 'collab-professional-m',   name: 'Professional',    tagline: '8 collab posts/mo · 2 celebrity-connected creators',         models: 2, price: 3500,  popular: true,  perks: ['8 collab posts / month', '2 rotating celebrity-connected creators', 'Wider dual-feed reach', 'Dedicated coordinator'] },
  { id: 'collab-premium-m',      name: 'Premium',       tagline: '15 collab posts/mo · 3 celebrity-connected creators',        models: 3, price: 5500,  popular: false, perks: ['15 collab posts / month', '3 rotating celebrity-connected creators', 'Full dual-feed calendar', 'Account manager'] },
  { id: 'collab-elite-m',   name: 'Elite',    tagline: '30 collab posts/mo · 5 celebrity-connected creators',        models: 5, price: 9000,  popular: false, perks: ['30 collab posts / month', '5 rotating celebrity-connected creators', 'Full campaign management', 'White-glove service'] },
];

// ── Story Reposts - Frequency-Based Packages ──
export const STORY_FREQUENCY_OT = [
  { id: 'story-daily-1wk',   name: 'Daily - 1 Week',     tagline: '1 model · daily stories · 7 days',     models: 1, price: 1200,   popular: false, perks: ['7 daily story sets', 'Maximum visibility', 'Top-of-mind awareness', 'Swipe-up links included'] },
  { id: 'story-daily-2wk',   name: 'Daily - 2 Weeks',     tagline: '1 model · daily stories · 14 days',  models: 1, price: 2200,  popular: true,  perks: ['14 daily story sets', 'Extended campaign', 'Brand reinforcement', 'Swipe-up links included'] },
  { id: 'story-daily-1mo',   name: 'Daily - 1 Month',     tagline: '1 model · daily stories · 30 days',       models: 1, price: 4500,  popular: false, perks: ['30 daily story sets', 'Full month coverage', 'Consistent presence', 'Swipe-up links included'] },
  { id: 'story-alt-1wk',   name: 'Every Other Day - 1 Week',     tagline: '1 model · 4 story sets · 7 days',     models: 1, price: 700,   popular: false, perks: ['4 story sets (every other day)', 'Balanced frequency', 'Cost-effective', 'Swipe-up links included'] },
  { id: 'story-alt-2wk',   name: 'Every Other Day - 2 Weeks',     tagline: '1 model · 8 story sets · 14 days',  models: 1, price: 1300,  popular: false,  perks: ['8 story sets (every other day)', 'Extended coverage', 'Good value', 'Swipe-up links included'] },
  { id: 'story-alt-1mo',   name: 'Every Other Day - 1 Month',     tagline: '1 model · 15 story sets · 30 days',       models: 1, price: 2400,  popular: false, perks: ['15 story sets (every other day)', 'Monthly presence', 'Sustainable frequency', 'Swipe-up links included'] },
  { id: 'story-3day-1wk',   name: 'Every 3 Days - 1 Week',     tagline: '1 model · 3 story sets · 7 days',     models: 1, price: 500,   popular: false, perks: ['3 story sets (every 3 days)', 'Essential coverage', 'Budget-friendly', 'Swipe-up links included'] },
  { id: 'story-3day-2wk',   name: 'Every 3 Days - 2 Weeks',     tagline: '1 model · 5 story sets · 14 days',  models: 1, price: 800,  popular: false,  perks: ['5 story sets (every 3 days)', 'Light campaign', 'Entry-level', 'Swipe-up links included'] },
  { id: 'story-3day-1mo',   name: 'Every 3 Days - 1 Month',     tagline: '1 model · 10 story sets · 30 days',       models: 1, price: 1500,  popular: false, perks: ['10 story sets (every 3 days)', 'Monthly awareness', 'Minimal frequency', 'Swipe-up links included'] },
];

// ── Collab Posts - Frequency-Based Packages ──
export const COLLAB_FREQUENCY_OT = [
  { id: 'collab-daily-1wk',   name: 'Daily - 1 Week',     tagline: '1 model · daily collabs · 7 days',     models: 1, price: 2500,   popular: false, perks: ['7 daily collab posts', 'Maximum dual-feed reach', 'Algorithm boost', 'Shared engagement'] },
  { id: 'collab-daily-2wk',   name: 'Daily - 2 Weeks',     tagline: '1 model · daily collabs · 14 days',  models: 1, price: 4500,  popular: true,  perks: ['14 daily collab posts', 'Extended dual-feed', 'Brand domination', 'Shared engagement'] },
  { id: 'collab-daily-1mo',   name: 'Daily - 1 Month',     tagline: '1 model · daily collabs · 30 days',       models: 1, price: 9000,  popular: false, perks: ['30 daily collab posts', 'Full month dual-feed', 'Maximum exposure', 'Shared engagement'] },
  { id: 'collab-alt-1wk',   name: 'Every Other Day - 1 Week',     tagline: '1 model · 4 collab posts · 7 days',     models: 1, price: 1500,   popular: false, perks: ['4 collab posts (every other day)', 'Balanced dual-feed', 'Cost-effective', 'Shared engagement'] },
  { id: 'collab-alt-2wk',   name: 'Every Other Day - 2 Weeks',     tagline: '1 model · 8 collab posts · 14 days',  models: 1, price: 2800,  popular: false,  perks: ['8 collab posts (every other day)', 'Extended dual-feed', 'Good value', 'Shared engagement'] },
  { id: 'collab-alt-1mo',   name: 'Every Other Day - 1 Month',     tagline: '1 model · 15 collab posts · 30 days',       models: 1, price: 5000,  popular: false, perks: ['15 collab posts (every other day)', 'Monthly dual-feed', 'Sustainable frequency', 'Shared engagement'] },
  { id: 'collab-3day-1wk',   name: 'Every 3 Days - 1 Week',     tagline: '1 model · 3 collab posts · 7 days',     models: 1, price: 1100,   popular: false, perks: ['3 collab posts (every 3 days)', 'Essential dual-feed', 'Budget-friendly', 'Shared engagement'] },
  { id: 'collab-3day-2wk',   name: 'Every 3 Days - 2 Weeks',     tagline: '1 model · 5 collab posts · 14 days',  models: 1, price: 1800,  popular: false,  perks: ['5 collab posts (every 3 days)', 'Light dual-feed', 'Entry-level', 'Shared engagement'] },
  { id: 'collab-3day-1mo',   name: 'Every 3 Days - 1 Month',     tagline: '1 model · 10 collab posts · 30 days',       models: 1, price: 3200,  popular: false, perks: ['10 collab posts (every 3 days)', 'Monthly dual-feed', 'Minimal frequency', 'Shared engagement'] },
];

// ── 2-Week Campaign Packages (Lemar-style) ──
export const CAMPAIGN_2WEEK = [
  { id: 'campaign-essential',   name: 'Essential Campaign',     tagline: '3 creators · every 3 days · 2 weeks',     models: 3, price: 2200,   popular: false, perks: ['3 celebrity-connected creators', '5 story sets each (every 3 days)', '15 total story sets', 'Coordinated campaign', 'Bundle discount applied'] },
  { id: 'campaign-professional',   name: 'Professional Campaign',     tagline: '3 creators · every other day · 2 weeks',  models: 3, price: 3500,  popular: true,  perks: ['3 celebrity-connected creators', '7 story sets each (every other day)', '21 total story sets', 'Coordinated campaign', 'Bundle discount applied'] },
  { id: 'campaign-premium',   name: 'Premium Campaign',     tagline: '3 creators · daily · 2 weeks',       models: 3, price: 6000,  popular: false, perks: ['3 celebrity-connected creators', '14 story sets each (daily)', '42 total story sets', 'Maximum visibility', 'Bundle discount applied'] },
  { id: 'campaign-collab-essential',   name: 'Collab Essential',     tagline: '3 creators · 1 collab each · 2 weeks',     models: 3, price: 1350,   popular: false, perks: ['3 celebrity-connected creators', '1 collab post each', '3 total collab posts', 'Dual-feed reach', 'Bundle discount applied'] },
  { id: 'campaign-collab-professional',   name: 'Collab Professional',     tagline: '3 creators · 2 collabs each · 2 weeks',  models: 3, price: 2550,  popular: false,  perks: ['3 celebrity-connected creators', '2 collab posts each', '6 total collab posts', 'Extended dual-feed', 'Bundle discount applied'] },
];

// ── Hybrid Campaign Packages (Story + Collab) ──
export const HYBRID_CAMPAIGNS = [
  { id: 'hybrid-blitz',   name: '2-Week Blitz',     tagline: '3 creators · 1 collab + 14 days stories',     models: 3, price: 3500,   popular: true, perks: ['3 celebrity-connected creators', '1 collab post each', '14 days of story reposts each', 'Full campaign coverage', 'Lemar-style package'] },
  { id: 'hybrid-30day',   name: '30-Day Campaign',     tagline: '3 creators · 2 collabs + 30 days stories',  models: 3, price: 6500,  popular: false,  perks: ['3 celebrity-connected creators', '2 collab posts each', '30 days of story reposts each', 'Extended campaign', 'Maximum reach'] },
  { id: 'hybrid-quarterly',   name: 'Quarterly Dominance',     tagline: '5 models · ongoing collabs + daily stories',       models: 5, price: 12000,  popular: false, perks: ['5 celebrity-connected creators', 'Ongoing collab posts', 'Daily story reposts', 'Full campaign management', 'White-glove service'] },
  { id: 'hybrid-viral',   name: 'Viral Takeover',     tagline: '10 models · multi-collab + intensive stories',     models: 10, price: 25000,  popular: false, perks: ['10 celebrity-connected creators', 'Multi-collab campaign', 'Intensive story schedule', 'Viral potential', 'Enterprise partnership'] },
];

export const PACKAGES: Record<string, any[]> = {
  'shoot-one-time':    SHOOT_OT,
  'musicvideo-one-time': MUSIC_VIDEO_OT,
  'event-one-time':    EVENT_OT,
  'reaction-one-time': REACTION_OT,
  'ugc-one-time':      UGC_OT,
  'business-one-time': BIZ_OT,
  'commercial-one-time': COMMERCIAL_OT,
  'bottle-one-time':   BOTTLE_OT,
  'storyreposts-one-time': STORY_REPOSTS_OT,
  'collabreposts-one-time': COLLAB_REPOSTS_OT,
  'storyreposts-frequency': STORY_FREQUENCY_OT,
  'collabreposts-frequency': COLLAB_FREQUENCY_OT,
  'campaign-2week': CAMPAIGN_2WEEK,
  'hybrid-campaigns': HYBRID_CAMPAIGNS,
  'shoot-monthly':     SHOOT_MO,
  'event-monthly':     EVENT_MO,
  'reaction-monthly':  REACTION_MO,
  'ugc-monthly':       UGC_MO,
  'business-monthly':  BIZ_MO,
  'commercial-monthly': COMMERCIAL_MO,
  'bottle-monthly':    BOTTLE_MO,
  'storyreposts-monthly': STORY_REPOSTS_MO,
  'collabreposts-monthly': COLLAB_REPOSTS_MO,
};

export function findPackage(serviceType: string, bookingType: string, id: string) {
  return (PACKAGES[`${serviceType}-${bookingType}`] || []).find((p: any) => p.id === id) || null;
}
