import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * WhatsApp and other apps need an absolute address for the preview image. Set SITE_URL when building
 * (for example SITE_URL=https://nikah.example.com npm run build). Netlify and Vercel are picked up automatically.
 * Without one, the image tags are removed rather than left pointing nowhere.
 */
function siteUrl(): string {
  const env = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
  const raw = env.SITE_URL ?? env.URL ?? (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
  return raw.replace(/\/+$/, '');
}

function socialPreview(): Plugin {
  return {
    name: 'social-preview',
    transformIndexHtml(html) {
      const url = siteUrl();
      if (url) return html.replace(/%SITE_URL%/g, url);
      return html.replace(/^\s*<meta[^>]*%SITE_URL%[^>]*>\n?/gm, '');
    },
  };
}

// base './' lets the built site work on Netlify, Vercel, GitHub Pages or any sub-folder.
export default defineConfig({
  base: './',
  plugins: [react(), socialPreview()],
});
