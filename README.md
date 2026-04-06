# List MVP Feature
## Frontend
- [x] Make listing product
- [x] Order makanan dengan fitur bisa pesan multi order, yang artinya bisa pesan menu A lebih dari 1 dan bisa pesan menu B juga lebih dari 1 dan nantinya nominal-nya dijumlahkan
- [x] admin dashboard untuk melihat pesanan.
- [x] sistem checkout, kali ini hanya dengan COD. yang artinya setelah user click tombol "ini" maka akan create data di database dan akan disimpan di database/ditampilkan di admin dashboard


## Backend
- [x] Make data seeder in backend for product
- [x] Make API call and test it
    - [x] GET /menus - Take all menu avaible
    - [ ] POST /orders - Make new order
    - [ ] GET /admin/orders - Admin - Take all order
    - [ ] GET /admin/orders/{id} - Admin - Detail 1 order
    - [ ] PATCH /order/{id}/status - Admin - Updating order status