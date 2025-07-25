import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Props {
  children: React.ReactNode
}

export const PublicRoute = ({ children }: Props) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (user) return <Navigate to="/" replace />

  return children
}
