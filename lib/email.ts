// Email service using Resend (free tier: 3000 emails/month)
// Sign up at https://resend.com

interface Order {
  id: string;
  amount: number;
  customerEmail: string;
  customerName: string;
  promotionType: string;
  instructions: string;
  songTitle: string;
  songLink: string;
  packageTier: string;
  influencerId: string;
  metadata?: Record<string, string> | null;
}

export async function sendOrderNotification(order: Order) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'influencemodelsagency@gmail.com';
  const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://influence-models-agency.netlify.app';

  if (!RESEND_API_KEY) {
    console.log('⚠️ RESEND_API_KEY not set. Skipping email notification.');
    console.log('To enable emails, sign up at https://resend.com and add RESEND_API_KEY to env');
    return;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `🎉 NEW ORDER: $${order.amount} - ${order.packageTier}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #000 0%, #333 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <img src="${BASE_URL}/logo.png" alt="Influence" style="height: 50px; margin-bottom: 16px;" />
              <h1 style="color: #FFD700; margin: 0; font-size: 28px;">🎉 NEW ORDER!</h1>
              <p style="color: #fff; margin: 10px 0 0 0;">Someone just booked ${order.packageTier}</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd;">
              <h2 style="color: #333; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">Order Details</h2>
              
              <table style="width: 100%; margin-top: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 120px;"><strong>Amount:</strong></td>
                  <td style="padding: 8px 0; font-size: 24px; color: #000;"><strong>$${order.amount.toFixed(2)}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Customer:</strong></td>
                  <td style="padding: 8px 0;">${order.customerEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Package:</strong></td>
                  <td style="padding: 8px 0;">${order.packageTier}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Influencer:</strong></td>
                  <td style="padding: 8px 0;">${order.influencerId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Type:</strong></td>
                  <td style="padding: 8px 0;">${order.promotionType === 'song' ? '🎵 Song Promotion' : '🏢 Business/Product'}</td>
                </tr>
              </table>

              ${order.promotionType === 'song' ? `
              <div style="background: #F3E8FF; padding: 20px; margin-top: 20px; border-radius: 8px; border-left: 4px solid #9333EA;">
                <h3 style="color: #9333EA; margin-top: 0;">🎵 Song Details</h3>
                <p><strong>Title:</strong> ${order.songTitle || 'N/A'}</p>
                ${order.songLink ? `<p><strong>Link:</strong> <a href="${order.songLink}" style="color: #9333EA;">${order.songLink}</a></p>` : ''}
              </div>
              ` : ''}

              <div style="background: #fff; padding: 20px; margin-top: 20px; border-radius: 8px; border: 1px solid #ddd;">
                <h3 style="color: #333; margin-top: 0;">📝 Instructions</h3>
                <p style="white-space: pre-wrap; color: #555; line-height: 1.6;">${order.instructions || 'No instructions provided'}</p>
              </div>

              <div style="margin-top: 30px; text-align: center;">
                <a href="${BASE_URL}/admin" 
                   style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); 
                          color: #000; padding: 15px 30px; text-decoration: none; 
                          border-radius: 5px; font-weight: bold; display: inline-block;">
                  View in Admin Dashboard
                </a>
              </div>
            </div>
            
            <div style="background: #333; color: #999; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
              <p>Order ID: ${order.id}</p>
              <p>Influence Marketplace - Automated Order Notification</p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Resend API error: ${error}`);
    }

    console.log('✅ Email notification sent to', ADMIN_EMAIL);
    return await response.json();
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    // Don't throw - we don't want to break the order flow if email fails
  }
}

export async function sendCustomerConfirmation(order: Order) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://influence-models-agency.netlify.app';

  if (!RESEND_API_KEY) return;

  if (order.metadata?.bookingSource === 'event-ticket') {
    return sendTicketConfirmation(order, RESEND_API_KEY, FROM_EMAIL);
  }

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [order.customerEmail],
        subject: `✅ Order Confirmed - ${order.packageTier}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #000 0%, #333 100%); padding: 30px; text-align: center;">
              <img src="${BASE_URL}/logo.png" alt="Influence" style="height: 50px; margin-bottom: 16px;" />
              <h1 style="color: #FFD700; margin: 0;">✅ Order Confirmed!</h1>
            </div>
            <div style="background: #f9f9f9; padding: 30px;">
              <p>Thank you for your purchase! We've received your order and will be in touch shortly.</p>
              <h3>What's Next?</h3>
              <ol>
                <li>Our team reviews your request (within 24 hours)</li>
                <li>We connect you with your selected creator</li>
                <li>Content creation begins</li>
                <li>You receive deliverables for approval</li>
              </ol>
              <p>Questions? Reply to this email anytime.</p>
            </div>
          </div>
        `,
      }),
    });

    console.log('✅ Customer confirmation sent to', order.customerEmail);
  } catch (error) {
    console.error('❌ Failed to send customer confirmation:', error);
  }
}

// Influence Connect ticket confirmation (Wed Dec 16, 2026). Only sends when RESEND_API_KEY is set.
async function sendTicketConfirmation(order: Order, apiKey: string, from: string) {
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to: [order.customerEmail],
        subject: "You're in: Influence Connect, Wed Dec 16",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #f4efe6; padding: 32px;">
            <p style="color: #c9a96e; letter-spacing: 3px; font-size: 12px; margin: 0;">INFLUENCE CONNECT</p>
            <h1 style="color: #c9a96e; font-family: Georgia, serif; margin: 12px 0;">You're on the list</h1>
            <p style="margin: 0 0 6px;"><strong>Wednesday, December 16, 2026 · 4–7 PM ET</strong></p>
            <p style="margin: 0 0 6px;">Serena Pastificio, 301 Plaza Real, Mizner Park, Boca Raton, FL 33432</p>
            <p style="margin: 0 0 18px;">Hosted by Deseray Marie · Dress: all black, touch of gold · Apps on us</p>
            <p style="margin: 0 0 18px;">Paid: $${order.amount.toFixed(2)}. Bring this email or your Stripe receipt to the door.</p>
            <p style="margin: 0;"><a href="https://influencecreators.marketing/dec16-assets/influence-connect-dec16.ics" style="color: #c9a96e;">Add to calendar</a> · <a href="https://influencecreators.marketing/dec16" style="color: #c9a96e;">Event page</a></p>
          </div>
        `,
      }),
    });
  } catch (error) {
    console.error('❌ Failed to send ticket confirmation:', error);
  }
}
