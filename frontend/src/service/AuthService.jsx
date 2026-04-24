import api from '../utils/api';

export const handleRegister = async (credentials) => {
  try {
    const res = await api.post('/api/register', credentials);

    if (res.data.success) {
      return res.data
    }
  } catch (err) {
    console.error("Failed to register:", err?.response?.data?.message)
    throw err
  }
}

export const handleLogin = async (credentials, loginFunction) => {
  try {
    const user = await loginFunction(credentials)

    return user
  } catch (err) {
    console.error('Failed to login:', err?.response)
    throw err
  }
}

export const handleLogout = async () => {
  try {
    const res = await api.post('/api/logout')

    return res.data
  } catch (err) {
    console.error("Failed to logout:", err?.response);
    throw err;
  }
}