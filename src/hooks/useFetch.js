import { useEffect, useState, useCallback } from 'react'

// Runs fetcher(signal) whenever deps change; cancels stale requests.
export default function useFetch(fetcher, deps) {
  const [state, setState] = useState({ data: null, error: null, loading: !!deps[0] })
  const [tick, setTick] = useState(0)
  const retry = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    if (!deps[0]) return setState({ data: null, error: null, loading: false })
    const ctrl = new AbortController()
    setState(s => ({ ...s, loading: true, error: null }))
    fetcher(ctrl.signal)
      .then(data => setState({ data, error: null, loading: false }))
      .catch(error => { if (error.name !== 'AbortError') setState({ data: null, error, loading: false }) })
    return () => ctrl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])

  return { ...state, retry }
}
