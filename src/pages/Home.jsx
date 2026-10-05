import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const navigate = useNavigate()
  return (
    <section className="hero">
      <h1>Find any developer's work.</h1>
      <p className="muted">Type a GitHub username and press Enter, or pick a suggestion.</p>
      <SearchBar onSubmit={q => navigate(`/user/${q}`)} />
    </section>
  )
}
