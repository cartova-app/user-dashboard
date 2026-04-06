import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from '@/core/components/common/ErrorBoundary';
import './index.css';
import '../assets/fonts/fonts.css';
import App from './App';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
