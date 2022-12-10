// const CACHE_NAME = "version-1";
// const urlsToCache = ["index.html"];
const self = this;
// // Install SW
// self.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => {
//             console.log("Opened cache");
//             return cache.addAll(urlsToCache);
//         })
//     );
// });
// // Listen for requests
// self.addEventListener("fetch", (event) => {
//     event.respondWith(
//         caches.match(event.request).then(() => {
//             return fetch(event.request).catch(() => caches.match("index.html"));
//         })
//     );
// });
// // Activate the SW
// self.addEventListener("activate", (event) => {
//     const cacheWhitelist = [];
//     cacheWhitelist.push(CACHE_NAME);
//     event.waitUntil(
//         caches.keys().then((cacheNames) =>
//             Promise.all(
//                 cacheNames.map((cacheName) => {
//                     if (!cacheWhitelist.includes(cacheName)) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             )
//         )
//     );
// });
// Register event listener for the 'push' event.
self.addEventListener("push", function (event) {
    // Retrieve the textual payload from event.data (a PushMessageData object).
    // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
    // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
    const payload = event.data ? event.data.text() : "no payload";

    // Keep the service worker alive until the notification is created.
    event.waitUntil(
        // Show a notification with title 'ServiceWorker Cookbook' and use the payload
        // as the body.
        self.registration.showNotification("ServiceWorker Cookbook", {
            body: payload,
        })
    );
});
