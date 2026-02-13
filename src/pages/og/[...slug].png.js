// OG image generation disabled — using static /public/og-default.svg instead.
export function getStaticPaths() {
  return [];
}

export function GET() {
  return new Response(null, { status: 404 });
}
