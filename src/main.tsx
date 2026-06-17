import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Suppress ResizeObserver benign errors
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && (
      args[0].includes('ResizeObserver') || 
      args[0].includes('styled-components') || 
      args[0].includes('Script error.') ||
      args[0].includes('gtm') ||
      args[0].includes('elfsight')
  )) return;
  originalError.call(console, ...args);
};

// Global error handler to intercept and suppress benign errors
window.onerror = (message, source, lineno, colno, error) => {
  const msg = typeof message === 'string' ? message : (error ? error.message : '');
  if (msg && (
    msg.includes('ResizeObserver') ||
    msg.includes('Script error') ||
    msg.includes('styled-components') ||
    msg.includes('gtm') ||
    msg.includes('elfsight') ||
    msg.includes('google-analytics') ||
    msg.includes('facebook')
  )) {
    return true; // Prevents firing the default handler (console error message)
  }
};

window.addEventListener('error', (e) => {
  const msg = e.message || (e.error && e.error.message);
  if (typeof msg === 'string' && (
    msg.includes('ResizeObserver') ||
    msg.includes('Script error') ||
    msg.includes('styled-components') ||
    msg.includes('gtm') ||
    msg.includes('elfsight') ||
    msg.includes('google-analytics') ||
    msg.includes('facebook')
  )) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (e) => {
  // Gracefully suppress unhandled third-party promise rejections
  const reason = e.reason && e.reason.message ? e.reason.message : String(e.reason);
  if (
    typeof reason === 'string' && (
      reason.includes('gtm') ||
      reason.includes('elfsight') ||
      reason.includes('analytics') ||
      reason.includes('Google') ||
      reason.includes('Facebook') ||
      reason.includes('adblock') ||
      reason.includes('Firebase')
    )
  ) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
