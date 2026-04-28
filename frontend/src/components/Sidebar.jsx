import React, { useState } from 'react';
import { 
  Layout, 
  ListBullets, 
  ChefHat, 
  Users, 
  ChartLineUp, 
  CaretLeft, 
  CaretRight,
  House,
  CaretDown
} from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';
import logoFontNobg from '../assets/image/logo/logo_font_rasanusantara-no-bg.png';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk dropdown Kelola Menu
  const location = useLocation();

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: <Layout size={24} /> },
    { path: '/admin/orders', name: 'Pesanan', icon: <ListBullets size={24} /> },
    { 
      name: 'Kelola Menu', 
      icon: <ChefHat size={24} />,
      isDropdown: true,
      subItems: [
        { path: '/admin/menu/create', name: 'Tambah Menu' },
        { path: '/admin/menu/update', name: 'Edit Menu' },
        { path: '/admin/menu/delete', name: 'Delete Menu' },
      ]
    },
    { path: '/admin/users', name: 'Pelanggan', icon: <Users size={24} /> },
    { path: '/admin/analytics', name: 'Laporan', icon: <ChartLineUp size={24} /> },
  ];

  return (
    <div 
      className={`h-screen sticky top-0 bg-gray-900 text-white transition-all duration-300 flex flex-col z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <img src={logoFontNobg} alt="logo_font_rasanusantara"
            className='w-full h-11 px-6'
          />
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors ml-auto"
        >
          {isCollapsed ? <CaretRight size={20} /> : <CaretLeft size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-2 mt-4 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item, index) => {
          if (item.isDropdown) {
            const isSubItemActive = item.subItems.some(sub => location.pathname === sub.path);
            
            return (
              <div key={index} className="flex flex-col">
                <button
                  onClick={() => {
                    if(isCollapsed) setIsCollapsed(false);
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all w-full ${
                    isSubItemActive ? 'text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="shrink-0 text-orange-500">
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <>
                      <span className="font-medium flex-1 text-left">{item.name}</span>
                      <CaretDown 
                        size={16} 
                        className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} 
                      />
                    </>
                  )}
                </button>

                {/* Sub-menu items */}
                {isMenuOpen && !isCollapsed && (
                  <div className="ml-9 mt-1 space-y-1">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                          location.pathname === sub.path 
                          ? 'text-orange-500 font-semibold' 
                          : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
                isActive 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/20' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className={`shrink-0 ${isActive ? 'text-white' : 'text-orange-500'}`}>
                {item.icon}
              </div>
              
              <span className={`font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${
                isCollapsed 
                ? 'w-0 opacity-0 invisible' 
                : 'w-full opacity-100 visible' 
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link 
          to="/" 
          className="flex items-center gap-4 px-3 py-3 transition-colors text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl"
        >
          <div className="shrink-0 text-orange-500">
            <House size={24} />
          </div>
          <span className={`font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${
            isCollapsed ? 'w-0 opacity-0 invisible' : 'w-full opacity-100 visible'
          }`}>
            Ke Toko
          </span>
        </Link>

        <Link 
          to="/profile" 
          className="flex items-center gap-4 px-3 py-3 text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all group"
        >
          <div className="shrink-0 transition-transform">
            <Users size={24} />
          </div>
          <span className={`font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${
            isCollapsed ? 'w-0 opacity-0 invisible' : 'w-full opacity-100 visible'
          }`}>
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;