import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { KebijakanPrivasi } from './pages/KebijakanPrivasi.tsx'
import { SyaratLayanan } from './pages/SyaratLayanan.tsx'
import { Dukungan } from './pages/Dukungan.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
          <Route path="/syarat-layanan" element={<SyaratLayanan />} />
          <Route path="/dukungan" element={<Dukungan />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
