import './css/Header.css';
import Logo from '../../assets/images/KEYWE_logo-white.png';
import LogoutButton from '../buttons/LogoutButton'; 

const Header = () => {
  const handleLogout = () => {
    console.log('로그아웃 완료!');
  };

  return (
    <header className="header">
      <div className="header-content">
        <img src={Logo} alt="KEYWE Logo" className="header-logo-image" />
      </div>

      <div className="header-logout-wrapper">
        <LogoutButton onLogout={handleLogout} />
      </div>
    </header>
  );
};

export default Header;
