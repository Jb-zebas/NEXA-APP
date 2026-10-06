'use strict';
const CACHE = 'nexa-shell-v4';
const SHELL = ['./', './index.html', './styles.css', './app.js', './real-places.js', './qrcode.min.js'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(SHELL.map(url => cache.add(url)));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('nexa-shell-') && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type !== 'SHOW_NOTIFICATION') return;
  const payload = event.data;
  event.waitUntil(self.registration.showNotification(String(payload.title || 'NEXA'), {
    body: String(payload.body || ''), icon: './icon.svg', badge: './icon.svg',
    data: { url: './' }
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
    const client = clients.find(item => 'focus' in item);
    return client ? client.focus() : self.clients.openWindow('./');
  }));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    try {
      const response = await fetch(req);
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {});
      }
      return response;
    } catch {
      return (await caches.match(req)) || (req.mode === 'navigate' ? (await caches.match('./index.html')) : Response.error());
    }
  })());
});
