import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email templates
const emailTemplates = {
  ecommerce: (brandName, contactName, influencerProfiles) => `
Hi ${contactName},

I've been following ${brandName}'s growth on Instagram - love your recent product launches.

I'm with Influence Models Agency, a South Florida influencer marketing agency with celebrity-connected talent (models who've worked with Sean Paul, Bryson Tiller, Akon, and appeared in Forbes).

We have influencers who would be perfect for creating authentic UGC content for your brand. Our talent has:
- 10K-100K+ authentic followings
- Professional content creation experience
- Quick turnaround (48hrs)
- Starting at $300 per content piece

${influencerProfiles.map(profile => `
- ${profile.name}: ${profile.followers} followers - ${profile.niche}
`).join('')}

Would you be open to seeing a few influencer profiles that match your brand aesthetic?

Best,
Influence Models Agency
561-552-0392
`,
  
  restaurant: (brandName, contactName, location) => `
Hi ${contactName},

I came across ${brandName} on Instagram and love your food presentation - it's exactly the kind of content that performs well with influencer marketing.

I'm with Influence Models Agency, and we have local ${location} influencers who specialize in restaurant content:
- On-site food photography & video
- Story reposts & collab posts
- Event hosting for special nights
- Behind-the-scenes kitchen content

Our models are based in South Florida and can visit your location same-week. We've worked with restaurants across Miami-Dade, Broward, and Palm Beach counties.

Would you be interested in seeing some sample content we could create for ${brandName}?

Best,
Influence Models Agency
561-552-0392
`,
  
  music: (artistName, contactName) => `
Hi ${contactName},

I've been following ${artistName}'s music - great sound on your latest track!

I'm with Influence Models Agency, and we have celebrity-connected models who can help promote your music:
- Music reaction videos (first-listen content)
- Album livestreams
- TikTok/Reels featuring your music
- Story reposts to their followers

Our talent has worked with major artists (Sean Paul, Bryson Tiller, Akon) and has the aesthetic that music videos need. We can deliver content in 48hrs.

Would you be open to discussing a music promotion campaign for your next release?

Best,
Influence Models Agency
561-552-0392
`
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { 
    to, 
    template, 
    brandName, 
    contactName, 
    influencerProfiles, 
    location,
    artistName 
  } = body;

  try {
    let htmlContent = '';
    let subject = '';

    switch (template) {
      case 'ecommerce':
        htmlContent = emailTemplates.ecommerce(brandName, contactName, influencerProfiles);
        subject = `UGC content for ${brandName} - Celebrity-connected influencers`;
        break;
      case 'restaurant':
        htmlContent = emailTemplates.restaurant(brandName, contactName, location);
        subject = `Instagram content for ${brandName} - Local Miami influencers`;
        break;
      case 'music':
        htmlContent = emailTemplates.music(artistName, contactName);
        subject = `Music promotion for ${artistName} - Celebrity model reactions`;
        break;
      default:
        return NextResponse.json({ success: false, error: 'Invalid template' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Influence Models Agency <influencemodelsagency@gmail.com>',
      to: [to],
      subject: subject,
      html: `<p>${htmlContent.replace(/\n/g, '<br>')}</p>`,
    });

    // Log email sent for tracking
    console.log('Email sent:', {
      to,
      template,
      brandName,
      messageId: data.data?.id
    });

    return NextResponse.json({
      success: true,
      messageId: data.data?.id,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Get email templates list
  return NextResponse.json({
    success: true,
    templates: Object.keys(emailTemplates)
  });
}
