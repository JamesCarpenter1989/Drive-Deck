// Minimal service worker so Chrome treats Drive Deck as an installable app.
// It always fetches from the network, so updates you upload show straight away.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (new URL(e.request.url).origin !== self.location.origin) return; // leave YouTube alone
  e.respondWith(fetch(e.request).catch(() => new Response('Drive Deck needs a connection.', { status: 503 })));
});
