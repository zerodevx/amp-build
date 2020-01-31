module.exports = {
  importWorkboxFrom: 'local',

  // Place custom strategies here
  runtimeCaching: [
    // Cache the AMP runtimes with a stale-white-revalidate strategy.
    {
      urlPattern: /(.*)cdn\.ampproject\.org(.*)/,
      handler: 'StaleWhileRevalidate'
    },
    // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets'
      }
    },
    // Cache the underlying font files with a cache-first strategy for 1 year.
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        plugins: [{
          cacheableResponse: {
            statuses: [0, 200]
          }
        }, {
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 5
          }
        }]
      }
    },
    // Cache all other images encountered (except icons which are precached) with a cache-first strategy for 30 days.
    {
      urlPattern: /\.(?:png|gif|jpg|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        plugins: [{
          cacheableResponse: {
            statuses: [0, 200]
          }
        }, {
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 30,
            maxEntries: 30
          }
        }]
      }
    },
    // Cache all others with network-first
    {
      urlPattern: /\.(?:html)$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'misc-cache'
      }
    },
  ],

  // This ensures anchor links are routed to the app-shell instead..
  navigateFallback: 'app-shell.html',

  ignoreURLParametersMatching: [/./],

  //offlineGoogleAnalytics: true,

  cleanupOutdatedCaches: true,

  //swSrc: 'scaffold/workbox-sw.js',
  swDest: 'temp/sw.js',
  globDirectory: 'temp/',

  // Minimatches for Precache
  globPatterns: [
    'images/icons/*',
    //'**/*.html'
    //"offline.html",
    //"404.html",
    "install-sw.html",
    "app-shell.html"
  ]
};
