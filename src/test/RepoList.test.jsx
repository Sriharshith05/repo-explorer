import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppProvider } from '../context/AppContext'
import RepoList from '../components/RepoList'

const repos = [
  { id: 1, name: 'alpha', language: 'JavaScript', stargazers_count: 5, pushed_at: '2024-01-01', html_url: '#' },
  { id: 2, name: 'beta', language: 'Python', stargazers_count: 50, pushed_at: '2023-01-01', html_url: '#' },
]
const setup = () => render(<AppProvider><RepoList repos={repos} /></AppProvider>)

test('filters by language', async () => {
  setup()
  await userEvent.selectOptions(screen.getByLabelText(/language/i), 'Python')
  expect(screen.queryByText('alpha')).not.toBeInTheDocument()
  expect(screen.getByText('beta')).toBeInTheDocument()
})

test('toggling save updates the button state', async () => {
  setup()
  const btn = screen.getAllByRole('button', { name: /save alpha/i })[0]
  await userEvent.click(btn)
  expect(screen.getByRole('button', { name: /saved alpha/i })).toHaveAttribute('aria-pressed', 'true')
})
