const staticCacheName = 'static-v1';
const coreAssets = [
    '/',
    'index.html',
    'restaurant.html',
    '/css/styles.css',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/js/main.js',
    '/js/register.js',
    '/manifest.json',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://www.mapbox.com/',
    'https://fonts.googleapis.com/css?family=Work+Sans:300,400,900&display=swap'
];

//SW INSTALL - Caching core assets happen here
self.addEventListener('install', e => {
    console.log('INSTALLED!');

    //When self.skipWaiting() is called before the waiting period, Service Worker leapfrogs immediately to activate phase bypassing the waiting period.
    self.skipWaiting();

    //This ensures that assets have been cached before install phase is completed.
    e.waitUntil(// holds off browser from declaring SW as completed until promise is either resolved or rejected.
      caches
        .open(staticCacheName)//Asynchronous, comes with promise
        .then(cache => {
          //Rather than having the array of assets here, variable above stores assets and are referenced using addAll(); callback function gives access to cache and allows addition of items
          cache.addAll(coreAssets); //addAll() preferred over add()
          console.log('CACHING UNDERWAY!')
      })
  );
});

// SW ACTIVATE - Delete caches here
self.addEventListener('activate', e => {
  console.log('ACTIVATED!');
    e.waitUntil( //delays completion of activate phase
    caches
      .keys()
      .then(statics => {
      return Promise.all(statics// pass in array of promises
         .filter(static => {
          // Filtering caches to be taken out; anything !== to staticCacheName stays in array and subsequently deleted.
          return static.startsWith('static-') && static !== staticCacheName;
        }).map(static => { //maps array
          console.log('DELETING OLD CACHES')
          return caches.delete(static); // removes cache with name !== staticCacheName
        })
      );
    })
  );
});

// FETCH EVENT - implements caching strategies; below is just one of the standard strategies.
// In this phase, SW makes site available offline
// Intercepts requests for assets, obviating need to go to server to get asset, cuts loading time. If requested asset not in cache, gets asset from network

self.addEventListener('fetch', e => {
  e.respondWith(
    caches
      .match(e.request) //matches asset in cache with asset requested
      .then(res => {
      return res || fetch(e.request); //gets asset from network
    })
  );
});





