import { useEffect, useState } from 'react';
import MenuItem from '@components/MenuItem';
import axios from 'axios';
import Loading from '@components/Loading';
import fullLogoNobg from '@assets/image/logo/full_logo_rasanusantara-no-bg.png';

const MenuPage = () => {
  const [error, setError] = useState(false);
  const [datas, setDatas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua'); // State untuk filter

  useEffect(() => {
    const handleRequest = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/menus');
        setDatas(res.data.resources);
      } catch (err) {
        setError(true);
        if (err.response) {
          setDatas(err.response);
        }
      }
    };
    handleRequest();
  }, []);

  // 1. Ambil daftar kategori unik dari data resources
  const categories = [
    'Semua',
    ...new Set(
      datas.flatMap((item) => item.categories.map((cat) => cat.name))
    ),
  ];

  // 2. Filter data berdasarkan kategori yang dipilih
  const filteredData = selectedCategory === 'Semua'
    ? datas
    : datas.filter((item) =>
        item.categories.some((cat) => cat.name === selectedCategory)
      );

  if (error) return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className='text-center'>
        <h1 className="text-6xl font-black text-gray-200 mb-4">Opps!</h1>
        <p className='text-gray-500 text-lg mb-6'>Sepertinya terjadi kesalahan teknis.</p>
        <div className="inline-block px-4 py-2 bg-red-50 rounded-lg">
          <p className='text-red-600 font-medium'>Error Code: {datas.status || 'Connection Refused'}</p>
        </div>
      </div>
    </main>
  );

  if (datas.length === 0) return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <Loading size={50}/>
      <p className="mt-4 text-gray-400 animate-pulse">Menyiapkan hidangan terbaik...</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 relative inline-block border-b-2 border-orange-600">
              Daftar Menu
            </h2>
            <p className="text-sm text-gray-400 mt-1">{filteredData.length} Pilihan Menu</p>
          </div>

          {/* Tombol Filter Kategori */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredData.map(item => (
            <div key={item.id} className="transform transition duration-300">
              <MenuItem item={item} />
            </div>
          ))}
        </div>

        {/* Empty State jika filter tidak menemukan data */}
        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">Menu untuk kategori ini belum tersedia.</p>
          </div>
        )}
      </div>

      <footer className="py-10 text-center text-gray-700 text-sm">
        <div className="mx-auto flex flex-col items-center">
          <img 
            src={fullLogoNobg} 
            alt="logo_rasanusantara" 
            className='w-48 h-auto mb-6 drop-shadow-sm'
          />
        </div>
        <p>&copy; {new Date().getFullYear()} Rasa Nusantara. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default MenuPage;