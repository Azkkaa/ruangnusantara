import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from '@context/CartContext'
import { OrdersProvider } from '@context/OrdersContext'
import { LoginProvider } from '@context/AuthContext'
import { ToastProvider } from '@context/ToastContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <LoginProvider>
        <CartProvider>
          <OrdersProvider>
              <App />
          </OrdersProvider>
        </CartProvider>
      </LoginProvider>
    </ToastProvider>
  </StrictMode>,
)
