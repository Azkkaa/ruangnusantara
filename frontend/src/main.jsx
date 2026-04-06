import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext'
import { OrdersProvider } from './context/OrdersContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <OrdersProvider>
        <App />
      </OrdersProvider>
    </CartProvider>
  </StrictMode>,
)
