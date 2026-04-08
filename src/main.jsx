import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'var(--surface)',
          color: 'var(--text-body)',
          border: '1.5px solid var(--border)',
          borderRadius: '14px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px',
          boxShadow: '0 8px 32px rgba(26,46,26,0.12)',
        },
        success: {
          iconTheme: {
            primary: '#3a7d44',
            secondary: '#fff',
          },
        },
      }}
    />
  </StrictMode>,
)