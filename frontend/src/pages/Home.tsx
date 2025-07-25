import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
      <h1 className="text-4xl font-extrabold text-gray-800">Welcome to the Home Page</h1>
      <div className='flex gap-6 justify-between'>
        <button
          onClick={() => navigate('/ads')}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Ads
        </button>

        {user?.role === 'admin' && (
          <button
            onClick={() => navigate('/ads/create')}
            className="px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Create New Ad
          </button>
        )}
      </div>
    </div>
  )
}
