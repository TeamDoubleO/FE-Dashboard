import './css/Header.css';
import Logo from '../../assets/images/KEYWE_logo-white.png';
import ReusableButton from '../buttons/ReusableButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { adminLogout } from '../../apis/loginApi';
import { fetchAdminData } from '../../apis/adminApi';

const Header = () => {
  const navigate = useNavigate();
  const [hospitalName, setHospitalName] = useState<string>('');

  useEffect(() => {
    const loadAdminInfo = async () => {
      try {
        const data = await fetchAdminData();
        setHospitalName(data.affiliation);
      } catch (err) {
        console.error('병원명 로딩 실패:', err);
      }
    };

    loadAdminInfo();
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm('로그아웃 하시겠습니까?');
    if (!confirmed) return;

    try {
      await adminLogout();
      localStorage.clear();
      navigate('/admin/login');
    } catch (err: any) {
      localStorage.clear();
      const message = err?.message ?? '로그아웃 실패';
      alert(message);
      console.warn('관리자 로그아웃 실패:', err);
      navigate('/admin/login');
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

      <div className="header-user-wrapper">
        <IoPersonCircleOutline className="header-user-icon" />
        <div className="header-user-text">
          <div>{hospitalName}</div>
          <div className="header-user-subtext">관리자님 안녕하세요</div>
        </div>
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
