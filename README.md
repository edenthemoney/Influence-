# Influence - Model Agency & Influencer Marketplace Platform

An all-in-one model agency web application connecting businesses with elite content creators for viral marketing campaigns.

## 🌟 Features

### For Businesses
- **Browse Influencer Marketplace** - Search and filter verified influencers by niche, followers, engagement rate
- **Multiple Package Tiers** - From $50 starter packages to premium clip farming campaigns
- **Secure Payments** - Stripe integration with escrow and automated commission splits
- **Campaign Management** - Track deliverables, request revisions, approve content
- **Analytics Dashboard** - Monitor campaign performance and ROI

### For Influencers
- **Professional Profiles** - Showcase portfolio with videos, images, and stats
- **Flexible Pricing** - Set your own rates and availability
- **Job Management** - Accept bookings, upload deliverables, track earnings
- **Automated Payouts** - Receive 70% of booking value (30% agency commission)
- **Rating System** - Build reputation through client reviews

### Platform Features
- **Music Promotion** - Musicians can create viral campaigns with trending audio
- **Clip Farming** - Multi-influencer coordination for maximum reach
- **Content Marketplace** - 30-second reels for product promotion and brand awareness
- **Real-time Messaging** - Direct communication between clients and influencers
- **Admin Dashboard** - Platform management and analytics

## 📦 Package Tiers

| Tier | Price | Deliverables | Delivery Time |
|------|-------|--------------|---------------|
| **Starter** | $50 | 1x 15-second reel | 48 hours |
| **Growth** | $150 | 2x 30-second reels | 72 hours |
| **Pro** | $250 | 3x 30-second reels | 5 days |
| **Premium** | $500 | 5x 30-second reels + strategy | 7 days |
| **Clip Farming** | $750+ | 10+ micro-content pieces | 14 days |

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Radix UI components
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Authentication**: JWT with bcrypt
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account

### Installation

1. **Clone and install dependencies**
```bash
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
- `DATABASE_URL` - PostgreSQL connection string
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `JWT_SECRET` - Random secret for JWT tokens

3. **Initialize database**
```bash
npx prisma generate
npx prisma db push
```

4. **Seed initial data (optional)**
```bash
npx prisma db seed
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
influence-platform/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── marketplace/       # Influencer marketplace pages
│   ├── dashboard/         # User dashboards
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── marketplace/      # Marketplace-specific components
│   └── dashboard/        # Dashboard components
├── lib/                   # Utility functions
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
└── public/               # Static assets
```

## 💰 Revenue Model

**Standard Commission Structure:**
- Agency takes 30% commission
- Influencer receives 70% payout
- Platform fee: Included in commission

**Example:**
- Client pays $250 for Pro package
- Agency receives: $75 (30%)
- Influencer receives: $175 (70%)

## 🔐 Security Features

- Encrypted passwords with bcrypt
- JWT-based authentication
- Secure payment processing via Stripe
- Input validation with Zod
- SQL injection protection via Prisma
- CSRF protection

## 📊 Database Schema

Key models:
- **User** - Authentication and profile data
- **InfluencerProfile** - Portfolio, stats, rates
- **ClientProfile** - Company info, booking history
- **Package** - Service tiers and pricing
- **Booking** - Campaign bookings and status
- **Deliverable** - Content uploads and approvals
- **Review** - Rating and feedback system

## 🎯 Roadmap

- [ ] Mobile app (iOS/Android)
- [ ] Advanced analytics dashboard
- [ ] AI-powered influencer matching
- [ ] Video conferencing integration
- [ ] Multi-language support
- [ ] Automated content scheduling
- [ ] Performance-based pricing

## 📝 License

Proprietary - All rights reserved

## 🤝 Support

For support, email support@influence.com or join our Discord community.

---

Built with ❤️ for creators and businesses worldwide
