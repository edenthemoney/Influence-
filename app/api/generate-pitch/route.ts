import { NextResponse } from 'next/server';

// Generates a personalized outreach pitch using Claude API
// Make.com sends prospect data → we return a ready-to-send message

const SYSTEM_PROMPT = `You are a direct, human-sounding outreach writer for Influence Agency, a Miami-based model agency. 
Write short, natural, non-salesy messages. No emojis unless specified. No corporate language. Sound like a real person who actually knows their work.
Never use: "I came across your profile", "I hope this message finds you well", "I wanted to reach out", or any generic opener.
Always be specific to the prospect's actual details. Keep it under 4 sentences. End with one clear soft CTA.`;

const PITCHES: Record<string, (data: any) => string> = {
  music_reactions: (d) => `Write a cold Instagram DM or email to a ${d.genre} artist named ${d.artist_name} who just released a track called "${d.track_name}". 
The track has ${d.energy}% energy, is ${d.mood} in tone, and runs at ${d.tempo} BPM.
Pitch them on booking a Miami model to do a first-listen reaction video to their song — posted to her social media pages to drive streams and discovery.
Service starts at $300. Agency is called Influence Agency (influencemodels.agency). Contact: influencemodelsagency@gmail.com or (561) 552-0392.
Tone: direct, real, music industry insider. No fluff.`,

  business_content: (d) => `Write a cold outreach email to the owner of a ${d.business_type} called "${d.business_name}" located in ${d.business_location}.
Their Instagram has only ${d.ig_followers || 'a small'} followers and their content looks low quality.
Pitch them on booking a professional model to visit their location and create reels, stories, and promo content on-site.
Service starts at $300 for a 2hr visit. Agency is called Influence Agency (influencemodels.agency).
Tone: friendly, local, peer-to-peer. Keep it short. One specific observation about their business type.`,

  events: (d) => `Write a cold outreach message to an event promoter named ${d.promoter_name} who is running an event called "${d.event_name}" on ${d.event_date} in ${d.event_location || 'Miami'}.
Pitch them on booking professional event models / hosts for their event through Influence Agency.
Pricing: $400/girl for a 4hr shift ($100/girl/hr). Multiple girls available.
Tone: confident, nightlife industry tone. Get to the point fast.`,

  bottle_girls: (d) => `Write a cold outreach message to ${d.venue_name}, a ${d.venue_type || 'nightclub/lounge'} in ${d.venue_location || 'Miami/South Florida'}.
Pitch them on booking professional bottle girls and VIP hostesses through Influence Agency on a recurring monthly basis.
Pricing: $400/girl for a 4hr shift. Monthly subscription available for priority scheduling and locked-in rates.
Tone: professional, nightlife industry, peer-to-peer. Short and direct.`,
};

export async function POST(req: Request) {
  try {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${process.env.OUTREACH_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { pipeline, channel = 'instagram_dm', ...prospectData } = body;

    if (!pipeline || !PITCHES[pipeline]) {
      return NextResponse.json({ error: 'Invalid pipeline' }, { status: 400 });
    }

    const userPrompt = PITCHES[pipeline](prospectData);

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    const claudeData = await claudeRes.json();

    if (!claudeRes.ok) {
      throw new Error(claudeData.error?.message || 'Claude API error');
    }

    const pitch = claudeData.content?.[0]?.text?.trim();

    return NextResponse.json({
      success: true,
      pipeline,
      channel,
      pitch,
      prospect: prospectData,
    });

  } catch (error: any) {
    console.error('Pitch generation error:', error);
    return NextResponse.json({ error: 'Failed', details: error.message }, { status: 500 });
  }
}
