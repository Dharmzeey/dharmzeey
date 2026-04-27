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
            serialize(item) {
                if (item.url === 'https://dharmzeey.com/') {
                    return { ...item, priority: 1.0 };
                }
                if (item.url === 'https://dharmzeey.com/blogs/') {
                    return { ...item, priority: 0.9 };
                }
                if (item.url.startsWith('https://dharmzeey.com/blogs/')) {
                    return { ...item, priority: 0.8 };
                }
                return { ...item, priority: 0.7 };
            },
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