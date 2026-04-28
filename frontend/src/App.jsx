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
  DashboardPage,
  CreateMenuPage,
  UpdateMenuPage,
  DeleteMenuPage,
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
              <Route path="orders" element={<DashboardPage />} />
              <Route path="menu">
                <Route path="create" element={<CreateMenuPage />}/>
                <Route path="update" element={<UpdateMenuPage />}/>
                <Route path="delete" element={<DeleteMenuPage />}/>
              </Route>
            </Route>
          </Routes>
        </SidebarCondition>
      </div>
    </Router>
  );
}

export default App;