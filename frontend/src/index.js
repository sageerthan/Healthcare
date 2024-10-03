import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StoreContextProvider } from './context/StoreContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreContextProvider>
    <Router>
      <App/>
    </Router>
  </StoreContextProvider>
);
