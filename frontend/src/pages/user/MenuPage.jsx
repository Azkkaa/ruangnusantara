import { useEffect, useState } from 'react';
import MenuItem from '@components/MenuItem';
import axios from 'axios';
import Loading from '@components/Loading';
import fullLogoNobg from '@assets/image/logo/full_logo_rasanusantara-no-bg.png';

const MenuPage = () => {
  const [error, setError] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const handleRequest = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/menus')
        setDatas(res.data.resources)
      } catch (err) {
        setError(true)
        if (err.response) {
          setDatas(err.response)
        }
      }
    }
    handleRequest()
  }, [])

  // State Error yang lebih halus
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
  )

  // Loading state yang centered
  if (datas.length === 0) return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <Loading size={50}/>
      <p className="mt-4 text-gray-400 animate-pulse">Menyiapkan hidangan terbaik...</p>
    </main>
  )

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Menu Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-gray-800 relative inline-block border-b-2 border-orange-600">
            Daftar Menu
          </h2>
          <span className="text-sm text-gray-400">{datas.length} Pilihan Menu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {datas.map(item => (
            <div key={item.id} className="transform transition duration-300">
              <MenuItem item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Simple */}
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