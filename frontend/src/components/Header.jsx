import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getCartItemsCount } = useCart();

  return (
    <header className="bg-orange-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-orange-100 transition">
            RestoOrder
          </Link>
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
            <Link to="/admin" className="hover:text-orange-100 transition font-medium">
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
