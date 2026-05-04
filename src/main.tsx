import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppFullStack from './AppFullStack.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppFullStack />
  </StrictMode>,
);
