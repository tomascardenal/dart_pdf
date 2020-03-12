'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/index.html": "f76f4ab86ab2396fb80ddd1c253077fe",
"/main.dart.js": "d4f9cfdd753ff84c0e20f0bb1c33d2b0",
"/icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"/icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"/manifest.json": "00e0b69b49487ce4f9ff0c5fac8fda49",
"/assets/LICENSE": "39f67c304db356118fd9295d9ab8e8ff",
"/assets/AssetManifest.json": "b162e53f9dfcf751819c0f717979e8bb",
"/assets/FontManifest.json": "580ff1a5d08679ded8fcf5c6848cece7",
"/assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets/assets/example.md": "f5804d74aecc4c97beb21fae202aeddf",
"/assets/assets/example.html": "3caa41637fb19c6e56cb2fe25966c8e4"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request, {
          credentials: 'include'
        });
      })
  );
});
