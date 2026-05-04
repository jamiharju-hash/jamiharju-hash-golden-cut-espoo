import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppPremium from './AppPremium.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppPremium />
  </StrictMode>,
);
