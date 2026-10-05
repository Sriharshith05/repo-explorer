import { createContext, useContext, useEffect, useReducer, useMemo } from 'react'

const AppContext = createContext(null)
const read = (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) ?? fb } catch { return fb } }

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAV': {
      const exists = state.favorites.some(r => r.id === action.repo.id)
      return { ...state, favorites: exists ? state.favorites.filter(r => r.id !== action.repo.id) : [...state.favorites, action.repo] }
    }
    case 'TOGGLE_THEME': return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }
    default: return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, () => ({
    favorites: read('favorites', []),
    theme: read('theme', window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  }))

  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(state.favorites)) }, [state.favorites])
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(state.theme))
    document.documentElement.dataset.theme = state.theme
  }, [state.theme])

  const value = useMemo(() => ({
    ...state,
    toggleFavorite: repo => dispatch({ type: 'TOGGLE_FAV', repo }),
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    isFavorite: id => state.favorites.some(r => r.id === id),
  }), [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
