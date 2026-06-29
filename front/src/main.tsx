import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

//import 'bootstrap/dist/css/bootstrap.css';
import './main.scss';
import './index.css';

import App from './App.tsx'
import { AuthContextProvider } from './context/AuthContextProvider.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
