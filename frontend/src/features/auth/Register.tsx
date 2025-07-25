import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../api/axios'
import toast from 'react-hot-toast'

export const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const registerPromise = API.post('/auth/register', { username, password })
    toast.promise(registerPromise, {
      loading: 'Creating account...',
      success: 'Account created successfully!',
      error: (err) =>
        err?.response?.data?.message || 'Failed to create account',
    });

    try {
      await registerPromise
      navigate('/login')
    } catch (_) {
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  )
}
