import './css/Header.css';
import Logo from '../../assets/images/KEYWE_logo-white.png';
import ReusableButton from '../buttons/ReusableButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { FaSun, FaMoon } from 'react-icons/fa';
import { adminLogout } from '../../apis/loginApi';
import { fetchAdminData } from '../../apis/adminApi';

const Header = () => {
  const navigate = useNavigate();
  const [hospitalName, setHospitalName] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme === 'dark';
    setIsDarkMode(isDark);
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    if (next) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const handleLogout = async () => {
    const confirmed = window.confirm('로그아웃 하시겠습니까?');
    if (!confirmed) return;

    try {
      const theme = localStorage.getItem('theme');
      await adminLogout();
      localStorage.clear();
      if (theme) {
        localStorage.setItem('theme', theme);
      }
      navigate('/admin/login');
    } catch (err: any) {
      const theme = localStorage.getItem('theme');
      localStorage.clear();
      if (theme) {
        localStorage.setItem('theme', theme);
      }
      const message = err?.message ?? '로그아웃 실패';
      alert(message);
      console.warn('관리자 로그아웃 실패:', err);
      navigate('/admin/login');
    }
  };

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

  return (
    <header className="header">
      <div className="header-content">
        <img
          src={Logo}
          alt="KEYWE Logo"
          className="header-logo-image"
        />
      </div>
      <div className="header-right-wrapper">
        <div className="header-user-wrapper">
          <IoPersonCircleOutline className="header-user-icon" />
          <div className="header-user-text">
            <div>{hospitalName}</div>
            <div className="header-user-subtext">관리자님 안녕하세요</div>
          </div>
        </div>

        <div className="header-theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
        </div>

        <div className="header-logout-wrapper">
          <ReusableButton
            onClick={handleLogout}
            className="reusable-button logout-button"
          >
            로그아웃
          </ReusableButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
