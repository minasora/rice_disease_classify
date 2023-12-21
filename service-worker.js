self.addEventListener('install', (event) => {
    console.log('Service Worker 安装');
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.endsWith('model.onnx')) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((response) => {
                    let responseToCache = response.clone();
                    caches.open('model-cache').then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                });
            })
        );
    }
});
