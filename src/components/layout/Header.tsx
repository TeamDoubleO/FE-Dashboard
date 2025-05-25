import './css/Header.css';
import Logo from '../../assets/images/KEYWE_logo-white.png';
import ReusableButton from '../buttons/ReusableButton';
import { useNavigate } from 'react-router-dom';

import { adminLogout } from '../../apis/loginApi';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (!confirmed) return;

    try {
      await adminLogout();
      localStorage.clear();
      navigate("/admin/login");
    } catch (err: any) {
      localStorage.clear();
      const message = err?.message ?? "로그아웃 실패";
      alert(message); 
      console.warn("관리자 로그아웃 실패:", err);
      navigate("/admin/login");
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <img
          src={Logo}
          alt="KEYWE Logo"
          className="header-logo-image"
          onClick={() => navigate('/dashboardstats')}
        />
      </div>

      <div className="header-logout-wrapper">
        <ReusableButton
          onClick={handleLogout}
          className="reusable-button logout-button"
        >
          로그아웃
        </ReusableButton>
      </div>
    </header>
  );
};

export default Header;
