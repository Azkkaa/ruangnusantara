import { useOrders } from '../context/OrdersContext';

const OrderCard = ({ order }) => {
  const { updateOrderStatus, getNextStatus } = useOrders();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'diproses': 'bg-blue-100 text-blue-800 border-blue-300',
      'selesai': 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const handleUpdateStatus = () => {
    const nextStatus = getNextStatus(order.status);
    updateOrderStatus(order.id, nextStatus);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Order #{order.id}</h3>
          <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="border-t border-b border-gray-200 py-3 my-3">
        <p className="font-semibold text-gray-700">Customer: {order.customerName}</p>
        <p className="text-gray-600">Phone: {order.phone}</p>
        {order.notes && <p className="text-gray-600 italic mt-1">Notes: {order.notes}</p>}
      </div>

      <div className="space-y-2 mb-4">
        <p className="font-semibold text-gray-700">Items:</p>
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-700">
              {item.name} x{item.quantity}
            </span>
            <span className="text-gray-900 font-medium">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-orange-600">{formatPrice(order.total)}</p>
        </div>
        {order.status !== 'selesai' && (
          <button
            onClick={handleUpdateStatus}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200"
          >
            Update Status
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
