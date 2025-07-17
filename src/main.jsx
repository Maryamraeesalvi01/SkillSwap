import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { SkillSwapProvider } from './context/SkillSwapContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkillSwapProvider>
      <App />
    </SkillSwapProvider>
  </React.StrictMode>
);