import './css/Header.css';
import Logo from '../../assets/images/KEYWE_logo-white.png';
import ReusableButton from '../buttons/ReusableButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm("로그아웃하시겠습니까?");
    if (!confirmed) return;

    const token = localStorage.getItem("accessToken");

    try {
      await axios.post(
        "http://localhost:8082/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.warn("로그아웃 API 실패 (무시하고 계속 진행)", err);
    }

    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <header className="header">
      <div className="header-content">
        <img
          src={Logo}
          alt="KEYWE Logo"
          className="header-logo-image"
          onClick={() => navigate('/dashboard')}
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
