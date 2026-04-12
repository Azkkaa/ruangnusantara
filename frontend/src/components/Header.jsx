import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/image/logo/logo_rasanusantara-no-bg.png'
import font from '../assets/image/logo/logo_font_rasanusantara-no-bg.png'

const Header = () => {
  const { getCartItemsCount } = useCart();

  return (
    <header className="bg-orange-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className='flex items-center gap-3'>
              <img src={logo} alt="logo_main" className='w-14 h-auto'/>
              <img src={font} alt="logo_font_rasanusantara" className='w-[88px] h-9'/>
            </Link>
          </div>
          <nav className="flex gap-6 items-center">
            <Link to="/" className="hover:text-orange-100 transition font-medium">
              Menu
            </Link>
            <Link to="/cart" className="relative hover:text-orange-100 transition font-medium">
              Cart
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getCartItemsCount()}
                </span> 
              )}
            </Link>
            <Link to="/admin/orders" className="hover:text-orange-100 transition font-medium">
              Admin
            </Link>
            <Link to="/auth" className="hover:text-orange-100 transition font-medium">
              Login/Register
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
