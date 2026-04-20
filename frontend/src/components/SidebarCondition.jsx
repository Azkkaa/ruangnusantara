import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const SidebarCondition = ({ children }) => {
  const location = useLocation();

  // Jika bukan halaman admin, langsung tampilkan konten tanpa sidebar
  if (!location.pathname.includes('/admin')) {
    return <>{children || <Outlet />}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {/* Sidebar tetap di tempat (fixed/sticky via class Sidebar) */}
      <Sidebar />

      {/* Konten Halaman akan mengisi sisa ruang yang ada */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default SidebarCondition;