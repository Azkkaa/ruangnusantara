import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api'

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
      }
    }

    checkAuthStatus()
  }, [])

  const login = async (credentials) => {
    try {
      const res = await api.post('/api/login', credentials)

      setUser(res.data)
      return res.data
    } catch (e) {
      console.error('Failed to login:', e);
      throw e
    }
  }

  const value = {
    user,
    login,
    isAuthenticated: !!user
  }

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  )
}