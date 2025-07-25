import { Route, Routes, Outlet } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../features/auth/Login'
import { Register } from '../features/auth/Register'
import { AdsPage } from '../features/ads/AdsPage'
import { PublicRoute } from './PublicRoute'
import { ProtectedRoute } from './ProtectedRoute'
import { EditAdPage } from '../features/ads/EditAdPage'
import { CreateAdPage } from '../features/ads/CreateAdPage'

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute><Outlet /></PublicRoute>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/ads/edit/:id" element={<EditAdPage />} />
        <Route path="/ads/create" element={<CreateAdPage />} />
      </Route>
    </Routes>
  )
}
