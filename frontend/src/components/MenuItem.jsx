import { useState } from 'react';
import { useCart } from '@context/CartContext';
import { HeartIcon, ShoppingCart, SpinnerGapIcon } from '@phosphor-icons/react';
import { formatCurrency } from '@utils/helper'
import { useLogin } from '@context/AuthContext'
import { useToast } from '@context/ToastContext'
import api from '@utils/api';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();
  const { user } = useLogin()
  const [isProcess, setIsProcess] = useState(false);
  const [isFavorite, setIsFavorite] = useState(user?.favorites_menu.some((menu) => menu.id === item.id));
  const isDisable = item.is_avaible;
  const { showToast } = useToast()

  const handleAddFavorite = async (id) => {
    if (!user) return showToast('You must login first!!')

    setIsProcess(true)
    try {
      const res = await api.post(`api/user/menu/${id}/favorite`);
      
      setIsFavorite(res.data.is_favorite)
      showToast(res.data.message)
    } catch (err) {
      showToast(err.response.data.message)
      console.error("Failed to add favorite", err.response)
    } finally {
      setIsProcess(false)
    }
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 relative">
      {user ? (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleAddFavorite(item.id)
          }}
          disabled={isProcess}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 shadow-sm disabled:bg-gray-500 ${
            isFavorite 
            ? 'bg-red-500 text-white scale-110' 
            : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:scale-110'
          }`}
        >
          {isProcess ?
            <SpinnerGapIcon size={20} className='animate-spin' weight='bold'/> :
            <HeartIcon size={20} weight={isFavorite ? "fill" : "bold"} />
          }
        </button>
      ) : ''}

      {/* Image Container */}
      <div className="aspect-4/3 overflow-hidden bg-gray-100">
        <img
          src={`http://localhost:8000/storage/${item.image_url}`}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="mt-1 text-gray-800 line-clamp-2 min-h-8">
            Stock: {item.stock}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Harga</span>
            <span className="text-xl font-black text-gray-900">
              {formatCurrency(item.price)}
            </span>
          </div>

          <button
            onClick={() => addToCart(item)}
            disabled={!isDisable}
            className="flex items-center gap-2 bg-orange-600 text-white p-3 sm:px-4 sm:py-2.5 rounded-xl font-bold hover:bg-orange-700 active:scale-95 transition-all duration-200 shadow-md shadow-orange-200 cursor-pointer disabled:bg-gray-700"
          >
            <ShoppingCart weight="bold" size={18} />
            <span className="hidden sm:inline text-sm">Tambah</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;