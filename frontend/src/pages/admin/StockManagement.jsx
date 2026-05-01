import React, { useState, useEffect, useCallback } from 'react';
import api from '@utils/api';
import { useToast } from '@context/ToastContext';
import { MinusIcon, PlusIcon } from '@phosphor-icons/react';

const StockManagement = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const [stockValue, setStockValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast()

  const fetchMenus = useCallback(async () => {
    try {
      const response = await api.get('/api/menus');
      setMenus(response.data.resources);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Gagal melakukan operasi. Periksa koneksi anda";
      console.error("Failed to run operations:", err);
      showToast(errorMessage, 'failed')
    }
  }, [showToast])

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const handleMenuChange = (e) => {
    const id = e.target.value;
    setSelectedMenuId(id);
    const menu = menus.find(m => m.id === parseInt(id));
    setStockValue(menu ? menu.stock : 0);
  };

  const handleSaveStock = async () => {
    if (!selectedMenuId) return showToast("Pilih menu terlebih dahulu!");

    setLoading(true);
    try {
      console.log(stockValue)
      const res = await api.put(`/api/admin/menu/${selectedMenuId}/stock-update`, {
        stock: stockValue
      });
      showToast(res.data.message);
      fetchMenus();
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Gagal melakukan operasi. Periksa koneksi anda!";
      console.error("Failed to run operations:", err)
      showToast(errorMessage, 'failed')
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 w-[90%]">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Update Stok Menu</h2>

        <div className="space-y-4">
          {/* Choose Menu */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Pilih Menu</label>
            <select 
              className="border-2 border-gray-200 p-2 rounded-lg focus:border-orange-500 outline-none transition"
              value={selectedMenuId}
              onChange={handleMenuChange}
            >
              <option value="">-- Pilih --</option>
              {menus.map(menu => (
                <option key={menu.id} value={menu.id}>{menu.name}</option>
              ))}
            </select>
          </div>

          {/* Input Stock */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Jumlah Stok Saat Ini</label>
            <div className='flex justify-center items-center gap-3'>
              <MinusIcon
                size={30}
                onClick={() => setStockValue(prev => prev -= 1)}
                weight='fill'
                className='text-orange-600'
              />
              <input 
                type="number" 
                className="border-2 border-gray-200 py-1 px-2 rounded-lg focus:border-orange-500 outline-none transition text-lg font-bold w-19 text-center"
                value={stockValue}
                onChange={(e) => setStockValue(e.target.value)}
                min="0"
              />
              <PlusIcon
                size={30}
                onClick={() => setStockValue(prev => prev += 1)}
                weight='fill'
                className='text-orange-600'
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">*Ubah angka di atas untuk memperbarui stok menu item</p>
          </div>

          {/* Tombol Tunggal */}
          <button 
            disabled={loading || !selectedMenuId}
            onClick={handleSaveStock}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition disabled:bg-gray-300 shadow-md"
          >
            {loading ? 'Menyimpan...' : 'Update Stok'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;