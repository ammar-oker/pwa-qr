const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'dynamic-static-v1';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/css/style.css',
    '//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css',
    '//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.rtl.min.css',
    '//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js',
    '/js/alert.js',
    'js/jsQR.js',
    'js/qr-reader.js'
];

// install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

// fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, fetchRes.clone())
                    return fetchRes;
                })
            })
        })
    );
});