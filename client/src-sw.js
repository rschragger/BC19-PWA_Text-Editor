const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching

registerRoute(
   // JS and CSS files
   ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
   new StaleWhileRevalidate({
     //  Cache storage
     cacheName: 'asset-cache',
     plugins: [
       // Cache responses with these headers to a maximum-age of 30 days
       new CacheableResponsePlugin({
         statuses: [0, 200],
       }),
     ],
   })
);

this.addEventListener('fetch', function (event) {
  // This fetch function is required for the SW to be detected and is intentionally empty
  // For a more robust, real-world SW example see: https://developers.google.com/web/fundamentals/primers/service-workers
});