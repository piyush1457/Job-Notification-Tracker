import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TopNav } from './components/TopNav'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { SavedPage } from './pages/SavedPage'
import { DigestPage } from './pages/DigestPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProofPage } from './pages/ProofPage'
import { TestPage } from './pages/TestPage'
import { ShipPage } from './pages/ShipPage'
import { ToastProvider } from './context/ToastContext'

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="kn-app-shell kn-app-shell--routes">
          <TopNav />
          <main className="kn-route-main">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/digest" element={<DigestPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/proof" element={<ProofPage />} />
              <Route path="/jt/07-test" element={<TestPage />} />
              <Route path="/jt/08-ship" element={<ShipPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ToastProvider>
  )
}
