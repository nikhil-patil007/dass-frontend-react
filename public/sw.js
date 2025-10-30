const CACHE_NAME = 'image-cache-v1';
const MANIFEST_URL = '/assets/image-manifest.json';

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME);
                // Fetch manifest without using any existing cache so updates are picked up
                const res = await fetch(MANIFEST_URL, { cache: 'no-cache' });
                const files = await res.json();
                await cache.addAll(files);
            } catch (err) {
                // Non-fatal: still activate SW even if pre-cache fails
                console.warn('[SW] Precache failed:', err);
            }
        })()
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            // Clean up old caches
            const keys = await caches.keys();
            await Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
            await self.clients.claim();
        })()
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    // Only handle same-origin image requests in /assets/images/
    if (url.origin === self.location.origin && url.pathname.startsWith('/assets/images/')) {
        event.respondWith(
            caches.open(CACHE_NAME).then(async (cache) => {
                const cached = await cache.match(event.request);
                if (cached) {
                    return cached;
                }
                const response = await fetch(event.request);
                // Cache successful GET responses
                if (response && response.status === 200 && event.request.method === 'GET') {
                    cache.put(event.request, response.clone());
                }
                return response;
            })
        );
    }
});
