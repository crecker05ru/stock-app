// console.log('Service worker')
// const CACHE = 'network-or-cache-v1'
// const CACHE2 = 'offline-fallback-v1'

// const timeout = 400
// // При установке воркера мы должны закешировать часть данных (статику).
// self.addEventListener('install', (event) => {
//   event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(['/img/background'])))
// })

// // при событии fetch, мы и делаем запрос, но используем кэш, только после истечения timeout.
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     fromNetwork(event.request, timeout).catch((err) => {
//       console.log(`Error: ${err.message()}`)
//       return fromCache(event.request)
//     }),
//   )
// })

// // Временно-ограниченный запрос.
// function fromNetwork(request, timeout) {
//   return new Promise((fulfill, reject) => {
//     var timeoutId = setTimeout(reject, timeout)
//     fetch(request).then((response) => {
//       clearTimeout(timeoutId)
//       fulfill(response)
//     }, reject)
//   })
// }

// function fromCache(request) {
//   // Открываем наше хранилище кэша (CacheStorage API), выполняем поиск запрошенного ресурса.
//   // Обратите внимание, что в случае отсутствия соответствия значения Promise выполнится успешно, но со значением `undefined`
//   return caches
//     .open(CACHE)
//     .then((cache) =>
//       cache.match(request).then((matching) => matching || Promise.reject('no-match')),
//     )
// }

// // При установке воркера мы должны закешировать часть данных (статику).
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches
//       .open(CACHE)
//       .then((cache) => cache.addAll(['/img/background']))
//       // `skipWaiting()` необходим, потому что мы хотим активировать SW
//       // и контролировать его сразу, а не после перезагрузки.
//       .then(() => self.skipWaiting()),
//   )
// })

// self.addEventListener('activate', (event) => {
//   // `self.clients.claim()` позволяет SW начать перехватывать запросы с самого начала,
//   // это работает вместе с `skipWaiting()`, позволяя использовать `fallback` с самых первых запросов.
//   event.waitUntil(self.clients.claim())
// })

// self.addEventListener('fetch', function (event) {
//   // Можете использовать любую стратегию описанную выше.
//   // Если она не отработает корректно, то используейте `Embedded fallback`.
//   event.respondWith(networkOrCache(event.request).catch(() => useFallback()))
// })

// function networkOrCache(request) {
//   return fetch(request)
//     .then((response) => (response.ok ? response : fromCache2(request)))
//     .catch(() => fromCache2(request))
// }

// // Наш Fallback вместе с нашим собсвенным Динозавриком.
// const FALLBACK =
//   '<div>\n' +
//   '    <div>App Title</div>\n' +
//   '    <div>you are offline</div>\n' +
//   '    <img src="/svg/or/base64/of/your/dinosaur" alt="dinosaur"/>\n' +
//   '</div>'

// // Он никогда не упадет, т.к мы всегда отдаем заранее подготовленные данные.
// function useFallback() {
//   return Promise.resolve(
//     new Response(FALLBACK, {
//       headers: {
//         'Content-Type': 'text/html; charset=utf-8',
//       },
//     }),
//   )
// }

// function fromCache2(request) {
//   return caches
//     .open(CACHE2)
//     .then((cache) =>
//       cache.match(request).then((matching) => matching || Promise.reject('no-match')),
//     )
// }
