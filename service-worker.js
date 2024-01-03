var CACHE_NAME = 'site-cache-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/model.onnx
];

self.addEventListener('install', function(event) {
  // 安装步骤
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 缓存命中，返回缓存的响应。
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});


