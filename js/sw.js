self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    event.waitUntil(
        caches.open('static-cache').then((cache) => {
            cache.addAll([
                '/index.html',
                '/css/styles.css',
                '/js/app.js',
                '/assets/icon-192.png',
                '/assets/icon-512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
