/**
 * Structured data (JSON-LD) for agentic SEO
 * Every article page gets Article schema
 * Every glossary page gets DefinedTerm schema
 */

import { GFPost } from './ghost';

export function articleSchema(post: GFPost): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.feature_image,
    datePublished: post.published_at,
    author: {
      '@type': 'Organization',
      name: 'Gentle Future',
      url: 'https://gentlefuture.co',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gentle Future',
      url: 'https://gentlefuture.co',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gentlefuture.co/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://gentlefuture.co/archive/${new Date(post.published_at).getFullYear()}/${String(new Date(post.published_at).getMonth() + 1).padStart(2, '0')}/${String(new Date(post.published_at).getDate()).padStart(2, '0')}`,
    },
    about: post.tags?.map(t => ({
      '@type': 'Thing',
      name: t.name,
    })),
    keywords: post.tags?.map(t => t.name).join(', '),
  };
}

export function glossarySchema(term: string, definition: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Gentle Future Glossary',
      url: 'https://gentlefuture.co/glossary',
    },
  };
}

export function websiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gentle Future',
    url: 'https://gentlefuture.co',
    description: 'An editorial platform covering the shift from maximum functionality to maximum well-being in design and technology.',
    publisher: {
      '@type': 'Organization',
      name: 'Gentle Future',
      url: 'https://gentlefuture.co',
    },
  };
}
