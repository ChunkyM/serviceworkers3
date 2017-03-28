var CACHE_NAME = 'gih-cache-v5';
var CACHED_URLS = [
  // Our HTML
  'first.html',
  // Stylesheets and fonts
    'matstyle.css',
  // JavaScript
    'mat.js',
  // Images
    'appimages/android-icon-36x36.png',
    'appimages/android-icon-48x48.png',
    'appimages/android-icon-72x72.png',
    'appimages/android-icon-96x96.png',
    'appimages/android-icon-144x144.png',
    'appimages/android-icon-192x192.png',
    'appimages/favicon.ico',
    'appimages/favicon-16x16.png',
    'appimages/favicon-32x32.png',
    'appimages/favicon-96x96.png',
    'appimages/dino.png',
    'appimages/paddy.png',
    'appimages/jack.png',
    'eventsimages/example-blog01.png',
    'eventsimages/example-blog02.png',
    'eventsimages/example-blog03.png',
    'eventsimages/example-blog04.png',
    'eventsimages/example-blog05.png',
    'eventsimages/example-blog06.png',
    'eventsimages/example-blog07.png',
    'eventsimages/example-work01.png',
    'eventsimages/example-work02.png',
    'eventsimages/example-work03.png',
    'eventsimages/example-work04.png',
    'eventsimages/example-work05.png',
    'eventsimages/example-work06.png',
    'eventsimages/example-work07.png',
    'eventsimages/example-work08.png',
    'eventsimages/example-work09.png',
    
];

self.addEventListener('install', function(event) {
  // Cache everything in CACHED_URLS. Installation will fail if something fails to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('first.html');
        }
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});




