import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppFinal from './AppFinal.tsx';
import './index.css';
import './premium-responsive.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppFinal />
  </StrictMode>,
);
