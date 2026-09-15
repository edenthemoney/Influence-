import os
import smtplib
import ssl
import urllib.request
import urllib.parse
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_DIR = os.path.dirname(BASE_DIR)
ENV_PATH = os.path.join(REPO_DIR, '.env.local')
LINKS_PATH = os.path.join(BASE_DIR, 'alejandro_payment_links_v5.json')

def load_env(path):
    env = {}
    if not os.path.exists(path):
        return env
    with open(path, 'r') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, value = line.split('=', 1)
            value = value.strip().strip('"').strip("'")
            env[key] = value
    return env

env = load_env(ENV_PATH)
STRIPE_KEY = env.get('STRIPE_SECRET_KEY')
if not STRIPE_KEY:
    print('Error: STRIPE_SECRET_KEY not found in .env.local')
    exit(1)

packages = [
    {
        'key': 'starter',
        'name': 'Botox Glow Starter',
        'price_cents': 250000,
        'price': '$2,500',
        'description': 'Pick 1 creator after checkout. One main Reel, one short cut, 3 Instagram Story frames, and 6-month paid-ad whitelisting.',
        'deliverables': [
            'Pick 1 creator after checkout: Des, Sahara, or Genesis',
            '1 main 60–90 sec Reel: consultation → treatment → reaction → book',
            '1 short 15–30 sec clip for Instagram Stories and paid ads',
            '3 Instagram Story frames with tap-to-book link',
            '6-month organic posting rights',
            '6-month paid-ad whitelisting (ads run from creator handle)',
        ],
    },
    {
        'key': 'premium',
        'name': 'Med Spa Premium Push',
        'price_cents': 750000,
        'price': '$7,500',
        'description': 'Pick 2 creators after checkout. Main Reels, educational Reels, Story frames, and unlimited paid-ad whitelisting.',
        'deliverables': [
            'Pick 2 creators after checkout: any combination of Des, Sahara, Genesis',
            '2 main 60–90 sec Reels (one per creator)',
            '2 scripted 30–60 sec educational Reels (FAQs, myths, results)',
            '8–10 Instagram Story frames with tap-to-book link',
            '10 professional photos for feed/website/ads',
            '12-month organic posting rights',
            'Unlimited paid-ad whitelisting (ads run from creator handles, no expiration)',
        ],
    },
    {
        'key': 'luxury',
        'name': 'Luxury Botox Authority Campaign',
        'price_cents': 1150000,
        'price': '$11,500',
        'description': 'All three creators: Des, Sahara, and Genesis. Full-day shoot with the full content library, unlimited organic rights, and unlimited paid-ad whitelisting.',
        'deliverables': [
            'All 3 creators: Des + Sahara + Genesis',
            '3 main 60–90 sec Reels (one per creator)',
            '3 scripted 30–60 sec educational Reels',
            '3 short 15–30 sec ad clips',
            '12–15 Instagram Story frames with tap-to-book link',
            '15–20 professional photos',
            '1 talking-head testimonial Reel',
            'Unlimited organic posting rights (no expiration)',
            'Unlimited paid-ad whitelisting (ads run from creator handles, no expiration)',
        ],
    },
]

def create_payment_link(name, price_cents, description):
    params = {
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': name,
        'line_items[0][price_data][product_data][description]': description,
        'line_items[0][price_data][unit_amount]': str(price_cents),
        'line_items[0][quantity]': '1',
        'after_completion[type]': 'redirect',
        'after_completion[redirect][url]': 'https://influencecreators.marketing/thank-you',
    }
    data = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(
        'https://api.stripe.com/v1/payment_links',
        data=data,
        headers={
            'Authorization': f'Bearer {STRIPE_KEY}',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method='POST',
    )
    with urllib.request.urlopen(req, context=ssl.create_default_context()) as resp:
        return json.loads(resp.read().decode())

def get_payment_links():
    if os.path.exists(LINKS_PATH):
        with open(LINKS_PATH, 'r') as f:
            return json.load(f)
    links = {}
    for pkg in packages:
        result = create_payment_link(pkg['name'], pkg['price_cents'], pkg['description'])
        links[pkg['key']] = result.get('url')
        print(f"{pkg['name']}: {result.get('url')}")
    with open(LINKS_PATH, 'w') as f:
        json.dump(links, f, indent=2)
    return links

payment_links = get_payment_links()

def build_html_package(pkg):
    url = payment_links[pkg['key']]
    items = '\n'.join(f'<li style="font-size:14px;line-height:1.5;color:#555555;margin:6px 0;">{item}</li>' for item in pkg['deliverables'])
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #eeeeee;margin-bottom:15px;page-break-inside:avoid;table-layout:fixed;word-break:break-word;">
      <tr><td style="padding:16px;background:#fafafa;vertical-align:top;">
        <h3 style="margin:0 0 6px;font-size:18px;color:#111111;">{pkg['name']}</h3>
        <p style="margin:0 0 12px;font-size:22px;color:#111111;font-weight:bold;">{pkg['price']}</p>
        <ul style="margin:0;padding-left:18px;word-break:break-word;">
          {items}
        </ul>
        <p style="margin:18px 0 0;">
          <a href="{url}" style="display:inline-block;background:#111111;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-size:15px;font-weight:bold;">Pay {pkg['price']} to secure</a>
        </p>
      </td></tr>
    </table>
    """

html_packages = ''.join(build_html_package(pkg) for pkg in packages)

html = f"""<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f5f5"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="margin:20px auto;border:1px solid #e0e0e0;table-layout:fixed;word-break:break-word;">
  <tr><td style="background:#111111;color:#ffffff;padding:30px;text-align:center;">
    <h1 style="margin:0;font-size:26px;font-weight:400;">Influence Creator Marketplace</h1>
    <p style="margin:8px 0 0;font-size:14px;color:#aaaaaa;">Custom influencer packages for your med spa</p>
  </td></tr>
  <tr><td style="padding:30px;">
    <p style="font-size:16px;line-height:1.6;color:#333333;">Hi Alejandro,</p>
    <p style="font-size:16px;line-height:1.6;color:#333333;">Great speaking with you. I put together three clear, fixed-price packages focused on <strong>Botox and medical-aesthetic content</strong>. The goal is not reach — it is <strong>booked consultations</strong> and <strong>content you can reuse</strong> on your Instagram, website, and paid ads.</p>
    <p style="font-size:16px;line-height:1.6;color:#333333;"><strong>Top recommendation: Des + Sahara + Genesis</strong></p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td width="33%" style="padding:10px;text-align:center;vertical-align:top;">
          <img src="cid:des" alt="Des" style="width:130px;height:auto;border-radius:8px;display:block;margin:0 auto;">
          <p style="font-size:13px;line-height:1.4;color:#333333;margin-top:10px;"><strong>Des</strong><br>81.3K · Miami<br>Forbes / Fenty / Savage</p>
        </td>
        <td width="33%" style="padding:10px;text-align:center;vertical-align:top;">
          <img src="cid:seahra" alt="Sahara" style="width:130px;height:auto;border-radius:8px;display:block;margin:0 auto;">
          <p style="font-size:13px;line-height:1.4;color:#333333;margin-top:10px;"><strong>Sahara</strong><br>15K · Florida<br>Beauty / Lifestyle</p>
        </td>
        <td width="33%" style="padding:10px;text-align:center;vertical-align:top;">
          <img src="cid:genesis" alt="Genesis" style="width:130px;height:auto;border-radius:8px;display:block;margin:0 auto;">
          <p style="font-size:13px;line-height:1.4;color:#333333;margin-top:10px;"><strong>Genesis</strong><br>13.9K · Beauty / Skincare</p>
        </td>
      </tr>
    </table>
    <hr style="border:0;border-top:1px solid #eeeeee;margin:25px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9f9f9;border:1px solid #eeeeee;margin-bottom:25px;">
      <tr><td style="padding:18px;">
        <h3 style="margin:0 0 12px;font-size:16px;color:#111111;">How it works</h3>
        <p style="font-size:13px;line-height:1.5;color:#555555;margin:6px 0;"><strong>1. Pick a package below and pay.</strong> The price is fixed and secures creator availability.</p>
        <p style="font-size:13px;line-height:1.5;color:#555555;margin:6px 0;"><strong>2. Tell us which creator(s) you want.</strong> Starter = 1 creator. Premium = 2 creators. Luxury = all three.</p>
        <p style="font-size:13px;line-height:1.5;color:#555555;margin:6px 0;"><strong>3. We lock in the shoot.</strong> You'll get the contract, shot-list, and first shoot date within 7–14 days.</p>
        <h3 style="margin:18px 0 10px;font-size:16px;color:#111111;">What each term means</h3>
        <p style="font-size:13px;line-height:1.5;color:#555555;margin:6px 0;"><strong>Main Reel:</strong> 60–90 sec Instagram/TikTok video showing the full treatment journey — consultation, procedure, real reaction, and a soft call-to-book.</p>
        <p style="font-size:13px;line-height:1.5;color:#555555;margin:6px 0;"><strong>Short cut / ad clip:</strong> 15–30 sec clip from the same shoot, used for Instagram Stories and paid ads.</p>
        <p style="font-size:13px;line-height:1.5;color:#555555;margin:6px 0;"><strong>Instagram Story frames:</strong> Vertical 24-hour slides with a tap-to-book link sticker. Each "frame" = one Story slide.</p>
        <p style="font-size:13px;line-height:1.5;color:#555555;margin:6px 0;"><strong>Organic posting rights:</strong> Your right to post the Reels/photos on your own Instagram, website, and email for the included time period.</p>
        <p style="font-size:13px;line-height:1.5;color:#555555;margin:6px 0;"><strong>Paid-ad whitelisting:</strong> We run paid Instagram/Facebook ads from the creator's handle using this content. These typically outperform branded ads.</p>
      </td></tr>
    </table>
    <h2 style="font-size:20px;color:#111111;margin:0 0 15px;">Fixed-price package options</h2>
    {html_packages}
    <p style="font-size:16px;line-height:1.6;color:#333333;margin-top:25px;">Prices are fixed for the core package. Optional add-ons (extra creators, extended whitelisting, more photos) can be added after the shoot.</p>
    <p style="font-size:16px;line-height:1.6;color:#333333;">Talk soon,<br>Eden<br>Influence Creator Marketplace<br><a href="mailto:influencemodelsagency@gmail.com" style="color:#111111;">influencemodelsagency@gmail.com</a><br>(561) 552-0392</p>
  </td></tr>
</table>
</td></tr></table>
</body>
</html>
"""

plain = """Hi Alejandro,

Great speaking with you. I put together three clear, fixed-price packages focused on Botox and medical-aesthetic content.

The goal is not reach — it is booked consultations and reusable content that builds trust.

My top recommendation: Des + Sahara + Genesis

- Des (81.3K, Miami, Forbes/Fenty/Savage X Fenty credits) — luxury authority and premium social proof.
- Sahara (15K, Florida, beauty/lifestyle) — relatable, local, high trust.
- Genesis (13.9K, beauty/skincare) — authentic skincare voice, perfect for Botox/glow content.

How it works:
1. Pick a package below and pay. The price is fixed and secures creator availability.
2. Tell us which creator(s) you want. Starter = 1 creator. Premium = 2 creators. Luxury = all three.
3. We lock in the shoot. You'll get the contract, shot-list, and first shoot date within 7–14 days.

What each term means:
- Main Reel: 60–90 sec Instagram/TikTok video of the full treatment journey.
- Short cut / ad clip: 15–30 sec clip for Instagram Stories and paid ads.
- Instagram Story frames: vertical 24-hour slides with a tap-to-book link.
- Organic posting rights: your right to post Reels/photos on your social, website, and email.
- Paid-ad whitelisting: we run paid ads from the creator's Instagram handle.

Fixed-price package options:

{starter}

{premium}

{luxury}

Prices are fixed for the core package. Optional add-ons are available after the shoot.

Talk soon,
Eden
Influence Creator Marketplace
influencemodelsagency@gmail.com
(561) 552-0392
""".format(
    starter='\n'.join(["1. Botox Glow Starter — $2,500"] + [f"   - {item}" for item in packages[0]['deliverables']] + [f"   Pay: {payment_links['starter']}"]),
    premium='\n'.join(["2. Med Spa Premium Push — $7,500"] + [f"   - {item}" for item in packages[1]['deliverables']] + [f"   Pay: {payment_links['premium']}"]),
    luxury='\n'.join(["3. Luxury Botox Authority Campaign — $11,500"] + [f"   - {item}" for item in packages[2]['deliverables']] + [f"   Pay: {payment_links['luxury']}"]),
)

msg = MIMEMultipart('related')
msg['Subject'] = 'Custom influencer Reel packages for your med spa — Botox campaign ready'
msg['From'] = 'Influence Marketplace <influencemodelsagency@gmail.com>'
msg['To'] = 'artradegroup78@gmail.com'

msg_alt = MIMEMultipart('alternative')
msg_alt.attach(MIMEText(plain, 'plain'))
msg_alt.attach(MIMEText(html, 'html'))
msg.attach(msg_alt)

images = {
    'des': os.path.join(REPO_DIR, 'public/images/Des/des-1.jpg'),
    'seahra': os.path.join(REPO_DIR, 'public/images/Seahra/seahra-1.jpg'),
    'genesis': os.path.join(REPO_DIR, 'public/images/GenesisBravo/genesis-1.jpg'),
}

for cid, path in images.items():
    ext = path.split('.')[-1].lower()
    subtype = 'jpeg' if ext in ('jpg', 'jpeg') else ext
    with open(path, 'rb') as f:
        img = MIMEImage(f.read(), _subtype=subtype)
        img.add_header('Content-ID', f'<{cid}>')
        img.add_header('Content-Disposition', 'inline', filename=os.path.basename(path))
        msg.attach(img)

eml_path = os.path.join(BASE_DIR, 'alejandro-email-ready.eml')
with open(eml_path, 'wb') as f:
    f.write(msg.as_bytes())

SMTP_PASS = env.get('SMTP_PASS') or env.get('SMTP_PASSWORD') or os.environ.get('SMTP_PASS')
if not SMTP_PASS:
    print('Error: SMTP_PASS not found. Run with SMTP_PASS=<app_password> python3 proposals/send_alejandro_v2_email.py')
    exit(1)

with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
    smtp.login('influencemodelsagency@gmail.com', SMTP_PASS)
    smtp.send_message(msg)

print(f"Saved .eml to {eml_path}")
print("Sent v2 HTML email with influencer choice to artradegroup78@gmail.com.")
