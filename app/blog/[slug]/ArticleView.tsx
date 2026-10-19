import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock } from 'lucide-react';
import MobileNav from '../../components/MobileNav';
import { articles, type ArticleBlock } from './articles-data';

const gold = '#c9a96e';
const SITE = 'https://influencecreators.marketing';

function TextBlock({ block }: { block: Extract<ArticleBlock, { type: 'text' }> }) {
  if (block.lead && block.value.startsWith(block.lead)) {
    return (
      <p className="text-white/50 text-base leading-relaxed">
        <strong className="text-white/80">{block.lead}</strong>
        {block.value.slice(block.lead.length)}
      </p>
    );
  }
  return <p className="text-white/50 text-base leading-relaxed">{block.value}</p>;
}

export default function ArticleView({ slug }: { slug: string }) {
  const article = articles[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold italic text-2xl text-white mb-4">Article not found</h1>
          <Link href="/blog" className="text-sm" style={{ color: gold }}>
            ← Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const description = article.content.find((block) => block.type === 'text' && !('lead' in block && block.lead));
  const schemaDescription = description && description.type === 'text' ? description.value : article.title;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: schemaDescription,
    image: `${SITE}${article.image}`,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'Influence',
      logo: { '@type': 'ImageObject', url: `${SITE}/favicon.svg` },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${slug}` },
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Creators</Link>
              <Link href="/services" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Services</Link>
              <Link href="/pricing" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Pricing</Link>
              <Link href="/blog" className="transition-colors duration-300 text-[11px] tracking-widest uppercase" style={{ color: gold }}>Journal</Link>
            </div>
          </div>
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: gold }}>Influence</Link>
          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-10">
              <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">About</Link>
              <Link href="/contact" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Contact</Link>
            </div>
            <Link href="/start" className="px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all hover:opacity-90" style={{ backgroundColor: gold, color: '#000' }}>
              Book Now
            </Link>
          </div>
        </div>
      </nav>

      <article className="pt-28 pb-20">
        <div className="relative h-64 md:h-96 w-full mb-10">
          <Image src={article.image} alt={article.title} fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 md:left-14">
            <Link href="/blog" className="text-white/40 text-xs hover:text-white transition-colors flex items-center gap-1 mb-3">
              <ArrowLeft className="w-3 h-3" />
              Back to Journal
            </Link>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 text-[9px] font-bold tracking-widest uppercase border" style={{ borderColor: gold, color: gold }}>
              {article.category}
            </span>
            <span className="text-white/30 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
            <span className="text-white/20 text-xs">{article.date}</span>
          </div>
          <h1 className="font-display font-bold italic text-3xl md:text-5xl text-white mb-6 leading-tight">{article.title}</h1>
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-6 mb-10">
            <span className="text-white/30 text-sm">By {article.author}</span>
          </div>
          <div className="space-y-6">
            {article.content.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={index} className="font-display font-bold italic text-xl md:text-2xl text-white mt-10 mb-2">
                    {block.value}
                  </h2>
                );
              }
              if (block.type === 'stat') {
                return (
                  <div key={index} className="border-l-2 pl-6 py-3 my-4" style={{ borderColor: gold }}>
                    <p className="text-3xl font-bold mb-1" style={{ color: gold }}>{block.value}</p>
                    <p className="text-white/40 text-sm">{block.label}</p>
                  </div>
                );
              }
              if (block.type === 'cta') {
                return (
                  <div key={index} className="mt-12 p-8 border border-white/[0.06] text-center">
                    <p className="text-white/60 text-base mb-5">{block.text}</p>
                    <Link
                      href={block.href}
                      className="inline-block px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all"
                      style={{ backgroundColor: gold, color: '#000' }}
                    >
                      {block.label}
                    </Link>
                  </div>
                );
              }
              return <TextBlock key={index} block={block} />;
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
