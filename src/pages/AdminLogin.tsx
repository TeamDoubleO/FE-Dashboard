import './css/AdminLogin.css';
import AdminLoginBox from '../components/_Admin/AdminLoginBox';

const AdminLogin = () => {
  const handleLogin = () => {
    console.log('로그인 성공');
  };

  return (
    <div className="admin-login-page">
      <AdminLoginBox onLogin={handleLogin} />
    </div>
  );
};

export default AdminLogin;