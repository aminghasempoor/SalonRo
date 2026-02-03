const CACHE_NAME = "salonro-cache-v2";

const STATIC_ASSETS = ["/", "/manifest.webmanifest", "/logo/192px.png", "/logo/512px.png"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            await Promise.allSettled(
                STATIC_ASSETS.map(async (url) => {
                    try {
                        const response = await fetch(url);
                        if (response.ok) {
                            await cache.put(url, response);
                        }
                    } catch (e) {
                        console.warn("❌ Failed to cache:", url);
                    }
                })
            );
        })
    );

    self.skipWaiting();
});
