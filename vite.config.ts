// Vite and React dependencies
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Node.js path module for file/directory operations
import path from 'path';
import { existsSync, readFileSync, statSync } from 'node:fs';

// Tailwind CSS plugin for Vite
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode, isSsrBuild }) => ({
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        {
            name: 'static-preview-routes',
            configurePreviewServer(server) {
                const root = path.resolve('dist');
                server.middlewares.use((request, response, next) => {
                    if (request.method !== 'GET' && request.method !== 'HEAD') return next();
                    const url = new URL(request.url ?? '/', 'http://localhost');
                    let pathname: string;
                    try { pathname = decodeURIComponent(url.pathname); } catch { return next(); }
                    const target = path.resolve(root, `.${pathname}`);
                    if (target !== root && !target.startsWith(root + path.sep)) return next();
                    if (existsSync(target)) {
                        if (statSync(target).isDirectory() && !url.pathname.endsWith('/')) {
                            response.writeHead(308, { Location: `${url.pathname}/${url.search}` });
                            return response.end();
                        }
                        response.setHeader('Cache-Control', /^\/(assets|generated)\//.test(pathname) ? 'public, max-age=31536000, immutable' : 'no-cache');
                        return next();
                    }
                    const notFound = path.join(root, '404.html');
                    if (!existsSync(notFound)) return next();
                    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-cache' });
                    response.end(request.method === 'HEAD' ? undefined : readFileSync(notFound));
                });
            },
        },
        ...(mode === 'analyze' ? [visualizer({ open: false, filename: path.resolve('.reports/bundle.html') })] : []),
    ],
    server: {
        port: 5173,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        minify: 'esbuild',
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: isSsrBuild ? undefined : (id: string) => {
                    if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
                        return 'react-core';
                    }
                    if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons') || id.includes('node_modules/radix-ui')) {
                        return 'ui-libs';
                    }
                    if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) {
                        return 'animation';
                    }
                },
            },
        },
    },
}));
