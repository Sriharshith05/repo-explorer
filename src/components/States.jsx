export const Skeleton = ({ lines = 3 }) => (
  <div className="skeleton" role="status" aria-label="Loading">
    {Array.from({ length: lines }, (_, i) => <span key={i} />)}
  </div>
)
export const ErrorState = ({ error, onRetry }) => (
  <div className="state error" role="alert">
    <p>{error.message}</p>
    {onRetry && <button className="btn" onClick={onRetry}>Try again</button>}
  </div>
)
export const EmptyState = ({ children }) => <p className="state">{children}</p>
