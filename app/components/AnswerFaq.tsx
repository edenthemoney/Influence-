// Answer-first FAQ block + matching FAQPage JSON-LD. Copy must stay factual: only services and prices already published on the site.
export type QA = { q: string; a: string };

export default function AnswerFaq({ id, title, items, service }: { id: string; title: string; items: QA[]; service?: { name: string; description: string; serviceType: string } }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `https://influencecreators.marketing${id}#faq`,
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
  const svc = service && {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://influencecreators.marketing${id}#service`,
    ...service,
    url: `https://influencecreators.marketing${id}`,
    provider: { '@type': 'Organization', name: 'Influence', url: 'https://influencecreators.marketing' },
    areaServed: { '@type': 'AdministrativeArea', name: 'South Florida' },
  };
  return (
    <section className="mt-16 border-t border-white/[0.08] pt-10 text-left">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {svc && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(svc) }} />}
      <h2 className="font-display font-bold italic text-white mb-6" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>{title}</h2>
      <div className="divide-y divide-white/[0.08]">
        {items.map((i) => (
          <div key={i.q} className="py-5">
            <h3 className="text-white font-semibold text-base md:text-lg mb-2">{i.q}</h3>
            <p className="text-white/65 leading-relaxed pl-4 border-l-2" style={{ borderColor: '#c9a96e' }}>{i.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
