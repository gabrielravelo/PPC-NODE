import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { API } from '../../api/axios'

interface AdForm {
  title: string
  imageUrl: string
  targetUrl: string
}

export const EditAdPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [form, setForm] = useState<AdForm>({
    title: '',
    imageUrl: '',
    targetUrl: '',
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    API.get(`/ads/${id}`)
      .then(res => {
        setForm({
          title: res.data.title,
          imageUrl: res.data.imageUrl,
          targetUrl: res.data.targetUrl,
        })
      })
      .catch(() => toast.error('Error loading ad data'))
      .finally(() => setLoading(false))
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.put(`/ads/${id}`, form)
      toast.success('Ad updated successfully')
      navigate('/ads')
    } catch {
      toast.error('Error updating ad')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Ad</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
          disabled={loading}
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          required
          disabled={loading}
        />
        <input
          name="targetUrl"
          value={form.targetUrl}
          onChange={handleChange}
          placeholder="Target URL"
          className="w-full p-2 border rounded"
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
