import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext'
import { HeartIcon } from '@phosphor-icons/react'
import api from '@utils/api';

const FavoriteMenu = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Sesuaikan URL API dengan endpoint Laravel kamu
    const handleRequest = async () => {
      try {
        const response = await api.get('/api/user/favorite');
        setFavorites(response.data.resources);
      } catch (error) {
        console.error("Gagal mengambil menu favorit:", error);
      } finally {
        setLoading(false);
      }
    };

    handleRequest();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Memuat menu favorit...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Menu Favorit Kamu</h1>
      </header>

      {favorites.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
          <p className="text-gray-500 italic">Kamu belum memiliki menu favorit.</p>
          <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
            Eksplor Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              <img 
                src={`http://localhost:8000/storage/${item.image_url}`} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <span className="text-orange-600 font-bold">Rp {item.price.toLocaleString()}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition cursor-pointer"
                  >
                    Pesan Sekarang
                  </button>
                  <button className="px-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
                    <HeartIcon size={20} weight='fill'/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMenu;