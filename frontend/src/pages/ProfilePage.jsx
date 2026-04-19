import React from 'react';
import { useLogin } from '../context/AuthContext';
import { handleLogout } from '../service/AuthService';
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  Heart, 
  Gear, 
  SignOut, 
  CaretRight 
} from '@phosphor-icons/react';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  // Data dummy untuk tampilan
  const { user, setUser } = useLogin()

  const menuItems = [
    { icon: <ShoppingBag size={24} />, label: "Pesanan Saya", sub: "Lihat status pesanan aktif" },
    { icon: <Heart size={24} />, label: "Favorit", sub: "Menu yang kamu simpan" },
  ];

  if (!user) return <Navigate to="/" />

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-4xl shadow-sm border-b border-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center border-4 border-white shadow-md mb-4 overflow-hidden">
            <img src={`https://ui-avatars.com/api/name=${user.name}`} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="px-6 mt-8 space-y-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-2">
          Aktivitas & Akun
        </h2>
        
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:bg-orange-50 transition-colors duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-white">
                  {item.icon}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              </div>
              <CaretRight size={18} weight="bold" className="text-gray-400" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={async () => {
            await handleLogout()
            setUser(null)
          }}
          className="w-full flex items-center gap-4 p-4 mt-8 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-colors duration-200"
        >
          <div className="p-2 bg-white rounded-xl">
            <SignOut size={24} weight="bold" />
          </div>
          <span className="font-bold text-sm">Keluar dari Akun</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;