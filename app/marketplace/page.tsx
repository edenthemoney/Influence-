import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import MobileNav from '../components/MobileNav';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const gold = '#c9a96e';

const influencers = [
  {
    id: 'des-001',
    name: 'Deseray Marie',
    title: 'Model · Actress · Entrepreneur · Influencer · CEO of Influence Models · 40M+ Music Video Views · Forbes Featured',
    image: '/images/Des/des-1.jpg',
    followers: '66K',
    instagram: '@itsdezmarie',
    location: 'Miami, FL',
    credits: ['Kai Cenat', 'Sean Paul', 'Akon', 'Bryson Tiller', 'Moneybagg Yo', 'Forbes', 'Lil Pump', 'Tekashi 6ix9ine', 'Bossman Dlow', '40M+ Music Video Views', 'Love & Hip Hop', 'Mike Tyson Commercial', 'Meta Billboard'],
    categories: ['Music Video', 'Commercial', 'Fashion', 'Film', 'TV', 'Entrepreneurship'],
    verified: true,
    celebrityCredits: true,
  },
  {
    id: 'seahra-026',
    name: 'Seahra Raquel',
    title: 'Model · 15K Following',
    image: '/images/Seahra/seahra-2.jpg',
    followers: '15K',
    instagram: '@seahraraquel',
    location: 'Florida',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'maria-002',
    name: 'Maria',
    title: 'Fashion & Lifestyle',
    image: '/images/Maria/maria-1.jpg',
    followers: '13.9K',
    instagram: '@mmermar19',
    location: 'USA',
    credits: [],
    categories: ['Lifestyle', 'Fashion', 'Beauty'],
  },
  {
    id: 'genesis-003',
    name: 'Genesis Bravo',
    title: 'Fashion & Lifestyle',
    image: '/images/GenesisBravo/genesis-1.jpg',
    followers: '22K',
    instagram: '@genesis.bravoo',
    location: 'USA',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'ferrari-004',
    name: 'Ferrari',
    title: 'Swim Week · Model · Skits · Influencer · Music Videos',
    image: '/images/Ferrari/ferrari-1.jpg',
    followers: '2K',
    instagram: '@ferrarii_red',
    location: 'USA',
    credits: [],
    categories: ['Lifestyle', 'Fashion'],
  },
  {
    id: 'lexi-044',
    name: 'Lexi',
    title: 'Model · 8K · Lifestyle · Fashion',
    image: '/images/Lexi/lexi-1.jpg',
    followers: '8K',
    instagram: '@im__herr__',
    location: 'Miami, FL',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'peach-045',
    name: 'Peach',
    title: 'Model · 23K · Buju Banton · Vybz Kartel · Peacock',
    image: '/images/Peach/peach-1.jpg',
    followers: '23K',
    instagram: '@peach',
    location: 'Miami, FL',
    credits: ['Buju Banton', 'Vybz Kartel', 'Peacock - Couple to Trouple'],
    categories: ['Music Video', 'Fashion', 'Lifestyle'],
  },
  {
    id: 'breanna-046',
    name: 'Breanna Banks',
    title: 'Model · 45K · Celeb Features · Music Videos',
    image: '/images/Bree/bree-1.jpg',
    followers: '45K',
    instagram: '@bbreannabankss',
    location: 'Miami, FL',
    credits: ['Celebrity Features', 'Music Videos'],
    categories: ['Music Video', 'Fashion', 'Lifestyle'],
  },
  {
    id: 'bianca-055',
    name: 'Bianca Bonnie',
    title: 'Love & Hip Hop · 1.3M · TV Personality · Model',
    image: '/images/Bianca/bianca-1.jpg',
    followers: '1.3M',
    instagram: '@biancaisking',
    location: 'Miami, FL',
    credits: ['Love & Hip Hop', 'TV Personality', 'Celebrity Features'],
    categories: ['TV', 'Fashion', 'Lifestyle', 'Music Video'],
    verified: true,
    celebrityCredits: true,
  },
  {
    id: 'breyanna-056',
    name: 'Breyanna',
    title: 'Model · 5K · Fashion · Lifestyle',
    image: '/images/Breyanna/breyanna-1.jpg',
    followers: '5K',
    instagram: '@its.breyyy',
    location: 'Miami, FL',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'ashley-morris-043',
    name: 'Ashley Morris',
    title: 'Model · Content Creator',
    image: '/images/AshleyM/ashleym-1.jpg',
    followers: '14K',
    instagram: '@theashleypage_',
    location: 'USA',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Content Creation'],
  },
  {
    id: 'nella-039',
    name: 'Nella',
    title: 'Creator · Streamer · Brand Shoots',
    image: '/images/Nella/nella-1.png',
    followers: '6K',
    instagram: '@nellabrat',
    location: 'Miami, FL',
    credits: [],
    categories: ['Fashion', 'Streaming', 'Brand Shoots'],
  },
  {
    id: 'shay-050',
    name: 'Shay',
    title: 'Creator · 25K · Kodak Black · Lil Baby · DJ Khaled · Future',
    image: '/images/Shay/shay-1.jpg',
    followers: '25K',
    instagram: '@shay',
    location: 'South Florida',
    credits: ['Kodak Black', 'Vybz Kartel', 'Lil Baby', 'DJ Khaled', 'Moneybagg Yo', 'Future', 'NLE Choppa', 'Kali Uchis', 'The Hookup — NowThatsTV'],
    categories: ['Music Video', 'Fashion', 'Lifestyle', 'TV'],
    verified: true,
    celebrityCredits: true,
  },
  {
    id: 'kat-051',
    name: 'Kat',
    title: 'Creator · 10K · Fashion · Lifestyle',
    image: '/images/Kat/kat-1.jpg',
    followers: '10K',
    instagram: '@whois.kat',
    location: 'South Florida',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'nikki-052',
    name: 'Nikki',
    title: 'Creator · 8.6K · Fashion · Lifestyle',
    image: '/images/Nikki/nikki-1.jpg',
    followers: '8.6K',
    instagram: '@nikkismok3x',
    location: 'South Florida',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'ayana-053',
    name: 'Ayana Alvarez',
    title: 'Creator · 5K · Fashion · Lifestyle',
    image: '/images/Ayana/ayana-1.jpg',
    followers: '5K',
    instagram: '@ayanaa.alvaarez',
    location: 'South Florida',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'angelina-006',
    name: 'Angelina',
    title: 'Fashion & Luxury',
    image: '/images/Angelina/angelina-1.jpg',
    followers: '9.2K',
    instagram: '@angelinalucii',
    location: 'Miami, FL',
    credits: [],
    categories: ['Fashion', 'Luxury', 'Beauty'],
  },
  {
    id: 'sandra-011',
    name: 'Sandra',
    title: 'Lifestyle & Fashion',
    image: '/images/Sandra/sandra-1.jpg',
    followers: '10K',
    instagram: '@CaribbeanBluee',
    location: 'Miami, FL',
    credits: [],
    categories: ['Lifestyle', 'Fashion', 'Beauty'],
  },
  {
    id: 'kady-010',
    name: 'Kady',
    title: 'Creator & Influencer',
    image: '/images/Kady/kady-1.jpg',
    followers: '11K',
    instagram: '@solelykady',
    location: 'Miami, FL',
    credits: ['Tekashi 6ix9ine', 'Lil Pump', 'Bossman Dlow', 'Loe Shimmy', 'Love & Hip Hop'],
    categories: ['Music Video', 'Fashion', 'Lifestyle', 'Beauty'],
    verified: true,
    celebrityCredits: true,
  },
  {
    id: 'leila-009',
    name: 'Leila',
    title: 'Lifestyle & Fitness',
    image: '/images/Leila/leila-1.jpg',
    followers: '64K',
    instagram: '@leilarican',
    location: 'Miami, FL',
    credits: [],
    categories: ['Lifestyle', 'Fitness', 'Beauty'],
  },
  {
    id: 'swan-008',
    name: 'Swan',
    title: 'Creator & Influencer',
    image: '/images/Swan/swan-1.jpg',
    followers: '4.8K',
    instagram: '@swanduras',
    location: 'Miami, FL',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Content'],
  },
  {
    id: 'hope-007',
    name: 'Hope',
    title: 'Editorial & Fashion',
    image: '/images/Hope/hope-1.jpg',
    followers: '5K',
    instagram: '@elizabeth.thimslick',
    location: 'Miami, FL',
    credits: [],
    categories: ['Fashion', 'Editorial', 'Beauty'],
  },
  {
    id: 'nysia-014',
    name: 'Nysia',
    title: 'Creator & Content Creator · 60K',
    image: '/images/Nysia/nysia-1.jpg',
    followers: '60K',
    instagram: '@luvvnysia',
    location: 'Florida',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'krystle-015',
    name: 'Krystle',
    title: 'Creator & Fashion',
    image: '/images/Krystle/krystle-1.jpg',
    followers: '10K',
    instagram: '@krystle',
    location: 'Miami, FL',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'kendra-016',
    name: 'Kendra',
    title: 'Creator & Influencer',
    image: '/images/Kendra/kendra-1.jpg',
    followers: '10K',
    instagram: '@kennii.x',
    location: 'Florida',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'yenny-018',
    name: 'Yenny',
    title: 'Creator & Influencer',
    image: '/images/Yenny/yenny-1.jpg',
    followers: '10K',
    instagram: '@itsmeyenny',
    location: 'Hollywood, FL',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'gabriella-019',
    name: 'Gabriella',
    title: 'Creator',
    image: '/images/Gabriella/gabriella-1.jpg',
    followers: '10K',
    instagram: '@gabriella',
    location: 'Miami, FL',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'nadia-020',
    name: 'Ty Nadia',
    title: 'Model & Flexibility Artist',
    image: '/images/Nadia/nadia-1.jpg',
    followers: '124K',
    instagram: '@tynadia',
    location: 'Miami, FL',
    credits: ['Trippie Redd', 'Kodak Black', 'French Montana', 'Sexyy Red', 'Love & Hip Hop'],
    categories: ['Music Video', 'Fashion', 'Runway', 'Swimwear'],
    verified: true,
  },
  {
    id: 'simone-021',
    name: 'Simone',
    title: 'Creator & Influencer',
    image: '/images/Simone/simone-1.jpg',
    followers: '10K',
    instagram: '@rajthegoddess',
    location: 'Florida',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'sydnie-022',
    name: 'Sydnie Beason',
    title: 'Creator · 3.8K · Fashion · Lifestyle',
    image: '/images/Sydnie/sydnie-1.jpg',
    followers: '3.8K',
    instagram: '@sydnieambeason',
    location: 'Florida',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'alisha-023',
    name: 'Alisha',
    title: 'Creator',
    image: '/images/Alisha/alisha-1.jpg',
    followers: '11K',
    instagram: '@sunnyydaze_',
    location: 'South Florida',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Swimwear'],
  },
  {
    id: 'celeste-024',
    name: 'Celeste Gomez',
    title: 'Creator',
    image: '/images/Celeste/celeste-1.jpg',
    followers: '7K',
    instagram: '@kcelestegomez',
    location: 'South Florida',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty', 'Swimwear'],
  },
  {
    id: 'gabriela-025',
    name: 'Gabriela',
    title: 'Savage X Fenty Ambassador · Model',
    image: '/images/Gabriela/gabriela-1.jpg',
    followers: '2K',
    instagram: '@_gabulouss',
    location: 'Madison, WI',
    credits: ['Savage X Fenty', 'Dez Beauty', 'Got2Be'],
    categories: ['Fashion', 'Beauty', 'Brand Ambassador'],
  },
  {
    id: 'jas-028',
    name: 'Jas Healer',
    title: 'YouTuber · Creator',
    image: '/images/Jas/jas-1.jpg',
    followers: '16K',
    instagram: '@jasdahealer',
    location: 'Florida',
    credits: [],
    categories: ['YouTube', 'Fashion', 'Lifestyle'],
  },
  {
    id: 'daisha-030',
    name: 'Des Daisha',
    title: 'Creator · Brand Shoots',
    image: '/images/Daisha/daisha-1.jpg',
    followers: '6K',
    instagram: '@des_daisha',
    location: 'Florida',
    credits: [],
    categories: ['Fashion', 'Beauty', 'Brand Shoots'],
  },
  {
    id: 'scarlet-031',
    name: 'Scarlet',
    title: 'LA Fashion Week · Celebrity Features · Creator & Host',
    image: '/images/Scarlet/scarlet-1.jpg',
    followers: '12K',
    instagram: '@scarleezy_',
    location: 'Florida',
    credits: ['LA Fashion Week', 'Bossman Dlow', 'Ambassador'],
    categories: ['Runway', 'Music Video', 'Fashion', 'Host'],
  },
  {
    id: 'aliyana-032',
    name: 'Aliyana Vasquez',
    title: 'Miami Swim Week Runway · Model',
    image: '/images/Aliyana/aliyana-1.jpg',
    followers: '5K',
    instagram: '@aliyanavasquez11',
    location: 'Miami, FL',
    credits: ['Miami Swim Week', 'Dez Beauty'],
    categories: ['Runway', 'Swimwear', 'Fashion', 'Beauty'],
  },
  {
    id: 'kiki-035',
    name: 'Kiki',
    title: 'Skits · Model · Dez Beauty · Music Videos',
    image: '/images/Kiki/kiki-1.jpg',
    followers: '15K',
    instagram: '@kikiithebiggest',
    location: 'Florida',
    credits: ['Dez Beauty', '7-8M Views on Viral Skit'],
    categories: ['Skits', 'Music Video', 'Fashion', 'Beauty'],
  },
  {
    id: 'amanda-037',
    name: 'Amanda Persaud',
    title: 'Music Videos · Model · Runway',
    image: '/images/Amanda/amanda-1.jpg',
    followers: '4K',
    instagram: '@persaud_26',
    location: 'Florida',
    credits: [],
    categories: ['Music Video', 'Runway', 'Fashion'],
  },
  {
    id: 'malibu-040',
    name: 'Malibu',
    title: 'Skits · Brand Content · Music Videos',
    image: '/images/Model1/model1-2.jpg',
    followers: '35K',
    instagram: '@malibudollzz',
    location: 'USA',
    credits: [],
    categories: ['Skits', 'Music Video', 'Brand Content'],
  },
  {
    id: 'bree-041',
    name: 'Bree',
    title: 'Model · Skits · Influencer · Brand Shoots · 67K',
    image: '/images/Breeyisraela/bree-1.jpg',
    followers: '67K',
    instagram: '@breeyisraela',
    location: 'USA',
    credits: [],
    categories: ['Skits', 'Influencer', 'Fashion', 'Brand Shoots'],
  },
  {
    id: 'nya-042',
    name: 'Nya',
    title: 'Music Videos · Brand Content · Influencer · Model',
    image: '/images/Nya/nya-1.jpg',
    followers: '94K',
    instagram: '@_therealmiamii',
    location: 'Miami, FL',
    credits: ['Celebrity Features'],
    categories: ['Music Video', 'Brand Content', 'Influencer', 'Fashion'],
  },
  {
    id: 'ashley-mar-044',
    name: 'Ashley Mar',
    title: 'Professional Model · Peacock · Netflix · Target · Celsius',
    image: '/images/AshleyMar/ashleymar-1.jpg',
    followers: '3.3K',
    instagram: '@yelhsamar',
    location: 'Miami, FL',
    credits: ['Peacock Network', 'Netflix', 'Target', 'Celsius', 'Red Stripe', 'Music Videos'],
    categories: ['Commercial', 'Film', 'Music Video', 'Fashion', 'UGC'],
  },
  {
    id: 'maelyn-017',
    name: 'Maelyn Sabrina',
    title: 'Model & Influencer',
    image: '/images/Maelyn/maelyn-1.jpg',
    followers: '10K',
    instagram: '@_MaelynSabrina',
    location: 'Orlando, FL',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'endy-045',
    name: 'Endy',
    title: 'Model · Content Creator',
    image: '/images/Endy/endy-1.jpg',
    followers: '3K',
    instagram: '@theepetitebabe',
    location: 'USA',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Content Creation'],
  },
  {
    id: 'mika-057',
    name: 'Mika',
    title: 'Model · Content Creator · 10K',
    image: '/images/Mika/mika-2.jpg',
    followers: '10K',
    instagram: '@iammika_ela',
    location: 'USA',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Content Creation'],
  },
  {
    id: 'gracejenn-058',
    name: 'Grace Jenn',
    title: 'DJ · Model · Host · Actress · Coulda Been Love S2 · 20K',
    image: '/images/GraceJenn/gracejenn-1.jpg',
    followers: '20K',
    instagram: '@gracejennofficial',
    location: 'USA',
    credits: ['Coulda Been Love Season 2', 'Druski'],
    categories: ['Film', 'TV', 'Fashion', 'Lifestyle'],
    celebrityCredits: true,
  },
  {
    id: 'ashleypena-060',
    name: 'Ashley Pena',
    title: 'Model · Content Creator · 2K',
    image: '/images/AshleyPena/ashleypena-1.jpg',
    followers: '2K',
    instagram: '@ashleypenaofficial',
    location: 'USA',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Content Creation'],
  },
  {
    id: 'hannah-061',
    name: 'Hannah Lopez',
    title: 'Model · 4.4K',
    image: '/images/Hannah/hannah-1.jpg',
    followers: '4.4K',
    instagram: '@hannahlpez',
    location: 'USA',
    credits: [],
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
  },
  {
    id: 'yuli-059',
    name: 'Yuli Escobar',
    title: 'Fashion Week Model · Commercials · Shoots · 22K',
    image: '/images/Yuli/yuli-1.jpg',
    followers: '22K',
    instagram: '@yuliescobarr',
    location: 'USA',
    credits: ['Fashion Week', 'Commercials'],
    categories: ['Runway', 'Commercial', 'Fashion', 'Shoots'],
  },
  {
    id: 'kaylese-062',
    name: 'Kaylese "Redd" John-Brown',
    title: 'Model · Actress · Voiceover · Public Speaker · Hair & Beauty · Lifestyle',
    image: '/images/Kaylese/kaylese-1.jpg',
    followers: '4.2K',
    instagram: '@lifeofreddofficial',
    location: 'South Florida',
    credits: ['Voiceover', 'Public Speaking', 'Commercial-Style Content', 'Hair & Beauty'],
    categories: ['Fashion', 'Lifestyle', 'Beauty', 'Commercial', 'Voiceover', 'Acting'],
  },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#080808]">
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
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: gold }}>Influence</Link>
          <div className="flex items-center gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/model-booking" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero with Group Video */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-14 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/group-shot.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-5" style={{ color: gold }}>Our Roster</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
            Meet the <span style={{ color: gold }}>Talent</span>
          </h1>
          <p className="text-white/45 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Hand-selected influencers with verified metrics, A-list credentials, and proven campaign results.
            Book for <span className="text-white/70">music videos · UGC · brand campaigns · events · social content</span>
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-white/[0.05] py-4 px-6 md:px-14 mb-12 md:mb-16">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[10px] tracking-[0.2em] uppercase text-white/25">
          <span>★★★★★ Rated #1 in South Florida</span>
          <span className="hidden md:inline">·</span>
          <span>Celebrity-Connected Talent</span>
          <span className="hidden md:inline">·</span>
          <span>Content Delivered in 48hrs</span>
          <span className="hidden md:inline">·</span>
          <span>Verified Roster</span>
        </div>
      </div>

      {/* Talent Grid - Sorted by follower count after featured */}
      <section className="px-4 md:px-14 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {(() => {
            // Keep first 4 as featured, sort rest by follower count
            const featured = influencers.slice(0, 4);
            const rest = influencers.slice(4).sort((a, b) => {
              const parseFollowers = (f: string) => {
                if (f.includes('M')) return parseFloat(f) * 1000000;
                if (f.includes('K')) return parseFloat(f) * 1000;
                return parseFloat(f);
              };
              return parseFollowers(b.followers) - parseFollowers(a.followers);
            });
            return [...featured, ...rest];
          })().map((inf) => (
            <div
              key={inf.id}
              className="group relative overflow-hidden bg-[#0a0a0a] border border-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
            >
              {/* Stretched profile link — makes the whole card clickable */}
              <Link
                href={`/influencer/${inf.id}`}
                className="absolute inset-0 z-10"
                aria-label={`View ${inf.name}'s profile`}
              />
              {/* Image */}
              <div className={`${inf.id === 'des-001' ? 'aspect-square' : 'aspect-[3/4]'} overflow-hidden relative`}>
                <Image
                  src={inf.image}
                  alt={inf.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  className="group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>

              {/* Verified badge */}
              {inf.verified && (
                <div className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center" style={{ backgroundColor: gold }}>
                  <span className="text-black text-[9px] font-black">✓</span>
                </div>
              )}
              
              {/* Top Creator badge for 50K+ followers */}
              {(() => {
                const parseFollowers = (f: string) => {
                  if (f.includes('M')) return parseFloat(f) * 1000000;
                  if (f.includes('K')) return parseFloat(f) * 1000;
                  return parseFloat(f);
                };
                return parseFollowers(inf.followers) >= 50000;
              })() && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-sm border border-[#c9a96e]/50">
                  <span className="text-[#c9a96e] text-[9px] font-bold tracking-wider uppercase">Top Creator</span>
                </div>
              )}

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white font-bold text-sm md:text-base truncate">{inf.name}</h3>
                  <span className="text-[10px] font-bold shrink-0 ml-2" style={{ color: gold }}>Verified</span>
                </div>
                <p className="text-white/35 text-[10px] tracking-wider uppercase mb-2">{inf.title}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] text-white/30">
                    <span>{inf.location}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold" style={{ color: gold }}>{inf.followers}</span>
                    <span className="text-[9px] text-white/40 ml-1">followers</span>
                  </div>
                </div>
                {inf.credits.length > 0 && (
                  <p className="text-[9px] tracking-wider uppercase mt-2 truncate" style={{ color: gold }}>
                    {inf.credits.slice(0, 3).join(' · ')}
                  </p>
                )}
              </div>

              {/* Hover action */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px] pointer-events-none">
                <span className="text-[11px] font-bold tracking-widest uppercase text-white border border-white/30 px-5 py-2.5">
                  View Profile
                </span>
                <Link
                  href={`/model-booking?model=${encodeURIComponent(inf.name)}`}
                  className="relative z-20 pointer-events-auto text-[11px] font-bold tracking-widest uppercase px-5 py-2.5"
                  style={{ backgroundColor: '#c9a96e', color: '#000' }}
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/[0.05] py-16 md:py-24 px-6 md:px-14">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Ready to Start?</p>
          <h2 className="font-display font-bold italic text-white mb-4" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            Book Your Campaign Today
          </h2>
          <p className="text-white/35 text-sm mb-8 max-w-lg mx-auto">
            Choose your service, pick a package, and launch in under 2 minutes. Custom quotes available for every campaign.
          </p>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-green-500/20 bg-green-500/[0.04]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400/80 text-[11px] font-semibold">Same-week availability · Book in 2 min</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/model-booking"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-[12px] font-bold tracking-widest uppercase transition-all hover:opacity-80"
              style={{ backgroundColor: gold, color: '#000' }}
            >
              Book Now <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-[12px] font-bold tracking-widest uppercase border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              View Packages
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-5 text-white/25 text-xs">
            <span>✓ Secure Stripe checkout</span>
            <span>✓ Same-week availability</span>
            <span>✓ Verified talent</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
            <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase self-start shrink-0" style={{ fontSize: '17px', color: gold }}>Influence</Link>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
              <div>
                <p className="text-white/40 text-[9px] tracking-widest uppercase mb-6">Work With Us</p>
                <ul className="space-y-3">
                  <li><Link href="/marketplace" className="text-white/60 hover:text-white transition-colors text-sm">Browse Talent</Link></li>
                  <li><Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">All Services</Link></li>
                  <li><Link href="/pricing" className="text-white/60 hover:text-white transition-colors text-sm">Packages</Link></li>
                  <li><Link href="/model-booking" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                <ul className="space-y-3">
                  <li><Link href="/services/content" className="text-white/40 hover:text-white transition-colors text-sm">Social Media Content</Link></li>
                  <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Business Content</Link></li>
                  <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots & Videos</Link></li>
                  <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                  <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Models</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
                  <li><Link href="/join" className="text-white/40 hover:text-white transition-colors text-sm">Join Our Roster</Link></li>
                  <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs">&copy; 2026 Influence</p>
            <Link href="https://www.instagram.com/influencemodels.agency" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors text-[11px] tracking-widest uppercase">Instagram</Link>
            <p className="text-white/10 text-[9px] tracking-widest uppercase">Miami &middot; Boca Raton, FL</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
