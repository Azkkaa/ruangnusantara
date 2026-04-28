import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';
import Loading from '../../components/Loading';

const CreateMenuPage = () => {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [isProcess, setIsProcess] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleCategories = async () => {
      try {
        const res = await api.get('/api/categories');
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Failed to get categories:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    handleCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcess(true);

    const data = new FormData();
    data.append('name', formData.name || '');
    data.append('price', formData.price || '');
    data.append('description', formData.description || '');
    data.append('category_slug', formData.category_slug || '');
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const res = await api.post('/api/admin/menu/create', data);
      if (res.data.success) {
        showToast(res.data.message);
        // Reset Form
        setFormData({});
        setImage(null);
        e.target.reset();
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Gagal melakukan operasi.";
      showToast(errorMessage, 'failed');
    } finally {
      setIsProcess(false);
    }
  };

  if (error) {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center bg-gray-50'>
        <div className="text-6xl mb-4">⚠️</div>
        <p className='text-xl font-semibold text-gray-700'>Opps, terjadi kesalahan!</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-orange-500 underline">Coba lagi</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Tambah Menu Baru</h2>
          <p className="text-gray-500 mt-2">Silakan isi detail menu di bawah ini untuk ditambahkan ke daftar restoran.</p>
        </div>

        {isloading ? (
          <div className="flex justify-center p-20"><Loading /></div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
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
                  placeholder="Contoh: Nasi Goreng Wagyu"
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-400">Rp</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || ''}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all outline-none bg-gray-50 focus:bg-white"
                      placeholder="0"
                    />
                  </div>
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
                    <option value="">Pilih Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Foto Menu</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-orange-50 hover:border-orange-300 transition-all">
                    {image ? (
                      <div className="relative w-full h-full p-2">
                        <img src={image} alt="preview" className="w-full h-full object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                          <p className="text-white text-xs font-bold">Ganti Gambar</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="text-3xl mb-2">📸</span>
                        <p className="text-sm text-gray-500">Klik untuk unggah foto</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                      </div>
                    )}
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={isProcess}
                className="w-full md:w-auto px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 active:scale-95 transition-all disabled:bg-gray-400 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
              >
                {isProcess ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : 'Simpan Menu Baru'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateMenuPage;