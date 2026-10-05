import { useMemo, useState, useEffect } from 'react'
import RepoCard from './RepoCard'
import { EmptyState } from './States'

const PAGE = 8
const sorters = {
  updated: (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at),
  stars: (a, b) => b.stargazers_count - a.stargazers_count,
}

export default function RepoList({ repos }) {
  const [sort, setSort] = useState('updated')
  const [lang, setLang] = useState('all')
  const [page, setPage] = useState(1)

  const languages = useMemo(() => [...new Set(repos.map(r => r.language).filter(Boolean))].sort(), [repos])
  const visible = useMemo(
    () => repos.filter(r => lang === 'all' || r.language === lang).sort(sorters[sort]),
    [repos, lang, sort]
  )
  useEffect(() => setPage(1), [lang, sort])

  const pages = Math.max(1, Math.ceil(visible.length / PAGE))
  const slice = visible.slice((page - 1) * PAGE, page * PAGE)

  return (
    <section aria-label="Repositories">
      <div className="filters">
        <label>Sort by
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="updated">Recently updated</option><option value="stars">Most stars</option>
          </select>
        </label>
        <label>Language
          <select value={lang} onChange={e => setLang(e.target.value)}>
            <option value="all">All</option>{languages.map(l => <option key={l}>{l}</option>)}
          </select>
        </label>
      </div>
      {slice.length === 0 ? <EmptyState>No repositories match these filters.</EmptyState> : (
        <ul className="repos">{slice.map(r => <RepoCard key={r.id} repo={r} />)}</ul>
      )}
      <div className="pager">
        <button className="btn ghost" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
        <span aria-live="polite">Page {page} of {pages}</span>
        <button className="btn ghost" disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </section>
  )
}
