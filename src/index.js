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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
