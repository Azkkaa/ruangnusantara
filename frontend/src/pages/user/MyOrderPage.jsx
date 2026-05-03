import { useEffect, useState } from 'react';
import { useOrders } from '@context/OrdersContext';
import { 
  Package, 
  ClockCounterClockwise, 
  ShoppingBag, 
  CheckCircle,
  Timer,
  CircleNotch 
} from '@phosphor-icons/react';
import OrderItemCard from '@components/OrderItemCard';
import { useToast } from '@context/ToastContext';

const MyOrderPage = () => {
  const { orders, getUserOrder } = useOrders();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ongoing');
  const { showToast } = useToast()

  useEffect(() => {
    // Snap card for payment sandbox
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    document.body.appendChild(script);

    const handleRequest = async () => {
      try {
        await getUserOrder();
      } catch (err) {
        const errorMessage = err?.response?.data?.message || "Gagal mengambil data pesanan. Periksa koneksi Anda."
        showToast(errorMessage, 'failed')
      } finally {
        setLoading(false);
      }
    };
    handleRequest();
  }, [getUserOrder, showToast]);

  // Filter Data
  const ongoingOrders = orders.filter(o => o.status === 'pending' || o.status === 'process');
  const completedOrders = orders.filter(o => o.status === 'completed');

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <CircleNotch size={40} className="animate-spin text-orange-500" />
        <p className="text-gray-500 font-medium font-sans">Menyiapkan pesananmu...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          <ClockCounterClockwise size={32} className="text-orange-500" />
          Pesanan Saya
        </h2>
        <p className="text-gray-500 mt-1">Kelola dan pantau pesanan kuliner Nusantara kamu.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6 bg-white sticky top-0 z-10">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'ongoing' 
            ? 'border-orange-500 text-orange-600' 
            : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Timer size={20} weight={activeTab === 'ongoing' ? "fill" : "regular"} />
          Berjalan ({ongoingOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'completed' 
            ? 'border-orange-500 text-orange-600' 
            : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <CheckCircle size={20} weight={activeTab === 'completed' ? "fill" : "regular"} />
          Selesai ({completedOrders.length})
        </button>
      </div>

      {/* Main Content Area */}
      <div className="min-h-100">
        {activeTab === 'ongoing' ? (
          // View: Transaksi Berjalan
          ongoingOrders.length === 0 ? (
            <EmptyState 
              title="Tidak ada pesanan berjalan" 
              desc="Semua pesananmu sudah sampai atau belum dipesan sama sekali."
            />
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">
                <Package size={16} /> Daftar Transaksi Berjalan
              </div>
              {ongoingOrders.map((order) => (
                <OrderItemCard key={order.id} order={order} />
              ))}
            </div>
          )
        ) : (
          // View: Transaksi Selesai
          completedOrders.length === 0 ? (
            <EmptyState 
              title="Belum ada riwayat" 
              desc="Selesaikan pesananmu untuk melihat daftar riwayat transaksi di sini."
            />
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">
                <CheckCircle size={16} /> Daftar Transaksi Selesai
              </div>
              {completedOrders.map((order) => (
                <OrderItemCard key={order.id} order={order} />
              ))}
            </div>
          )
        )}
      </div>

      <p className="text-center text-gray-400 text-xs mt-12 pb-8">
        Butuh bantuan? <span className="text-orange-500 cursor-pointer underline">Hubungi CS RasaNusantara</span>
      </p>
    </div>
  );
};

const EmptyState = ({ title, desc }) => (
  <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center my-4">
    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
      <ShoppingBag size={32} />
    </div>
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">{desc}</p>
  </div>
);

export default MyOrderPage;