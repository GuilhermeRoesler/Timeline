import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/globals.css'
import './styles/animations.css'
import './styles/components/toolbar.css'
import './styles/components/settings.css'
import './styles/components/side-panel.css'
import './styles/components/info-card.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)