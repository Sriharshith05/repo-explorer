const BASE = 'https://api.github.com'

export class ApiError extends Error {
  constructor(status, message) { super(message); this.status = status }
}

async function request(path, signal) {
  const res = await fetch(BASE + path, { signal, headers: { Accept: 'application/vnd.github+json' } })
  if (res.ok) return res.json()
  if (res.status === 404) throw new ApiError(404, 'No GitHub user with that name. Check the spelling and try again.')
  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get('x-ratelimit-reset')
    const when = reset ? new Date(+reset * 1000).toLocaleTimeString() : 'a few minutes'
    throw new ApiError(res.status, `GitHub rate limit reached. Try again after ${when}.`)
  }
  throw new ApiError(res.status, `GitHub returned an error (${res.status}). Please retry.`)
}

export const getUser = (u, signal) => request(`/users/${encodeURIComponent(u)}`, signal)
export const getRepos = (u, signal) => request(`/users/${encodeURIComponent(u)}/repos?per_page=100&sort=updated`, signal)

export const searchUsers = (q, signal) => request(`/search/users?q=${encodeURIComponent(q)}&per_page=5`, signal)
