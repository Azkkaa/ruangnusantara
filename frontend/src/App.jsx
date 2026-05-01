import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
  HeaderCondition,
  SidebarCondition,
} from './components';

import {
  AdminRoute,
  UserRoute,
  ProfilePage,
  SuccessPage,
} from './pages';

import {
  OrderManagementPage,
  CreateMenuPage,
  UpdateMenuPage,
  DeleteMenuPage,
  StockManagement,
  AdminDashboard,
} from './pages/admin';

import { AuthPage } from './pages/auth';

import {
  CartPage,
  CheckoutPage,
  FavoriteMenu,
  MenuPage,
  MyOrderPage,
} from './pages/user';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <HeaderCondition />

        <SidebarCondition>
          <Routes>
            {/* <Route path='*' element={} /> */}
            <Route path="/" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* User Page */}
            <Route path="/user" element={<UserRoute />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="orders" element={<MyOrderPage />} />
              <Route path="favorite" element={<FavoriteMenu />} />
            </Route>

            {/* Admin Page */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="orders" element={<OrderManagementPage />} />
              <Route path="menu">
                <Route path="create" element={<CreateMenuPage />}/>
                <Route path="update" element={<UpdateMenuPage />}/>
                <Route path="delete" element={<DeleteMenuPage />}/>
                <Route path="stock" element={<StockManagement />} />
              </Route>
            </Route>
          </Routes>
        </SidebarCondition>
      </div>
    </Router>
  );
}

export default App;