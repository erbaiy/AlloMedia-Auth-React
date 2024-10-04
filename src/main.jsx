import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Register from './pages/Auth/page.jsx'; // Your Register page
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap Register component in BrowserRouter */}
      <Register />
    </BrowserRouter>
  </StrictMode>,
);
