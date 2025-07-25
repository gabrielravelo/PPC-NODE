import { useState } from 'react'
import toast from 'react-hot-toast'
import { API } from '../../api/axios'
import { BackButton } from '../../components/BackButton'

interface AdForm {
  title: string
  imageUrl: string
  targetUrl: string
}

export const CreateAdPage = () => {

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [form, setForm] = useState<AdForm>({
    title: '',
    imageUrl: '',
    targetUrl: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/ads', form)
      toast.success('Ad created successfully')
      setForm({
        title: '',
        imageUrl: '',
        targetUrl: '',
      })
      setErrors({})
    } catch (error: any) {
        if (error.response?.data?.error) {
          // Aquí parseamos el string de error para obtener mensajes por campo
          const message = error.response.data.error as string
          const errorsObj: { [key: string]: string } = {}

          // Supongamos que el mensaje es: 
          // "Ad validation failed: title: Path `title` is required., imageUrl: Path `imageUrl` is required., targetUrl: Path `targetUrl` is required."

          const regex = /(\w+): Path `\w+` is required\./g
          let match
          while ((match = regex.exec(message)) !== null) {
            errorsObj[match[1]] = `${match[1]} is required`
          }

          setErrors(errorsObj)
        } else {
          toast.error('Failed to create ad')
        }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-[80vh]'>
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Create New Ad</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
              <div className='mb-4'>
                <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 border rounded"
                disabled={loading}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>

              <div className='mb-4'>
                <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-2 border rounded"
                disabled={loading}
                />
                {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
              </div>

              <div className='mb-4'>
                <input
                name="targetUrl"
                value={form.targetUrl}
                onChange={handleChange}
                placeholder="Target URL"
                className="w-full p-2 border rounded"
                disabled={loading}
                />
                {errors.targetUrl && <p className="text-red-500 text-sm">{errors.targetUrl}</p>}
              </div>
              
              <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
              {loading ? 'Creating...' : 'Create'}
              </button>
          </form>
        </div>
        <BackButton />
    </div>
  )
}
