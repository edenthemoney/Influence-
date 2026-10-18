import type { Metadata } from 'next';
import ArticleView from './ArticleView';
import { articles } from './articles-data';

const SITE = 'https://influencecreators.marketing';

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles[params.slug];
  if (!article) {
    return { title: 'Article Not Found' };
  }
  const firstText = article.content.find((block) => block.type === 'text');
  const description = (firstText && firstText.type === 'text' ? firstText.value : '').slice(0, 160);
  const url = `${SITE}/blog/${params.slug}`;
  const image = `${SITE}${article.image}`;
  return {
    title: { absolute: article.title },
    description,
    alternates: { canonical: url },
    openGraph: {
      locale: 'en_US',
      siteName: 'Influence',
      title: article.title,
      description,
      url,
      type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: article.title }],
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [article.author || 'Influence'],
      section: 'Creator Marketing',
      tags: ['creator marketing', 'UGC', 'Miami', 'South Florida', 'social media marketing'],
    },
    twitter: {
      creator: '@influencecreators.marketing',
      site: '@influencecreators.marketing',
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [image],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return <ArticleView slug={params.slug} />;
}

