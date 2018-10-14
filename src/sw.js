// Load Workbox v3.6.2 from CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js');

// Workbox injection placeholder
workbox.precaching.precacheAndRoute([
  {
    "url": "images/bg-1280x874.jpg",
    "revision": "32b2bf86a4594c01970a803cc467eb02"
  },
  {
    "url": "images/bg-2064x1410.jpg",
    "revision": "945df3d49295dff338bae9439e1c5766"
  },
  {
    "url": "images/bg-640x437.jpg",
    "revision": "fd8225b7413210bd10e945f4b25c5ead"
  },
  {
    "url": "images/cat-640x426.jpg",
    "revision": "e8b0522ba798b58ea6e1a2620e157d74"
  },
  {
    "url": "images/cat-640x668.jpg",
    "revision": "a5bbcc98e2f415f4a5473ace84aac12b"
  },
  {
    "url": "images/icon-128x128.png",
    "revision": "152d67adae1f4cb0024c4cbd47de5356"
  },
  {
    "url": "images/icon-144x144.png",
    "revision": "8300ba0fe5f4f661e123d6532b702b5b"
  },
  {
    "url": "images/icon-152x152.png",
    "revision": "accc7940218dbbf572815ebece8dcf59"
  },
  {
    "url": "images/icon-192x192.png",
    "revision": "26a7a6457adc25d1eb18aa6c427519cb"
  },
  {
    "url": "images/icon-384x384.png",
    "revision": "959d2238ef3162e4a11a52afb228379c"
  },
  {
    "url": "images/icon-512x512.png",
    "revision": "1d159054a113e25dbfaf432016d4c4c6"
  },
  {
    "url": "images/icon-72x72.png",
    "revision": "250ee6aaf9abd03ac384feec5da3dc18"
  },
  {
    "url": "images/icon-96x96.png",
    "revision": "4c3427e2ce654524f0bcab225bbcb213"
  },
  {
    "url": "offline.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "shell.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
]);

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

