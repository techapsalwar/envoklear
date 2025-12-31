import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            outDir: 'public',
            devOptions: {
                enabled: true
            },
            includeAssets: ['favicon.ico', 'envologocolour1.svg'],
            manifest: {
                name: 'EnvoKlear',
                short_name: 'EnvoKlear',
                description: 'AI Powered Web Development & Digital Services',
                theme_color: '#00b84d',
                background_color: '#1a1a1a',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                orientation: 'portrait',
                icons: [
                    {
                        src: 'envologocolour1.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                        purpose: 'any maskable'
                    }
                ]
            }
        }),
    ],
});
