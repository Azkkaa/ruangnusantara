import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import SuccessPage from './pages/SuccessPage';
import AuthPage from './pages/auth/AuthPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin/orders" element={<AdminPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/auth" element={<AuthPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;