import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App'
import { seedDatabase } from '@/db/seed'

// Demo-Daten einmalig beim ersten Start anlegen (nur im Entwicklungsmodus)
if (import.meta.env.DEV) {
  seedDatabase().catch(console.error)
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
