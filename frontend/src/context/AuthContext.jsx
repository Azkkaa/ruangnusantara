import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api'
import Loading from '../components/Loading';

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
        setUser(res.data)
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
      alert(res.data.message)
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

  if (loading) return (
    <div className='min-h-screen flex justify-center items-center'>
      <Loading size={65}/>
    </div>
  )

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  )
}