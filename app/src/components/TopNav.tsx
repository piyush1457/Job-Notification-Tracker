import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/saved', label: 'Saved' },
  { to: '/digest', label: 'Digest' },
  { to: '/settings', label: 'Settings' },
  { to: '/proof', label: 'Proof' },
]

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="kn-top-nav">
      <div className="kn-top-nav-brand">Job Notification Tracker</div>

      <button
        type="button"
        className="kn-hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="kn-hamburger-line" />
        <span className="kn-hamburger-line" />
        <span className="kn-hamburger-line" />
      </button>

      <div className={`kn-top-nav-links ${menuOpen ? 'kn-top-nav-links--open' : ''}`}>
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `kn-top-nav-link ${isActive ? 'kn-top-nav-link--active' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
