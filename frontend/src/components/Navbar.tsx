import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        PPC System
      </Link>

      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.username}</span>
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
