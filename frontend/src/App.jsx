import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderCondition from './components/HeaderCondition';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import SuccessPage from './pages/SuccessPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/auth/AuthPage';
import AdminRoute from './pages/AdminRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <HeaderCondition />

        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/auth" element={<AuthPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="orders" element={<AdminPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;