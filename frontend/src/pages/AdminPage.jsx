import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import Dropdown from '../components/ToggleDropdown';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState({pending: 0, process: 0, completed: 0});
  const [revenue, setRevenue] = useState(0);
  const [data, setData] = useState(null)

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
      setStatus(() => {
        const ordersItem = res.data.resources

        return {
          pending: ordersItem.filter(o => o.status === 'pending').length,
          process: ordersItem.filter(o => o.status === 'process').length,
          completed: ordersItem.filter(o => o.status === 'completed').length
        }
      })
      setRevenue(res.data.revenue.month)
      setData(res.data)
    }

    handleRequest()
  }, [])

  const handleReveChange = (reve) => {
    if (reve == 'Today') {
      setRevenue(data.revenue.today)
    } else if (reve == 'Week') {
      setRevenue(data.revenue.week)
    } else if (reve == 'Month') {
      setRevenue(data.revenue.month)
    }
  }

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
            <p className="text-3xl font-bold text-yellow-600">{status.pending}</p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-200">
            <p className="text-gray-600 text-sm mb-1">Processing</p>
            <p className="text-3xl font-bold text-blue-600">{status.process}</p>
          </div>
          <div className="bg-green-50 rounded-lg shadow-md p-6 border border-green-200">
            <p className="text-gray-600 text-sm mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">{status.completed}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
            <p className="text-4xl font-bold text-green-600">{formatPrice(revenue)}</p>
          </div>
          <div>
            <Dropdown options={['Today', 'Week', 'Month']} onUpdate={handleReveChange}/>
          </div>
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
