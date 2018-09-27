// import idb from 'idb';
//
// idb.open('test-db', 1, function (upgradeDb) {
//   var keyValStore = upgradeDb.createObjectStore('keyval');
//   keyValStore.put('world', 'hello')
// });

const version = '0.1.9';
var cacheName = `restaurant-v${version}`;
var staticCache = 'restaurant-static-cache';
var assetCache = 'restaurant-image-cache';
var allCaches = [staticCache, assetCache];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        "/",
        "/restaurants",
        "/css/styles.css",
        "/js/dbhelper.js",
        "/js/main.js",
        "/js/restaurant_info.js",
        "/manifest.json"
      ])
        .catch(error => {
          console.log("Cache failed: " + error);
        })
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  let cacheRequest = event.request;
  let requestUrl = new URL(event.request.url);
  //
  // // TODO: Get individual restaurants cache;
  // // if (event.request.url.includes("restaurant.html")){
  // // let restaurantID = event.request.url.match('/id.+/');
  //
  // // event.respondWith(restaurantCache(event.request));
  // // return;
  // // }
  //
  // if (requestUrl.origin === location.origin){
  //   if (requestUrl.pathname === '/'){
  //
  //   }

    if (requestUrl.pathname.startsWith('/img/')){
      event.respondWith(imageCache(event.request));
      return;
    }
  // }
  event.respondWith(
    caches.match(event.request).then(response =>{
      return response || fetch(event.request);
    })
  );

});

// cache images
imageCache = (request) => {
  var imageUrl = request.url.replace(/_\dx.jpg$/, '');
  // console.log(request)
  // console.log(imageUrl)

  // return images from the "assetCache" cache if they
  // are in there. If not fetch from the cache.
  return caches.open(assetCache).then(cache => {
    return cache.match(imageUrl).then(response => {

      if (response) return response;

      return fetch(request).then(networkResponse => {
        // send copy of the response to the cache.
        cache.put(imageUrl, networkResponse.clone());
        return networkResponse;
      });
    })
  })
}
