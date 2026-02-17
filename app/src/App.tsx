import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TopNav } from './components/TopNav'
import { PlaceholderPage } from './pages/PlaceholderPage'

export function App() {
  return (
    <BrowserRouter>
      <div className="kn-app-shell kn-app-shell--routes">
        <TopNav />
        <main className="kn-route-main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
            <Route path="/saved" element={<PlaceholderPage title="Saved" />} />
            <Route path="/digest" element={<PlaceholderPage title="Digest" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="/proof" element={<PlaceholderPage title="Proof" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
