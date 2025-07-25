import { jwtDecode } from 'jwt-decode'

interface JWTPayload {
  exp: number
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JWTPayload>(token)
    const now = Date.now() / 1000
    return exp < now
  } catch {
    return true
  }
}
