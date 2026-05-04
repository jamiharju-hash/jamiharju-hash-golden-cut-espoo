import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppPremiumV2 from './AppPremiumV2.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppPremiumV2 />
  </StrictMode>,
);
