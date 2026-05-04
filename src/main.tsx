import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppStructured from './AppStructured.tsx';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppStructured />
  </StrictMode>,
);
