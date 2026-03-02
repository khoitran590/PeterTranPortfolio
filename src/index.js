import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faHtml5, 
  faCss3Alt, 
  faJs, 
  faReact, 
  faNode, 
  faPython,
  faPhp,
  faGit
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCode, faUsers, faBrain, faClock } from '@fortawesome/free-solid-svg-icons';

library.add(
  faHtml5, 
  faCss3Alt, 
  faJs, 
  faReact, 
  faNode, 
  faPython,
  faPhp,
  faGit,
  faDatabase,
  faCode,
  faUsers,
  faBrain,
  faClock
);

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
