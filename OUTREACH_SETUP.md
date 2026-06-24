# Influence Agency — Full Outreach Automation Setup

## 1. Add These Environment Variables to Netlify

Go to: Netlify Dashboard → influence-models-agency → Site Configuration → Environment Variables

Add these:

```
SPOTIFY_CLIENT_ID        = (from Spotify Developer Dashboard)
SPOTIFY_CLIENT_SECRET    = (from Spotify Developer Dashboard)
ANTHROPIC_API_KEY        = (from console.anthropic.com)
OUTREACH_WEBHOOK_SECRET  = (make up a long random string, e.g. "inf-secret-2026-xk9mq")
```

Your existing vars (already set):
- GMAIL_USER
- GMAIL_APP_PASSWORD
- STRIPE_SECRET_KEY

---

## 2. Get Your API Keys (All Free Tiers Available)

### Spotify API (Free)
1. Go to https://developer.spotify.com/dashboard
2. Create App → name it "Influence Outreach"
3. Copy Client ID + Client Secret → add to Netlify env vars

### Anthropic / Claude API
1. Go to https://console.anthropic.com
2. Create account → API Keys → Create Key
3. Add $20 credit (lasts ~1,000 pitches at Haiku pricing)
4. Copy key → add to Netlify env vars

### Instantly.ai (Email Sending — $37/mo)
1. Go to https://instantly.ai → create account
2. Connect your Gmail (influencemodelsagency@gmail.com)
3. Note your API key from Settings → Integrations

### Make.com (Automation Hub — Free tier / $16/mo)
1. Go to https://make.com → create account

---

## 3. Your Live API Endpoints (once deployed)

```
Base URL: https://influencemodels.agency

POST /api/generate-pitch       → Send prospect data, get back AI pitch
POST /api/outreach-webhook     → Log that outreach was sent, email you summary
GET  /api/spotify-prospects    → Fetch new music releases by genre
POST /api/save-lead            → Already live — logs abandoned checkouts + leads
```

All endpoints require header: `Authorization: Bearer YOUR_OUTREACH_WEBHOOK_SECRET`

---

## 4. Make.com Scenario Blueprints

### Pipeline 1: Music Reactions (Run Weekly)

```
Module 1: Schedule — every Monday 9am
        ↓
Module 2: HTTP GET → https://influencemodels.agency/api/spotify-prospects
  Params: genre=hip-hop&limit=30
  Header: Authorization: Bearer YOUR_SECRET
        ↓
Module 3: Iterator — loop through each prospect
        ↓
Module 4: Filter — only where is_target_size = true
        ↓
Module 5: HTTP POST → https://influencemodels.agency/api/generate-pitch
  Body: {
    pipeline: "music_reactions",
    channel: "instagram_dm",
    artist_name: {{prospect.artist_name}},
    track_name: {{prospect.track_name}},
    genre: {{prospect.genre}},
    energy: {{prospect.energy}},
    tempo: {{prospect.tempo}},
    mood: {{prospect.mood}}
  }
        ↓
Module 6: HTTP POST → Instantly.ai API (if email found)
  OR
Module 6b: Log to Google Sheets (for manual IG DM sending)
  Columns: Artist | Track | Instagram | Pitch | Date | Status
        ↓
Module 7: HTTP POST → https://influencemodels.agency/api/outreach-webhook
  Body: { pipeline, prospect_name, generated_pitch, channel, ... }
        ↓
Module 8: Sleep 2 seconds (rate limiting)
```

---

### Pipeline 2: Business Content (Run Daily)

```
Module 1: Schedule — every day 10am
        ↓
Module 2: Google Sheets — read "Business Prospects" sheet
  (You populate this from Outscraper — see Section 5)
  Filter: status = "pending"
        ↓
Module 3: HTTP POST → https://influencemodels.agency/api/generate-pitch
  Body: {
    pipeline: "business_content",
    business_name: {{row.business_name}},
    business_type: {{row.business_type}},
    business_location: {{row.location}},
    ig_followers: {{row.ig_followers}}
  }
        ↓
Module 4: Instantly.ai — add to "Business Content" email campaign
  Email: {{row.email}}
  First name: {{row.owner_name}}
  Custom var pitch: {{pitch}}
        ↓
Module 5: Google Sheets — update row status = "contacted"
        ↓
Module 6: HTTP POST → https://influencemodels.agency/api/outreach-webhook
```

---

### Pipeline 3: Events / Bottle Girls (Run 3x/week)

```
Module 1: Schedule — Mon/Wed/Fri 11am
        ↓
Module 2: Google Sheets — read "Event Prospects" sheet
  (Populated from Eventbrite scraping — see Section 5)
  Filter: event_date > today, status = "pending"
        ↓
Module 3: HTTP POST → https://influencemodels.agency/api/generate-pitch
  Body: {
    pipeline: "events",  (or "bottle_girls" for nightclubs)
    promoter_name: {{row.promoter_name}},
    event_name: {{row.event_name}},
    event_date: {{row.event_date}},
    event_location: {{row.location}}
  }
        ↓
Module 4: Instantly.ai — add to "Events" campaign
        ↓
Module 5: Update sheet status = "contacted"
        ↓
Module 6: Outreach webhook → logs to your email
```

---

### Pipeline 4: Abandoned Checkout Recovery (Triggered in Real-time)

Already partially built. The booking page fires a beacon to /api/save-lead on tab close.
You receive an email immediately. 

To automate the follow-up:

```
Module 1: Webhook trigger — Make.com watches /api/save-lead POSTs
  (Add a Make.com webhook URL to the save-lead route as MAKE_ABANDONED_WEBHOOK_URL)
        ↓
Module 2: Wait 30 minutes
        ↓
Module 3: Instantly.ai — send "You left something behind" email
  Subject: "Your [ServiceType] booking at Influence"
  Body: personalized based on service + package they viewed
        ↓
Module 4: Wait 24 hours — send SMS via Twilio if phone captured
  "Hey [name], still interested in [service]? Link: influencemodels.agency/model-booking"
```

---

## 5. Prospect Data Sources

### Music Artists → Spotify API (automated via /api/spotify-prospects)
No manual work needed — runs automatically every Monday.

### Local Businesses → Outscraper (one-time + weekly)
1. Go to https://outscraper.com
2. Search: "restaurant Miami FL" / "salon Miami FL" / "gym South Florida"
3. Export CSV → upload to Google Sheets "Business Prospects" tab
4. Columns needed: business_name, business_type, owner_name, email, phone, instagram, location, ig_followers, status(=pending)
Cost: ~$10 for 1,000 leads

### Event Promoters → Eventbrite
1. Go to https://www.eventbrite.com/d/fl--miami/nightlife/
2. Use PhantomBuster "Eventbrite Event Scraper"
3. Export to Google Sheets "Event Prospects" tab
4. Columns: event_name, promoter_name, event_date, location, email, status(=pending)

### Nightclub / Venue Owners → Manual + LinkedIn
1. Google: "nightclub owner Miami" / "lounge owner South Florida"
2. LinkedIn Sales Navigator: title=owner/manager + industry=entertainment + location=Miami
3. Add to "Bottle Girls Prospects" sheet

---

## 6. Email Sequence Templates for Instantly.ai

### Music Reactions — 3-Email Sequence

**Email 1 (Day 0) — Subject: your track [TRACK_NAME]**
```
{{pitch}}  ← AI-generated by /api/generate-pitch
```

**Email 2 (Day 3) — Subject: re: [TRACK_NAME]**
```
Hey {{first_name}} — just following up on this.

We've done reactions for artists across hip-hop, R&B, and reggae — 
the ones that hit Explore page fastest are usually the ones with 
authentic first-listen reactions in the first 48hrs of a drop.

Book here if you're interested: influencemodels.agency/model-booking?service=reaction

— Influence Agency
```

**Email 3 (Day 7) — Subject: last one**
```
Hey {{first_name}} — won't keep bothering you after this.

If the timing's off, no worries. When your next drop is coming, 
we're here: influencemodels.agency

— Influence
```

---

### Business Content — 3-Email Sequence

**Email 1 (Day 0) — Subject: content for {{business_name}}**
```
{{pitch}}  ← AI-generated
```

**Email 2 (Day 4) — Subject: quick question**
```
Hi {{first_name}} — did you see my last message?

Quick question: how are you currently getting content for 
{{business_name}}'s Instagram?

We have a service where a professional model comes directly 
to your location in South Florida, creates reels and stories 
on-site, and you get 3–5 pieces of content in one 2hr visit. 
Starts at $200.

Worth a 5-min call? Reply here or book directly:
influencemodels.agency/model-booking?service=business
```

**Email 3 (Day 10) — Subject: last message from Influence**
```
Hi {{first_name}} — last email, promise.

If you ever want professional model content created at 
{{business_name}}, we're at influencemodels.agency

— Eden & Dez, Influence Agency
(561) 552-0392
```

---

### Events / Bottle Girls — 2-Email Sequence

**Email 1 (Day 0)**
```
{{pitch}}  ← AI-generated
```

**Email 2 (Day 2) — Subject: re: [EVENT NAME] girls**
```
Hey {{first_name}} — following up quick.

We have professional models available for {{event_name}} on {{event_date}}. 
$400/girl · 4hr shift · South Florida.

How many do you need? Just reply with a number and we'll confirm availability same day.

— Influence Agency | (561) 552-0392
```

---

## 7. Google Sheets Setup

Create one Google Sheet called "Influence Outreach CRM" with these tabs:

| Tab | Columns |
|-----|---------|
| Music Artists | artist_name, track, genre, energy, tempo, mood, instagram, email, pitch, date_sent, status, reply |
| Business Prospects | business_name, type, owner, email, phone, instagram, ig_followers, location, pitch, date_sent, status, reply |
| Event Prospects | event_name, promoter, date, location, email, phone, pitch, date_sent, status, reply |
| Bottle Girls Prospects | venue_name, type, owner, email, phone, location, pitch, date_sent, status, reply |

Connect this sheet to Make.com via the Google Sheets module.

---

## 8. Launch Checklist

- [ ] Add Spotify API keys to Netlify env vars
- [ ] Add Anthropic API key to Netlify env vars  
- [ ] Set OUTREACH_WEBHOOK_SECRET in Netlify env vars
- [ ] Redeploy site (triggers env var reload)
- [ ] Create Make.com account
- [ ] Create Google Sheet "Influence Outreach CRM"
- [ ] Set up Instantly.ai account + connect Gmail
- [ ] Run Outscraper for 500 Miami businesses → load into sheet
- [ ] Scrape Eventbrite for upcoming Miami events → load into sheet
- [ ] Build Pipeline 1 (Music) in Make.com using blueprint above
- [ ] Build Pipeline 2 (Business) in Make.com
- [ ] Build Pipeline 3 (Events/Bottle) in Make.com
- [ ] Test each pipeline with 1 prospect before going live
- [ ] Set all Make.com scenarios to Active

---

## Expected Results at Scale

| Pipeline | Volume | Conversion | Monthly Bookings |
|----------|--------|------------|-----------------|
| Music Reactions | 200 DMs/week | 3% | ~24 bookings |
| Business Content | 100 emails/week | 2% | ~8 bookings |
| Events/Bottle Girls | 50 emails/week | 5% | ~10 bookings |
| Abandoned Checkout | All abandoners | 15% | depends on traffic |

Total system cost: ~$150–300/mo
