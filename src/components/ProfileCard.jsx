export default function ProfileCard({ user }) {
  return (
    <section className="profile" aria-label="Profile">
      <img src={user.avatar_url} alt={`${user.login} avatar`} width="96" height="96" />
      <div>
        <h1>{user.name || user.login}</h1>
        <p className="muted">@{user.login}</p>
        {user.bio && <p>{user.bio}</p>}
        <p className="muted">{user.followers} followers · {user.following} following · {user.public_repos} repos</p>
      </div>
    </section>
  )
}
