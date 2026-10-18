import type { Metadata } from 'next';
import { Camera, ChevronRight, Clapperboard, Film, Sparkles, Star } from 'lucide-react';
import MobileNav from '../components/MobileNav';

export const metadata: Metadata = {
  title: { absolute: "Book Actress Creators in Miami \u2014 Acting, Casting & Speaking Roles | Influence | Influence Marketing" },
  description: "Hire professional actress creators in Miami for commercials, TV, film, casting calls, speaking roles, and brand campaigns. Our network includes creators with Netflix, Audible, and major production credits. South Florida.",
  keywords: "marketing agency Boca Raton,creator marketplace,UGC content creation,music promotion,brand campaigns,Boca Raton marketing,South Florida creators,social media marketing,influencer campaigns",
  alternates: { canonical: "https://influencecreators.marketing" },
  openGraph: {
    title: "Book Actress Creators in Miami \u2014 Acting & Casting | Influence",
    description: "Professional actress creators with on-camera, commercial, and film experience. From $599.",
    url: "https://influencecreators.marketing/actress-creators-miami",
  },
  twitter: {
    card: "summary_large_image",
    site: "@influencemodelsagency",
    creator: "@influencemodelsagency",
    title: "Influence Marketing \u2014 Boca Raton Marketing Agency & Creator Marketplace",
    description: "Connect with creators for UGC, music promo, brand campaigns & events. Boca Raton, FL. Open 24 hours.",
    images: ["https://influencecreators.marketing/og-image.jpg"],
  },
};

export default function Page() {
  return (
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
            <a className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: "#c9a96e", color: "#000" }} href="/start?service=commercial">
              {"Book Now"}
            </a>
          </div>
        </div>
      </nav>
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img src="/images/Des/des-5.jpg" alt="Actress creators in Miami" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: "#c9a96e" }}>
            {"Miami Creator Network \u00b7 Acting & Casting"}
          </p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: "clamp(44px, 8vw, 100px)" }}>
            {"Actress Creators"}
            {" "}
            {"in Miami."}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            {"Book actress-ready models for commercials, TV, film, casting calls, and speaking roles. Our South Florida roster includes creators with Netflix, Audible, and major production credits \u2014 from Deseray Marie\u2019s film work to voiceover artists ready for your next campaign."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: "#c9a96e", color: "#000" }} href="/start?service=commercial">
              {"Book Actress Creators "}
              <ChevronRight className="h-4 w-4" />
            </a>
            <a className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all" href="/marketplace">
              {"Browse Roster"}
            </a>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-8 md:px-16 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: "#c9a96e" }}>
          {"What We Facilitate"}
        </p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
          {"Acting, casting &"}
          {" "}
          {"on-camera roles."}
        </h2>
        <p className="text-white/40 text-lg max-w-2xl mb-14 leading-relaxed">
          {"Influence is more than a content marketplace \u2014 we function as a content partner for productions, brands, and creators who need creators who can act, speak, and perform on camera."}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          <div className="p-6 border border-white/[0.06] bg-white/[0.01]">
            <Film className="h-6 w-6 mb-4" style={{ color: "#c9a96e" }} />
            <h3 className="text-white font-bold text-sm mb-2">
              {"Actress Roles"}
            </h3>
            <p className="text-white/40 text-[13px] leading-relaxed">
              {"Cast creators for scripted scenes, short films, web series, and TV productions."}
            </p>
          </div>
          <div className="p-6 border border-white/[0.06] bg-white/[0.01]">
            <Clapperboard className="h-6 w-6 mb-4" style={{ color: "#c9a96e" }} />
            <h3 className="text-white font-bold text-sm mb-2">
              {"Commercial Casting"}
            </h3>
            <p className="text-white/40 text-[13px] leading-relaxed">
              {"Creators with speaking ability, natural delivery, and on-camera experience for brand spots."}
            </p>
          </div>
          <div className="p-6 border border-white/[0.06] bg-white/[0.01]">
            <Sparkles className="h-6 w-6 mb-4" style={{ color: "#c9a96e" }} />
            <h3 className="text-white font-bold text-sm mb-2">
              {"Voiceover Creators"}
            </h3>
            <p className="text-white/40 text-[13px] leading-relaxed">
              {"Book creators and creators with voiceover credits for narration, ads, and audio projects."}
            </p>
          </div>
          <div className="p-6 border border-white/[0.06] bg-white/[0.01]">
            <Camera className="h-6 w-6 mb-4" style={{ color: "#c9a96e" }} />
            <h3 className="text-white font-bold text-sm mb-2">
              {"Brand Campaigns"}
            </h3>
            <p className="text-white/40 text-[13px] leading-relaxed">
              {"Actress creators for lifestyle, beauty, fashion, and product-focused campaigns."}
            </p>
          </div>
          <div className="p-6 border border-white/[0.06] bg-white/[0.01]">
            <Star className="h-6 w-6 mb-4" style={{ color: "#c9a96e" }} />
            <h3 className="text-white font-bold text-sm mb-2">
              {"Production Credits"}
            </h3>
            <p className="text-white/40 text-[13px] leading-relaxed">
              {"Creators with Netflix, Audible, Peacock, and major commercial experience."}
            </p>
          </div>
          <div className="p-6 border border-white/[0.06] bg-white/[0.01]">
            <Camera className="h-6 w-6 mb-4" style={{ color: "#c9a96e" }} />
            <h3 className="text-white font-bold text-sm mb-2">
              {"Casting Calls"}
            </h3>
            <p className="text-white/40 text-[13px] leading-relaxed">
              {"We help source, screen, and coordinate creators for your casting needs."}
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32 px-8 md:px-16 bg-white border-t border-black/10">
        <div className="max-w-3xl">
          <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-semibold">
            {"Need Casting Support?"}
          </p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: "clamp(40px, 7vw, 80px)" }}>
            {"Cast your next"}
            {" "}
            {"project."}
          </h2>
          <p className="text-black/50 text-lg mb-10 max-w-lg">
            {"Book actress creators and voiceover creators with real production experience. South Florida and nationwide remote options."}
          </p>
          <a className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: "#c9a96e", color: "#000" }} href="/start?service=commercial">
            {"Book Actress Creators "}
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </section>
      <footer className="bg-[#080808] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
            <a className="font-display font-semibold tracking-[0.4em] uppercase self-start shrink-0" style={{ fontSize: "17px", color: "#c9a96e" }} href="/">
              {"Influence"}
            </a>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
              <div>
                <p className="text-white/40 text-[9px] tracking-widest uppercase mb-6">
                  {"Work With Us"}
                </p>
                <ul className="space-y-3">
                  <li>
                    <a className="text-white/60 hover:text-white transition-colors text-sm" href="/marketplace">
                      {"Browse Creators"}
                    </a>
                  </li>
                  <li>
                    <a className="text-white/60 hover:text-white transition-colors text-sm" href="/services">
                      {"All Services"}
                    </a>
                  </li>
                  <li>
                    <a className="text-white/60 hover:text-white transition-colors text-sm" href="/start">
                      {"Book Now"}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">
                  {"Services"}
                </p>
                <ul className="space-y-3">
                  <li>
                    <a className="text-white/40 hover:text-white transition-colors text-sm" href="/actress-creators-miami">
                      {"Actress Creators"}
                    </a>
                  </li>
                  <li>
                    <a className="text-white/40 hover:text-white transition-colors text-sm" href="/casting-network-miami">
                      {"Casting Network"}
                    </a>
                  </li>
                  <li>
                    <a className="text-white/40 hover:text-white transition-colors text-sm" href="/voiceover-creators-miami">
                      {"Voiceover Creators"}
                    </a>
                  </li>
                  <li>
                    <a className="text-white/40 hover:text-white transition-colors text-sm" href="/services/commercials">
                      {"Commercials"}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">
                  {"Info"}
                </p>
                <ul className="space-y-3">
                  <li>
                    <a className="text-white/40 hover:text-white transition-colors text-sm" href="/about">
                      {"About"}
                    </a>
                  </li>
                  <li>
                    <a className="text-white/40 hover:text-white transition-colors text-sm" href="/faq">
                      {"FAQ"}
                    </a>
                  </li>
                  <li>
                    <a className="text-white/40 hover:text-white transition-colors text-sm" href="/contact">
                      {"Contact"}
                    </a>
                  </li>
                </ul>
              </div>
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
  );
}
