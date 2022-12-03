'use strict'

const channel = new BroadcastChannel("notifications");

self.addEventListener("push", (event) => {
  const data = JSON.parse(event.data.text());
  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.message,
      icon: 'favicon.ico'
    })
  );
  channel.postMessage(data);
});

self.addEventListener('notificationclick', (event) => {
  const url = 'http://localhost:3001/home';

  event.waitUntil(
    clients.matchAll({type: 'window'}).then( windowClients => {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});