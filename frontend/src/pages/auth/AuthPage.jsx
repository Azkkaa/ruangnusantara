import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SpinnerGapIcon } from '@phosphor-icons/react';
import font from '../../assets/image/logo/logo_font_rasanusantara-no-bg.png';
import { handleRegister, handleLogin } from '../../service/AuthService';
import { useLogin } from '../../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { login } = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true)

    try {
      if (isLogin) {
        const res = await handleLogin(formData, login)
        if (res.success) navigate('/')
      } else {
        const res = await handleRegister(formData)
        console.log(res)
        if (res.success) {
          setIsLogin(true)
          alert(res.message)
        }
      }
    } catch (err) {
      console.error("Auth error:", err)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Tema Orange */}
        <div className="bg-orange-600 py-8 px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            <span>{isLogin ? 'Welcome Back!!' : "Let's Join"}</span>
            <img src={font} alt="fontLogo" className='w-50 h-auto mx-auto mt-2'/>
          </h2>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="Budi Santoso"
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="name@example.com"
                onChange={handleChange}
                />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                onChange={handleChange}
                />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password_confirmation"
                  name="password_confirmation"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  onChange={handleChange}
                  />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-700 hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98] disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={disabled}
            >
              {disabled ? <SpinnerGapIcon size={23} weight='bold' className='animate-spin'/> : ''}
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-orange-600 font-bold hover:text-orange-700 hover:underline cursor-pointer transition-colors"
              >
                {isLogin ? 'Register Now' : 'Login Here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;