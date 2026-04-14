// import axios from 'axios';
// import { createContext, useContext } from 'react';

// const LoginContext = createContext();

// export const useLogin = () => {
//   const context = useContext(loginProvider);
//   if (!context) {
//     throw new Error('useLogin must be used within CartProvider')
//   }

//   return context;
// }

// // next: make login provider
// export const loginProvider = async ({ children }) => {
  
//   const login = (userData) => {
//     await axios.get('http://localhost:8000/sanctum/csrf-cookie')
    
//   }

//   const value = {

//   }

//   return (
//     <LoginContext value={}>
//       {children}
//     </LoginContext>
//   )
// }