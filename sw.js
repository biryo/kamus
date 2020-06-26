var CACHE_NAME = 'my-site-cache-v2';
var urlsToCache = [
  './',
  // 'manifest.json',
  'images/icons/icon-72x72.png',
  'admin/assets/vendor/fontawesome-free/css/all.min.css',
  'admin/assets/vendor/fontawesome-free/webfonts/fa-solid-900.woff2',
  'admin/assets/vendor/fontawesome-free/webfonts/fa-solid-900.woff',
  'admin/assets/vendor/fontawesome-free/webfonts/fa-solid-900.ttf',
  'html/Home.html',
  'html/KetanKalimat.html',
  'html/KetanKata.html',
  'html/About.html',
  'html/GoP.html',
  'css/bootstrap.min.css',
  'css/w3.css',
  'scripts/jquery.js',
  'scripts/jsstore.js',
  'scripts/jsstore.worker.js',
  'scripts/jquery.min.js',
  'rest_api.js',
  'crud.js',
  'scripts/jquery-3.3.1.js',
  'scripts/jquery-3.3.1.min.js',
  'scripts/popper.min.js',
  'scripts/bootstrap.min.js',
  'css/simplePagination.css',
  'css/jquery.simplePagination.js',
  'kbbp.json'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;        
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName != CACHE_NAME
        }).map(function(cacheName){
          return caches.delete(cacheName)          
        })
      ).then(() => {});
    })
  );
});