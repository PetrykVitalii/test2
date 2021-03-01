/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { skipWaiting, clientsClaim, setCacheNameDetails } from 'workbox-core';
import { NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';

skipWaiting();
clientsClaim();

setCacheNameDetails({
  prefix: 'agora-cache',
  precache: 'precache',
  runtime: 'runtime',
});

registerRoute(
  ({ url }) => url.pathname.startsWith('/'),
  new NetworkFirst(),
);

precacheAndRoute(self.__WB_MANIFEST, { ignoreURLParametersMatching: [/\.html$/] });

console.log('Started', self);

self.addEventListener('install', (event) => {
  console.log('Installed', event);
});

self.addEventListener('activate', (event) => console.log('Activated', event));

self.addEventListener('push', (event) => console.log('Push message received', event));
