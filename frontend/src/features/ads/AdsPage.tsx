import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { API } from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import { BackButton } from '../../components/BackButton'

interface Ad {
  _id: string
  title: string
  imageUrl: string
  targetUrl: string
  clickCount: number
}

interface PaginatedAds {
  data: Ad[]
  total: number
  totalPages: number
  page: number
  limit: number
  clickTimeoutSeconds: number
}


export const AdsPage = () => {
  const [ads, setAds] = useState<Ad[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isBlocked, setIsBlocked] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [clickTimeout, setClickTimeout] = useState(30) // default
  const { user } = useAuth()
  
  const fetchAds = useCallback(async (pageNum: number) => {
    try {
      const res = await API.get<PaginatedAds>(`ads?page=${pageNum}&limit=5`)
      setAds(res.data.data)
      setPage(res.data.page)
      setTotalPages(res.data.totalPages)
      setClickTimeout(res.data.clickTimeoutSeconds || 30)
    } catch (error) {
      toast.error('Error clicking ad')
    }
  }, [])

  useEffect(() => {
    fetchAds(page)
  }, [fetchAds, page])

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isBlocked && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      setIsBlocked(false)
    }
    return () => clearTimeout(timer)
  }, [isBlocked, countdown])

  useEffect(() => {
    const lastClick = localStorage.getItem('lastClickTime');
    if (lastClick) {
      const elapsed = Math.floor((Date.now() - parseInt(lastClick)) / 1000);
      const remaining = clickTimeout - elapsed;

      if (remaining > 0) {
        setIsBlocked(true);
        setCountdown(remaining);
      }
    }
  }, [clickTimeout]);


  const handleClickAd = async (adId: string, targetUrl: string) => {
    if (user?.role === 'admin') {
      toast('Edit functionality not implemented yet', { icon: '⚠️' })
      return
    }

    if (isBlocked) return

    try {
      await API.post(`ads/${adId}/click`)
      const now = Date.now();
      localStorage.setItem('lastClickTime', now.toString());
      
      setIsBlocked(true)
      setCountdown(clickTimeout)

      window.open(targetUrl, '_blank')
    } catch (error: any) {
      if (error.response?.data?.error) {
        toast.error(error.response?.data?.error || 'Error clicking ad')
      } else {
        toast.error(error.response?.data?.error || 'Error clicking ad')
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Ads</h1>

      {isBlocked && (
        <div className="text-center mb-4 text-red-500 font-semibold">
          Please wait {countdown}s before clicking another ad.
        </div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {ads.map(ad => (
          <li
            key={ad._id}
            className={`border rounded-lg shadow p-4 bg-white transition-all ${
              isBlocked ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <a
              href={user?.role === 'admin' ? '#' : ad.targetUrl}
              target={user?.role === 'admin' ? undefined : '_blank'}
              rel={user?.role === 'admin' ? undefined : 'noopener noreferrer'}
              onClick={e => {
                e.preventDefault()
                // if (user?.role === 'admin') {
                //   navigate(`/ads/edit/${ad._id}`)
                // } else {
                //   handleClickAd(ad._id, ad.targetUrl)
                // }
                handleClickAd(ad._id, ad.targetUrl)
              }}
              className="block space-y-2"
            >
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-40 object-cover rounded"
              />
              <p className="font-semibold text-lg">{ad.title}</p>
              {user?.role === 'admin' && (
                <p className="text-sm text-gray-500">Clicks: {ad.clickCount}</p>
              )}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <BackButton />
    </div>
  )
}
