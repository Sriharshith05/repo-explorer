import { useApp } from '../context/AppContext'
import RepoCard from '../components/RepoCard'
import { EmptyState } from '../components/States'

export default function Favorites() {
  const { favorites } = useApp()
  return (
    <section>
      <h1>Saved repositories</h1>
      {favorites.length === 0
        ? <EmptyState>Nothing saved yet. Open a profile and press Save on a repo.</EmptyState>
        : <ul className="repos">{favorites.map(r => <RepoCard key={r.id} repo={r} />)}</ul>}
    </section>
  )
}
