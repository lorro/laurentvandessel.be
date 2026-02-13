import siteConfig from '@/config/site.config';

export function createWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: siteConfig.socialLinks,
  };
}

export function createBlogPostSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: post.url,
    image: post.image,
    datePublished: post.datePublished.toISOString(),
    dateModified: post.dateModified?.toISOString() || post.datePublished.toISOString(),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': post.url },
  };
}

export function createBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
