import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '../assets/fonts/fonts.css';
import App from './App.jsx';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
