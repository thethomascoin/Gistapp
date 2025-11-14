// sw.js
// This service worker is required to make the app a PWA and for the Share Target API.
// It can be expanded to include caching strategies for offline support.

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // We are not intercepting fetches for now, just letting the browser handle it.
  // The share target is handled by the main app logic.
  event.respondWith(fetch(event.request));
});
