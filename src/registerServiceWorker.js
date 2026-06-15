// Registers the PWA service worker. Only runs in production builds, so the
// dev server (npm start) is never served stale cached assets.
export default function registerServiceWorker() {
  if (process.env.NODE_ENV !== 'production') return;
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    navigator.serviceWorker
      .register(swUrl)
      .catch((err) => console.error('Service worker registration failed:', err));
  });
}
