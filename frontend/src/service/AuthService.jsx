import api from '../utils/api';

export const handleRegister = async (credentials) => {
  try {
    const res = await api.post('/api/register', credentials);

    if (res.status === 201 || res.data.success) {
      return { success: true, message: 'Successfully registered' };
    }

    return { success: false, message: res.data.message };
  } catch (error) {
    console.error("Detail Error:", error.response?.data);
    return { success: false, message: error.response?.data?.message || 'Oops something went wrong' };
  }
}

export const handleLogin = async (credentials, loginFunction) => {
  try {
    const user = await loginFunction(credentials)

    return user
  } catch (error) {
    console.error('Failed to login!!')
    throw error
  }
}