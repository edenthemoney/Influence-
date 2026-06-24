export interface TemplateVars {
  artistName: string;
  name?: string; // business name or other recipient name
  trackName?: string;
  genre?: string;
  senderName?: string;
  agencyName?: string;
  website?: string;
}

const AGENCY = 'Influence';
const SITE = 'https://influencemodels.agency';
const SENDER = 'Eden';

// Clean up a Spotify genre string into something natural, with a safe fallback
function genreWord(genre?: string): string {
  if (!genre) return 'sound';
  const g = genre.toLowerCase().trim();
  if (!g) return 'sound';
  // e.g. "hip hop" / "r&b" read fine; long tags get trimmed
  return g.length > 24 ? 'sound' : g;
}

export const templates = {
  'artist-cold': {
    name: 'Artist Cold Outreach',
    subject: (v: TemplateVars) => `Promo opportunity for ${v.artistName} 🎵`,
    body: (v: TemplateVars) => `Hey ${v.artistName},

I came across your music and I'm genuinely impressed with what you've been building. Your sound is exactly the type of music our audience connects with.

I'm ${v.senderName || SENDER} from ${v.agencyName || AGENCY} — we're a South Florida-based influencer marketing agency that helps artists go viral through reaction videos, UGC reels, and influencer-driven content campaigns.

Here's what we can do for you:
• Song reaction videos from verified female influencers (posted to their audience)
• UGC reels & TikToks promoting your track
• Instagram story campaigns to targeted music fans
• Full album release rollout packages

Our influencers have worked with Sean Paul, Kai Cenat, Bryson Tiller, DaBaby, and more — and we deliver content within 48 hours.

Packages start at $200. Check us out: ${v.website || SITE}

Would love to chat about getting your music in front of the right audience. What do you think?

Best,
${v.senderName || SENDER}
${v.agencyName || AGENCY}
${v.website || SITE}`,
  },

  'manager-cold': {
    name: 'Manager / Label Outreach',
    subject: (v: TemplateVars) => `Influencer promo partnership — ${v.artistName}`,
    body: (v: TemplateVars) => `Hi there,

I'm reaching out regarding ${v.artistName}. I run ${v.agencyName || AGENCY}, a minority & women-owned influencer marketing agency based in South Florida.

We specialize in music promotion through authentic influencer content — reaction videos, UGC campaigns, and social media rollouts. Our talent roster includes models who've worked alongside Forbes, Fenty Beauty, Sean Paul, and Kai Cenat.

We'd love to explore a partnership for upcoming releases. We offer:
• Reaction video campaigns (single songs or full albums)
• Influencer-driven social content (IG Reels, TikTok)
• Monthly retainer packages for ongoing promo
• Event model staffing for release parties & shows

Rated South Florida's #1 premium model agency — 5-star record label trusted.

Happy to send over our full rate card or jump on a quick call.

Best,
${v.senderName || SENDER}
${v.agencyName || AGENCY}
${v.website || SITE}`,
  },

  'business-cold': {
    name: 'Business / Brand Outreach',
    subject: (v: TemplateVars) => `Influencer content for ${v.name || v.artistName}`,
    body: (v: TemplateVars) => {
      const recipient = v.name || v.artistName;
      return `Hi ${recipient} team,

I'm ${v.senderName || SENDER} from ${v.agencyName || AGENCY} — a minority & women-owned influencer marketing agency in South Florida.

We help brands and businesses go viral through authentic influencer-created content. Whether it's product reviews, UGC reels, event hosting, or a full social campaign — we handle everything from model selection to content delivery.

What sets us apart:
• Diverse roster of verified influencers with real engagement
• Celebrity-connected talent (Forbes, Fenty Beauty, major artists)
• Content delivered in 48 hours
• Packages from $200 — no hidden fees

We've helped hundreds of brands, artists, and businesses grow their reach. Would love to put together a custom proposal for ${recipient}.

Check us out: ${v.website || SITE}

Best,
${v.senderName || SENDER}
${v.agencyName || AGENCY}`;
    },
  },

  'new-drop': {
    name: 'New Release — Deserves Recognition',
    subject: (v: TemplateVars) => `"${v.trackName}" deserves way more recognition 🔥`,
    body: (v: TemplateVars) => `Hey ${v.artistName},

Just heard "${v.trackName}" — honestly, this is exactly the kind of ${genreWord(v.genre)} that deserves a lot more recognition than it's getting right now.

I'm ${v.senderName || SENDER} from ${v.agencyName || AGENCY} (Miami). We get tracks in front of thousands of new listeners through creator reaction videos + reels — our influencers have audiences of 10K–50K+ each and we've worked with artists connected to Sean Paul, Bryson Tiller & Kai Cenat.

I genuinely think we could help "${v.trackName}" reach the audience it deserves. Here's a quick look at what we do: ${v.website || SITE}

Want me to put together a simple promo plan for this drop?

— ${v.senderName || SENDER}, ${v.agencyName || AGENCY}`,
  },

  // Link-free A/B variant — better deliverability, lead with the same hook
  'new-drop-nolink': {
    name: 'New Release — No Link (A/B)',
    subject: (v: TemplateVars) => `your new ${genreWord(v.genre)} drop deserves more 🔥`,
    body: (v: TemplateVars) => `Hey ${v.artistName},

Been playing "${v.trackName}" — this is exactly the kind of ${genreWord(v.genre)} that deserves way more recognition than it's getting.

I run influencer promo at ${v.agencyName || AGENCY} (Miami) — we push new releases to thousands of new listeners through creator reaction videos + reels. Our roster's worked with artists connected to Sean Paul, Bryson Tiller & Kai Cenat.

I think we could really help "${v.trackName}" pop. Mind if I send a couple recent examples?

— ${v.senderName || SENDER}, ${v.agencyName || AGENCY}`,
  },

  'follow-up': {
    name: 'Follow Up',
    subject: (v: TemplateVars) => `Re: Quick follow up — ${v.artistName}`,
    body: (v: TemplateVars) => `Hey ${v.artistName},

Just following up on my previous email. I know inboxes get busy — no pressure at all.

If you're interested in getting some influencer-driven promo for your music/brand, we'd love to help. Happy to send over some examples of recent campaigns we've run.

Let me know if you'd like to chat!

Best,
${v.senderName || SENDER}
${v.agencyName || AGENCY}
${v.website || SITE}`,
  },
};

export type TemplateName = keyof typeof templates;
