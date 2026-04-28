import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import api from '@utils/api';
import { useToast } from '@context/ToastContext';
import Loading from '@components/Loading';
import { TrashIcon, WarningIcon } from "@phosphor-icons/react";

const DeleteMenuPage = () => {
  const [menuList, setMenuList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcess, setIsProcess] = useState(false);
  const { showToast } = useToast();

  const fetchMenus = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get('api/menus');
      const data = res.data.resources || res.data.data;
      setMenuList(data);

      const idFromUrl = searchParams.get('id');
      if (idFromUrl) {
        const isExist = data.some(m => m.id === parseInt(idFromUrl));
        if (!isExist) {
          setSearchParams({});
          showToast("Menu tidak ditemukan atau sudah dihapus.", "failed");
        }
      }
    } catch (err) {
      console.error("Gagal mengambil daftar menu:", err);
      showToast("Gagal memuat daftar menu", "failed");
    } finally {
      setIsLoading(false);
    }
  }, [showToast, searchParams, setSearchParams]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus menu ini? Tindakan ini tidak bisa dibatalkan.")) {
      return;
    }

    try {
      setIsProcess(true);
      const res = await api.delete(`api/admin/menu/${id}/delete`);
      showToast(res.data.message || "Menu berhasil dihapus");
      setSearchParams({});
      fetchMenus();
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Gagal menghapus menu.";
      showToast(errorMessage, "failed");
    } finally {
      setIsProcess(false);
    }
  };

  const selectedId = searchParams.get('id');
  const selectedMenu = menuList.find(m => m.id === parseInt(selectedId));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Hapus Menu</h2>
          <p className="text-gray-500 mt-2">
            {selectedId 
              ? "Konfirmasi penghapusan item secara permanen." 
              : "Pilih menu yang ingin Anda keluarkan dari daftar restoran."}
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Loading />
            <p className="mt-4 text-gray-400">Menyiapkan daftar menu...</p>
          </div>
        ) : (
          <div>
            {!selectedId ? (
              <div className="grid gap-4">
                {menuList.length > 0 ? (
                  menuList.map((menu) => (
                    <div 
                      key={menu.id}
                      onClick={() => setSearchParams({ id: menu.id })}
                      className="group p-5 bg-white border border-gray-200 rounded-2xl cursor-pointer hover:border-red-300 hover:shadow-lg hover:shadow-red-50 transition-all flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors text-xl">
                          <TrashIcon size={25} weight="fill"/>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">{menu.name}</p>
                          <p className="text-sm text-gray-400">Rp {Number(menu.price).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-red-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        Pilih Menu
                        <span className="text-lg">→</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500">Tidak ada menu tersedia saat ini.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-red-100">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">
                      <WarningIcon size={25} weight="fill"/>
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
                  <p className="text-gray-600 max-w-sm mx-auto mb-8">
                    Apakah Anda yakin ingin menghapus <span className="font-bold text-red-600">"{selectedMenu?.name}"</span>? 
                    Tindakan ini tidak dapat dibatalkan.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setSearchParams({})}
                      disabled={isProcess}
                      className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all order-2 sm:order-1 disabled:opacity-50"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => handleDelete(selectedId)}
                      disabled={isProcess}
                      className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 hover:shadow-lg hover:shadow-red-200 active:scale-95 transition-all order-1 sm:order-2 flex items-center justify-center gap-2"
                    >
                      {isProcess ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Menghapus...
                        </>
                      ) : "Ya, Hapus Sekarang"}
                    </button>
                  </div>
                </div>
                
                <div className="bg-red-50 p-4 border-t border-red-100">
                  <p className="text-xs text-red-500 text-center font-medium uppercase tracking-widest">
                    Permanent Action System
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteMenuPage;