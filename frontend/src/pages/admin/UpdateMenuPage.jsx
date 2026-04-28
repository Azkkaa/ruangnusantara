import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import { useToast } from "../../context/ToastContext";
import Loading from "../../components/Loading";

const UpdateMenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [menuList, setMenuList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const selectedId = searchParams.get('id');

  const handleSelectMenu = (menu) => {
    setSearchParams({ id: menu.id });
    setFormData({
      name: menu.name,
      price: menu.price,
      category_slug: menu.category_slug,
    });
    setImage(menu.image_url);
    setUpdateImage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsProcess(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category_slug", formData.category_slug);
      data.append("_method", "PUT");

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await api.post(`api/admin/menu/${selectedId}/update`, data);
      showToast(res.data.message);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Gagal melakukan operasi. Periksa koneksi Anda!";
      showToast(errorMessage, 'failed');
    } finally {
      setIsProcess(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setUpdateImage(true);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const handleRequest = async () => {
      try {
        setIsLoading(true);
        const [catRes, menuRes] = await Promise.all([
          api.get("api/categories"),
          api.get("api/menus"),
        ]);

        const menus = menuRes.data.resources;
        setMenuList(menus);
        setCategories(catRes.data.categories);

        if (selectedId) {
          const menu = menus.find(m => m.id === parseInt(selectedId));
          console.log(menu)
          if (menu) {
            setFormData({
              name: menu.name,
              price: menu.price,
              category_slug: menu.categories[0].slug,
            });
            setImage(menu.image_url);
          } else {
            setSearchParams({});
            showToast("Menu tidak ditemukan", "failed");
          }
        }
      } catch (err) {
        const errorMessage = err?.response?.data?.message || "Gagal mengambil data.";
        showToast(errorMessage, "failed");
      } finally {
        setIsLoading(false);
      }
    };
    handleRequest();
  }, [selectedId, setSearchParams, showToast]);

  const isMenuSelected = selectedId && formData.name;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isMenuSelected ? "Edit Detail Menu" : "Kelola Menu"}
          </h2>
          <p className="text-gray-500 mt-2">
            {isMenuSelected 
              ? `Sedang mengubah: ${formData.name}` 
              : "Pilih menu dari daftar di bawah untuk memperbarui informasi."}
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl shadow-sm">
            <Loading />
            <p className="mt-4 text-gray-500 animate-pulse">Memuat data menu...</p>
          </div>
        ) : (
          <>
            {!isMenuSelected ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {menuList.map((menu) => (
                  <div
                    key={menu.id}
                    onClick={() => handleSelectMenu(menu)}
                    className="group p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 font-bold">
                        {menu.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{menu.name}</h4>
                        <p className="text-xs text-gray-400 capitalize">{menu.category_slug?.replace('-', ' ')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-700">Rp {Number(menu.price).toLocaleString()}</p>
                      <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase tracking-wider">Klik untuk edit</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Menu</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all outline-none bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all outline-none bg-gray-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                      <select
                        name="category_slug"
                        value={formData.category_slug || ''}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all outline-none bg-gray-50 focus:bg-white appearance-none"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.slug}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {updateImage ? "Preview Foto Baru" : "Foto Saat Ini"}
                      </label>
                      <div className="relative w-full h-44 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                        <img
                          src={updateImage ? image : `http://localhost:8000/storage/${image}`}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-gray-600 shadow-sm">
                          {updateImage ? "BARU" : "AKTIF"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Ganti Foto Menu</label>
                      <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-orange-50 hover:border-orange-300 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                          <span className="text-2xl mb-2">🔄</span>
                          <p className="text-sm text-gray-500 font-medium">Klik untuk ganti</p>
                          <p className="text-xs text-gray-400 mt-1">Kosongkan jika tidak ingin merubah gambar</p>
                        </div>
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row gap-3 items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSearchParams({})}
                    className="w-full md:w-auto px-6 py-3 text-gray-600 font-semibold hover:text-gray-800 transition-colors"
                  >
                    ← Kembali ke Daftar
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isProcess}
                    className="w-full md:w-auto px-10 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 active:scale-95 transition-all disabled:bg-gray-400 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                  >
                    {isProcess ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Menyimpan...
                      </>
                    ) : 'Simpan Perubahan'}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateMenuPage;