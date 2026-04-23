import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api'
import Loading from '../components/Loading';
import { logoFontRSNobg } from '@assets'

const LoginContext = createContext();

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within CartProvider')
  }

  return context;
}

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const hasCsrfToken = document.cookie.includes('XSRF-TOKEN');

      if (!hasCsrfToken) {
        // Hanya minta kunci jika memang belum punya
        await api.get('/sanctum/csrf-cookie');
      }

      try {
        const res = await api.get('api/user')
        setUser(res.data.data)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const login = async (credentials) => {
    try {
      const res = await api.post('/api/login', credentials)

      setUser(res.data.user)
      return res.data
    } catch (e) {
      console.error('Failed to login:', e);
      throw e
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    setUser,
    login,
    isAuthenticated: !!user
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#f8f9fa]">
        <div className="flex flex-col items-center">
          {/* Container Spinner & Icon/Logo */}
          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-400-100 border border-orange-50 flex flex-col items-center gap-2">
            <div>
              <Loading size={60} color="#f97316" /> 
            </div>

            <div className="text-center flex flex-col items-center justify-center">
              <div className='mb-3'>
                <img src={logoFontRSNobg} alt="Logo" className='w-28'/>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mt-1">
                Wait for a moment
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 animate-pulse text-gray-400 text-xs font-medium">
          Getting user data...
        </div>
      </div>
    );
  }

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  )
}