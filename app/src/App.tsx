import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TopNav } from './components/TopNav'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { SavedPage } from './pages/SavedPage'
import { DigestPage } from './pages/DigestPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProofPage } from './pages/ProofPage'

export function App() {
  return (
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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
