import { useEffect, useState } from 'react';
import api from '@utils/api';
import OrderCard from '@components/OrderCard';
import Dropdown from '@components/ToggleDropdown';
import { formatCurrency } from '@utils/helper';
import { 
  ChartBar, 
  TrendUp, 
  Clock, 
  CheckCircle, 
  SpinnerGap, 
  Package, 
  Empty,
  Wallet 
} from '@phosphor-icons/react';
import { useToast } from '@context/ToastContext';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState({ pending: 0, process: 0, completed: 0 });
  const [revenue, setRevenue] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast()

  useEffect(() => {
    const handleRequest = async () => {
      try {
        const res = await api.get('api/admin/orders');
        setOrders(res.data.resources);
        setStatus(res.data.total_orders);
        setRevenue(res.data.revenue.month);
        setData(res.data);
      } catch (err) {
        const errorMessage = err?.response?.data?.message || "Gagal Mendapatkan Sumber Daya!"
        showToast(errorMessage, 'failed')
        console.error("Failed To Get Resources:", err?.response)
      } finally {
        setLoading(false);
      }
    };
    handleRequest();
  }, [showToast]);

  const handleReveChange = (reve) => {
    if (!data) return;
    if (reve === 'Today') setRevenue(data.revenue.today);
    else if (reve === 'Week') setRevenue(data.revenue.week);
    else if (reve === 'Month') setRevenue(data.revenue.month);
  };

  const handleStatus = async () => {
    const res = await api.get('/api/admin/order-status');
    setStatus({
      pending: res.data.pending,
      process: res.data.process,
      completed: res.data.completed
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SpinnerGap size={40} className="animate-spin text-orange-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-12">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 mb-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-[27px] font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Pesanan" value={orders.length} icon={<Package size={24} />} color="gray" />
          <StatCard title="Pending" value={status.pending} icon={<Clock size={24} />} color="yellow" />
          <StatCard title="Diproses" value={status.process} icon={<SpinnerGap size={24} />} color="blue" />
          <StatCard title="Selesai" value={status.completed} icon={<CheckCircle size={24} />} color="green" />
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="bg-green-100 p-4 rounded-xl text-green-600">
              <Wallet size={32} weight="duotone" />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Pendapatan</p>
              <p className="text-3xl font-black text-gray-800">{formatCurrency(revenue)}</p>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <p className="text-xs text-gray-400 mb-2 font-medium">Filter Periode:</p>
            <Dropdown options={['Today', 'Week', 'Month']} onUpdate={handleReveChange} />
          </div>
        </div>

        {/* Orders Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ChartBar size={28} className="text-orange-500" />
            Daftar Transaksi Terbaru
          </h2>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={40} className="text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">Belum ada pesanan masuk untuk periode ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders.slice().reverse().map(order => (
              <OrderCard key={order.id} order={order} updateNumStatus={handleStatus} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    gray: "bg-white text-gray-600 border-gray-100",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-green-50 text-green-700 border-green-100",
  };

  return (
    <div className={`${colors[color]} border rounded-2xl p-5 shadow-sm transition-transform hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-3 opacity-80">
        <p className="text-xs font-bold uppercase tracking-wider">{title}</p>
        {icon}
      </div>
      <p className="text-3xl font-black">{value}</p>
    </div>
  );
};

export default AdminPage;