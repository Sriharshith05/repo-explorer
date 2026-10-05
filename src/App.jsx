import { Routes, Route, NavLink } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Home from './pages/Home'
import UserPage from './pages/UserPage'
import Favorites from './pages/Favorites'

export default function App() {
  const { theme, toggleTheme, favorites } = useApp()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="bar">
        <NavLink to="/" className="brand">Repo Explorer</NavLink>
        <nav aria-label="Main">
          <NavLink to="/favorites">Favorites ({favorites.length})</NavLink>
          <button className="btn ghost" onClick={toggleTheme} aria-pressed={theme === 'dark'}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<p className="state">Page not found. <NavLink to="/">Go home</NavLink></p>} />
        </Routes>
      </main>
    </>
  )
}
