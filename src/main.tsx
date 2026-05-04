import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWalkIn from './AppWalkIn.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWalkIn />
  </StrictMode>,
);
