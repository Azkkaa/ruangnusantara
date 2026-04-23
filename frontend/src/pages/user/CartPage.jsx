import { useNavigate } from 'react-router-dom';
import { useCart } from '@context/CartContext';
import CartItem from '@components/CartItem';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, getCartItemsCount } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Items</span>
                  <span>{getCartItemsCount()}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-orange-600">{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-700 transition"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full mt-3 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
