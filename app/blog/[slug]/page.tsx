import type { Metadata } from 'next';
import ArticleView from './ArticleView';
import { articles } from './articles-data';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles[params.slug];
  if (!article) {
    return { title: 'Article Not Found' };
  }
  const description = (article.content.find((b: any) => b.type === 'text')?.value || '').slice(0, 160);
  const url = `https://influencemodels.agency/blog/${params.slug}`;
  return {
    title: article.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      locale: 'en_US',
      siteName: 'Influence Models Agency',
      title: article.title,
      description,
      url,
      type: 'article',
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [article.author || 'Influence Models Agency'],
      section: 'Influencer Marketing',
      tags: ['influencer marketing', 'UGC', 'Miami', 'South Florida', 'social media marketing'],
    },
    twitter: {
      creator: '@influencemodels.agency',
      site: '@influencemodels.agency',
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [article.image],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return <ArticleView slug={params.slug} />;
}

