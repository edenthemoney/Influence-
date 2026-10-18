import type { Metadata } from 'next';
import { Check, ChevronRight, MapPin, Phone } from 'lucide-react';
import MobileNav from '../components/MobileNav';

export const metadata: Metadata = {
  title: { absolute: "Creator Marketing Marketplace West Palm Beach \u2014 Story Reposts, Collab Posts, UGC & Creators | Influence | Influence Marketing" },
  description: "West Palm Beach creator marketing marketplace. Book celebrity-connected creators for story reposts, collab posts, UGC content, business promotion, events, and music videos. Serving Palm Beach County.",
  keywords: "marketing agency Boca Raton,creator marketplace,UGC content creation,music promotion,brand campaigns,Boca Raton marketing,South Florida creators,social media marketing,influencer campaigns",
  alternates: { canonical: "https://influencecreators.marketing/influencer-marketing-west-palm-beach" },
  openGraph: {
    title: "Creator Marketing Marketplace West Palm Beach \u2014 Story Reposts, Collab Posts & UGC",
    description: "West Palm Beach premier creator marketing marketplace. Celebrity-connected creators, story reposts, collab posts, UGC, transparent pricing for brands and businesses.",
    url: "https://influencecreators.marketing/influencer-marketing-west-palm-beach",
  },
  twitter: {
    card: "summary_large_image",
    site: "@influencecreators.marketing",
    creator: "@influencecreators.marketing",
    title: "Creator Marketing Marketplace West Palm Beach \u2014 Story Reposts, Collab Posts & UGC",
    description: "West Palm Beach premier creator marketing marketplace. Celebrity-connected creators, story reposts, collab posts, UGC, transparent pricing for brands and businesses.",
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"ServiceAreaBusiness\",\"name\":\"Influence - West Palm Beach\",\"description\":\"West Palm Beach creator marketing marketplace. Book celebrity-connected influencers for story reposts, collab posts, UGC content, business promotion, events, and content orderings.\",\"url\":\"https://influencecreators.marketing/influencer-marketing-west-palm-beach\",\"telephone\":\"+15612877194\",\"email\":\"influencemodelsagency@gmail.com\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"West Palm Beach\",\"addressRegion\":\"FL\",\"addressCountry\":\"US\"},\"geo\":{\"@type\":\"GeoCoordinates\",\"latitude\":26.7153,\"longitude\":-80.0534},\"serviceType\":[\"Story Reposts\",\"Collab Posts\",\"UGC Content Creation\",\"Creator Marketing\",\"Content Ordering\",\"Event Hosting\",\"Music Video Production\"],\"areaServed\":[{\"@type\":\"City\",\"name\":\"West Palm Beach\"},{\"@type\":\"City\",\"name\":\"Palm Beach Gardens\"},{\"@type\":\"City\",\"name\":\"Riviera Beach\"},{\"@type\":\"City\",\"name\":\"Lake Worth\"}],\"priceRange\":\"$300-$5,000\",\"openingHours\":\"Mo-Su 00:00-23:59\",\"sameAs\":[\"https://www.instagram.com/influencecreators.marketing\",\"https://www.tiktok.com/@influencemodelsagency\"]}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"How much does creator marketing cost in West Palm Beach?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"West Palm Beach creator marketing starts at $300 for UGC content. Event models start at $400/girl. Music video models start at $500. Pricing varies based on the influencer's following, content type, and campaign scope.\"}},{\"@type\":\"Question\",\"name\":\"Do you work with West Palm Beach-based influencers only?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"We work with both West Palm Beach-based influencers and nationwide creators. For on-site bookings in Palm Beach County, we prioritize local influencers. For remote UGC content, we can work with influencers anywhere in the US.\"}},{\"@type\":\"Question\",\"name\":\"How fast can you book West Palm Beach influencers?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"We offer same-day response for West Palm Beach bookings. Most campaigns can be booked and scheduled within 24-48 hours. Remote UGC content is typically delivered within 3-7 days.\"}},{\"@type\":\"Question\",\"name\":\"What areas of Palm Beach County do you serve?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"We serve all of Palm Beach County including West Palm Beach, Palm Beach Gardens, Riviera Beach, Lake Worth, Wellington, and surrounding areas.\"}}]}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://influencecreators.marketing\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"West Palm Beach Creator Marketing\",\"item\":\"https://influencecreators.marketing/influencer-marketing-west-palm-beach\"}]}" }} />
    <div className="min-h-screen bg-[#080808]">
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <a className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase" href="/marketplace">
                {"Creators"}
              </a>
              <a className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase" href="/services">
                {"Services"}
              </a>
              <a className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase" href="/pricing">
                {"Pricing"}
              </a>
            </div>
          </div>
          <a className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: "18px", color: "#c9a96e" }} href="/">
            {"Influence"}
          </a>
          <div className="flex items-center gap-10">
            <a className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block" href="/about">
              {"About"}
            </a>
            <a className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: "#c9a96e", color: "#000" }} href="/start">
              {"Book Now"}
            </a>
          </div>
        </div>
      </nav>
      <section className="relative min-h-[85vh] flex items-end overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-black/50 to-[#080808]" />
        <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: "#c9a96e" }}>
            {"West Palm Beach Creator Marketing"}
          </p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: "clamp(40px, 7vw, 96px)" }}>
            {"West Palm Beach"}
            <br />
            {"Influencer Marketplace"}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            {"Verified creators and influencers for UGC content, business promotion, events, and music videos. Serving West Palm Beach, Palm Beach Gardens, and Palm Beach County."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: "#c9a96e", color: "#000" }} href="/start">
              {"Book West Palm Beach Influencers "}
              <ChevronRight className="h-4 w-4" />
            </a>
            <a href="tel:+15612877194" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              <Phone className="h-4 w-4" />
              {" (561) 287-7194"}
            </a>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: "#c9a96e" }}>
            {"Palm Beach County"}
          </p>
          <h2 className="font-display font-bold italic text-white leading-[0.9] mb-8" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            {"Serving West Palm Beach Area"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
              <span className="text-white/55 text-[13px]">
                {"West Palm Beach"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
              <span className="text-white/55 text-[13px]">
                {"Palm Beach Gardens"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
              <span className="text-white/55 text-[13px]">
                {"Riviera Beach"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
              <span className="text-white/55 text-[13px]">
                {"Lake Worth"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
              <span className="text-white/55 text-[13px]">
                {"Greenacres"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
              <span className="text-white/55 text-[13px]">
                {"Royal Palm Beach"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
              <span className="text-white/55 text-[13px]">
                {"Wellington"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
              <span className="text-white/55 text-[13px]">
                {"Jupiter"}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <div className="max-w-5xl">
          <p className="text-[10px] font-bold tracking-[0.4em} uppercase mb-6" style={{ color: "#c9a96e" }}>
            {"Our Services"}
          </p>
          <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            {"Influencer marketing"}
            <br />
            {"for West Palm Beach brands."}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="border border-white/[0.06] p-6">
              <h3 className="text-white font-bold text-sm mb-1">
                {"Business Content"}
              </h3>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a96e" }}>
                {"From $300"}
              </p>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {"On-site content for West Palm Beach restaurants and businesses."}
              </p>
            </div>
            <div className="border border-white/[0.06] p-6">
              <h3 className="text-white font-bold text-sm mb-1">
                {"UGC Content"}
              </h3>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a96e" }}>
                {"From $300"}
              </p>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {"Remote content creation for West Palm Beach brands."}
              </p>
            </div>
            <div className="border border-white/[0.06] p-6">
              <h3 className="text-white font-bold text-sm mb-1">
                {"Event Creators"}
              </h3>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a96e" }}>
                {"From $400/girl"}
              </p>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {"Professional creators for West Palm Beach events and parties."}
              </p>
            </div>
            <div className="border border-white/[0.06] p-6">
              <h3 className="text-white font-bold text-sm mb-1">
                {"Music Video Creators"}
              </h3>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a96e" }}>
                {"From $500"}
              </p>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {"Creators for West Palm Beach music video productions."}
              </p>
            </div>
            <div className="border border-white/[0.06] p-6">
              <h3 className="text-white font-bold text-sm mb-1">
                {"Commercial Production"}
              </h3>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a96e" }}>
                {"From $599"}
              </p>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {"Scripted commercials and speaking roles."}
              </p>
            </div>
            <div className="border border-white/[0.06] p-6">
              <h3 className="text-white font-bold text-sm mb-1">
                {"Music Promotion"}
              </h3>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a96e" }}>
                {"From $300"}
              </p>
              <p className="text-white/40 text-[13px] leading-relaxed">
                {"Song reaction videos for West Palm Beach artists."}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em} uppercase mb-6" style={{ color: "#c9a96e" }}>
            {"Why West Palm Beach"}
          </p>
          <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            {"Local expertise for"}
            <br />
            {"Palm Beach County brands."}
          </h2>
          <div className="space-y-6">
            <div className="flex gap-5 p-6 border border-white/[0.04] bg-white/[0.01]">
              <div className="w-11 h-11 border border-white/10 flex items-center justify-center shrink-0">
                <Check className="h-5 w-5" style={{ color: "#c9a96e" }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1.5">
                  {"Palm Beach County Knowledge"}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed">
                  {"We know West Palm Beach and Palm Beach County. From Clematis Street to Palm Beach Gardens, we understand the local market."}
                </p>
              </div>
            </div>
            <div className="flex gap-5 p-6 border border-white/[0.04] bg-white/[0.01]">
              <div className="w-11 h-11 border border-white/10 flex items-center justify-center shrink-0">
                <Check className="h-5 w-5" style={{ color: "#c9a96e" }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1.5">
                  {"Verified Local Creators"}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed">
                  {"Our network includes creators and influencers based in West Palm Beach with authentic local followings."}
                </p>
              </div>
            </div>
            <div className="flex gap-5 p-6 border border-white/[0.04] bg-white/[0.01]">
              <div className="w-11 h-11 border border-white/10 flex items-center justify-center shrink-0">
                <Check className="h-5 w-5" style={{ color: "#c9a96e" }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1.5">
                  {"Business Content Expertise"}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed">
                  {"Experience with West Palm Beach restaurants, salons, boutiques, and businesses for on-site content creation."}
                </p>
              </div>
            </div>
            <div className="flex gap-5 p-6 border border-white/[0.04] bg-white/[0.01]">
              <div className="w-11 h-11 border border-white/10 flex items-center justify-center shrink-0">
                <Check className="h-5 w-5" style={{ color: "#c9a96e" }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1.5">
                  {"Fast Local Response"}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed">
                  {"Same-day response for West Palm Beach bookings. Our team is ready to mobilize across Palm Beach County."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-8 md:px-16 bg-[#060606] border-t border-white/[0.06]">
        <div className="max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em} uppercase mb-6" style={{ color: "#c9a96e" }}>
            {"South Florida"}
          </p>
          <h2 className="font-display font-bold italic text-white leading-[0.9] mb-14" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            {"Also serving nearby cities."}
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <a className="border border-white/[0.06] p-6 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all group" href="/influencer-marketing-miami">
              <h3 className="text-white font-bold text-sm group-hover:text-[#c9a96e] transition-colors">
                {"Miami"}
              </h3>
              <p className="text-white/40 text-[13px] mt-2">
                {"Influencer marketing services"}
              </p>
            </a>
            <a className="border border-white/[0.06] p-6 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all group" href="/influencer-marketing-fort-lauderdale">
              <h3 className="text-white font-bold text-sm group-hover:text-[#c9a96e] transition-colors">
                {"Fort Lauderdale"}
              </h3>
              <p className="text-white/40 text-[13px] mt-2">
                {"Influencer marketing services"}
              </p>
            </a>
            <a className="border border-white/[0.06] p-6 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all group" href="/influencer-marketing-boca-raton">
              <h3 className="text-white font-bold text-sm group-hover:text-[#c9a96e] transition-colors">
                {"Boca Raton"}
              </h3>
              <p className="text-white/40 text-[13px] mt-2">
                {"Influencer marketing services"}
              </p>
            </a>
            <a className="border border-white/[0.06] p-6 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all group" href="/influencer-marketing-palm-beach">
              <h3 className="text-white font-bold text-sm group-hover:text-[#c9a96e] transition-colors">
                {"Palm Beach"}
              </h3>
              <p className="text-white/40 text-[13px] mt-2">
                {"Influencer marketing services"}
              </p>
            </a>
            <a className="border border-white/[0.06] p-6 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all group" href="/influencer-marketing-delray-beach">
              <h3 className="text-white font-bold text-sm group-hover:text-[#c9a96e] transition-colors">
                {"Delray Beach"}
              </h3>
              <p className="text-white/40 text-[13px] mt-2">
                {"Influencer marketing services"}
              </p>
            </a>
            <a className="border border-white/[0.06] p-6 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all group" href="/influencer-marketing-hollywood">
              <h3 className="text-white font-bold text-sm group-hover:text-[#c9a96e] transition-colors">
                {"Hollywood"}
              </h3>
              <p className="text-white/40 text-[13px] mt-2">
                {"Influencer marketing services"}
              </p>
            </a>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32 px-8 md:px-16 bg-white border-t border-black/10">
        <div className="max-w-3xl">
          <p className="text-black/40 text-[10px] tracking-[0.5em} uppercase mb-8 font-semibold">
            {"West Palm Beach Brands"}
          </p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: "clamp(40px, 7vw, 80px)" }}>
            {"Grow your brand"}
            <br />
            {"in Palm Beach County."}
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">
            {"Book West Palm Beach influencers for your next campaign. From $300."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: "#c9a96e", color: "#000" }} href="/start">
              {"Book West Palm Beach Influencers "}
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
      <footer className="bg-[#080808] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
            <div>
              <a className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: "17px", color: "#c9a96e" }} href="/">
                {"Influence"}
              </a>
              <p className="text-white/40 text-sm mt-4 mb-2">
                {"Influence"}
              </p>
              <p className="text-white/30 text-xs mb-1">
                {"West Palm Beach, FL 33401"}
              </p>
              <p className="text-white/30 text-xs mb-1">
                {"(561) 287-7194"}
              </p>
              <p className="text-white/30 text-xs">
                {"influencemodelsagency@gmail.com"}
              </p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs">
              {"\u00a9 2026 Influence"}
            </p>
            <a target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors text-[11px] tracking-widest uppercase" href="https://www.instagram.com/influencecreators.marketing">
              {"Instagram"}
            </a>
            <p className="text-white/10 text-[9px] tracking-widest uppercase">
              {"Miami \u00b7 Boca Raton, FL"}
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
