import { useState, useEffect } from 'react';
import api from '@utils/api';
import { 
  LayoutDashboard, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  ShoppingCart 
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalMenus: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    totalOrders: 0
  });
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Asumsi Anda membuat endpoint khusus dashboard di Laravel
      const response = await api.get('/api/admin/dashboard');
      setStats(response.data.stats);
      setLowStockItems(response.data.low_stock_items);
    } catch (error) {
      console.error("Gagal mengambil data dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Memuat Dashboard...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <LayoutDashboard size={32} className="text-orange-500" />
          Dashboard RasaNusantara
        </h1>
        <p className="text-gray-500">Pantau ketersediaan menu dan performa toko hari ini.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Menu" 
          value={stats.totalMenus} 
          icon={<Package className="text-blue-600" />} 
          bgColor="bg-blue-100" 
        />
        <StatCard 
          title="Stok Menipis" 
          value={stats.lowStockCount} 
          icon={<AlertTriangle className="text-yellow-600" />} 
          bgColor="bg-yellow-100" 
        />
        <StatCard 
          title="Habis (Sold Out)" 
          value={stats.outOfStockCount} 
          icon={<CheckCircle className="text-red-600" />} 
          bgColor="bg-red-100" 
        />
        <StatCard 
          title="Pesanan Masuk" 
          value={stats.activeOrdersCount} 
          icon={<ShoppingCart className="text-green-600" />} 
          bgColor="bg-green-100" 
        />
      </div>

      {/* Low Stock Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Perhatian Stok Menipis</h2>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
            Segera Restock
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Nama Menu</th>
                <th className="px-6 py-4 font-semibold text-center">Sisa Stok</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {lowStockItems.length > 0 ? lowStockItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-bold ${item.stock === 0 ? 'text-red-600' : 'text-orange-600'}`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.stock === 0 ? (
                      <span className="text-red-500 text-sm italic">Sold Out</span>
                    ) : (
                      <span className="text-yellow-600 text-sm italic">Stok Rendah</span>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-400">
                    Semua stok terpantau aman.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`p-4 rounded-lg ${bgColor}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

export default AdminDashboard;