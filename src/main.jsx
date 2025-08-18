// Import libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

//Global styles
import './index.css';
import 'boxicons/css/boxicons.min.css';

// Main app component
import App from './App';

// Createe root and render the App component instide <div id="root"> in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Strict mode helps highlight potential problems during dev
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
