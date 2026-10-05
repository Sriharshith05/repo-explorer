import { memo } from 'react'
import { useApp } from '../context/AppContext'

// memo: the list can hold 100 cards and only one favorite changes at a time.
function RepoCard({ repo }) {
  const { isFavorite, toggleFavorite } = useApp()
  const fav = isFavorite(repo.id)
  return (
    <li className="repo">
      <div>
        <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
        <p>{repo.description || 'No description.'}</p>
        <p className="muted">{repo.language || 'Unknown'} · ★ {repo.stargazers_count}</p>
      </div>
      <button className="btn ghost" aria-pressed={fav} onClick={() => toggleFavorite(repo)}>
        {fav ? 'Saved' : 'Save'}<span className="sr"> {repo.name}</span>
      </button>
    </li>
  )
}
export default memo(RepoCard)
