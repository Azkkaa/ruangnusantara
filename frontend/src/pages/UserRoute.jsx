import { Navigate, Outlet } from 'react-router-dom';
import { useLogin } from '../context/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated } = useLogin();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default AdminRoute;