import Link from 'next/link';
import MobileNav from './MobileNav';

const gold = '#c9a96e';
const BASE = 'https://influencecreators.marketing';

export type GeoSection = { id?: string; heading: string; answer: string; body?: string[]; bullets?: string[]; lang?: string };
export type GeoFaq = { q: string; a: string };
export type GeoPageProps = {
  path: string;
  eyebrow: string;
  h1: string;
  intro: string;
  serviceName: string;
  serviceType: string;
  serviceDescription: string;
  sections: GeoSection[];
  faqs: GeoFaq[];
  sources?: { label: string; url: string }[];
  cta: { label: string; href: string };
  related: { label: string; href: string }[];
};

export function geoSchema(p: GeoPageProps) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${BASE}${p.path}#service`,
        name: p.serviceName,
        serviceType: p.serviceType,
        description: p.serviceDescription,
        url: `${BASE}${p.path}`,
        provider: { '@type': 'Organization', name: 'Influence', url: BASE },
        areaServed: [
          { '@type': 'City', name: 'Miami' },
          { '@type': 'City', name: 'Fort Lauderdale' },
          { '@type': 'City', name: 'Boca Raton' },
          { '@type': 'AdministrativeArea', name: 'South Florida' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE}${p.path}#faq`,
        mainEntity: p.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export default function GeoLanding(p: GeoPageProps) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(geoSchema(p)) }} />
      <div className="min-h-screen bg-[#080808] text-white">
        <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
          <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
            <div className="flex items-center gap-4">
              <MobileNav />
              <div className="hidden md:flex items-center gap-10">
                <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors text-[11px] tracking-widest uppercase">Creators</Link>
                <Link href="/services" className="text-white/55 hover:text-white transition-colors text-[11px] tracking-widest uppercase">Services</Link>
                <Link href="/events" className="text-white/55 hover:text-white transition-colors text-[11px] tracking-widest uppercase">Events</Link>
              </div>
            </div>
            <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: gold }}>Influence</Link>
            <Link href={p.cta.href} className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Now</Link>
          </div>
        </nav>

        <header className="relative pt-32 md:pt-44 pb-14 md:pb-20 px-6 md:px-14 overflow-hidden">
          <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 0%, rgba(201,169,110,0.16), transparent 60%)' }} />
          <div className="relative max-w-4xl mx-auto">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-5" style={{ color: gold }}>{p.eyebrow}</p>
            <h1 className="font-display font-bold italic leading-[0.95] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>{p.h1}</h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-9">{p.intro}</p>
            <Link href={p.cta.href} className="inline-flex items-center justify-center px-9 py-4 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 w-full sm:w-auto" style={{ backgroundColor: gold, color: '#000' }}>{p.cta.label}</Link>
          </div>
        </header>

        <main className="px-6 md:px-14 pb-20">
          <div className="max-w-4xl mx-auto space-y-14 md:space-y-20">
            {p.sections.map((s) => (
              <section key={s.heading} id={s.id} lang={s.lang} className="border-t border-white/[0.08] pt-10 md:pt-14">
                <h2 className="font-display font-bold italic mb-4" style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}>{s.heading}</h2>
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4 pl-4 border-l-2" style={{ borderColor: gold }}>{s.answer}</p>
                {s.body?.map((b) => <p key={b} className="text-white/60 leading-relaxed mb-3">{b}</p>)}
                {s.bullets && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-white/70 leading-relaxed"><span style={{ color: gold }}>—</span><span>{b}</span></li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="border-t border-white/[0.08] pt-10 md:pt-14">
              <h2 className="font-display font-bold italic mb-6" style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}>Questions</h2>
              <div className="divide-y divide-white/[0.08]">
                {p.faqs.map((f) => (
                  <details key={f.q} className="py-5 group">
                    <summary className="cursor-pointer list-none flex justify-between gap-4 text-white font-medium text-base md:text-lg">
                      <span>{f.q}</span><span style={{ color: gold }} className="group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-white/60 leading-relaxed mt-3">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {p.sources && p.sources.length > 0 && (
              <section className="text-white/40 text-sm">
                <p className="uppercase tracking-widest text-[10px] mb-2">Sources</p>
                <ul className="space-y-1">{p.sources.map((s) => <li key={s.url}><a href={s.url} rel="noopener noreferrer" target="_blank" className="underline hover:text-white">{s.label}</a></li>)}</ul>
              </section>
            )}

            <section className="border border-white/[0.1] p-8 md:p-12 text-center" style={{ background: 'linear-gradient(180deg, rgba(201,169,110,0.08), transparent)' }}>
              <p className="font-display italic font-bold mb-3" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}>Tell us what you need.</p>
              <p className="text-white/60 mb-7">Every project is quoted on its scope. Send the details and we reply with options.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={p.cta.href} className="px-8 py-4 text-[12px] font-bold tracking-widest uppercase hover:opacity-85" style={{ backgroundColor: gold, color: '#000' }}>{p.cta.label}</Link>
                <Link href="/contact" className="px-8 py-4 text-[12px] font-bold tracking-widest uppercase border border-white/20 hover:border-white/50">Contact</Link>
              </div>
            </section>

            <nav aria-label="Related" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {p.related.map((r) => <Link key={r.href} href={r.href} className="text-white/50 hover:text-white underline-offset-4 hover:underline">{r.label}</Link>)}
            </nav>
          </div>
        </main>
      </div>
    </>
  );
}
