import { useEffect, useState } from 'react';
import { useOrders, OrdersProvider } from '../context/OrdersContext';
import { HandCoinsIcon } from '@phosphor-icons/react';

const MyOrderPage = () => {
    const { orders, getUserOrder } = useOrders();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const handleRequest = async () => {
        await getUserOrder()
        setLoading(false)
      }

      handleRequest()
    }, [getUserOrder])

    if (loading) {
        return <div className="text-center py-10">Memuat pesanan...</div>;
    }

    return (
      <OrdersProvider>
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Riwayat Pesanan - RasaNusantara</h2>
            
            {orders.length === 0 ? (
                <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700">
                    Kamu belum memiliki pesanan. Yuk, mulai pesan makanan!
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">No. Pesanan: <span className="font-mono font-medium text-gray-700">#{order.order_number}</span></p>
                                    <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                                    {order.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="border-t border-b py-3 my-3">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm py-1">
                                        <span>{item.quantity}x {item.product_name}</span>
                                        <span className="font-medium">Rp {item.price.toLocaleString('id-ID')}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <p className="text-gray-600 font-semibold">Total Pembayaran</p>
                                <p className="text-orange-600 font-bold text-lg">Rp {order.total_amount.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </OrdersProvider>
    );
};

// Helper untuk styling status
const getStatusStyle = (status) => {
    switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-700';
        case 'paid': return 'bg-green-100 text-green-700';
        case 'cancelled': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-700';
    }
};

export default MyOrderPage;