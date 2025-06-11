import { Navigate, Outlet } from 'react-router-dom';
import { PassLogProvider } from './PassLogContext';

const PrivateRoute = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return isLoggedIn ? (
    <PassLogProvider>
      <Outlet />
    </PassLogProvider>
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default PrivateRoute;
