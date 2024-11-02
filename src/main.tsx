import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QRCode from './QRCode'
//import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <QRCode />
  </StrictMode>,
)
