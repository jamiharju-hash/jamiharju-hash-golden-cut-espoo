import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppAuthentic from './AppAuthentic.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppAuthentic />
  </StrictMode>,
);
