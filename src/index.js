import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from './registerServiceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Defer web-vitals until idle to avoid blocking main thread
if (window.requestIdleCallback) {
  requestIdleCallback(() => reportWebVitals(), { timeout: 2000 });
} else {
  setTimeout(() => reportWebVitals(), 2000);
}

// Enable offline support / installability (production builds only)
registerServiceWorker();
