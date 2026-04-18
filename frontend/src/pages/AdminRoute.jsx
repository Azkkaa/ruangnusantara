import { Navigate, Outlet } from 'react-router-dom';
import { useLogin } from '../context/AuthContext';

const AdminRoute = () => {
  const { user, isAuthenticated } = useLogin();
  if (isAuthenticated && !user?.is_admin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default AdminRoute;