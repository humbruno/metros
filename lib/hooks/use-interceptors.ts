import { tryRefreshToken } from '@/lib/api'
import axios from 'axios'
import { useEffect } from 'react'

const UNAUTHORIZED = 401

export function useInterceptors() {
  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (error.response.status === UNAUTHORIZED && !originalRequest._retry) {
          originalRequest._retry = true
          await tryRefreshToken()
          return axios(originalRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axios.interceptors.response.eject(interceptorId)
    }
  }, [])
}
