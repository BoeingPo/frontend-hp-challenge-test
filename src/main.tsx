import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CarView } from './car/page.tsx'
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <Routes>
      {/* <Route path="/" element={<App />} /> */}

      
        <Route path="/" element={
          <CarView />
          } />
    </Routes>
  </StrictMode>
  </BrowserRouter>,
)
