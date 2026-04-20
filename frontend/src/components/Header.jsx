import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/image/logo/logo_rasanusantara-no-bg.png'
import font from '../assets/image/logo/logo_font_rasanusantara-no-bg.png'
import { useLogin } from '../context/AuthContext';

const Header = () => {
  const { getCartItemsCount } = useCart();
  const { user } = useLogin()

  return (
    <header className="bg-orange-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className='flex items-center gap-3'>
              <img src={logo} alt="logo_main" className='w-14 h-auto'/>
              <img src={font} alt="logo_font_rasanusantara" className='w-22 h-9'/>
            </Link>
          </div>
          <nav className="flex gap-6 items-center">
            <Link to="/" className="transition font-medium hover:bg-orange-700 px-1 rounded py-0.5">
              Menu
            </Link>
            {user && !user?.is_admin ? (
              <Link to="/cart" className="relative transition font-medium hover:bg-orange-700 px-1 rounded py-0.5">
                Cart
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getCartItemsCount()}
                  </span> 
                )}
              </Link>
            ) : ''}
            {user && !user?.is_admin ? (
              <Link to="/user/orders" className="transition font-medium hover:bg-orange-700 px-1 rounded py-0.5">
                My Order
              </Link>
            ) : ''}
            {user?.is_admin ? (
              <Link to="/admin/orders" className="transition font-medium hover:bg-orange-700 px-1 rounded py-0.5">
                Admin
              </Link>
            ) : ''
            }
            {!user && !user?.is_admin ? (
              <Link to="/auth" className="transition font-medium hover:bg-orange-700 px-1 rounded py-0.5">
                Login/Register
              </Link>
            ) : (
              <Link to="/user/profile" className="transition font-medium hover:bg-orange-700 px-1 rounded py-0.5">
                Profile
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
