import { useState, useId } from 'react'
import { Link } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import useFetch from '../hooks/useFetch'
import { searchUsers } from '../services/github'

// Typing only fetches suggestions (debounced). Navigation happens on submit or suggestion click.
export default function SearchBar({ onSubmit, delay = 500 }) {
  const [value, setValue] = useState('')
  const query = useDebounce(value.trim(), delay)
  const id = useId()
  const { data } = useFetch(signal => searchUsers(query, signal), [query.length >= 2 ? query : ''])
  const suggestions = value.trim().length >= 2 ? data?.items ?? [] : []

  const submit = e => {
    e.preventDefault()
    if (value.trim()) onSubmit(value.trim())
  }

  return (
    <form className="search" onSubmit={submit} role="search">
      <label htmlFor={id}>GitHub username</label>
      <div className="row">
        <input id={id} type="search" value={value} placeholder="e.g. gaearon" autoComplete="off"
          onChange={e => setValue(e.target.value)} />
        <button className="btn" type="submit">Search</button>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions" aria-label="Suggestions">
          {suggestions.map(u => (
            <li key={u.id}><Link to={`/user/${u.login}`}><img src={u.avatar_url} alt="" width="24" height="24" />{u.login}</Link></li>
          ))}
        </ul>
      )}
    </form>
  )
}
