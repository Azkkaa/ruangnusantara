import axios from 'axios';

export const handleRegister = async () => {
  try {
    const res = await axios.post('http://localhost:8000/api/register');

    if (res.data.success) {
      return { success: true, message: 'Successfully registered' };
    }

    return { success: false, message: res.data.message };
  } catch {
    return { success: false, message: 'Oops something went wrong' };
  }
}