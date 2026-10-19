import type { Metadata } from 'next';
import { Check, Film } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: "Music Video Creators for Hire | Miami | Influence | Influence Marketing" },
  description: "Book professional music video creators in Miami. Our creators has appeared in videos for Sean Paul, Trippie Redd, Kodak Black, French Montana & more. 17M+ combined views.",
  keywords: "music video creators, music video girls, hire creators for music video, music video creators Miami, video vixens Miami",
  alternates: { canonical: "https://influencecreators.marketing" },
  openGraph: {
    title: "Music Video Creators for Hire | Influence",
    description: "Professional music video creators with credits including Sean Paul, Trippie Redd, Kodak Black. Starting at $100.",
    url: "https://influencecreators.marketing/music-video-creators",
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
    <div className="min-h-screen bg-[#080808] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"Service\",\"name\":\"Music Video Creators for Hire \u2014 Miami, South Florida\",\"description\":\"Professional music video creators in Miami with credits including Sean Paul, Trippie Redd, Kodak Black, DaBaby, and French Montana. Book for music video productions in South Florida. Starting at $500.\",\"url\":\"https://influencecreators.marketing/music-video-creators\",\"provider\":{\"@type\":\"Organization\",\"name\":\"Influence\",\"url\":\"https://influencecreators.marketing\"},\"areaServed\":[{\"@type\":\"City\",\"name\":\"Miami\"},{\"@type\":\"State\",\"name\":\"Florida\"}],\"serviceType\":\"Music Video Content Ordering\",\"offers\":[{\"@type\":\"Offer\",\"name\":\"Solo Feature\",\"price\":\"500\",\"priceCurrency\":\"USD\",\"description\":\"1 model, 4hr, featured scenes.\"},{\"@type\":\"Offer\",\"name\":\"Trio Feature\",\"price\":\"1200\",\"priceCurrency\":\"USD\",\"description\":\"3 creators, 4hr, full video cast.\"},{\"@type\":\"Offer\",\"name\":\"Big Production\",\"price\":\"3500\",\"priceCurrency\":\"USD\",\"description\":\"10-50 creators, full music video production.\"}]}" }} />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: "#c9a96e" }}>
            {"Music Video Creators"}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {"Music Video"}
          <br />
          <span style={{ color: "#c9a96e" }}>
            {"Models for Hire"}
          </span>
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-2xl">
          {"Professional creators who've been leads in videos with 17M+ views. From Trippie Redd to Sean Paul \u2014 our creators knows how to perform on camera and elevate your visual."}
        </p>
        <h2 className="text-2xl font-bold mb-6">
          {"Featured Music Video Credits"}
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <div className="flex items-start gap-3 border border-white/[0.06] p-4">
            <Film className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <div>
              <p className="font-bold text-white text-sm">
                {"Sean Paul"}
              </p>
              <p className="text-white/30 text-xs">
                {"Official Music Video"}
                {" \u2014 "}
                {"Deseray Marie"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-white/[0.06] p-4">
            <Film className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <div>
              <p className="font-bold text-white text-sm">
                {"Trippie Redd"}
              </p>
              <p className="text-white/30 text-xs">
                {"\"Stay The Same\" \u2014 Lead Model"}
                {" \u2014 "}
                {"Ty Nadia"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-white/[0.06] p-4">
            <Film className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <div>
              <p className="font-bold text-white text-sm">
                {"Kodak Black"}
              </p>
              <p className="text-white/30 text-xs">
                {"Official Music Video \u2014 Lead"}
                {" \u2014 "}
                {"Ty Nadia"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-white/[0.06] p-4">
            <Film className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <div>
              <p className="font-bold text-white text-sm">
                {"Bryson Tiller"}
              </p>
              <p className="text-white/30 text-xs">
                {"Official Music Video"}
                {" \u2014 "}
                {"Deseray Marie"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-white/[0.06] p-4">
            <Film className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <div>
              <p className="font-bold text-white text-sm">
                {"French Montana"}
              </p>
              <p className="text-white/30 text-xs">
                {"Official Music Video"}
                {" \u2014 "}
                {"Ty Nadia"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-white/[0.06] p-4">
            <Film className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <div>
              <p className="font-bold text-white text-sm">
                {"DaBaby"}
              </p>
              <p className="text-white/30 text-xs">
                {"Official Music Video"}
                {" \u2014 "}
                {"Deseray Marie"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-white/[0.06] p-4">
            <Film className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <div>
              <p className="font-bold text-white text-sm">
                {"Sexyy Red"}
              </p>
              <p className="text-white/30 text-xs">
                {"Official Music Video"}
                {" \u2014 "}
                {"Ty Nadia"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-white/[0.06] p-4">
            <Film className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <div>
              <p className="font-bold text-white text-sm">
                {"Akon"}
              </p>
              <p className="text-white/30 text-xs">
                {"Music Video / Collaboration"}
                {" \u2014 "}
                {"Deseray Marie"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-white/[0.06] p-4">
            <Film className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <div>
              <p className="font-bold text-white text-sm">
                {"Chicken P"}
              </p>
              <p className="text-white/30 text-xs">
                {"Music Video \u2014 17M+ Views"}
                {" \u2014 "}
                {"Ty Nadia"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-white/[0.06] p-4">
            <Film className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <div>
              <p className="font-bold text-white text-sm">
                {"Young Thug"}
              </p>
              <p className="text-white/30 text-xs">
                {"Music Video / Collaboration"}
                {" \u2014 "}
                {"Deseray Marie"}
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6">
          {"Why Choose Our Creators"}
        </h2>
        <div className="space-y-3 mb-16">
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <p className="text-white/50 text-sm">
              {"Professional on-camera experience \u2014 not first-timers"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <p className="text-white/50 text-sm">
              {"Credits with major label artists (Atlantic, Republic, Interscope)"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <p className="text-white/50 text-sm">
              {"Comfortable with long shoot days, multiple setups, and direction changes"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <p className="text-white/50 text-sm">
              {"Available for same-week bookings in Miami/South Florida"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <p className="text-white/50 text-sm">
              {"Content rights included \u2014 use footage across all platforms"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a96e" }} />
            <p className="text-white/50 text-sm">
              {"Behind-the-scenes social media coverage included with Pro packages"}
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6">
          {"Packages for Artists"}
        </h2>
        <div className="space-y-4 mb-16">
          <div className="border p-6 flex items-center justify-between border-white/[0.06]">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-white">
                  {"Sample"}
                </h3>
              </div>
              <p className="text-white/40 text-sm">
                {"1 model, 1 scene/reel. Perfect for a teaser or social clip."}
              </p>
              <p className="text-white/20 text-xs mt-1">
                {"Best for: "}
                {"Emerging artists"}
              </p>
            </div>
            <p className="text-2xl font-bold flex-shrink-0 ml-6" style={{ color: "#c9a96e" }}>
              {"$100"}
            </p>
          </div>
          <div className="border p-6 flex items-center justify-between border-white/[0.06]">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-white">
                  {"Starter"}
                </h3>
              </div>
              <p className="text-white/40 text-sm">
                {"1 model, 2 scenes. Full music video with featured model."}
              </p>
              <p className="text-white/20 text-xs mt-1">
                {"Best for: "}
                {"Independent artists"}
              </p>
            </div>
            <p className="text-2xl font-bold flex-shrink-0 ml-6" style={{ color: "#c9a96e" }}>
              {"$300"}
            </p>
          </div>
          <div className="border p-6 flex items-center justify-between border-[#c9a96e]/30 bg-[#c9a96e]/[0.04]">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-white">
                  {"Growth"}
                </h3>
                <span className="px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase" style={{ backgroundColor: "#c9a96e", color: "#000" }}>
                  {"Popular"}
                </span>
              </div>
              <p className="text-white/40 text-sm">
                {"1 model, 4 scenes. Multiple looks, outfits, and setups."}
              </p>
              <p className="text-white/20 text-xs mt-1">
                {"Best for: "}
                {"Serious releases"}
              </p>
            </div>
            <p className="text-2xl font-bold flex-shrink-0 ml-6" style={{ color: "#c9a96e" }}>
              {"$500"}
            </p>
          </div>
          <div className="border p-6 flex items-center justify-between border-white/[0.06]">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-white">
                  {"Pro"}
                </h3>
              </div>
              <p className="text-white/40 text-sm">
                {"1 model, 6 premium scenes. Full treatment with BTS content."}
              </p>
              <p className="text-white/20 text-xs mt-1">
                {"Best for: "}
                {"Label-quality visuals"}
              </p>
            </div>
            <p className="text-2xl font-bold flex-shrink-0 ml-6" style={{ color: "#c9a96e" }}>
              {"$850"}
            </p>
          </div>
        </div>
        <div className="border border-white/[0.06] p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {"Book a Music Video Model"}
          </h2>
          <p className="text-white/40 mb-6">
            {" Professional creators. Starting at $100."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all text-center" style={{ backgroundColor: "#c9a96e", color: "#000" }} href="/marketplace">
              {"Browse Models"}
            </a>
            <a className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#c9a96e]/50 transition-all text-center text-white/70 hover:text-white" href="/book">
              {"Book Now"}
            </a>
          </div>
        </div>
        <div className="mt-16 text-white/20 text-sm leading-relaxed">
          <h3 className="text-white/40 font-bold mb-2">
            {"Music Video Creators Across Florida"}
          </h3>
          <p>
            {"Our music video creators are based in Miami, Hollywood, Fort Lauderdale, and Orlando. Available for shoots throughout Florida and willing to travel nationally for the right project. All models have professional music video experience and are comfortable with full-day shoots, choreography, and creative direction."}
          </p>
        </div>
      </div>
    </div>
  );
}
