import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {ThemeProvider} from '../components/ThemeContext';

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
);
