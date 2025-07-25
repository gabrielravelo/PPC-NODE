import { useNavigate } from 'react-router-dom'

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
    >
      Back
    </button>
  )
}
