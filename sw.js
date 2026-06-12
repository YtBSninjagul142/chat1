// Service Worker для PWA
self.addEventListener('install', (event) => {
  console.log('Service Worker установлен');
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});

self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || 'Новое сообщение';
  const options = {
    body: data.body || '',
    icon: 'https://emojicdn.elk.sh/💬',
    badge: 'https://emojicdn.elk.sh/🔔',
    vibrate: [200, 100, 200],
    silent: false,
    tag: 'chat-message'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});