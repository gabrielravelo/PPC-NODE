import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../api/axios'
import { isTokenExpired } from '../utils/jwt'

interface User {
  _id: string
  username: string
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token || isTokenExpired(token)) {
      logout()
      setIsLoading(false)
      return
    }

    const userData = localStorage.getItem('user')
    if (userData) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(JSON.parse(userData))
    }

    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const res = await API.post('auth/login', { username, password })
      const { token, user } = res.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      navigate('/')
    } catch (err) {
      console.error('Login failed:', err)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete API.defaults.headers.common['Authorization']
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
