// Note: The code below was written with the help of
// two Google Developers Labs which can be found at:
// https://developers.google.com/web/ilt/pwa/lab-scripting-the-service-worker
// https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker

(function () {
    'use strict';

    // Cache the application shell
    let filesToCache = [
        '.',
        'css/styles.css',
        'images_src/1.jpg',
        'images_src/2.jpg',
        'images_src/3.jpg',
        'images_src/4.jpg',
        'images_src/5.jpg',
        'images_src/6.jpg',
        'images_src/7.jpg',
        'images_src/8.jpg',
        'images_src/9.jpg',
        'images_src/10.jpg',
        'index.html',
        'offline.html',
        'js/main.js',
        'js/dbhelper.js',
        'data/restaurants.json',
    ];

    let staticCacheName = 'resto-cache-v1';

    self.addEventListener('install', function (event) {
        console.log('Attempting to install service worker and cache static assets...');
        // self.skipWaiting();
        // Cache app assets:
        event.waitUntil(
            caches.open(staticCacheName)
                .then(function (cache) {
                    return cache.addAll(filesToCache);
                })
        );
    });

    self.addEventListener('activate', function (event) {
        console.log('Service worker activating...');
        // TODO: update caches here
    });

    self.addEventListener('fetch', function (event) {
        console.log('Fetch event for ', event.request.url);
        event.respondWith(
            caches.match(event.request).then(function (response) {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request)
                    // Add fetched files to the cache
                    .then(function (response) {
                        return caches.open(staticCacheName).then(function (cache) {
                            if (event.request.url.indexOf('test') < 0) {
                                console.log('Adding fetched file to cache...');
                                cache.put(event.request.url, response.clone());
                            }
                            return response;
                        });
                    });
            }).catch(function (error) {
                console.log('Error, ', error);
                return caches.match('offline.html');
            })
        );
    });

})();