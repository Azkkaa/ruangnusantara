import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  useEffect(() => {
    const handleRequest = async () => {
      const res = await axios.get('http://localhost:8000/api/admin/orders')

      setOrders(res.data.resources)
    }

    handleRequest()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow-md p-6 border border-yellow-200">
            <p className="text-gray-600 text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">0</p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-200">
            <p className="text-gray-600 text-sm mb-1">Processing</p>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-green-50 rounded-lg shadow-md p-6 border border-green-200">
            <p className="text-gray-600 text-sm mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
          <p className="text-4xl font-bold text-orange-600">Rp 1.000.000</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No orders yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.slice().reverse().map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
