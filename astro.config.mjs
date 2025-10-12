// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
    site: 'https://dharmzeey.com',
    compressHTML: true,
    build: {
        inlineStylesheets: 'auto'
    },
    integrations: [sitemap(
        {
            changefreq: 'weekly',
            lastmod: new Date(),
            priority: 0.9,
        }
    )],
    vite: {
        plugins: [tailwindcss()],
        build: {
            cssMinify: true,
            minify: 'terser',
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['astro']
                    }
                }
            }
        }
    },
    adapter: netlify({
        edgeMiddleware: false
    })
});