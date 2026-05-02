const CACHE_NAME = 'shopping-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// Listen for badge update messages
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SET_BADGE') {
    const count = e.data.count;
    if ('setAppBadge' in self.registration) {
      if (count > 0) {
        self.registration.setAppBadge(count).catch(() => {});
      } else {
        self.registration.clearAppBadge().catch(() => {});
      }
    }
  }
});
