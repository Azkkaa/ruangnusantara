import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg shadow-md">
      <img
        src={`http://localhost:8000/storage/${item.image_url}`}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
        <p className="text-orange-600 font-semibold">{formatPrice(item.price)}</p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-full font-bold transition"
          >
            -
          </button>
          <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => increaseQuantity(item.id)}
            className="bg-orange-600 hover:bg-orange-700 text-white w-8 h-8 rounded-full font-bold transition"
          >
            +
          </button>
          <button
            onClick={() => removeFromCart(item.id)}
            className="ml-auto text-white font-semibold bg-red-500 transition px-1 py-0.5 rounded-md"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600">Subtotal</p>
        <p className="text-xl font-bold text-gray-800">{formatPrice(subtotal)}</p>
      </div>
    </div>
  );
};

export default CartItem;