import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { getUser, getRepos } from '../services/github'
import ProfileCard from '../components/ProfileCard'
import RepoList from '../components/RepoList'
import { Skeleton, ErrorState, EmptyState } from '../components/States'

export default function UserPage() {
  const { username } = useParams()
  const { data, error, loading, retry } = useFetch(
    signal => Promise.all([getUser(username, signal), getRepos(username, signal)]), [username])

  if (loading) return <Skeleton lines={6} />
  if (error) return <><ErrorState error={error} onRetry={error.status === 404 ? null : retry} /><Link to="/">Search again</Link></>
  if (!data) return null
  const [user, repos] = data
  return (
    <>
      <ProfileCard user={user} />
      {repos.length ? <RepoList repos={repos} /> : <EmptyState>This user has no public repositories yet.</EmptyState>}
    </>
  )
}
