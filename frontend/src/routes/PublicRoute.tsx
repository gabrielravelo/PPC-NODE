import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (user) return <Navigate to="/" replace />

  return children
}
