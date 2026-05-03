# 🍽️ Rasa Nusantara - Full-stack Restaurant Ordering System

Rasa Nusantara adalah aplikasi pemesanan restoran berbasis web dengan arsitektur *decoupled* yang memisahkan antara *Frontend* dan *Backend*. Dibangun untuk memberikan pengalaman pemesanan makanan yang mulus bagi pelanggan, serta menyediakan dasbor manajemen yang komprehensif bagi admin restoran.

## 🚀 Tech Stack

- **Frontend:** React 19, Tailwind CSS
- **Backend:** Laravel 12, MySQL
- **Authentication:** Laravel Sanctum
- **Architecture:** RESTful API

## ✨ Key Features

### 👤 Customer (User) Features
* **Menu Exploration:** Menampilkan daftar menu yang terorganisir berdasarkan kategori.
* **Multi-item Cart System:** Sistem keranjang belanja yang memungkinkan pengguna memesan berbagai menu dengan kuantitas berbeda secara bersamaan.
* **Favorite Menus:** Pengguna dapat menyimpan menu ke dalam daftar favorit pribadi.
* **Order Tracking & History:** Halaman khusus bagi pengguna untuk melihat riwayat pesanan mereka secara lengkap.
* **Interactive UI:** Dilengkapi dengan *Global Toast Notifications* untuk setiap aksi pengguna.
* **Checkout System:** Mendukung sistem pembayaran *Cash on Delivery* (COD).

### 🛡️ Admin Features (Role-Based Access Control)
* **Secure Dashboard:** Rute dan endpoint yang dilindungi khusus untuk peran Admin.
* **Order Management:** Memantau seluruh pesanan masuk dan memperbarui status pesanan secara *real-time*.
* **Menu Management:** Sistem CRUD penuh untuk menambah, mengedit, atau menghapus item menu secara dinamis.

## 📡 API Endpoints Reference

### Public Routes
* `POST /login` - User authentication
* `POST /register` - Register new user
* `GET /menus` - Fetch all available menus

### Protected Routes (Requires Auth Token)
* `POST /logout` - Terminate user session
* `GET /user` - Get current authenticated user profile
* `POST /orders` - Create a new order
* `GET /orders/user` - Fetch current user's order history

### Admin Routes (Requires Admin Role)
* `GET /admin/orders` - Fetch all orders
* `GET /admin/orders/{id}` - Get specific order details
* `PATCH /orders/{id}/status` - Update specific order status

## 🗺️ Development Roadmap

Fitur-fitur berikut sedang dalam tahap perencanaan dan pengembangan untuk pembaruan berikutnya:
- [x] **Midtrans API Payment Integration:** Transisi dari sistem COD ke pembayaran digital otomatis.
- [x] **Item Stock Limit:** Manajemen inventaris dan ketersediaan stok *real-time*.
- [ ] **Table Reservation System:** Fitur pemesanan tempat/meja makan.
- [ ] **Advanced Error Handling:** Peningkatan respons *error* pada sisi *Frontend* dan *Backend*.

---
*Developed by Muhammad Azka Faza Muttaqin*