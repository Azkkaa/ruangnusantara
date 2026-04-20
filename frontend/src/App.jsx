import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderCondition from './components/HeaderCondition';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboardPage from './pages/admin/DashboardPage';
import SuccessPage from './pages/SuccessPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/auth/AuthPage';
import AdminRoute from './pages/AdminRoute';
import UserRoute from './pages/UserRoute';
import MyOrderPage from './pages/MyOrderPage';
import SidebarCondition from './components/SidebarCondition'

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
            <Route path="/auth" element={<AuthPage />}/>

            {/* User Page */}
            <Route path="/user" element={<UserRoute />}>
              <Route path="profile" element={<ProfilePage />}/>
              <Route path="orders" element={<MyOrderPage />} />
            </Route>

            {/* Admin Page */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="orders" element={<AdminDashboardPage />} />
            </Route>
          </Routes>
        </SidebarCondition>
      </div>
    </Router>
  );
}

export default App;