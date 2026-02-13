export function GET({ site }) {
  const siteUrl = site?.toString() || 'https://laurentvandessel.be';

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteUrl}sitemap-index.xml`.trim();

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
