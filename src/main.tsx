import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppLaunch from './AppLaunch.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppLaunch />
  </StrictMode>,
);
