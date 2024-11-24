import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App inside the Router
root.render(
  <Router>
    <App />
  </Router>
);
