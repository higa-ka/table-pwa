// キャッシュ名を上げると更新が確実に反映されます
const CACHE_NAME = 'table-app-v4';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './static/table1.jpg',
  './static/table2.jpg',
  './static/table3.jpg',
  './static/table4.jpg',
  './static/table5.jpg',
  './static/table6.jpg',
  './static/icon-192.png',
  './static/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request).catch(() => {
        if (e.request.destination === 'image') {
          // 画像取得失敗時のフォールバック（必要に応じて変更）
          return caches.match('./static/table1.jpg');
        }
      });
    })
  );
});
