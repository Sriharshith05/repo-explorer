# Repo Explorer

Search a GitHub username (Enter or click a debounced suggestion), browse their repositories, and save favorites. Built with React 18, Vite and React Router.

**Live demo:** _add your Vercel/Netlify link_

## Run
```bash
npm install
npm run dev      # start dev server
npm test         # Vitest + React Testing Library
npm run build
```

## What it demonstrates
- **Hooks:** custom `useDebounce` and `useFetch` (AbortController cancels stale requests)
- **Context + useReducer:** favorites and theme, persisted to localStorage
- **REST handling:** 404, rate limit (403/429) and generic errors mapped to clear messages with retry
- **Reusable components:** SearchBar, ProfileCard, RepoCard, RepoList, Skeleton/Error/Empty states
- **Performance:** `useMemo` for filter/sort, `React.memo` on RepoCard, with reasons in the code
- **Accessibility:** labelled inputs, skip link, `aria-pressed`, `role="alert"`, focus-visible, reduced motion
- **CI:** GitHub Actions runs tests and build on every push

## Decisions
- Context + reducer instead of Redux: state is small. It would move to Redux Toolkit or Zustand if it grew.
- Client-side pagination: GitHub returns up to 100 repos per call, enough for this scope.
- Add a `vercel.json` rewrite to `/index.html` for deep links on refresh.
