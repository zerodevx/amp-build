// Load Workbox v3.6.2 from CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js');

// Workbox injection placeholder
workbox.precaching.precacheAndRoute([]);

// Cache AMP runtimes
self.addEventListener('install', event => {
  const urls = [
    'https://cdn.ampproject.org/v0.js',
    'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js',
    'https://cdn.ampproject.org/shadow-v0.js',
    'index.html',
    '/'
  ];
  const cacheName = workbox.core.cacheNames.runtime;
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(urls)));
});

