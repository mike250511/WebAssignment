import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import './App.css';
import App from './App';

// Get the root element
const rootElement = document.getElementById('root');

// Create the root and render the App
const root = ReactDOM.createRoot(rootElement); // Create root using createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
