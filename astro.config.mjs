import { defineConfig, envField } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  site: 'https://laurentvandessel.be',
  base: '/',

  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      PUBLIC_CONTACT_ENDPOINT: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_GA_MEASUREMENT_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_GTM_ID: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },

  integrations: [
    vue(),
    mdx(),
    sitemap(),
  ],

  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
