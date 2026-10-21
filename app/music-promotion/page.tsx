import type { Metadata } from 'next';
import GeoLanding, { type GeoPageProps } from '../components/GeoLanding';

export const metadata: Metadata = {
  title: { absolute: "Music Promotion with Real Creators | Reaction Videos & Reposts | Influence" },
  description: "Promote your song with real creators: music reaction videos from $300, Instagram story reposts from $150, collab posts from $500. No bots.",
  alternates: { canonical: 'https://influencecreators.marketing/music-promotion' },
};

const props: GeoPageProps = {
  "path": "/music-promotion",
  "eyebrow": "Music Promotion \u00b7 Real creators, no bots",
  "h1": "Music Promotion with Reaction Videos and Reposts",
  "intro": "Real creators react to your song, repost it to their stories, or co-post it to both feeds. No bots, no bought views, no fake streams.",
  "serviceName": "Music promotion with creators",
  "serviceType": "Music promotion",
  "serviceDescription": "Song reaction videos, Instagram story reposts and collab posts by real creators. Reactions from $300, story reposts from $150, collab posts from $500.",
  "cta": {
    "label": "Promote a song",
    "href": "/start?service=reaction"
  },
  "crumbs": [
    {
      "label": "Services",
      "href": "/services"
    },
    {
      "label": "Music Promotion",
      "href": "/music-promotion"
    }
  ],
  "sections": [
    {
      "heading": "What is included?",
      "answer": "Three formats: reaction videos (creators react to your track on camera), story reposts (24-hour story frames with your link), and collab posts (one post on both feeds)."
    },
    {
      "heading": "Real promotion, no bots",
      "answer": "Every video and post is made by a real creator. We do not sell streams, views or followers, and nobody can honestly guarantee a viral result."
    },
    {
      "heading": "Who it is for",
      "answer": "Independent artists and record labels releasing a single, EP or album."
    },
    {
      "heading": "Need a music video too?",
      "answer": "Book models for your video from $199, or record at our studio partner in Boca Raton."
    }
  ],
  "prices": [
    {
      "name": "Music reactions",
      "price": "From $300",
      "desc": "Creator reacts to your song on camera."
    },
    {
      "name": "High-reach reactions",
      "price": "From $500",
      "desc": "Reaction posted by a higher-reach creator."
    },
    {
      "name": "Story reposts",
      "price": "From $150",
      "desc": "Story frames with your link, 24-hour visibility."
    },
    {
      "name": "Collab posts",
      "price": "From $500",
      "desc": "One co-authored post on both feeds."
    },
    {
      "name": "Launch bundle",
      "price": "$750",
      "desc": "1 reaction video + 3 story reposts."
    },
    {
      "name": "Push bundle",
      "price": "$1,750",
      "desc": "3 reaction videos + 1 collab post + 5 story reposts."
    }
  ],
  "faqs": [
    {
      "q": "Do reaction videos get streams?",
      "a": "They put your song in front of real audiences. Streams are not guaranteed."
    },
    {
      "q": "How fast can it go live?",
      "a": "Timing depends on creator availability; we confirm dates when you book."
    },
    {
      "q": "Do you use bots?",
      "a": "No."
    }
  ],
  "related": [
    {
      "label": "Music video models",
      "href": "/music-video-creators"
    },
    {
      "label": "Label campaigns",
      "href": "/label-campaigns"
    },
    {
      "label": "Story reposts vs collab posts",
      "href": "/blog/instagram-story-reposts-vs-collab-posts"
    },
    {
      "label": "Do reaction videos help?",
      "href": "/blog/do-song-reaction-videos-help-your-music"
    }
  ]
};

export default function Page() {
  return (
    <div className="bg-[#080808]">
      <GeoLanding {...props} />
      <p className="max-w-4xl mx-auto px-6 md:px-14 -mt-10 pb-16 text-white/50 text-sm">
        Studio partner: record or shoot at <a href="https://thevibemusicstudio.org" target="_blank" rel="noopener" className="underline" style={{ color: '#c9a96e' }}>Vibe Music Studio</a> in Boca Raton.
      </p>
    </div>
  );
}
