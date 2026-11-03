// Minimal service worker so Chrome treats Drive Deck as an installable app.
// v3: always asks GitHub for the newest files, so uploaded updates show straight away.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (new URL(e.request.url).origin !== self.location.origin) return; // leave YouTube alone
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' })
      .catch(() => new Response('Drive Deck needs a connection.', { status: 503 }))
  );
});
