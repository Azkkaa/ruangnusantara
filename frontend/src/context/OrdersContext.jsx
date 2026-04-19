import { createContext, useCallback, useContext, useState } from 'react';
import api from '../utils/api';

const OrdersContext = createContext();

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within OrdersProvider');
  }
  return context;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const getUserOrder = useCallback(async () => {
    try {
      const res = await api.get('/api/user/order');
  
      setOrders(res.data.orders)
      return res.data
    } catch (err) {
      console.error("Failed to get user order!!", err?.data?.message)
      alert("Failed to get user order!!")
      throw err
    }
  }, [])

  const value = {
    getUserOrder,
    orders
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};
