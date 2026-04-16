# List MVP Feature

## Frontend
- [x] Make listing product
- [x] Order makanan dengan fitur bisa pesan multi order, yang artinya bisa pesan menu A lebih dari 1 dan bisa pesan menu B juga lebih dari 1 dan nantinya nominal-nya dijumlahkan
- [x] admin dashboard untuk melihat pesanan.
- [x] sistem checkout, kali ini hanya dengan COD. yang artinya setelah user click tombol "ini" maka akan create data di database dan akan disimpan di database/ditampilkan di admin dashboard

---

## Backend
- [x] Make data seeder in backend for product
- [x] Make API call and test it
    - [x] GET /menus - Take all menu available
    - [x] POST /orders - Make new order
    - [x] GET /admin/orders - Admin - Take all order
    - [x] GET /admin/orders/{id} - Admin - Detail 1 order
    - [x] PATCH /orders/{id}/status - Admin - Updating order status

---

## Auth System (Next Development)
- [x] Setup Laravel Sanctum
- [x] Register API
- [x] Login API
- [ ] Logout API
- [x] Get current user (profile)
- [x] Integrate auth with frontend (React)
- [x] Store token in frontend ( cookie)

---

## Authorization (Admin Role)
- [x] Add role column in users table (admin / user)
- [ ] Restrict admin routes using middleware
- [ ] Protect endpoints:
    - [ ] GET /admin/orders
    - [ ] GET /admin/orders/{id}
    - [ ] PATCH /orders/{id}/status
- [ ] Create admin middleware (check role === admin)
- [ ] (Optional) Seed default admin user

---

## Stable version of online ordering based application (Rasa Nusantara)
## &#9745; List MVP Done
## &#9745; Auth System