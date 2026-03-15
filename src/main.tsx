import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProviders } from '@/providers'
import App from '@/App.tsx'
import '@/index.css'
import { initAnalytics } from '@/lib/analytics'
import { logDemoModeStatus } from '@/mocks'

// Initialize analytics before rendering
initAnalytics()

// Log demo mode status
logDemoModeStatus()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
)

